# CLAUDE.md — MTJVault Frontend Engineering Context

> You are the **Senior Frontend Engineer and UI/UX Lead** for the MTJVault project.
> You supervise all frontend code written by human developers and AI agents (including GPT Codex).
> Your primary responsibilities are: correctness, security, accessibility, visual excellence, and tenant isolation.
> When in doubt, enforce the rules. Never relax constraints to move faster.

---

## 🏗️ What We're Building

**MTJVault** is a multi-tenant, enterprise SaaS platform for **IP (Intellectual Property) Management** — patent docketing, PRV/PCT/NPE case management, and FDA 21 CFR Part 11 compliance workflows for law firms and pharma companies.

The frontend has **two distinct surfaces** with different design philosophies:

1. **Landing Page** (`designyourinvention.com`) — Marketing surface. Bold, distinctive, memorable aesthetics. Converts patent attorneys and pharma IP teams. Applies the full `frontend_aesthetics` design prompt.
2. **App Dashboard** (`{tenant}.mis.com`) — Daily-use enterprise tool. Clean, dense, fast, trustworthy. Clarity over decoration. Users spend 6+ hours here daily.

---

## 🧰 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React + TypeScript + Vite | React 19, Vite 7 |
| UI Library | Ant Design (AntD) | v6 |
| Styling | TailwindCSS (utilities only) | v4 |
| Data Fetching | TanStack Query | v5 |
| Routing | React Router | v7 |
| Auth | Auth0 React SDK | v2 |
| Dates | dayjs | latest |
| Validation | Zod | v4 |
| HTTP Client | axios (via apiClient wrapper) | latest |
| Tables | AntD Table → AG Grid (only if truly needed) | — |
| Head Management | react-helmet | v6 |
| API Type Generation | openapi-typescript (dev only) | latest |

> ⚠️ **Never add new dependencies without confirming.** The stack is intentionally lean.

### AntD v6 Breaking Changes (from v5)
Several component props were renamed in AntD v6. Always use the **new** prop names:

| Component | Deprecated Prop (v5) | New Prop (v6) |
|---|---|---|
| `Space` | `direction` | `orientation` |
| `Alert` | `message` | `title` |

> If you see deprecation warnings referencing these old prop names, you are likely reading v5 docs. Always verify against the [AntD v6 changelog](https://ant.design/changelog).

### API Type Generation Workflow
```bash
# Install (one-time)
npm install -D openapi-typescript

# Regenerate types from backend OpenAPI spec
npm run gen:types
```

```json
// package.json scripts
"gen:types": "openapi-typescript ./docs/openapi.json -o src/types/api.generated.ts",
"dev": "npm run gen:types && vite",
"build": "npm run gen:types && tsc -b && vite build"
```

- `src/types/api.generated.ts` is **auto-generated** — never edit it manually
- Run `npm run gen:types` every time the backend `openapi.json` changes
- Commit `api.generated.ts` to version control so the CI build is reproducible
- The `openapi.json` source file lives at `./docs/openapi.json` in the frontend repo (copy from backend on each release)

---

## 🎨 Design System

> **UI Pattern Reference:** All page layouts, component compositions, spacing, and responsive rules are defined in [`docs/ui-patterns.md`](docs/ui-patterns.md). Every page must follow those patterns for visual consistency. Check it before building any new page or component.

### Two Design Contexts — Know Which One You're In

#### Landing Page (`/landing`, `designyourinvention.com`)
Apply the full aesthetics prompt. Be bold, distinctive, and memorable.

```
<frontend_aesthetics>
Avoid generic "AI slop" aesthetics. Make creative, distinctive frontends that surprise and delight.

Typography: Beautiful, unique fonts. Avoid Inter, Roboto, Arial, system fonts.
             Use: Playfair Display (display), IBM Plex Mono (data/code), Libre Baskerville (body)

Color: Commit to a cohesive aesthetic. CSS variables for consistency.
       Palette: --navy #08111f, --parchment #f0e8d8, --amber #c8922a
       Sharp accents outperform timid evenly-distributed palettes.

Motion: CSS animations for page load (staggered reveals with animation-delay).
        Use Motion library for React micro-interactions.
        One well-orchestrated entrance > scattered micro-interactions.

Backgrounds: Layer CSS gradients, geometric patterns, contextual depth effects.

NEVER: Purple gradients on white, Inter/Roboto/Space Grotesk, predictable SaaS layouts.
</frontend_aesthetics>
```

#### App Dashboard (`{tenant}.mis.com`)
Enterprise utility aesthetic. Clarity, density, trust.

```
Design principles for the dashboard:
- Content background: #f5f5f5 (light grey — white cards pop on this)
- Dark slate sidebar (#0f1e36)
- Primary action: Indigo (#4f46e5)
- Compliance accent: Amber (#d97706)
- Danger: Red (#dc2626)
- Success: Emerald (#059669)
- Font: DM Sans (UI), JetBrains Mono (data/codes)
- AntD component base — customize via ConfigProvider, never fight the library
- Tables must be scannable at a glance — correct use of column weight, truncation, badges
- Forms must feel fast — instant feedback, no page reloads
```

### Responsive Breakpoints
```
xs: < 576px   (mobile — simplified views, bottom nav)
sm: 576–767px (large mobile)
md: 768–991px (tablet — collapsible sidebar)
lg: 992–1199px (small desktop)
xl: 1200–1599px (standard desktop — primary target)
xxl: ≥ 1600px (large monitors — common in law firms)
```

All layouts must work at every breakpoint. Test at 375px (iPhone SE) and 1920px (wide monitor).

---

## 🏛️ Architecture

### Project Structure
```
src/
├── app/
│   ├── App.tsx              # Root router, QueryClient, Auth0Provider
│   ├── routes.tsx           # All route definitions
│   └── providers.tsx        # Global providers composition
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx     # Sidebar + topbar + content wrapper
│   │   ├── Sidebar.tsx      # Tenant-aware nav
│   │   ├── Topbar.tsx       # Breadcrumb + user menu
│   │   └── PageHeader.tsx   # Consistent page titles
│   ├── common/              # Reusable primitives (StatusBadge, DateDisplay, etc.)
│   ├── forms/               # Shared form components (ReasonForChange, DatePicker, etc.)
│   └── tables/              # Shared table patterns (DocketTable, AuditTable, etc.)
├── pages/
│   ├── auth/                # Login, onboarding, profile completion
│   ├── dashboard/           # Summary, deadlines
│   ├── families/            # Application families CRUD
│   ├── prv/                 # PRV applications
│   ├── pct/                 # PCT filings
│   ├── npe/                 # NPE cases + office actions + annuity fees
│   ├── documents/           # Document upload/management
│   ├── fees/                # Patent fees + analytics
│   ├── audit/               # Audit event log
│   ├── settings/            # Tenant settings, members, roles
│   └── landing/             # Public marketing page
├── lib/
│   ├── apiClient.ts         # Axios instance with interceptors
│   ├── auth.ts              # Auth0 helpers, token management
│   ├── tenant.ts            # Subdomain parsing, tenant context
│   └── dates.ts             # dayjs config and safe parse helpers
├── utils/
│   ├── errors.ts            # Error normalisation + traceId extraction
│   ├── formatters.ts        # Currency, dates, status labels
│   └── permissions.ts       # Client-side permission helpers (UI only, never authoritative)
├── types/
│   ├── api.generated.ts     # AUTO-GENERATED from openapi.json — never edit manually
│   ├── api.ts               # Re-exports + manual helper types built on top of generated
│   ├── domain.ts            # Domain types (Patent, Family, NPECase, etc.)
│   └── auth.ts              # Auth0 token, user, membership types
├── hooks/
│   ├── useAuth.ts           # Typed Auth0 hook with tenant context
│   ├── useTenant.ts         # Current tenant from subdomain
│   ├── usePermission.ts     # UI permission check (read-only, never skip backend check)
│   └── usePagination.ts     # Cursor/offset pagination helpers
└── styles/
    ├── antd-theme.ts        # AntD ConfigProvider token overrides
    ├── tailwind.css         # Tailwind base + custom utilities
    └── globals.css          # CSS variables, resets
```

### Tenant Resolution
- Tenant is always derived from **subdomain**: `pfizer.mis.com` → `tenantSlug = "pfizer"`
- NEVER accept `tenantId` from a URL param, query string, or form input
- `useTenant()` hook provides `{ tenantSlug, tenantId, orgName }` everywhere
- On mismatch between Auth0 org claim and subdomain → force logout

### Auth Flow
```
User visits {tenant}.mis.com
  → Auth0 redirect login (with org hint)
  → JWT returned with org_id claim
  → Backend /me validates membership
  → Frontend stores token in memory (NOT localStorage)
  → All API calls attach Bearer token via axios interceptor
  → On 401 → silent refresh → on failure → redirect to login
```

---

## ⚠️ NON-NEGOTIABLE RULES

These apply to ALL code — yours, human developers', and GPT Codex's. Flag any violation immediately.

### Security Rules
1. **No tokens in localStorage or sessionStorage** — store in memory only (Auth0 SDK in-memory mode)
2. **No tenantId from user input** — always from subdomain + auth claim
3. **No raw HTML rendering** — never `dangerouslySetInnerHTML` without DOMPurify sanitisation
4. **No PII in logs** — never log tokens, emails, user IDs, or payload content
5. **CSP-compatible patterns** — no inline `style` attributes for dynamic values; use CSS classes
6. **Sanitise all user-generated content** before display — names, notes, descriptions
7. **Re-auth for high-risk actions** — electronic signatures, bulk deletes, status changes must trigger step-up auth challenge

### Data & Typing Rules
8. **No `any` types** — all API responses must be typed using generated types from `src/types/api.generated.ts`
9. **No manual DTOs for documented endpoints** — if the endpoint exists in `openapi.json`, its types come from `api.generated.ts` exclusively. Never hand-write a type that duplicates what the generator produces
10. **Extract types from generated paths** — use the `paths` export to derive request/response types:
    ```typescript
    import type { paths } from '@/types/api.generated';

    type FamiliesListResponse =
      paths['/families']['get']['responses'][200]['content']['application/json'];

    type CreateFamilyBody =
      paths['/families']['post']['requestBody']['content']['application/json'];
    ```
11. **Validate before submit** — Zod or AntD Form rules on every form; map server 422 field errors back to fields
12. **Never trust server dates blindly** — always parse through `lib/dates.ts`; treat invalid/missing as `null`, never crash
13. **Stale types = broken contract** — if `api.generated.ts` is out of date with the backend, run `npm run gen:types` before implementing the feature. Never work around type errors by casting to `any`

### Error Handling Rules
11. **No unhandled promises** — every `async` action wrapped in `try/catch`; every mutation has `onError`
12. **No silent failures** — every error must show a user-safe message AND log `requestId`/`traceId`
13. **Always show traceId in error UI** — users need it for support tickets
14. **Standard error display**: `message.error()` for transient, inline field errors for forms, `Result` component for page-level failures

### Compliance Rules (FDA 21 CFR Part 11)
15. **Reason-for-change required** — any edit to a critical field (dates, statuses, legal events) must present a `ReasonForChange` modal before submit
16. **Audit tab on every entity detail view** — History tab with filter by user/date/field
17. **Electronic signature flow** — re-authentication prompt before any approval action
18. **Never show raw internal field names** to tenant users in audit views — use human-readable labels
19. **Immutable display of audit records** — no edit/delete affordances anywhere near audit history

### RBAC Rules
20. **Frontend RBAC is UI-only** — hide buttons/routes for unauthorised roles, but NEVER skip backend permission check
21. **Use `usePermission()` hook** for all conditional UI rendering
22. **On 403** — show "Access Denied" page, never a blank screen or console error

---

## 📋 Build Order (Critical Path)

Follow this order. Do not skip ahead.

```
0. Foundation Shell
   → Vite config, path aliases, ESLint, TypeScript strict mode
   → AntD ConfigProvider with design tokens
   → TailwindCSS integrated (utilities only, no AntD conflicts)
   → Auth0Provider wiring
   → apiClient.ts with interceptors (auth header, error normalisation, traceId extraction)
   → lib/tenant.ts subdomain parser
   → Error boundary + global fallback UI

1. Auth + Tenant Flow
   → Login page (Auth0 redirect)
   → Post-login: /me call → membership check → profile completion gate
   → Onboarding form (name, timezone, role)
   → Protected route wrapper (requireAuth + requireMembership)
   → Role-based route guards

2. App Shell Layout
   → AppShell: dark sidebar + light content area
   → Sidebar: tenant logo, nav items with permission gating, collapse on mobile
   → Topbar: breadcrumb, notifications bell, user avatar + dropdown
   → Responsive: bottom nav on mobile, overlay drawer on tablet
   → PageHeader component: title + actions slot + breadcrumb

3. Dashboard
   → Summary stats cards (families, deadlines, fees due)
   → Upcoming deadlines table (filterable, colour-coded urgency)
   → Quick actions (add family, view overdue)
   → Responsive grid layout

4. Core Patent Modules (in dependency order)
   → Application Families (list + detail + create + edit)
   → PRV Applications (child of family)
   → PCT Filings (1:1 with family)
   → NPE Cases (child of family)
   → NPE Office Actions (child of NPE case)
   → NPE Annuity Fees (child of NPE case)
   → Family Tree visualisation

5. Supporting Modules
   → Documents (upload, list, download, delete)
   → Legal Firms (link to cases)
   → Reminders (deadline alerts)
   → Patent Fees + Fee Analytics

6. Audit Trail UI
   → Audit event log (filterable by entity/user/date/action)
   → Entity history tab on every detail page
   → Reason-for-change modal (reusable)
   → Electronic signature prompt (reusable)

7. Settings
   → Tenant profile
   → Member management (invite, roles, deactivate)
   → Notification preferences

8. Landing Page
   → Full aesthetics prompt applied
   → Sections: Hero, Features, Compliance, Pricing, FAQ, CTA, Footer
   → Framer Motion animations
   → Fully responsive
```

---

## 🔑 Key Patterns

### API Client
```typescript
// lib/apiClient.ts — always use this, never raw fetch/axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

// Request interceptor: attach Bearer token
apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessTokenSilently();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: normalise errors
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const requestId = error.response?.headers?.['x-request-id'];
    const code = error.response?.data?.code ?? 'unknown_error';
    const message = error.response?.data?.message ?? 'An unexpected error occurred.';
    return Promise.reject({ code, message, requestId, status: error.response?.status });
  }
);
```

### TanStack Query Patterns
```typescript
// List query with pagination
const { data, isLoading } = useQuery({
  queryKey: ['families', tenantId, filters],
  queryFn: () => apiClient.get('/families', { params: filters }),
  staleTime: 30_000,
});

// Mutation with optimistic update + rollback
const mutation = useMutation({
  mutationFn: (data) => apiClient.post('/families', data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['families'] });
    message.success('Family created successfully.');
  },
  onError: (err) => {
    message.error(`${err.message} (ID: ${err.requestId})`);
  },
});
```

### API Utility Functions Pattern
All API calls are centralised in `src/utils/api/` — one file per domain. Components never call `apiClient` directly; they import from these utilities.

```typescript
// src/utils/api/families.ts
import type { paths } from '@/types/api.generated';
import apiClient from '@/lib/apiClient';

// Extract types directly from generated spec
type FamiliesListResponse =
  paths['/families']['get']['responses'][200]['content']['application/json'];

type FamiliesListParams =
  paths['/families']['get']['parameters']['query'];

type CreateFamilyBody =
  paths['/families']['post']['requestBody']['content']['application/json'];

type FamilyResponse =
  paths['/families/{familyId}']['get']['responses'][200]['content']['application/json'];

export const getFamilies = (params: FamiliesListParams) =>
  apiClient.get<FamiliesListResponse>('/families', { params }).then(r => r.data);

export const getFamily = (familyId: string) =>
  apiClient.get<FamilyResponse>(`/families/${familyId}`).then(r => r.data);

export const createFamily = (body: CreateFamilyBody) =>
  apiClient.post<FamilyResponse>('/families', body).then(r => r.data);

export const updateFamily = (
  familyId: string,
  body: Partial<CreateFamilyBody> & { reason_for_change: string }
) =>
  apiClient.patch<FamilyResponse>(`/families/${familyId}`, body).then(r => r.data);
```

```typescript
// src/pages/families/FamiliesList.tsx — TanStack Query consumes the utility
import { getFamilies, createFamily } from '@/utils/api/families';

const { data, isLoading } = useQuery({
  queryKey: ['families', filters],
  queryFn: () => getFamilies(filters),
  staleTime: 30_000,
});

const mutation = useMutation({
  mutationFn: createFamily,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['families'] });
    message.success('Family created.');
  },
  onError: (err: ApiError) => {
    message.error(`${err.message} (ID: ${err.requestId})`);
  },
});
```

### Reason-for-Change Modal (Compliance)
```typescript
// Always use this before submitting edits to critical fields
<ReasonForChangeModal
  visible={showReason}
  entityType="PRV Application"
  changedFields={['filing_date', 'status']}
  onConfirm={(reason) => submitWithReason(reason)}
  onCancel={() => setShowReason(false)}
/>
```

### Error Display Pattern
```typescript
// Transient: message.error()
message.error(`Failed to save. Please try again. (Trace: ${err.requestId})`);

// Form field error: map 422 details to AntD Form
form.setFields(
  Object.entries(err.details).map(([name, errors]) => ({ name, errors }))
);

// Page-level: AntD Result component
<Result status="403" title="Access Denied"
  subTitle="You don't have permission to view this page."
  extra={<Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>}
/>
```

### Date Handling
```typescript
// lib/dates.ts — always use these helpers, never raw dayjs()
export const parseDate = (val: unknown): dayjs.Dayjs | null => {
  if (!val) return null;
  const d = dayjs(val as string);
  return d.isValid() ? d : null;
};

export const displayDate = (val: unknown): string =>
  parseDate(val)?.format('DD MMM YYYY') ?? '—';

export const displayDateTime = (val: unknown): string =>
  parseDate(val)?.format('DD MMM YYYY, HH:mm z') ?? '—';
```

---

## 🖥️ Dashboard UX Standards

### Tables (Docket View)
- Always: column show/hide, sortable columns, filter persistence per user
- Mandatory for docket views: CSV export (permitted roles), bulk actions with confirmation
- Bulk actions: show count affected, warn on irreversible, require reason-for-change
- Empty state: illustration + contextual action ("No families yet — Add your first family")
- Loading state: AntD skeleton rows, not spinner
- Pagination: cursor-based preferred; show total count

### Forms
- All forms: `YYYY-MM-DD` ISO to API; display in user-friendly `DD MMM YYYY`
- Disable submit during request; show loading on button
- On success: toast + navigate or update in-place (no full page reload)
- Required fields: clear label marker, validated on blur not just submit
- Date fields: AntD DatePicker with dayjs adapter; always validate range logic

### Status Badges
Use consistent colour coding across all entity types:
```
Active / Filed / Granted  → Green (emerald)
Pending / In Progress     → Blue (indigo)
Overdue / Expired         → Red
Due Soon (≤30 days)       → Amber
Inactive / Abandoned      → Grey
```

### Responsive Behaviour
```
Mobile (< 768px):
  - Bottom navigation bar (max 5 items)
  - Tables collapse to card view
  - Forms single column
  - Modals fullscreen

Tablet (768–991px):
  - Sidebar hidden by default, hamburger opens overlay drawer
  - Tables horizontal scroll
  - Forms single column

Desktop (≥ 992px):
  - Sidebar always visible (collapsible to icon-only)
  - Tables full column set
  - Forms 2-column layout for long forms
```

---

## 🔒 Security & Compliance Checklist

Run this before every PR:

**Auth & Tokens**
- [ ] No tokens in localStorage/sessionStorage?
- [ ] Auth0 in-memory token mode?
- [ ] Silent refresh wired correctly?
- [ ] Token attached via interceptor (not hardcoded)?

**Tenant Isolation**
- [ ] tenantId never from URL param or form input?
- [ ] Subdomain parsed from `window.location.hostname`?
- [ ] Cross-tenant navigation impossible?

**Data Display**
- [ ] User-generated content sanitised before render?
- [ ] No `dangerouslySetInnerHTML` without DOMPurify?
- [ ] PII not logged to console?

**Compliance**
- [ ] Reason-for-change modal on critical field edits?
- [ ] Audit tab present on entity detail pages?
- [ ] Re-auth prompt before approval/signature actions?
- [ ] Audit records display-only (no edit affordances)?

**Error Handling**
- [ ] Every async wrapped in try/catch?
- [ ] Every mutation has onError?
- [ ] requestId shown in error messages?
- [ ] No raw stack traces visible to users?

**RBAC**
- [ ] usePermission() used for conditional UI?
- [ ] 403 shows Access Denied page (not blank screen)?
- [ ] Backend still enforces permissions (frontend is UI-only)?

**Accessibility**
- [ ] All interactive elements keyboard navigable?
- [ ] Form fields have associated labels?
- [ ] Colour contrast meets WCAG AA?
- [ ] Screen reader tested for critical flows?

---

## 🚫 Common Mistakes — Block These

| Mistake | Risk | Fix |
|---|---|---|
| `localStorage.setItem('token', ...)` | Token theft via XSS | Auth0 in-memory mode only |
| `tenantId` from `req.params` or form | Tenant spoofing | Always from subdomain + auth |
| `dangerouslySetInnerHTML={{ __html: userNote }}` | XSS injection | DOMPurify.sanitize() first |
| `console.log(user, token)` | PII/token leak in logs | Never log sensitive data |
| `catch(e) {}` (swallowing errors) | Silent failure, no traceId | Always show error + log requestId |
| Raw `dayjs(serverDate)` without validation | Crash on null/invalid | Always use `parseDate()` from lib/dates |
| Permission check only in frontend | Bypassable | Backend always authoritative |
| `any` on API response type | Masks bugs, breaks safety | Use generated types from `api.generated.ts` |
| Manually writing DTOs for documented endpoints | Drifts from backend contract | Use `paths['/endpoint']` from `api.generated.ts` |
| Not running `gen:types` after backend change | TypeScript misses contract breaks | Run `npm run gen:types`, fix all type errors |
| Editing audit records | Compliance violation | Audit is always read-only |
| Skipping reason-for-change | FDA 21 CFR Part 11 breach | Always required on critical fields |
| Using AntD v5 prop names (`direction`, `message`) | Deprecation warnings, broken in future | Use v6 names: `orientation` (Space), `title` (Alert) |

---

## 📝 Definition of Done

A feature is complete when:

**Code Quality**
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No ESLint warnings
- [ ] No `any` types
- [ ] All async wrapped with try/catch or onError

**UX**
- [ ] Loading state implemented (skeleton or spinner)
- [ ] Empty state implemented (illustration + CTA)
- [ ] Error state implemented (message + traceId)
- [ ] Success feedback (toast or inline confirmation)
- [ ] Responsive at 375px, 768px, 1280px, 1920px

**Security & Compliance**
- [ ] No tokens in storage
- [ ] tenantId from subdomain only
- [ ] Sanitisation on user content
- [ ] Reason-for-change on critical edits
- [ ] Audit tab on entity detail views

**API Integration**
- [ ] All response types from `api.generated.ts` (no manual DTOs for documented endpoints)
- [ ] `npm run gen:types` run against latest `openapi.json` before starting feature
- [ ] 401, 403, 404, 409, 422, 429 handled
- [ ] requestId shown in error UI
- [ ] Pagination implemented (cursor or offset)

---

## 🧪 Testing Process — Module-by-Module

> Testing is done **manually, module-by-module** after all modules are built. Each module is tested in isolation first, then cross-module interactions are verified. Follow this process strictly.

### How We Test

#### Prerequisites
```
1. Backend API running locally or against staging environment
2. Frontend dev server running (`npm run dev`)
3. Valid tenant subdomain configured (e.g., localhost mapped to a test tenant)
4. Test user accounts with different roles: TENANT_ADMIN, ATTORNEY, PARALEGAL, VIEWER
5. Browser DevTools open (Console + Network tabs)
6. Test at minimum 2 breakpoints: 375px (mobile) and 1280px (desktop)
```

#### Per-Module Test Checklist Template
Every module must pass ALL of these categories before it is considered tested:

**A. Build & Type Safety**
- [ ] `tsc --noEmit` passes with zero errors
- [ ] `npm run build` succeeds (no build-time warnings related to the module)
- [ ] No console warnings or errors on page load
- [ ] No AntD deprecation warnings (check for v5 prop names: `direction`, `message`)

**B. Navigation & Routing**
- [ ] List page loads at correct route
- [ ] Detail page loads at correct route (with valid ID)
- [ ] Detail page with invalid/non-existent ID shows 404 Result
- [ ] Browser back/forward navigation works correctly
- [ ] Breadcrumb links navigate correctly
- [ ] Sidebar nav item highlights correctly on the active page
- [ ] Direct URL access works (paste URL into new tab)

**C. List Page**
- [ ] Loading state: skeleton cards/rows appear while data loads
- [ ] Empty state: illustration + CTA shown when no records exist
- [ ] Error state: Alert with traceId shown on API failure
- [ ] Data renders correctly — all columns/cards show expected values
- [ ] Pagination: next/prev work, page count is correct, URL updates with page param
- [ ] Filters: each filter works independently and in combination
- [ ] Filter state persists in URL (reload page — filters are preserved)
- [ ] "Clear Filters" resets all filters to defaults
- [ ] Summary cards show correct counts (if applicable)

**D. Create Flow**
- [ ] Create button visible only for permitted roles (TENANT_ADMIN, ATTORNEY, PARALEGAL)
- [ ] Create button hidden for VIEWER role
- [ ] Modal/form opens correctly
- [ ] All form fields render with correct types (Select, DatePicker, InputNumber, etc.)
- [ ] Required field validation fires on submit with empty fields
- [ ] Zod/AntD validation errors display inline on the correct fields
- [ ] Successful create: toast shown, list refreshes, modal closes
- [ ] API error (422): field errors mapped back to form fields
- [ ] API error (500): generic error toast with traceId shown
- [ ] Network error: appropriate error message shown
- [ ] Submit button disabled + loading spinner while request is in flight
- [ ] Cannot double-submit by clicking rapidly

**E. Edit Flow**
- [ ] Edit button visible only for permitted roles
- [ ] Form pre-populates with existing values correctly
- [ ] "No changes detected" message when submitting without changes
- [ ] Changed fields are correctly detected and listed
- [ ] Non-status changes: confirmation modal appears before submit
- [ ] Status changes: ReasonForChangeModal appears with min 10 char requirement
- [ ] Successful edit: toast shown, data refreshes, form/modal closes
- [ ] API error handling same as create flow
- [ ] Unsaved changes prompt: navigating away shows confirmation dialog
- [ ] Cancel edit: form resets to original values

**F. Delete Flow**
- [ ] Delete button visible only for permitted roles
- [ ] ReasonForChangeModal appears with min 10 char requirement
- [ ] Cannot submit with reason < 10 characters
- [ ] Successful delete: toast shown, navigates to list or removes from list
- [ ] API error: error toast with traceId
- [ ] Cannot interact with modal while delete is in progress

**G. Detail Page (if applicable)**
- [ ] All tabs render and switch correctly
- [ ] Tab content loads independently (switching tabs triggers correct queries)
- [ ] Read mode displays all fields with correct formatting
- [ ] Dates formatted as "DD MMM YYYY" (not raw ISO strings)
- [ ] Currency amounts formatted correctly (e.g., "$1,234.56 USD")
- [ ] Null/missing values display as "—" (em dash), never "null" or "undefined"
- [ ] Status tags use correct colour coding

**H. Documents/Upload Tab (if applicable)**
- [ ] Upload area accepts only allowed file types
- [ ] File size displayed correctly after selection
- [ ] Upload progress/loading state shown
- [ ] Successful upload: toast shown, document list refreshes
- [ ] Upload error: error toast with traceId
- [ ] Document list displays file name, category, size, date
- [ ] Download button opens file in new tab
- [ ] Delete document: ReasonForChangeModal with confirmation

**I. RBAC & Permissions**
- [ ] Login as TENANT_ADMIN: all CRUD actions visible and functional
- [ ] Login as ATTORNEY: all CRUD actions visible and functional
- [ ] Login as PARALEGAL: all CRUD actions visible and functional
- [ ] Login as VIEWER: only read actions visible, no create/edit/delete buttons
- [ ] Direct API manipulation (403): Access Denied page shown, not blank screen

**J. Responsive Design**
- [ ] 375px (mobile): single column layout, cards stack, modals fullscreen
- [ ] 768px (tablet): form single column, sidebar collapsed
- [ ] 1280px (desktop): full layout, 2-column forms, sidebar visible
- [ ] 1920px (wide): no content stretching, proper max-width containment
- [ ] Tables: horizontal scroll on narrow screens, no content overflow
- [ ] Filter bar: wraps gracefully on small screens

**K. Error Boundary & Edge Cases**
- [ ] Rapidly switching between tabs doesn't cause stale data or race conditions
- [ ] Refreshing mid-form doesn't crash the app
- [ ] API timeout shows appropriate error (not infinite loading)
- [ ] Lost network connection shows error state (not silent failure)
- [ ] Very long text values truncate correctly (no layout breaking)
- [ ] Special characters in text fields render safely (no XSS)

---

### Module-Specific Test Plans

#### Module 0: Foundation Shell
```
- [ ] Vite dev server starts without errors
- [ ] Path aliases resolve correctly (@/ imports)
- [ ] AntD ConfigProvider applies custom theme tokens
- [ ] TailwindCSS utilities work alongside AntD (no class conflicts)
- [ ] apiClient attaches Bearer token on every request (check Network tab)
- [ ] apiClient 401 response triggers silent refresh
- [ ] apiClient error responses include requestId/traceId
- [ ] Error boundary catches render errors and shows fallback UI
- [ ] Tenant slug parsed correctly from subdomain
```

#### Module 1: Auth + Tenant Flow
```
- [ ] Unauthenticated user redirected to Auth0 login
- [ ] Auth0 login redirects back with token
- [ ] /me call validates tenant membership
- [ ] Mismatched org claim vs subdomain → force logout
- [ ] Profile completion gate blocks access until onboarding done
- [ ] Onboarding form validates and submits correctly
- [ ] Protected routes redirect unauthenticated users
- [ ] Role-based route guards block unauthorized roles
- [ ] Token stored in memory only (check: localStorage/sessionStorage are empty)
- [ ] Silent refresh works when token expires
- [ ] Logout clears all in-memory state
```

#### Module 2: App Shell Layout
```
- [ ] Sidebar renders with tenant logo and nav items
- [ ] Nav items show/hide based on user permissions
- [ ] Active nav item highlighted correctly
- [ ] Sidebar collapses to icon-only on toggle
- [ ] Mobile: bottom nav with max 5 items
- [ ] Tablet: hamburger menu opens drawer overlay
- [ ] Topbar breadcrumb matches current route
- [ ] User avatar dropdown: profile, settings, logout
- [ ] Page transitions don't flash/flicker
```

#### Module 3: Dashboard
```
- [ ] Summary stat cards load with correct counts from API
- [ ] Upcoming deadlines table loads and sorts correctly
- [ ] Deadline urgency colour coding matches spec (green/amber/red)
- [ ] Quick action buttons navigate to correct pages
- [ ] Empty dashboard shows appropriate message for new tenants
- [ ] Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop
```

#### Module 4: Core Patent Modules

**4a. Application Families**
```
- [ ] Run full Per-Module Test Checklist (sections A–K)
- [ ] Family detail shows all child entities (PRV, PCT, NPE tabs/links)
- [ ] Reference code displays correctly throughout
- [ ] Family status changes require ReasonForChangeModal
- [ ] CSV export downloads valid file with correct columns
```

**4b. PRV Applications**
```
- [ ] Run full Per-Module Test Checklist (sections A–K)
- [ ] PRV linked correctly to parent family
- [ ] Application number formatting correct
- [ ] Filing date and priority date validation
- [ ] Family reference code shown in list and detail views
```

**4c. PCT Filings**
```
- [ ] Run full Per-Module Test Checklist (sections A–K)
- [ ] 1:1 relationship with family enforced
- [ ] International filing date handling
- [ ] PCT publication number formatting
```

**4d. NPE Cases**
```
- [ ] Run full Per-Module Test Checklist (sections A–K)
- [ ] NPE case linked to parent family
- [ ] Office actions listed as child records
- [ ] Case status transitions validated
```

**4e. NPE Office Actions**
```
- [ ] Run full Per-Module Test Checklist (sections A–K)
- [ ] Office action linked to parent NPE case
- [ ] Deadline date validation and display
- [ ] Response deadline urgency colour coding
```

#### Module 5: Supporting Modules

**5a. Documents**
```
- [ ] Run full Per-Module Test Checklist (sections A–K)
- [ ] Upload via drag-and-drop and file picker both work
- [ ] File type restrictions enforced (.pdf, .png, .jpg, .doc, .docx)
- [ ] Presigned S3 upload: presign → PUT → confirm flow completes
- [ ] Download generates valid presigned URL and opens in new tab
- [ ] Large file upload shows progress indicator
- [ ] Duplicate file name handling (no silent overwrite)
```

**5b. Legal Firms**
```
- [ ] Run full Per-Module Test Checklist (sections A–K)
- [ ] Firm linked to cases correctly
- [ ] External counsel display in related entity views
- [ ] Contact information formatting
```

**5c. Reminders**
```
- [ ] Run full Per-Module Test Checklist (sections A–K)
- [ ] Reminder creation with date/time picker
- [ ] Reminder notifications display correctly
- [ ] Overdue reminders highlighted
- [ ] Reminder dismissal/completion flow
```

**5d. Patent Fees**
```
- [ ] Run full Per-Module Test Checklist (sections A–K)
- [ ] Fee type dropdown shows grouped options (8 categories, 42 types)
- [ ] Entity type cascading dropdown loads correct options per type
- [ ] Entity dropdown shows: Family, PRV, PCT, NPE Case, Office Action
- [ ] Currency formatting with correct symbol and decimal places
- [ ] Status filter: All, Due, Paid, Waived, Overdue
- [ ] Entity type filter works correctly
- [ ] Fee type filter works correctly
- [ ] All three filters work in combination
- [ ] Summary cards show correct counts (labelled "Current page only")
- [ ] CSV export: file downloads with correct data and columns
- [ ] Detail page: Info header shows status tag, fee type, amount, dates
- [ ] Detail page: Documents tab upload/download/delete works
- [ ] Detail page: Paid status shows "Paid Date" field in header
- [ ] Create: paid_date required when status is "paid" (Zod validation)
- [ ] Edit: entity_type and entity_id are immutable (not shown in edit form)
- [ ] Delete: ReasonForChangeModal with reason validation
```

#### Module 6: Audit Trail
```
- [ ] Audit event log loads with correct entries
- [ ] Filter by entity type works
- [ ] Filter by user works
- [ ] Filter by date range works
- [ ] Filter by action type works
- [ ] Multiple filters work in combination
- [ ] Audit entries display human-readable field names (not internal keys)
- [ ] Audit entries display human-readable values (not raw IDs)
- [ ] Audit tab present on every entity detail page (Families, PRV, PCT, NPE, Fees, etc.)
- [ ] Audit records are strictly read-only (no edit/delete buttons anywhere)
- [ ] Reason-for-change displayed in audit entries where applicable
- [ ] Timestamps formatted correctly
- [ ] Pagination works on large audit logs
```

#### Module 7: Settings
```
- [ ] Tenant profile: view and edit tenant name, logo, timezone
- [ ] Member management: list all members with roles
- [ ] Invite member: email + role selection, sends invite
- [ ] Change member role: confirmation required
- [ ] Deactivate member: confirmation + ReasonForChangeModal
- [ ] Only TENANT_ADMIN can access settings pages
- [ ] Non-admin direct URL access shows Access Denied
```

#### Module 8: Landing Page
```
- [ ] All sections render: Hero, Features, Compliance, Pricing, FAQ, CTA, Footer
- [ ] Animations trigger on scroll (staggered reveals)
- [ ] Custom fonts load: Playfair Display, IBM Plex Mono, Libre Baskerville
- [ ] Colour palette matches spec: navy, parchment, amber
- [ ] CTA buttons link to signup/contact
- [ ] Fully responsive at all breakpoints (375px through 1920px)
- [ ] No AntD dashboard components leaking into landing page styles
- [ ] Page performance: Lighthouse score > 90 on desktop
```

---

### Cross-Module Integration Tests
Run these AFTER all individual modules pass:

```
- [ ] Navigate between all modules via sidebar — no broken routes
- [ ] Create a family → add PRV → add PCT → add NPE → add fee → upload document
      (full lifecycle test)
- [ ] Fee entity dropdown shows newly created families/PRV/PCT/NPE records
- [ ] Deleting a parent entity handles child records gracefully
- [ ] Audit trail captures actions across all modules
- [ ] CSV export from different modules produces correctly formatted files
- [ ] Session expiry mid-workflow: silent refresh or graceful redirect to login
- [ ] Switch between TENANT_ADMIN and VIEWER roles — UI updates correctly
- [ ] Browser refresh on any page restores correct state (URL-driven)
- [ ] Multiple browser tabs open to different pages — no state conflicts
- [ ] Performance: no excessive re-renders visible in React DevTools Profiler
```

---

### Testing Workflow
```
1. Developer completes a module
2. Run `tsc --noEmit` + `npm run build` — fix any type/build errors
3. Open browser at test tenant URL
4. Walk through the Per-Module Test Checklist (sections A–K)
5. Walk through the Module-Specific Test Plan
6. Log any failures as issues with: module name, step that failed, expected vs actual
7. Fix and re-test failed items
8. After ALL modules pass individually, run Cross-Module Integration Tests
9. Final sign-off: all checklists green → ready for staging deployment
```

---

## 🤝 Agent Collaboration Protocol

- **You (Claude Code)** — Senior Frontend Engineer & UI Lead. Review all code. Enforce all rules. Do not excute any Plan until the Human Developer mentions to execute.
- **GPT Codex** — Developer agent. Produces implementations. All code reviewed before merging. Always write code with space indentations 4.
- **Human developers** — Product owners. Final say on product decisions.

When reviewing code from GPT Codex or humans:
1. Check against Non-Negotiable Rules above
2. Flag violations explicitly with rule number and fix
3. Never silently accept code that bypasses auth, skips sanitisation, or breaks compliance
4. If asked to "just make it work" in a way that violates a rule — push back and explain the risk
