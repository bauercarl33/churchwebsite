#!/usr/bin/env node
/**
 * Lighthouse benchmark for the production build.
 *
 *   npm run build
 *   npm run lighthouse                 # all pages, 3 runs each, desktop
 *   npm run lighthouse -- --runs 5 --mobile --pages /,/about
 *   npm run lighthouse -- --url https://saintmaryaustin.org   # a deployed site
 *   npm run lighthouse -- --first-party-only   # block S3/API/Google Fonts
 *
 * --first-party-only measures only this repo's bundle and assets (useful for
 * comparing two builds without network noise); real-world numbers will be
 * slower because S3 images and API calls are excluded.
 *
 * Needs Google Chrome installed. Lighthouse is run with `npx`, so it is not a
 * project dependency. Reports the median of each metric per page and writes
 * the raw JSON reports to ./lighthouse-reports/.
 */
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { preview } from "vite";

const DEFAULT_PAGES = ["/", "/about", "/calendar", "/media", "/visitors", "/donate"];

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const runs = Number(option("runs", 3));
const pages = option("pages", DEFAULT_PAGES.join(",")).split(",");
const mobile = flag("mobile");
const firstPartyOnly = flag("first-party-only");
const BLOCKED_HOSTS = ["amazonaws.com", "googleapis.com", "gstatic.com"];
const outDir = path.resolve("lighthouse-reports");
// Chrome refuses to start its sandbox as root (e.g. in containers/CI).
const chromeFlags = ["--headless=new", process.getuid?.() === 0 ? "--no-sandbox" : ""]
  .filter(Boolean)
  .join(" ");
mkdirSync(outDir, { recursive: true });

let server;
let baseUrl = option("url", null);
if (!baseUrl) {
  server = await preview({ preview: { port: 4174, open: false } });
  baseUrl = server.resolvedUrls.local[0].replace(/\/$/, "");
}

const run = (command, commandArgs) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`lighthouse exited with code ${code}`))
    );
  });

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const rows = [];
try {
  for (const page of pages) {
    const samples = [];
    for (let i = 1; i <= runs; i++) {
      const name = `${page === "/" ? "home" : page.replace(/\//g, "_").replace(/^_/, "")}-${i}.json`;
      const file = path.join(outDir, name);
      process.stdout.write(`Running ${page} (${i}/${runs})...\n`);
      // Must be async: the preview server runs in this same process.
      await run(
        process.platform === "win32" ? "npx.cmd" : "npx",
        [
          "--yes",
          "lighthouse@12",
          `${baseUrl}${page}`,
          "--quiet",
          "--output=json",
          `--output-path=${file}`,
          "--only-categories=performance,accessibility,best-practices,seo",
          `--chrome-flags=${chromeFlags}`,
          ...(mobile ? [] : ["--preset=desktop"]),
          ...(firstPartyOnly ? BLOCKED_HOSTS.map((h) => `--blocked-url-patterns=*${h}*`) : []),
        ],
      );
      const report = JSON.parse(readFileSync(file, "utf8"));
      const c = report.categories;
      const a = report.audits;
      samples.push({
        perf: c.performance.score * 100,
        a11y: c.accessibility.score * 100,
        bp: c["best-practices"].score * 100,
        seo: c.seo.score * 100,
        fcp: a["first-contentful-paint"].numericValue,
        lcp: a["largest-contentful-paint"].numericValue,
        tbt: a["total-blocking-time"].numericValue,
        cls: a["cumulative-layout-shift"].numericValue,
        kb: a["total-byte-weight"].numericValue / 1024,
      });
    }
    const m = (key) => median(samples.map((s) => s[key]));
    rows.push({
      page,
      Perf: Math.round(m("perf")),
      A11y: Math.round(m("a11y")),
      BP: Math.round(m("bp")),
      SEO: Math.round(m("seo")),
      "FCP ms": Math.round(m("fcp")),
      "LCP ms": Math.round(m("lcp")),
      "TBT ms": Math.round(m("tbt")),
      CLS: Number(m("cls").toFixed(3)),
      "Transfer KB": Math.round(m("kb")),
    });
  }
} finally {
  if (server) await new Promise((resolve) => server.httpServer.close(resolve));
}

console.log(`\nLighthouse medians (${runs} run(s), ${mobile ? "mobile" : "desktop"}) for ${baseUrl}`);
console.table(rows);
