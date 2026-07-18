# Food Port POS — Frontend Documentation

## Overview

Next.js 16 (App Router) + React 19 kiosk/portal app. Three independent surfaces sharing one codebase:

- **Customer ordering kiosk** — `/order/*`, no auth, session-based. Table is **optional** — orders are identified purely by `token_number` (daily sequence, shown to customer for pickup); a table QR scan just pre-fills `?table=` as a convenience, walk-up/counter orders send no table at all.
- **Vendor portal** — `/vendor/*`, staff login (email/password or 4-digit PIN).
- **Admin portal** — `/admin/*`, admin login.
- **Public display board** — `/display`, standalone, no auth, no shared layout.

Backend API docs: [../backend/API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md).

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.2.7, App Router, React 19.2.4 |
| Styling | Tailwind CSS v4 (CSS-first config, no `tailwind.config.*` — see `app/globals.css` `@theme inline`) |
| State | Zustand v5 (+ `persist` middleware → localStorage) |
| Animation | Framer Motion, `lottie-react` (present, no confirmed usage) |
| Realtime | `socket.io-client` (KDS only) |
| Storage/media | `@supabase/supabase-js` (separate from main auth — used for file/image upload in vendor menu/settings) |
| Data fetching | Hand-rolled `fetch` wrapper (`lib/api.ts`) — no react-query/SWR |
| Forms | Hand-rolled controlled inputs — no react-hook-form/zod |
| Components | No shadcn/Radix — custom `components/ui` primitives |

No `middleware.ts` exists. Route protection is client-side only (see [Auth flow](#auth-flow)) — brief flash of protected layout possible before redirect.

## Scripts

```bash
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # eslint
```

## Environment variables

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend base URL. Default fallback `http://localhost:3001/api` baked into `lib/api.ts` and `hooks/useKdsSocket.ts` if unset. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (storage/uploads) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

See `.env.local.example`.

## Config files

- `next.config.ts` — security headers (HSTS, X-Frame-Options, CSP allowing `*.supabase.co/.in`, `wss://*.supabase.co`, `localhost:*` for connect-src), `images.remotePatterns` for Supabase-hosted images.
- `app/globals.css` — Tailwind v4 `@theme inline` block. Light mint theme: `brand-bg #F4F7F5` (canvas), `brand-card #FFFFFF` (surface), `brand-orange #58D0A2` (primary/mint — legacy token name, not actually orange), `brand-white #15181A` (primary ink text — legacy name, inverted meaning from the old dark theme), plus extended semantic tokens `brand-border`, `brand-primary-hover`, `brand-primary-light`, `brand-success`, `brand-danger(-light)`, `brand-info`. 10 `booth-N` colors, 3 `kds-*` status colors unchanged. Fonts: **Poppins + Inter only** (`--font-heading`/`--font-body` default Poppins; `--font-mono` maps to Inter, not a real monospace font — kept as a variable name for the ~150 existing `font-mono` call sites, not because DM Mono is still loaded). Font is switchable at runtime via `[data-font="inter"]` on `<html>`, set by `components/ui/FontProvider.tsx` reading `useUIStore().font`. Also defines `.card-interactive` (colorful border + soft shadow on hover, color driven by `--vc-border`/`--vc-shadow` custom properties set per-instance — see `VendorCard.tsx`) and `@keyframes credit-gradient` (the animated footer credit).
- `public/manifest.json` + `public/sw.js` — PWA, service worker registered in root layout via `next/script`.
- Root layout also renders a fixed bottom-right "made with ♥ by Sapiens Station" credit pill (animated rainbow gradient, links to sapiensstation.com) — sitewide, unrelated to app auth/theme, don't remove without asking.

---

## Routing map

| Path | File | Type | Purpose |
|---|---|---|---|
| `/` | `app/page.tsx` | server | Redirects → `/order` |
| `/order` | `app/order/page.tsx` | client | Kiosk landing; reads optional `?table=`, creates session (`POST /sessions`, table_id omitted if absent) — shows "Walk-up order" when no table param |
| `/order/*` | `app/order/layout.tsx` | client layout | Customer chrome: header, cart bar, 90s idle-timeout overlay (10s countdown → clear cart, redirect), accessibility toggle |
| `/order/vendors` | `app/order/vendors/page.tsx` | client | Browse active vendors (`GET /vendors?status=active`) as a `VendorCard` grid (`mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4`) |
| `/order/vendors/[vendorId]/menu` | `.../menu/page.tsx` | client, dynamic | Vendor menu, add items/modifiers to cart |
| `/order/cart` | `app/order/cart/page.tsx` | client | Cart review, checkout (`POST /orders`) |
| `/order/confirmation/[orderId]` | `.../confirmation/[orderId]/page.tsx` | client, dynamic | Post-order confirmation + pickup token |
| `/order/track/[orderId]` | `.../track/[orderId]/page.tsx` | client, dynamic | Live status polling (`GET /orders/:id/status`) |
| `/order/lookup` | `app/order/lookup/page.tsx` | client | Look up order by token (`GET /orders/by-token/:num`) → redirect to track |
| `/vendor/*` | `app/vendor/layout.tsx` | client layout | Sidebar nav, online/offline toggle, auth guard |
| `/vendor/login` | `app/vendor/login/page.tsx` | client | Email/password or 4-digit PIN login (tabs) |
| `/vendor/kitchen` | `app/vendor/kitchen/page.tsx` | client | KDS board, realtime via `useKdsSocket` |
| `/vendor/dashboard` | `app/vendor/dashboard/page.tsx` | client | Vendor overview stats |
| `/vendor/menu` | `app/vendor/menu/page.tsx` | client | Menu/category/modifier CRUD, Supabase image upload |
| `/vendor/orders` | `app/vendor/orders/page.tsx` | client | Paginated order history/detail |
| `/vendor/reports` | `app/vendor/reports/page.tsx` | client | Sales summary, peak hours, top items |
| `/vendor/operations` | `app/vendor/operations/page.tsx` | client | Feedback + transactions |
| `/vendor/payout` | `app/vendor/payout/page.tsx` | client | Payout summary |
| `/vendor/settings` | `app/vendor/settings/page.tsx` | client | Profile/settings, staff PIN management |
| `/admin` | `app/admin/page.tsx` | server | Redirects → `/admin/dashboard` |
| `/admin/*` | `app/admin/layout.tsx` | client layout | Sidebar nav, auth guard |
| `/admin/login` | `app/admin/login/page.tsx` | client | Email/password login |
| `/admin/dashboard` | `app/admin/dashboard/page.tsx` | client | Overview stats, revenue chart, live orders, vendor leaderboard |
| `/admin/orders` | `app/admin/orders/page.tsx` | client | All-orders management, cancel |
| `/admin/vendors` | `app/admin/vendors/page.tsx` | client | Vendor list CRUD, status toggle — same `VendorCard` component as customer browse, with a `footer` slot for status badge/revenue/orders/staff stats + Detail/Edit/Staff/Suspend action buttons |
| `/admin/vendors/[vendorId]` | `.../vendors/[vendorId]/page.tsx` | client, dynamic | Vendor detail, staff management |
| `/admin/finance` | `app/admin/finance/page.tsx` | client | Cash log, daily summary, revenue by vendor |
| `/admin/analytics` | `app/admin/analytics/page.tsx` | client | Revenue trends, peak hours, prep times, top items, by-cuisine |
| `/admin/promotions` | `app/admin/promotions/page.tsx` | client | Promo CRUD, toggle, stats |
| `/admin/audit` | `app/admin/audit/page.tsx` | client | Audit log viewer |
| `/admin/users` | `app/admin/users/page.tsx` | client | Admin/staff user management. `super_admin` is deliberately excluded from the role filter chips and the create/edit role dropdown — and the backend (`AdminService.getUsers`) hard-excludes `role: 'super_admin'` from the list query regardless of filter, so a super_admin account never appears here even via direct API call. |
| `/admin/settings` | `app/admin/settings/page.tsx` | client | System settings (backend restricts write to `super_admin`) |
| `/display` | `app/display/page.tsx` | client, standalone | Public "preparing/ready" board (`GET /display/board`), no shared layout, no auth |

Root layout (`app/layout.tsx`): fonts, metadata, PWA manifest, service worker registration, global `<ToastContainer />`.

---

## State management (`frontend/store`) — Zustand v5 + `persist`

| Store | Persist key | Holds |
|---|---|---|
| `authStore.ts` (`useAuthStore`) | `fv-auth` | Vendor session: `user {id,email,full_name?,role,vendor_id}`, `token`, `login()`, `logout()`, `isAuthenticated()`. `full_name` added so the vendor sidebar/dashboard can greet the logged-in person by name instead of showing only their email — populated from backend `formatUser()` on email login, or the staff PIN `label` on PIN login. |
| `adminAuthStore.ts` (`useAdminAuthStore`) | `fv-admin-auth` | Admin session: `user {id,email,role,full_name}`, `token`, same shape |
| `cartStore.ts` (`useCartStore`) | `fv-cart` | `items: CartItem[]`, `sessionId`, `tableId: string \| null`, `tableNumber: string \| null` (both nullable — table is optional); derived `itemCount()`, `subtotal()`, `tax()` (8.25% `TAX_RATE`), `total()`, `itemsByVendor()`. Item dedup key: `menuItemId::sortedModifierIds::specialInstructions` |
| `uiStore.ts` (`useUIStore`) | `ui-prefs` (partial: `isKDSMuted`, `kdsVolume`, `font`) | Global `toasts[]` (`addToast`/`removeToast`, auto-dismiss 4s), `isKDSMuted`, `kdsVolume`, `font: 'poppins' \| 'inter'` + `setFont()` (drives `[data-font]` on `<html>` via `FontProvider.tsx`; switcher UI lives in Admin → Settings → Appearance) |

No Redux/Context — Zustand only.

⚠️ **Both auth stores write the same `localStorage['fv_token']` key** (via shared `setToken`/`clearToken` in `lib/api.ts`). If a vendor session and admin session are both logged in in one browser, the last login wins for the actual bearer token sent — even though each store's own `user` field stays separately persisted. Don't assume vendor and admin sessions can coexist safely in one browser profile.

---

## API integration layer

### `frontend/lib/api.ts`

Hand-rolled fetch wrapper, no axios/react-query/SWR.

- `API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'`
- Token: `localStorage['fv_token']`, SSR-safe (`typeof window === 'undefined'` guard)
- Auth header added automatically when token present: `Authorization: Bearer <token>`
- Exports: `apiFetch<T>`, `apiPost<T>`, `apiPatch<T>`, `apiPut<T>`, `apiDelete<T>`, `apiFetchPaginated<T>` (returns `{ data, meta: PaginationMeta }`)
- Error handling: expects backend envelope `{success, data, error: {message}}`; throws `Error(error?.message ?? 'API error')` on `!res.ok || !success`. No retry, no interceptors, **no automatic 401 → login redirect** — each layout does its own `isAuthenticated()` check instead. Errors are caught per-page, typically surfaced via `useUIStore().addToast`.

### `frontend/lib/supabase.ts`

Separate `@supabase/supabase-js` client. Used directly in `/vendor/menu` and `/vendor/settings` for file/image uploads — not general API traffic.

### Hooks (`frontend/hooks`)

Only one custom hook exists — no `useOrders`/`useAuth`/etc. All other data fetching is inline `useEffect` + `useState` per page.

- **`useKdsSocket.ts`** — wraps `socket.io-client`, connects to `${API_URL without /api}/kds` namespace with `query: {vendor_id}`, listens for `new_order` / `order_update`. Used only in `/vendor/kitchen`.

### Endpoints referenced (grouped, cross-check against [backend/API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md))

- **Auth**: `POST /auth/login`, `POST /auth/pin-login`
- **Public/customer**: `GET /vendors?status=active`, `GET /vendors/:id/menu`, `GET /menu-items/:id`, `POST /orders`, `GET /orders/:id/status`, `GET /orders/by-token/:num`, `POST /orders/:id/rate`, `POST /promos/validate`, `GET /display/board`
- **Vendor**: `/vendor/dashboard`, `/vendor/menu`, `/vendor/categories(/:id, /:id/bulk-availability)`, `/vendor/menu-items(/:id, /:id/availability, /:id/duplicate, modifier-group links)`, `/vendor/modifier-groups(/:id, /:id/modifiers/:id)`, `/vendor/orders(?paginated, /:id)`, `/vendor/status`, `/vendor/settings`, `/vendor/staff-pins(/:id, /:id/toggle)`, `/vendor/payout/summary`, `/vendor/revenue/weekly`, `/vendor/reports/sales|peak-hours|top-items`, `/vendor/operations/feedback(?month, /admin/feedback, /admin/feedback/:id)`, `/vendor/operations/transactions(/:id)`
- **KDS**: `GET /kds/orders`, `GET /kds/queue-stats`, `PATCH` item status transitions
- **Admin**: `/admin/overview`, `/admin/orders(?params, /:id, /:id/cancel, /live)`, `/admin/vendors(?params, /:id, /:id/status, /:id/detail, /:id/staff, /:id/staff/:userId)`, `/admin/finance/cash-log|daily|by-vendor`, `/admin/analytics/revenue|vendors|by-cuisine|peak-hours|prep-times|top-items`, `/admin/promotions(?params, /:id, /:id/toggle, /:id/stats)`, `/admin/audit`, `/admin/users(?qs, /:id)`, `/admin/settings`

Frontend usage matches current backend inventory — no orphaned calls found to endpoints that don't exist.

---

## Component inventory

`components/admin`, `components/customer`, `components/display`, `components/vendor`, and `frontend/animations` are **empty scaffolding directories** — every page currently builds UI inline instead of extracting into these folders.

`components/ui/` (only populated directory):

| File | Purpose |
|---|---|
| `Badge.tsx` | Pill/label, optional custom `color` (booth colors, dietary tags, status) |
| `Button.tsx` | `forwardRef` button, variants (`primary/secondary/ghost/danger`), sizes (`sm/md/lg`), built-in loading spinner |
| `FontProvider.tsx` | Client-only, renders nothing — sets `data-font` attribute on `<html>` from `useUIStore().font` so the Poppins/Inter CSS var swap in `globals.css` takes effect. Mounted once in root layout. |
| `GlassCard.tsx` | Frosted-glass container div |
| `Modal.tsx` | Framer-motion dialog, Esc-to-close, body-scroll lock, sizes `sm/md/lg/xl` |
| `PageTransition.tsx` | Framer-motion page-level fade/slide wrapper |
| `Spinner.tsx` | Animated SVG spinner, size variants |
| `Toast.tsx` (`ToastContainer`) | Reads `useUIStore().toasts`, renders stacked animated notifications; mounted once in root layout |
| `VendorCard.tsx` | Flat card used for every "pick/browse a vendor" grid (currently `/order/vendors` and `/admin/vendors`). Props: `name`, `cuisine`, `isOpen` (rendering gated behind `SHOW_OPEN_BADGE = false` const — intentionally hidden, not deleted, per product decision), `boothColor` (drives the icon-chip tint, the bottom accent bar, and the hover border/shadow color via inline `--vc-border`/`--vc-shadow` CSS vars + the global `.card-interactive` rule), optional `onClick` (renders the whole card as a `<button>` for the customer-facing clickable case) and optional `footer` (admin-only stats/actions slot). No photo, no heart/favorite icon, no visible booth number or prep time — all removed per explicit product feedback. Fixed-height text block (`min-h-[76px]` + `line-clamp-2` on the name) keeps every card the same height regardless of title length. |

If extracting shared UI out of the per-role pages in the future, these empty component folders are the intended destination — not currently used.

---

## Types (`frontend/types/index.ts`)

Single shared file, no per-domain split:

- **Menu**: `Vendor`, `MenuCategory`, `MenuItem`, `ModifierGroup`, `Modifier`
- **Cart/order**: `CartItem`, `OrderItem`, `Order`, `OrderStatus` (`pending|confirmed|partially_ready|ready|completed|cancelled`), `OrderItemStatus` (`pending|accepted|preparing|ready|completed|rejected`)
- **KDS**: `KDSOrder` (`table_number: string | null` — table is optional, KDS/display show token-only when absent)
- **Session**: `Session` (`table_id`/`table_number` both `string | null` — table is optional)
- **UI**: `Toast`
- **Display board**: `DisplayBoardVendor`
- **Admin** (marked "Phase 3" in a comment banner): `AdminOverview`, `AdminVendor`, `AdminOrder`, `AdminOrderItem`, `Promotion`, `CashLog`, `AuditLog`, `RevenuePoint`, `PeakHourPoint`

Many pages define page-scoped interfaces inline instead (`AuthResponse`, `PinAuthResponse`, `SystemSettings`, `DashboardData`, etc.) — not in the shared file. Prefer promoting a type here only once it's reused across 2+ files.

---

## Auth flow

Two fully separate, parallel systems — no unified role dispatcher. Customer ("order") flow has **no auth at all**, it's a kiosk/table-session flow keyed by `sessionId`/`tableId` in `cartStore`.

### Vendor auth (`useAuthStore`, key `fv-auth`)

- Login at `/vendor/login`, two tabs:
  - Email/password → `POST /auth/login` → `{access_token, user:{id,email,full_name,role,vendor_id}}`
  - Staff PIN (numeric keypad) → `POST /auth/pin-login` `{vendor_id, pin}` → `{access_token, staff:{pin_id,vendor_id,vendor_name,role,label}}`, mapped into the same `AuthUser` shape with `full_name: label`
- On success: `login(token,user)` → Zustand store + `setToken()` (localStorage) → `router.replace('/vendor/kitchen')`
- Guard: `app/vendor/layout.tsx` `useEffect` checks `isAuthenticated()`; renders `null` while unauthenticated, redirects to `/vendor/login` if not on it already (client-only, no SSR protection)
- `user.full_name` (falls back to `user.email` if absent) is shown in the vendor sidebar header and as a "Welcome back, {name}" line under the Dashboard heading — added because vendors previously only saw their raw email, never their name, after logging in.

### Admin auth (`useAdminAuthStore`, key `fv-admin-auth`)

- Login at `/admin/login` → `POST /auth/login` → `{access_token, user:{id,email,role,full_name}}`
- Guard: `app/admin/layout.tsx`, same pattern; also re-applies `setToken()` on route change when `token` present, to keep the shared `fv_token` localStorage key in sync

### Logout

Each layout's sign-out button calls its store's `logout()` (clears token + user) then navigates back to that section's login page.

---

## Known issues / TODOs

- **Table is optional, token is the real identity** — `Session.table_id` and `Order.table_id` are both nullable end to end (schema, DTOs, services). A table QR scan is just a convenience pre-fill of `?table=` on `/order`; walk-up/counter orders send no table at all and are tracked purely by `token_number`. Anywhere in the UI that shows a table number must null-check it (`?? '—'` or a conditional render) — several spots (`admin/orders`, `vendor/kitchen`, `vendor/orders`) already do this correctly; don't regress it if touching those pages.
- **No `middleware.ts`** — route guards are client-side only, in `useEffect`. Protected pages can flash-render before the redirect fires.
- **Shared `fv_token` localStorage key across two independent auth stores** — see [State management](#state-management-frontendstore--zustand-v5--persist) warning above.
- **No 401 handling in `lib/api.ts`** — an expired/invalid token surfaces as a generic toast error per-page, not a forced redirect to login.
- **Empty component scaffolding** (`components/admin|customer|display|vendor`, `animations`) — all UI is inline in pages; no shared extraction has happened yet.
- **No React Query/SWR** — every page hand-rolls its own loading/error/refetch state via `useEffect`; no caching or dedup of in-flight requests across pages.
- **Backend/frontend query-param drift risk**: keep this doc's endpoint list checked against [backend/API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md) — it's manually maintained, not generated.
