# Refactor log

A running record of the four-phase modernisation (refactor → Vite → event page →
TypeScript), the reasoning behind each change, and remaining risks.
Branch: `refactor/vite-ts`.

## How performance was measured

Lighthouse 12.8.2, desktop preset, headless Chromium, 3 runs per page, median
reported. The build was served locally with `serve -s` (SPA fallback).

**Important limitation:** the measuring environment cannot reach S3, API
Gateway or Google Fonts, so those requests were blocked
(`--blocked-url-patterns`). The numbers measure **our own bundle and assets
only**: real-world LCP depends heavily on S3 image download time and will be
higher. Use them to compare builds with each other, not as production scores.
To measure for real, run `scripts/lighthouse.sh` on a machine with normal
internet access (added in Phase 2).

## Phase 1: refactor, maintainability, performance

### Baseline (CRA, before any change)

| Check | Result |
|---|---|
| `react-scripts build` | passes, **30 ESLint warnings** |
| `react-scripts test` | **1 failing** (CRA boilerplate "learn react" test) |
| Main JS bundle | 156.0 kB gzip (512 kB raw), single bundle |
| Main CSS | 12.0 kB gzip |

| Page | Perf | A11y | BP | SEO | LCP ms | Transfer KB |
|---|---|---|---|---|---|---|
| / | 91 | 77 | 100 | 83 | 1935 | 1686 |
| /about | 91 | 77 | 100 | 92 | 1940 | 1686 |
| /calendar | 98 | 82 | 100 | 92 | 1140 | 736 |
| /media | 98 | 82 | 100 | 92 | 1151 | 736 |
| /visitors | 99 | 83 | 100 | 92 | 985 | 736 |
| /donate | 97 | 79 | 96 | 92 | 1213 | 736 |

### After Phase 1

| Check | Result |
|---|---|
| `react-scripts build` | passes, **0 ESLint warnings** |
| `react-scripts test` | **21 passing** across 5 suites |
| Main JS bundle | **68.9 kB gzip** (−87 kB); pages are lazy-loaded chunks |
| Main CSS | 3.7 kB gzip (page CSS now loads with each page) |

| Page | Perf | A11y | BP | SEO | LCP ms | Transfer KB |
|---|---|---|---|---|---|---|
| / | 99 | 95 | 100 | 92 | 847 | 330 |
| /about | 99 | 95 | 100 | 100 | 826 | 372 |
| /calendar | 100 | 100 | 100 | 100 | 660 | 198 |
| /media | 100 | 100 | 100 | 100 | 732 | 161 |
| /visitors | 100 | 100 | 100 | 100 | 554 | 156 |
| /donate | 100 | 100 | 100 | 100 | 726 | 166 |

What caused the improvements:
- **Transfer size**: `logo.png` (571 KB, loaded by navbar and footer) became a
  400×400 WebP (69 KB); `checkeredBG.png` (973 KB, the faint decorative circles)
  became WebP (182 KB). Route-level code splitting keeps Schedule-X,
  framer-motion and the donation shop out of the home-page bundle.
- **Accessibility**: logo `alt` text, named icon-only buttons, the hamburger
  is now a real `<button>` with `aria-expanded`, FAQ accordion
  `aria-expanded`/`aria-controls`, labelled donation-form inputs, `<main>` and
  `<footer>` landmarks.
- **SEO**: the meta description was still CRA's "Web site created using
  create-react-app".

Remaining Lighthouse findings (not fixed, they need a design decision):
- **Color contrast**: the gold accent (`--accent: #e7a95a`) on the light
  background fails WCAG AA (the "Orthodox Church" highlight on the home page and
  the year labels on About).
- **Link text**: the three "Learn More" links on the home page. They now have
  descriptive `aria-label`s, but Lighthouse checks the visible text.

### Changes

**Removed (unused, after checking for imports, routes and dynamic usage):**
- The old `pages/Donate` (no route rendered it; `/donate` already used
  `DonateCopy`). `DonateCopy` was renamed to `Donate`.
- The old custom `pages/Calendar` (replaced by `pages/ScheduleX`), `pages/Bulletin`
  (unrouted, referenced a missing image), empty `ItemsSubsection` files, unused
  `CategorySelector`/`SearchBar`, duplicate `Tithely/tithely.webp` files.
- `App.css` (never imported), `logo.svg`, `reportWebVitals.js` (called with no
  callback, so it did nothing) and the boilerplate `App.test.js`.
- `public/images/home/*`: about 4.8 MB of unreferenced images.
- Dependencies: `jquery`, `react-slick`, `slick-carousel`, `@types/react-slick`,
  `react-image-gallery`, `react-photo-gallery`, `react-progressive-image`,
  `react-scroll`, `web-vitals`. Removing `react-photo-gallery` also removed the
  peer-dependency conflict that made plain `npm ci` fail.
- The `.npm/` cache directory (2,602 files) is no longer tracked; it is now in
  `.gitignore`.
- **Kept on purpose:** `pages/admin.jsx` and `pages/uploadcontent.jsx` (and
  therefore `@mui/material`/`@emotion`). They are not routed, so they are not in
  the bundle.

**Structure:**
- `src/lib/api.js`: all API Gateway endpoints and the S3 image base in one
  place, plus `fetchJson()`, which throws on non-2xx responses so failures
  surface as errors instead of crashes.
- `src/lib/calendar.js`: pure date helpers, previously redefined inside
  components (tested).
- `src/data/donationOptions.js`: the payment options (QR images and links)
  that were copy-pasted in three files.
- Routes are lazy-loaded with `React.lazy` and wrapped in `<Suspense>`.
  `exact` (a react-router v5 prop with no effect in v6) was removed.
  `/donateCopy` now redirects to `/donate`.

**Bug fixes:**
- Donate: the initial category state was `["All"]` (an array). It only worked
  because of a loose `==` comparison. It is now `"All"`, and a regression test
  covers it.
- Donate/Media/Calendar: a failed API request used to crash the page (white
  screen on `folders.body` of undefined) or show an empty calendar. These now
  show a short error message.
- Clergy (About page) fired a request to `listFileIdsInFolder/` with no folder
  id on every visit and only logged the result. It was removed.
- Media and Clergy both used the react-query key `['images']`. Keys are now
  unique.
- Item modal: clicking the QR image called `closeModal` twice, which
  refetched items twice.
- Item modal: removed the placeholder fallback "Here is the item
  description. Very nice item. Very cheap." Items without a description now
  show none.
- Phone input `type="phone"` (invalid) is now `type="tel"`, so mobile shows
  the numeric keypad.
- Footer: the `tel:`/`mailto:` links had a stray space; the email link's
  `aria-label` said "Call us".
- `target="_blank"` links now have `rel="noreferrer"`.
- `Media.js`: removed the meaningless `${process.env.PUBLIC_URL}https://…`
  prefix.
- ImageSlider: added the missing `images.length` effect dependency.

**Performance (beyond the above):**
- About timeline: a `scroll` listener that measured every section on every
  scroll event was replaced by an `IntersectionObserver`.
- Montserrat is loaded with `<link>` + `preconnect` instead of a CSS
  `@import` (which blocked rendering until the CSS file was parsed).
- `preconnect` to the S3 image host; `fetchpriority="high"` on the home hero
  image (the LCP element).
- All S3 image URLs now use one host (`saintmarychurch.s3.us-east-1.amazonaws.com`);
  the code previously mixed it with `saintmarychurch.s3.amazonaws.com`. Both
  hostnames serve the same bucket and both were already used in production
  code, but this could not be fetched from the measuring environment, so
  **please spot-check images after deploying**.

**CSS note:** `about.css` and `ShopDivisor.css` contained global rules
(`img {…}`, `html, body { overflow-x: hidden }`). Because those files were
bundled eagerly, the rules applied site-wide. With lazy loading they would
only apply after visiting those pages, so they were moved to `index.css` to
keep the behavior the same.

**Tests added** (Jest via `react-scripts test`): calendar helpers, app routing
and redirect, navbar `aria-current`, FAQ accordion, the donation page (load,
category filter, QR switching, Zelle non-clickable, modal, form validation),
the media page (albums, album photos, API error).

### Known issues / decisions for the owner (not changed)

- **Donation receipts** are emailed to a hard-coded personal address
  (`bauercarliii@gmail.com`) in `ItemsGrid.jsx`.
- **Donation progress** is written from the browser to an unauthenticated
  `PUT` endpoint, so anyone can change an item's progress. This needs a
  server-side fix.
- The Schedule-X `church` calendar colors were defined in a `config` object
  that was never passed to Schedule-X, so they have never applied. The dead
  config was removed. Applying the colors would be a visual change.
- The Media album "share" button has no behavior.
- Unknown URLs render an empty page between the navbar and footer (no 404
  page).
- `navbar.css` places a `<div class="navpill">` directly inside a `<ul>`
  (invalid HTML, harmless). It was left as-is to avoid restyling.
- Tests print a `ReactDOMTestUtils.act` deprecation warning because
  `@testing-library/react@13` predates React 18.3. To be addressed with the
  test-stack change in Phase 2.

## Phase 2: Create React App → Vite

### What CRA-specific things existed

There was no proxy, no service worker/PWA registration, no `REACT_APP_*`
variables and no custom webpack config. The CRA-specific pieces were:
`react-scripts` scripts, `public/index.html` with `%PUBLIC_URL%`, the
`eslintConfig`/`browserslist` blocks in `package.json`, Jest via
`react-scripts test`, `ajv`/`ajv-keywords` (a common workaround for a CRA
install bug), and the `homepage` field (resolves to base path `/`).

### Changes

- **Scripts**: `start`/`dev` → `vite` (port 3000, same as CRA), `build` →
  `vite build`, `preview`, `test` → `vitest run`, `test:watch`, `lint` →
  `eslint .`, `lighthouse`.
- **`vite.config.js`**:
  - `build.outDir: "build"`, the same folder CRA used, so deployment doesn't
    change.
  - `cssCodeSplit: false` emits a single stylesheet like CRA did. The page
    stylesheets share generic class names, so per-page CSS would make styling
    depend on navigation order.
  - `build.target` matches CRA's former production browserslist.
  - The Vitest config (jsdom) also lives here.
- **`index.html`** moved to the project root (Vite convention). `%PUBLIC_URL%`
  was removed and a module script tag added. The `<head>` content is otherwise
  unchanged.
- **JSX files renamed `.js` → `.jsx`**: Vite only parses JSX in `.jsx`/`.tsx`
  files. Files without JSX keep `.js`. Unused `import React` lines were removed
  (the automatic JSX runtime doesn't need them).
- **Tests**: Jest (inside `react-scripts`) was replaced by **Vitest**. The test
  files are unchanged apart from the rename; the API is Jest-compatible.
  `@testing-library/jest-dom` was upgraded to v6 (it has a Vitest entry) and
  `@testing-library/react` to v16 (fixes the React 18.3 `act` deprecation
  warning). Testing libraries moved to `devDependencies`. A test for closing
  the donation modal with Escape or a backdrop click was added (22 tests).
- **Lint**: standalone ESLint 9 flat config (`eslint.config.js`) with
  `eslint:recommended`, `react`, `react-hooks` and `jsx-a11y` recommended rules.
  This is stricter than CRA's `react-app` preset. Rule settings:
  - `react/prop-types` is off; TypeScript covers props in Phase 4.
  - `fetchpriority` is allowed as a DOM attribute, because React 18 has no
    `fetchPriority` prop.
  - No other rules are disabled, and there are no inline `eslint-disable`
    comments.
  - New jsx-a11y findings were fixed: the donation modal backdrop is now
    `role="presentation"` and the modal closes with Escape; the admin page got
    image alt text and an iframe title; the upload form got label associations.
- **Removed**: `react-scripts`, `ajv`, `ajv-keywords`, and the unused
  `typescript@4` entry (TypeScript comes back in Phase 4). Also the unused
  `components/Modal` component, which I missed in Phase 1.
- **`scripts/lighthouse.mjs`**: a repeatable benchmark (see README).
- **README** rewritten as developer documentation. The original feature
  wish list moved to `docs/FEATURE_IDEAS.md`.

### Regression found and fixed during this phase

Comparing full-page screenshots of the original CRA build with the Vite build
(desktop and mobile; home, about, visitors, donate) showed small height
differences. The cause was in Phase 1: I had moved an `img { display: block }`
rule from `about.css` into the global stylesheet, assuming it applied
site-wide. In fact **all of `about.css` was inside one `/* … */` comment**,
so it never applied. The rule was removed and the dead `about.css` deleted.
After the fix, page heights match the original exactly. The remaining pixel
differences are the re-encoded WebP logo and the improved image alt text,
which only shows because images were blocked during the comparison.

### Verification

| Check | Result |
|---|---|
| `npm ci` (clean, no `--legacy-peer-deps`) | passes |
| `npm run build` | passes in **~6 s** (CRA: ~70 s), output in `build/` |
| `npm test` | 22 passed |
| `npm run lint` | 0 errors, 0 warnings |
| Dev server: every route loaded directly (/, /about, /calendar, /media, /media/:name/:id, /visitors, /donate, /donateCopy) | all 200, content rendered, no console errors (headless Chromium) |
| Production preview: same routes, direct navigation (refresh) | same result; `/donateCopy` redirects to `/donate` |
| Calendar, media, donation pages with mocked API responses | render the data; calendar output is identical to the CRA build |
| `favicon`, `manifest.json`, `robots.txt` served from `public/` | 200 |
| Visual comparison against the original CRA build | identical layout (see above) |

Bundle (gzip): main JS 69.8 kB (Phase 1 CRA: 68.9 kB), single CSS 11.5 kB.
The calendar (39 kB) and About/framer-motion (39 kB) chunks load only on their
pages.

Lighthouse, same first-party-only conditions as above:

| Page | Perf | A11y | BP | SEO | LCP ms | Transfer KB |
|---|---|---|---|---|---|---|
| / | 99 | 95 | 100 | 92 | 862 | 339 |
| /about | 99 | 95 | 100 | 100 | 844 | 379 |
| /calendar | 100 | 100 | 100 | 100 | 775 | 203 |
| /media | 100 | 100 | 100 | 100 | 714 | 168 |
| /visitors | 100 | 100 | 100 | 100 | 512 | 164 |
| /donate | 100 | 100 | 100 | 100 | 608 | 172 |

This is essentially the same as Phase 1. Transfer is about 7 kB higher
because all CSS is now in one file. The bundler switch itself did not
measurably change Lighthouse scores, and I'm not claiming it did.

### Deployment notes / remaining items

- `build/` contents and their relative layout changed (`static/js/…` →
  `assets/…`). If the deploy process references specific paths, update it.
- CRA published `.map` source maps; Vite doesn't by default. Set
  `build.sourcemap: true` if you want them.
- SPA fallback: see README (CloudFront error responses / Amplify rewrite).
- No CRA-specific pieces remain.
