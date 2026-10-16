# St. Mary Orthodox Church website

Source for [saintmaryaustin.org](https://saintmaryaustin.org/). It is a React 18
single-page app built with [Vite](https://vite.dev/). Content such as the
calendar, photo albums and donation items is loaded at runtime from AWS API
Gateway endpoints and S3 (see `src/lib/api.js`).

## Requirements

- Node.js 18 or newer (20+ recommended)
- npm

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm start` (or `npm run dev`) | Dev server at http://localhost:3000 with hot reload |
| `npm run build` | Production build into `build/` |
| `npm run preview` | Serve the production build locally at http://localhost:4173 |
| `npm test` | Run the tests once (Vitest + Testing Library) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | ESLint (React, hooks and accessibility rules) |
| `npm run lighthouse` | Lighthouse benchmark of the production build (see below) |

## Project layout

```
index.html            HTML entry (Vite); <head> metadata lives here
public/               Static files copied as-is (favicon, manifest, robots.txt)
src/
  index.jsx           React entry point
  App.jsx             Routes (pages are lazy-loaded)
  components/         Navbar, Footer and shared pieces
  pages/              One folder per page
  lib/                API endpoints, fetch helper, calendar date helpers
  data/               Static data (payment options)
  test/               Test helpers
scripts/lighthouse.mjs
docs/REFACTOR_LOG.md  History of the 2026 refactor, with measurements
```

Tests live next to the code they test (`*.test.js` / `*.test.jsx`).

## Deployment

`npm run build` writes a static site to `build/`, the same folder Create React
App used. Upload its contents to the host as before.

Because this is a single-page app using browser routing, the host must serve
`index.html` for unknown paths so that refreshing or opening `/about`,
`/media/...` etc. works:

- **S3 + CloudFront:** set custom error responses for 403 and 404 to return
  `/index.html` with status 200.
- **Amplify Hosting:** add a rewrite rule
  `</^[^.]+$|\.(?!(css|gif|ico|jpg|jpeg|js|png|txt|svg|webp|woff|woff2|ttf|map|json)$)([^.]+$)/>` → `/index.html` (200).

Asset files in `build/assets/` have content hashes in their names and can be
cached long-term; `index.html` should not be cached.

There are no environment variables. If you add some, they must be prefixed
with `VITE_` and read via `import.meta.env.VITE_…`. Anything in them is public,
so never put secrets there.

## Lighthouse benchmark

```
npm run build
npm run lighthouse                          # all pages, 3 runs each, desktop
npm run lighthouse -- --mobile --runs 5
npm run lighthouse -- --pages /,/about
npm run lighthouse -- --url https://saintmaryaustin.org   # the live site
npm run lighthouse -- --first-party-only    # block S3/API/Google Fonts
```

Requires Google Chrome. The script starts `vite preview` itself, prints the
median of each metric per page, and saves raw reports to `lighthouse-reports/`
(git-ignored).

The original feature wish list is kept in [docs/FEATURE_IDEAS.md](docs/FEATURE_IDEAS.md).
