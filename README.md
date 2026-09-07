# aarti31h.github.io

Personal portfolio and engineering case studies for **Aarti Hariharno**, Full Stack Software Engineer.

**Live:** https://aarti31h.github.io

---

## Overview

A statically exported Next.js site that presents five years of production engineering work as
case studies rather than as a technology checklist. Each featured project is written up with the
problem, the architecture, the decisions behind it and the measured outcome.

The site is prerendered to plain HTML at build time and served from GitHub Pages — there is no
server, no database and no runtime API.

---

## Architecture

```
 Source (this repo)
        │
        ├── app/            App Router routes, metadata, sitemap, robots
        ├── components/     Presentational + client-interactive components
        ├── lib/content.ts  Single typed source of truth for all site content
        └── scripts/        Build-time image pipeline, headless audit harness
        │
        ▼
 next build  (output: "export")
        │
        ▼
 out/  ──►  GitHub Actions  ──►  GitHub Pages
                                 https://aarti31h.github.io
```

Every fact rendered on the site comes from `lib/content.ts`. Copy is never duplicated across
components, so a change to a metric or a job title happens in exactly one place.

---

## Key features

- **Case study routes** — each project is its own prerendered, deep-linkable page at
  `/work/<slug>/` with its own metadata and BreadcrumbList structured data.
- **Interactive architecture explorer** — hover, tap or keyboard-tab through the layers of a
  typical system to see why each one is there.
- **Scroll reveal and animated counters** — built on a shared IntersectionObserver, with no
  animation library.
- **Progressive enhancement** — content is visible by default and only animates when the page
  has confirmed it can. A failed bundle degrades to a static page, never a blank one.
- **Accessibility** — semantic landmarks, one `h1` per page, visible focus rings, a skip link,
  keyboard-operable diagram, and full `prefers-reduced-motion` support.
- **SEO** — per-route canonical URLs, Open Graph and Twitter cards, generated `sitemap.xml` and
  `robots.txt`, and Person + WebSite JSON-LD.

---

## Technology

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Fonts | Inter + JetBrains Mono, self-hosted via `next/font` |
| Images | `sharp` pipeline producing WebP variants and the OG card |
| CI/CD | GitHub Actions → GitHub Pages |
| Verification | Chrome DevTools Protocol harness (`scripts/audit.mjs`) |

---

## Engineering decisions

### Why no animation library?

The brief called for scroll reveals, staggered text, animated counters, magnetic buttons and
animated diagrams. Framer Motion would add roughly 45 KB gzipped to deliver effects that
`IntersectionObserver` plus CSS transforms provide in about 2 KB. On a site whose argument is
that the author builds efficient systems, shipping a heavyweight runtime for fade-ins would
undercut the message. All animation is CSS; JavaScript only decides *when*.

### Why is content visible by default?

The common pattern — hide everything at `opacity: 0`, reveal with JavaScript — means a single
script failure renders a completely blank portfolio. Here the reveal styles are gated behind a
`data-js` attribute set by a tiny inline script before first paint, with a watchdog that removes
the attribute if React has not hydrated within four seconds. Worst case, the page is static.

### Why static export rather than a server?

Nothing on the site is per-request. Prerendering to HTML removes an entire class of runtime
failure, makes hosting free, and gives search engines complete markup with no JavaScript
execution required.

### Why a plain `<img>` for the portrait?

`output: "export"` disables Next's Image Optimization API, so `next/image` would contribute
client JavaScript without optimising anything. `scripts/build-images.mjs` already emits
exact-size WebP variants (1.8 MB PNG → 47 KB), and the markup carries hand-written
`srcset`/`sizes`.

### Why a shared IntersectionObserver?

The page has ~80 revealed elements that all want identical thresholds. One observer lets the
browser batch callbacks instead of managing 80 separate instances.

---

## Project structure

```
app/
  layout.tsx            Fonts, metadata, JSON-LD, JS bootstrap, chrome
  page.tsx              Home — composes every section
  work/[slug]/page.tsx  Case studies (generateStaticParams)
  sitemap.ts robots.ts  Generated at build time
  icon.svg apple-icon.png
components/             Sections and shared primitives
lib/
  content.ts            All site content, typed
  reveal.ts             Shared IntersectionObserver + reduced-motion helper
scripts/
  build-images.mjs      Portrait variants, OG card, touch icon
  audit.mjs             Headless multi-viewport verification harness
```

---

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build and preview of the exact artifact that gets deployed:

```bash
npm run build        # writes ./out
npx serve out
```

### Other scripts

```bash
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run images       # regenerate WebP variants + OG card from the source photo
```

`npm run images` reads the source photo from `PHOTO_SOURCE` (see `scripts/build-images.mjs`).
Its outputs are committed, so a normal build never needs image processing.

---

## Verification

`scripts/audit.mjs` drives headless Chrome over the DevTools Protocol across mobile, tablet and
desktop viewports. Unlike a screenshot flag it emulates a real device, waits real time so CSS
transitions settle, scrolls the page so every observer fires, and then reports horizontal
overflow, heading structure, unlabelled controls, images missing `alt`, and any reveal left
stuck invisible.

```bash
npm run build && npx serve out &
node scripts/audit.mjs http://127.0.0.1:3000/
```

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which lints, typechecks, builds the
static export and publishes `out/` to GitHub Pages. Repository **Settings → Pages → Source**
must be set to **GitHub Actions**.

`public/.nojekyll` is required: without it GitHub Pages runs Jekyll, which strips the `_next`
directory and breaks every asset.
