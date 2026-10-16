#!/usr/bin/env node
/**
 * Generate responsive WebP versions of the site photos.
 *
 *   npm run images
 *
 * Reads every image in images/originals/ (JPEG, PNG, WebP, AVIF, …) and writes
 *   src/images/photos/<name>-<width>.webp   for each preset width that is
 *                                           not larger than the original
 *   src/images/photos/manifest.json         intrinsic sizes + generated widths
 *
 * The generated files are committed, so building the site does not need this
 * script (or sharp). Run it again after adding or replacing an original; the
 * file name (without extension) becomes the photo's name in src/images/photos.js.
 */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "images/originals");
const OUT_DIR = path.join(ROOT, "src/images/photos");
// Content photos are never shown wider than 800 CSS px (see the page CSS),
// so 1200px covers high-DPI screens. Full-width hero images get larger sizes.
const WIDTHS = [400, 800, 1200];
const WIDE_WIDTHS = [800, 1200, 1600, 1920];
const WIDE_PHOTOS = new Set(["nativity-icon"]);
const QUALITY = 72;
// Every non-wide photo is displayed in a 3:2 box with `object-fit: cover`
// (centered), so it is center-cropped to 3:2 here. That looks identical but
// avoids downloading pixels that are cropped away (most originals are
// portrait).
const CONTENT_ASPECT = 3 / 2;
const IMAGE_EXT = /\.(jpe?g|jfif|png|webp|avif|tiff?)$/i;

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

const manifest = {};
const files = (await readdir(SRC_DIR)).filter((f) => IMAGE_EXT.test(f)).sort();

for (const file of files) {
  const name = path.parse(file).name;
  // .rotate() applies EXIF orientation so phone photos are upright.
  const image = sharp(path.join(SRC_DIR, file)).rotate();
  const { width, height } = await image.metadata().then((m) =>
    (m.orientation ?? 1) >= 5 ? { width: m.height, height: m.width } : m
  );

  const wide = WIDE_PHOTOS.has(name);
  const preset = wide ? WIDE_WIDTHS : WIDTHS;
  // Every preset width smaller than the original, plus the original width
  // itself if it is smaller than the largest preset (never upscale).
  const unique = [...new Set([...preset.filter((w) => w < width), Math.min(width, preset.at(-1))])];

  let bytes = 0;
  for (const w of unique) {
    const info = await image
      .clone()
      .resize(
        wide
          ? { width: w, withoutEnlargement: true }
          : { width: w, height: Math.round(w / CONTENT_ASPECT), fit: "cover", position: "centre" }
      )
      .webp({ quality: QUALITY })
      .toFile(path.join(OUT_DIR, `${name}-${w}.webp`));
    bytes += info.size;
  }
  const outHeight = wide ? height : Math.round(width / CONTENT_ASPECT);
  manifest[name] = { width, height: outHeight, widths: unique };
  console.log(`${name}: ${width}x${height} -> ${unique.join(", ")} (${Math.round(bytes / 1024)} KB total)`);
}

await writeFile(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nWrote ${files.length} photos to ${path.relative(ROOT, OUT_DIR)}`);
