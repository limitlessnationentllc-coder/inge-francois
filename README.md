# INGÉ FRANÇOIS — IngeFrancois.com

A private luxury boutique storefront: cinematic, scroll-driven homepage ("The House of INGÉ: Cherry to Couture"), department and product pages, an INGÉ Concierge intake flow, and a Private Clientele waitlist — built as a headless, Shopify-ready Next.js app.

**Status:** v1 build. Product data is demo/placeholder content (clearly labeled throughout the UI) until a real Shopify store is connected — see [Connecting Shopify](#connecting-shopify) below.

## Art direction — INGÉ SIGNATURE

- **Palette** — primary: near-black noir (`#0B0908`), black cherry (`#4A0E1A`), oxblood (`#5C1220`); secondary: warm ivory (`#F3EAE0`), charcoal (`#201C1B`), chocolate (`#2B1B14`), smoke (`#8D8480`); accent: antique gold (`#C7A768`), used sparingly. Full token list in `src/app/globals.css`.
- **Type** — display: **Fraunces** (variable, optical size + italic — couture-editorial character for headlines, product names, statement copy); body/UI: **Jost** (geometric sans, tracked-out uppercase for labels/nav/buttons). Loaded via `next/font/google` in `src/app/layout.tsx`.
- **Wordmark** — "INGÉ" set in tracked-out Fraunces uppercase, paired with the house emblem (`CherryEmblem`, `src/components/cinematic/CherryEmblem.tsx`): a line-art or gloss-gradient rendering of the three-cherries-and-ribbon signature motif. Used as favicon, nav mark, and recurring "drip" motif that resolves into the wordmark at the end of the cinematic homepage.
- **Motion vocabulary** — GSAP + ScrollTrigger + Lenis. Pinned/scrubbed timeline for the homepage's Act I–II ("The Drip" → "Cherry to Couture"), clip-path editorial reveals for Act III sections, char-split wordmark reveal, `prefers-reduced-motion` static fallback throughout.

## Tech stack

- **Next.js 16** (App Router, TypeScript, React 19) — classic (non–Cache-Components) rendering model.
- **Tailwind CSS v4** (CSS-first `@theme` config in `globals.css`).
- **GSAP + ScrollTrigger + Lenis** for cinematic/scroll-driven motion.
- **Shopify Storefront API** as the intended commerce backend — see below.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs entirely on demo content out of the box — no environment variables are required to develop or preview it.

Useful scripts:

```bash
npm run dev     # local dev server
npm run build   # production build
npm run start   # run a production build locally
npm run lint    # ESLint
```

## Project structure

```
src/
  app/                    routes (App Router) — homepage, departments, product, concierge, etc.
  components/
    cinematic/            Hero (Act I/II), HomeSections (Act III), Reveal, CherryEmblem
    layout/                Nav, Footer, CartProvider/CartDrawer, SmoothScroll (Lenis)
    product/               ProductCard, ProductImage, ProductActions, PlaceholderPlate
    department/            DepartmentTemplate (shared by all 8 department pages)
    forms/                 NewsletterForm, ConciergeForm, WaitlistForm
  lib/
    shopify/               Storefront API client + queries + the swappable data-access layer
    data/                  demo product/department content (DEMO — placeholder only)
    hooks/, utils/, gsap.ts, devVerification.ts
  types/                   canonical Product/Department/Cart types
```

## Connecting Shopify

The entire product/catalog layer is accessed through `src/lib/shopify/index.ts` — no component ever imports demo data or the Storefront API client directly. To go live:

1. In Shopify Admin: **Settings → Apps and sales channels → Develop apps** → create an app → enable the **Storefront API** → generate a Storefront API access token.
2. Copy `.env.example` to `.env.local` and set:
   ```
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-api-token
   ```
3. Tag each product in Shopify with `department:<slug>` (e.g. `department:la-femme`) using the department slugs in `src/lib/data/departments.ts`, plus any of: `New`, `Private Collection`, `Limited`, `Sourced for INGÉ`, `Available by Request`, `Private Client`, `One of One`, `INGÉ Originals`, `concierge-only`, `request-only` — see `src/lib/shopify/queries.ts` for exactly how tags map to the UI.

That's it — `getProductsByDepartment`, `getProductByHandle`, `getFeaturedProducts`, `getNewProducts`, and `searchProducts` all switch from demo data to live Storefront API data automatically, with a console-logged fallback to demo data if a live request ever fails.

**Not yet wired to Shopify:** checkout/payment (the cart page shows a disabled "Coming Soon" checkout button until credentials are set), customer accounts, and order history. These are the natural next integration points once the Storefront API (and, for accounts, the Customer Account API) are connected.

## Dev/verification contract

The cinematic homepage supports `?jump=<scrollY>` (e.g. `/?jump=2400`), which scrolls to that position and force-settles every scrub-driven ScrollTrigger timeline to match — useful for screenshotting or testing any point in the sequence without waiting out the animation. `window.__ready` is set to `true` once fonts are loaded, layout has settled, and (if present) the jump has been applied — poll this from a headless harness instead of guessing a timeout. See `src/lib/devVerification.ts`.

## Accessibility & performance

- Full `prefers-reduced-motion` support: the cinematic homepage hero renders a static, fully-usable single-screen version (same copy, same CTA) instead of the scroll-jacked sequence; all scroll-reveal transitions collapse to instant via a global CSS media query.
- Semantic HTML, labelled icon-only buttons, keyboard-dismissible nav/cart overlays (Escape), visible focus states.
- GSAP animations are transform/opacity-driven for GPU compositing; the homepage's scrub timeline was profiled with per-frame `requestAnimationFrame` delta sampling (p95/max, not average FPS) to catch real jank.

## Deployment (Vercel)

1. Push this repo to GitHub (see below) and import it in Vercel.
2. Set `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, and `NEXT_PUBLIC_SITE_URL` as Vercel environment variables once ready (all optional — the site runs on demo data without them).
3. `next build` / `next start` are the standard Vercel build/output — no custom config required beyond `next.config.ts`.

## Known placeholders

- **Catalog** — `src/lib/data/demo-products.ts` is fictional demo content, visibly labeled "Demo Content" / "Demo Placeholder" throughout the UI. It is not real INGÉ inventory.
- **Product imagery** — demo products render an in-house gradient + line-icon placeholder (`PlaceholderPlate`) instead of photography, so the app has zero third-party image dependencies until real photography/Shopify CDN URLs are connected.
- **Legal pages** (`/legal/privacy`, `/legal/terms`) are marked placeholders pending counsel review.
- **Newsletter/Concierge/Private Clientele forms** post to stub API routes (`src/app/api/*`) that validate and log submissions — see the comment in each route for the real-service integration point.
