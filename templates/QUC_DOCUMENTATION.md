# Quick Urgent Care — Site Documentation

Marketing + patient-conversion site for Quick Urgent Care (Moore + Oklahoma City). Built on the Next.js App Router.

**Live**: `https://quickurgentcareok.com`
**Repo**: `quick-urgent-care/`
**Companion doc**: [`ROUTES.md`](./ROUTES.md) — full URL / route reference

---

## 1. Overview

A single Next.js app that serves ~128 routes: the marketing site, 30 SEO landing pages (city × service), 20 condition detail pages, 3 symptom detail pages, 4 blog posts, comparison pages, hubs, and 6 API routes.

**Primary goals**
- Convert local search intent → walk-in visit or online booking
- Rank for local urgent-care keywords in Moore + OKC
- Answer AI / voice queries via structured `MedicalWebPage` + `Speakable` + FAQ schema
- Give the small clinic staff a codebase they (or an agency) can extend without breaking Next.js

**Non-goals**
- Patient portal / EMR — Clockwise MD handles booking; email + phone handle the rest
- Payment collection at scale — a Stripe form exists (`/pay`) but most billing happens post-visit
- Complex CMS — content lives in `src/lib/*.ts` today; a Sanity migration is on the Month-1 roadmap

---

## 2. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Static generation + edge redirects + built-in image/sitemap/robots tooling |
| Language | **TypeScript** (strict) | Types are the interface between content authors and pages |
| Styling | **Tailwind CSS** + custom CSS variables + Radix UI primitives | Utility-first, theme via CSS custom properties |
| Icons | **lucide-react** | 1 dep, tree-shaken |
| Forms | **react-hook-form** + **zod** | Booking / contact / careers forms |
| Email | **Resend** | Transactional email for `/api/book` |
| Payments | **Stripe** | Self-pay path (`/pay`) |
| Analytics | GTM, GA4, Meta Pixel, Microsoft Clarity, CallRail DNI | Env-gated, only fire when configured |
| Testing | **Vitest** + **jsdom** + Testing Library | Component + unit tests |
| Hosting | **Vercel** | Static + edge + preview URLs |

Full deps list: `package.json`.

---

## 3. Getting started

```bash
# Install
npm install

# Dev server (default localhost:3000)
npm run dev

# Type-check (no output = pass)
npx tsc --noEmit

# Lint
npm run lint

# Production build (static + server)
npm run build

# Serve the production build
npm run start
```

**Requires**: Node.js 18.17+ (Node 20 recommended).

---

## 4. Directory layout

```
quick-urgent-care/
├── src/
│   ├── app/                 # Next.js App Router — every route lives here
│   │   ├── layout.tsx       # Root layout: schema, analytics, providers
│   │   ├── page.tsx         # Home
│   │   ├── [slug]/          # Dynamic SEO landings (city-service, regional)
│   │   ├── services/
│   │   │   ├── page.tsx     # /services index
│   │   │   └── [slug]/      # Service detail
│   │   ├── locations/[slug]/
│   │   ├── blog/[slug]/
│   │   ├── symptoms/[slug]/
│   │   ├── conditions/[slug]/
│   │   ├── api/             # Route handlers (POST endpoints)
│   │   ├── sitemap.ts       # Auto-generated sitemap.xml
│   │   ├── robots.ts        # Auto-generated robots.txt
│   │   ├── feed.xml/        # RSS feed route
│   │   └── globals.css      # Tailwind base + custom utilities
│   ├── components/          # Shared React components
│   │   ├── Layout.tsx       # <Layout>, <Nav>, <Footer>, <StickyBar>
│   │   ├── Breadcrumbs.tsx  # Renders trail + emits BreadcrumbList JSON-LD
│   │   ├── Editorial.tsx    # <Eyebrow>, <SectionHeader>, <GeoChip>
│   │   ├── ProviderCard.tsx
│   │   ├── ReviewedBy.tsx   # E-E-A-T "reviewed by PA-C" byline
│   │   ├── WaitTimeCard.tsx # Live wait time (hero)
│   │   └── ui/              # Radix-based primitives (buttons, input, etc.)
│   └── lib/                 # Content data + shared utilities
│       ├── clinics.ts       # Two Clinic records + SITE_URL/NAME/PHONE
│       ├── service-pages.ts # ServicePage[] — 8 entries
│       ├── seo-landings.ts  # SeoLanding[] — 34 entries
│       ├── blog-posts.ts    # BlogPost[] — 4 entries
│       ├── symptoms.ts      # SymptomPage[] — 3 entries
│       ├── conditions.ts    # ConditionPage[] — 20 entries
│       ├── schema.ts        # JSON-LD helpers
│       ├── track.ts         # Analytics event helper
│       └── utils.ts         # `cn` (tailwind class merge)
├── public/
│   ├── assets/              # Photos referenced by pages
│   ├── forms/               # Patient PDF forms (drop-in ready)
│   ├── logo.png             # Brand mark
│   └── icon.png             # Next.js auto-favicon
├── templates/               # Historical assets (WP export, old images)
├── ROUTES.md                # Master route reference
├── DOCUMENTATION.md         # This file
├── next.config.mjs          # Redirects + image whitelist
└── package.json
```

---

## 5. Content model

All content lives in `src/lib/*.ts` as typed data. Each dynamic route reads its data lib, calls `generateStaticParams`, and renders. **Adding content = editing a `.ts` file** — no CMS.

| Data lib | Powers | Fields |
|---|---|---|
| `clinics.ts` | Every clinic reference | `Clinic` — id, city, address, phone, geo, `mapsUrl`, `bookUrl`, slug |
| `service-pages.ts` | `/services/[slug]` | `ServicePage` — slug, hero, intro, `tldr`, `atGlance`, `citations`, highlights, faqs |
| `seo-landings.ts` | `/[slug]` (root-level city-service landings) | `SeoLanding` — slug, `h1`, intent, `serviceFocus`, clinic, `tldr`, `neighborhoods`, `longCopy`, `servingCity` (regional) |
| `blog-posts.ts` | `/blog/[slug]` | `BlogPost` — slug, title, date, category, tags, author, image, body (markdown) |
| `symptoms.ts` | `/symptoms/[slug]` | `SymptomPage` — slug, tldr, causes, ER triggers, related, faqs |
| `conditions.ts` | `/conditions/[slug]` | `ConditionPage` — slug, category, tldr, overview, symptoms, weTreat, ER triggers, related, faqs |

**Roadmap**: migrate all of the above to Sanity (Month-1 Phase 4). Types stay the same; the fetch layer swaps from `import` → `sanityClient.fetch`.

---

## 6. Common tasks

### Add a new SEO landing page

1. Open `src/lib/seo-landings.ts`.
2. Append a new `SeoLanding` entry. Slug convention is **location-first**: `okc-flu-shot`, `moore-x-ray`.
3. Add the slug to `SEO_LANDING_SLUGS` in `src/app/sitemap.ts`.
4. If replacing an old URL, add a 301 redirect in `next.config.mjs` under `redirects()`.
5. Rebuild — the route is statically generated automatically.

Example:
```ts
{
  slug: "okc-tetanus-shot",
  metaTitle: "Walk-In Tetanus Shot in Oklahoma City — Quick Urgent Care",
  metaDescription: "…",
  h1: "Walk-in tetanus shots in Oklahoma City.",
  intent: "service",
  serviceFocus: "vaccinations",
  clinic: okc,
  tldr: "Walk in for a Tdap booster…",
  longCopy: ["…", "…"],
}
```

### Add a blog post

1. Add a new `BlogPost` to `src/lib/blog-posts.ts`.
2. Body uses lightweight markdown: `## ` for H2, `- ` for bullets, `**bold**`.
3. Drop the hero image in `public/assets/`, reference as `/assets/foo.jpg` in the `image` field.
4. Sitemap + RSS feed pick it up automatically.

### Add a symptom or condition page

1. Add an entry to `src/lib/symptoms.ts` or `src/lib/conditions.ts`.
2. Include `relatedSymptoms` / `relatedServices` to wire it into the topic cluster.
3. Sitemap picks it up.

### Add a new clinic

1. Extend `CLINICS` in `src/lib/clinics.ts` — id, address, geo, phone, `bookUrl`.
2. `<Footer>` NAP, sitemap `MedicalClinic` graph, and `/locations` grid all read from that array.
3. Add a Moore-style or OKC-style SEO landing set for the new city.

### Rename a slug (safely)

1. Update the slug in its data lib.
2. Add the OLD path → new path in `next.config.mjs` `redirects()` with `permanent: true`.
3. Search-engine equity is preserved via the 301.

### Update the "reviewed by" clinician

Change the defaults in `src/components/ReviewedBy.tsx` (`name`, `credentials`) and the `reviewedBy` JSON-LD blocks in `services/[slug]/page.tsx`, `conditions/[slug]/page.tsx`, `symptoms/[slug]/page.tsx`, `[slug]/page.tsx`.

### Change a phone number

Update `phone` in `src/lib/clinics.ts` — `<Nav>`, `<Footer>`, JSON-LD, sticky-bar CTAs all pull from that single record.

### Add / remove a nav link

- Header — edit the `NAV` array in `src/components/Layout.tsx`.
- Footer — edit the `Visit` / `Resources` / `Contact` column lists in the same file.
- Not-found page quick-links — `src/app/not-found.tsx` (`QUICK_LINKS`).

---

## 7. Styling & design system

Tailwind is the primary styling layer. The theme is defined via CSS custom properties in `src/app/globals.css`.

**Custom utility classes**
- `surface-lowest` / `surface-low` / `surface-bright` — layered background tones
- `gradient-primary` / `gradient-editorial` / `gradient-tertiary` — hero backgrounds
- `lift-soft` / `lift-ambient` — box-shadow elevation
- `card-interactive` — hover lift + fade
- `label-eyebrow` — small uppercase label
- `speakable` — marks the AI-answer TL;DR block (paired with `data-speakable`)
- `ken-burns` — slow auto-zoom animation for hero photos
- `pulse-dot` — live indicator (green dot with ring)

**Fonts** live in `src/app/fonts/` and load via `next/font/local`.

**Radix UI** primitives are wrapped in `src/components/ui/*` (buttons, dialog, tooltip, etc.).

---

## 8. Analytics & tracking

Every analytics script is env-gated in `src/app/layout.tsx`. If the env var is unset, the script simply doesn't render.

| Env var | Purpose |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity |
| `NEXT_PUBLIC_CALLRAIL_ACCOUNT` + `NEXT_PUBLIC_CALLRAIL_SCRIPT` | CallRail dynamic number insertion |

**Event API** — call `track(eventName, params)` from `src/lib/track.ts` to push a `dataLayer` event. Wire GTM triggers off these.

Standard events pushed:
- `tel_click` — every clickable phone number, includes `clinic` + `location` params
- Booking-outbound clicks to Clockwise MD (attach a trigger in GTM)

---

## 9. SEO & AI-answer stack

Applied globally + per page. Highlights:

**Root layout (`layout.tsx`)** — every route inherits:
- `MedicalOrganization` w/ `hasCredential`, `sameAs` (FB + TikTok), `aggregateRating`, `department[]` per clinic
- `WebSite` w/ `SearchAction`
- `Speakable` — targets `h1`, `.speakable`, `[data-speakable]`
- Optional GTM / Meta Pixel / Clarity / CallRail scripts

**Per clinical page (services / landings / symptoms / conditions)**:
- `.speakable` TL;DR direct-answer block above the fold
- `MedicalWebPage` JSON-LD w/ `reviewedBy: Iftikhar Sandhu, PA-C` + `lastReviewed`
- `<ReviewedBy />` byline component (rendered)
- 4.9★ `AggregateRating`

**Per service page**:
- Extended `MedicalProcedure` (bodyLocation, preparation, howPerformed)
- "At a glance" table (cost, wait, insurance, ages)
- Citation footer (CDC, NIH, AAFP, SAMHSA, FMCSA)
- `FAQPage`

**Per blog post**:
- Full `Article` — author, image, `mainEntityOfPage`, keywords, publisher logo

**Header phone auto-scoping**: `<Nav>` reads `usePathname()`. Slug prefix `moore-` → shows only Moore phone; `okc-` → OKC only; otherwise both.

---

## 10. Redirects

All 301 redirects live in `next.config.mjs` under `redirects()`. ~35 entries covering:
- Legacy WordPress blog slugs → new `/blog/*`
- Legacy WordPress service pages → `/services/*`
- Legacy WordPress location pages → `/locations/*`
- Old SEO-landing slug variants → current location-first canonical
- Retired `/lp/*` ad-landing prefix
- Legacy WP menu remnants

Full list in [`ROUTES.md`](./ROUTES.md#redirects).

---

## 11. Environment variables

Set on Vercel per environment (production, preview, development). Copy `.env.local` for local dev.

| Var | Where used | Required? |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | Root layout | Recommended prod |
| `NEXT_PUBLIC_META_PIXEL_ID` | Root layout | Optional |
| `NEXT_PUBLIC_CLARITY_ID` | Root layout | Optional |
| `NEXT_PUBLIC_CALLRAIL_ACCOUNT` / `_SCRIPT` | Root layout | Optional |
| `CONTACT_WEBHOOK_URL` | `/api/contact` | Optional (fallback: server log) |
| `CAREERS_WEBHOOK_URL` | `/api/careers` | Optional (fallback: server log) |
| `RESEND_API_KEY` | `/api/book`, `/api/send-receipt` | Required for booking email |
| `BOOKING_TO_EMAIL` | `/api/book` | Required if `RESEND_API_KEY` set |
| `BOOKING_FROM_EMAIL` | `/api/book` | Required if `RESEND_API_KEY` set |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` + `STRIPE_SECRET_KEY` | `/pay`, `/api/create-payment-intent` | Required for payment page |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` + `SANITY_API_TOKEN` | (Reserved for Phase 4 CMS) | Not yet |

---

## 12. Deployment

**Production**: Vercel, auto-deploys on push to `master`.

**Preview**: every PR gets its own preview URL. Test on the preview before merging.

**Build steps**:
1. `next build` runs `generateStaticParams` for every dynamic route → generates static HTML
2. Sitemap + robots + RSS feed regenerated
3. All routes deployed as static assets on Vercel edge

**Post-deploy checklist**:
- Hit the deployed URL, verify homepage + at least one landing renders
- Check `sitemap.xml` returns 200
- Validate a rich-results URL at [search.google.com/test/rich-results](https://search.google.com/test/rich-results/)
- Submit updated sitemap to Google Search Console (once)

---

## 13. Testing

```bash
# Type-check (fastest gate — no output = pass)
npx tsc --noEmit

# Lint
npm run lint

# Vitest (component + unit)
npm test              # or vitest run
```

Vitest is configured with jsdom + Testing Library. Add specs alongside components as `Component.test.tsx`.

---

## 14. Conventions & style rules

**Slug pattern** (SEO landings): `<location>-<service>` — e.g. `okc-walk-in-clinic`, `moore-drug-testing`. "clinic" only when natural.

**Copy tone**: plain English, second-person, clinic-first (not "we"-first). Avoid medical jargon in H1s. FAQ answers should read aloud cleanly for voice search.

**Every clinical page** must include:
- H1 with clear location or intent
- `.speakable` TL;DR block right below or at the top
- `<ReviewedBy />` byline
- At least one CTA linking to `/book`

**Redirects**: never delete a URL without adding a 301. Slug changes require both an old→new redirect and a sitemap update.

**No `<img>` tags in new work** — use `next/image`. Existing gallery images grandfathered.

**JSON-LD** always injected via `<script type="application/ld+json" dangerouslySetInnerHTML>`. Use helpers in `src/lib/schema.ts` where possible.

**Component naming**: PascalCase files that export a single default component (`Layout.tsx` → `<Layout>`), or PascalCase files that export multiple related components (`Editorial.tsx` → `<Eyebrow>`, `<SectionHeader>`).

**Server vs client components**: default to server. Only add `"use client"` when the component needs hooks (`useState`, `useEffect`, `usePathname`) or event handlers.

---

## 15. Ownership map

| Concern | File / place |
|---|---|
| Clinic addresses, phones, hours | `src/lib/clinics.ts` |
| Header nav labels | `src/components/Layout.tsx` (`NAV` array) |
| Footer link columns | `src/components/Layout.tsx` (in `<Footer>`) |
| Homepage hero copy | `src/app/page.tsx` |
| Service page copy | `src/lib/service-pages.ts` |
| SEO landing copy | `src/lib/seo-landings.ts` |
| Blog posts | `src/lib/blog-posts.ts` |
| Symptom / condition content | `src/lib/symptoms.ts`, `src/lib/conditions.ts` |
| Site-wide schema | `src/app/layout.tsx` |
| Redirects | `next.config.mjs` |
| Provider list | `src/app/providers/page.tsx` (inline `PROVIDERS`) |
| Reviews shown on `/reviews` | `src/app/reviews/page.tsx` (inline `REVIEWS`) |
| Insurance list | `src/app/insurance/page.tsx` + `src/app/plan-your-visit/page.tsx` |

---

## 16. FAQ for future contributors

**Q: How do I add a route without touching the sitemap?**
A: You can't — sitemaps must be authoritative. Add the path in `src/app/sitemap.ts`.

**Q: The build fails on `next/image` remote host.**
A: Add the hostname to `images.remotePatterns` in `next.config.mjs`.

**Q: A schema helper isn't matching what I need.**
A: Extend `src/lib/schema.ts`. Keep helpers small and composable — one helper per `@type`.

**Q: Why is `<Layout>` imported into every page instead of using a real layout?**
A: Historical carry-over from a router migration. `<Layout>` wraps `<Nav>`, `<main>`, `<Footer>`, `<StickyBar>`. Long-term, migrate to `app/layout.tsx` slots. Meanwhile, don't remove `<Layout>` from a page — it will lose nav + footer.

**Q: Why are some pages `"use client"` when they only render static content?**
A: They use `useState`/`useEffect` for animations (carousel, reveal-up, floating card). Marking `"use client"` is required. Convert to server components only if you strip the interactivity.

**Q: Where do I add tracking for a new CTA?**
A: Import `track` from `src/lib/track.ts`, add an `onClick={() => track("my_event", { location: "hero" })}`, then configure the GTM trigger against that dataLayer event.

**Q: How do I mark a page as `noindex`?**
A: Add `robots: { index: false, follow: false }` to the page's `metadata` export (see `src/app/thank-you/page.tsx` for an example).

---

## 17. Roadmap (Month-1 alignment)

See the 30-task Month-1 setup plan for phase details. Site-side items:

- **Phase 4** — Sanity CMS migration. Replace `src/lib/*.ts` imports with Sanity fetches. Types stay stable.
- **Phase 7** — Google Ads campaign build. Ad landing pages already noindex-friendly (drop-in on `/[slug]` template).
- **Phase 8** — 5 n8n agents. Review-response agent will hit GBP; content agent will PR into `blog-posts.ts`.
- **Phase 9** — QA + baseline benchmark before switching DNS from old WP host.

---

## 18. Contacts

- **Client** — Iftikhar Sandhu, PA-C · `iftikharsandhu1@gmail.com`
- **Studio** — Sapiens Station · `sapiensstation.com`

For questions on the codebase, open an issue or ping the studio.
