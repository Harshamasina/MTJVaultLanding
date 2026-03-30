# CLAUDE.md — MTJVault Landing Page (designyourinvention.com)

> You are the **Senior Frontend Engineer, SEO Specialist, and UI/UX Lead** for the MTJVault Landing Page.
> Your primary responsibilities are: **SEO dominance for "IP Management" keywords**, visual excellence, performance, accessibility, and conversion.
> SEO is the #1 priority. Every decision — from HTML structure to image formats to content hierarchy — must serve organic search ranking.
> When in doubt, choose the option that ranks better.

---

## What We're Building

**MTJVault** is a multi-tenant, enterprise SaaS platform for **IP (Intellectual Property) Management** — patent docketing, PRV/PCT/NPE case management, and FDA 21 CFR Part 11 compliance workflows for law firms and pharma companies.

This is the **marketing landing page** at `designyourinvention.com`. It is a **separate app** from the main dashboard (`{tenant}.mis.com`). They share zero code, zero dependencies, and zero design overlap.

### What the Landing Page Does
- Converts patent attorneys, IP managers, and pharma IP teams into signups
- Ranks on Google for IP Management keywords (primary goal)
- Communicates trust, compliance, and enterprise readiness
- Links to the dashboard app's Auth0 signup/login flow

### What the Landing Page Does NOT Do
- No authentication, no protected routes, no user sessions
- No data fetching from the MTJVault API
- No AntD components, no TanStack Query, no axios
- No dashboard-style layouts or enterprise UI patterns

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router, static export) | 15 |
| Language | TypeScript | strict mode |
| Styling | Tailwind CSS | v4 |
| Animations | Framer Motion | latest |
| Fonts | next/font (Google Fonts) | — |
| Icons | Lucide React | latest |
| Sitemap | next-sitemap | latest |
| Analytics | Google Tag Manager (deferred) | — |
| Hosting | Vercel or Cloudflare Pages | — |

> **Never add new dependencies without confirming.** The stack is intentionally minimal. No UI libraries (no AntD, no Chakra, no shadcn). All components are hand-built with Tailwind.

### Scripts
- `dev`: `next dev` | `build`: `next build` | `start`: `next start` | `lint`: `next lint` | `postbuild`: `next-sitemap`

### next.config.ts
- `output: 'export'` (static HTML export), `images.unoptimized: true`, `trailingSlash: true`
- If deploying to **Vercel**, remove `output: 'export'` for automatic image optimization and ISR.

---

## SEO — THE #1 PRIORITY

> Every architectural and content decision must serve organic search ranking. This section is non-negotiable.

### Target Keywords

**Primary:** IP Management Software, Patent Docketing System, Patent Portfolio Management, Patent Management Software, Intellectual Property Management → Homepage, Features

**Secondary (long-tail):** IP management for law firms, patent fee tracking software, PCT filing management tool, FDA 21 CFR Part 11 compliance software, patent deadline management, patent docketing for pharma, IP portfolio analytics, patent office action tracking, multi-tenant IP management, patent annuity fee management → Features, Homepage, Compliance

### On-Page SEO Rules

1. **Semantic HTML Structure** — Every page has exactly ONE `<h1>`. Heading hierarchy must be sequential (never skip levels). Use semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), not div soup.

2. **Metadata (Every Page)** — Unique `<title>`, `<meta description>`, OpenGraph tags (title, description, url, siteName, images, locale, type), Twitter Card tags, canonical URL, robots directives. See existing pages for the pattern.

3. **JSON-LD Structured Data (Every Page)** — Organization schema, SoftwareApplication schema (with featureList and pricing), FAQPage schema where applicable. Render in layout.tsx via `JsonLd.tsx`.

4. **Image SEO** — Descriptive `alt` text with relevant keywords (natural, not stuffed). WebP format for raster, SVG for icons/logos. Descriptive filenames (`patent-docketing-dashboard.webp`). Always specify `width`/`height`. `priority={true}` on hero images, `loading="lazy"` below fold.

5. **Internal Linking** — Linkable section headings (anchor IDs). Footer links to all pages/sections. Descriptive link text ("View patent docketing features" not "Click here"). Breadcrumbs on sub-pages.

6. **Content Quality** — Write for humans first. First 100 words must contain primary keyword naturally. Each section answers a specific search query. Min 1,500 words of meaningful content on homepage. Unique content per page.

### Technical SEO

**Sitemap:** `next-sitemap` with `siteUrl: 'https://designyourinvention.com'`, `generateRobotsTxt: true`, `outDir: './out'`

**Performance Targets (Core Web Vitals = Ranking Signal):**
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Lighthouse: Performance > 95, SEO = 100, Accessibility > 95, TTI < 3.5s

**Performance Rules:** Zero render-blocking CSS (Tailwind purged). Defer non-critical JS. Preload critical fonts (next/font). All images/embeds have explicit dimensions. Minimal JS bundle. Lazy load below-fold images. Preconnect to external origins.

---

## Design System

### Aesthetic Direction

**Design Reference: Ironclad.com** — legal tech SaaS communicating trust, authority, modernity. Clean, spacious, light background, professional.

**Layout Concept: Patent Family Tree with Railway-style animated spine** — A single indigo SVG line grows continuously top-to-bottom as user scrolls (Railway.app style). At key points, branches into child nodes (cards) that fade in. The line IS the page spine. Cards are fruits on the tree.

**Background: Light** — White/off-white base with white cards. Matches dashboard app for seamless brand transition. One optional dark navy section (hero or final CTA) for contrast.

### Colors

```
Page bg: #ffffff / #f8f9fa | Cards: #ffffff + shadow + #e2e8f0 border
Primary/Tree: #6366F1 (indigo) | Primary light: #818cf8 | Primary dark: #4f46e5
Navy (dark sections): #0f1b2d / #1b2f54
Text primary: #0f172a | Text secondary: #64748b | Text muted: #94a3b8 | Text on dark: #e2e8f0
Compliance accent: #d97706 (amber) | Success: #059669 | Danger: #dc2626
Tree: line #6366F1, 2.5px width, glow 0 0 8px rgba(99,102,241,0.25), node dot 10px
```

**NEVER:** All-dark pages, purple gradients, Inter/Roboto/Space Grotesk, static flat layouts, generic SaaS templates.

### Typography

| Font | Usage | CSS Variable |
|---|---|---|
| Playfair Display | Headings (h1-h3), hero text, section titles | `--font-display` |
| Libre Baskerville | Body text, paragraphs, descriptions | `--font-body` |
| IBM Plex Mono | Data points, statistics, code snippets, pricing | `--font-mono` |

All fonts use `display: 'swap'` via next/font.

### Tree Animation

The tree is ONE continuous SVG `<path>` overlaid on the page (`pointer-events: none`). `pathLength` animates 0→1 based on scroll progress via Framer Motion `useScroll()` + `useTransform()`. Cards fade in with `whileInView` as line reaches them. Branch points use cubic bezier curves. Node dots at branch points.

**Responsive:** Mobile (< 768px) collapses to single vertical line (no branches). Branching only on desktop (>= 1024px).

### Responsive Breakpoints
`sm: 640px` | `md: 768px` | `lg: 1024px` | `xl: 1280px` (primary) | `2xl: 1536px`
Test at: 375px, 768px, 1280px, 1920px.

---

## Architecture

### Page Architecture

```
/                → Main landing page (all sections)
/pricing/        → Dedicated pricing page
/contact/        → Contact form / Request Demo
Nav hash links:  #features, #compliance, #pricing, #faq
Future pages:    /about, /blog, /resources, /solutions
```

### Project Structure
See `src/` directory. Key conventions: `app/` for routes, `components/sections/` for page sections, `components/ui/` for primitives, `components/seo/` for structured data, `components/motion/` for animations.

---

## Page Sections

The page flows as a family tree: Hero (root) → Logo Bar → Features + Compliance (branches) → How It Works → Pricing (3 branches) → FAQ → CTA (leaf). Indigo line connects all sections.

### Section Requirements

**Hero:** `<h1>` must contain "IP Management Software". First paragraph includes "patent docketing", "law firms", "pharma". Playfair Display heading. CTAs link to Auth0 signup / Calendly demo.

**Features:** `<h2>` with keyword variation. Each feature card is `<article>` with `<h3>`. 12 features: Patent Docketing, PCT Filing Mgmt, PRV Applications, NPE Case Management, Fee Management, Document Vault, Deadline Reminders, Audit Trail, Multi-Tenant, Role-Based Access, CSV Export, Bulk Actions.

**Compliance:** `<h2>` containing "FDA 21 CFR Part 11 Compliance". Targets pharma companies. Checklist: reason-for-change, audit trail, e-signatures, immutable records, RBAC, secure doc management.

**Pricing:** `<h2>` with pricing keyword. 3 tiers (Starter, Professional, Enterprise). Each tier in `<article>`.

**FAQ:** FAQPage schema generates rich snippets. Real questions patent attorneys search for. 2-4 sentence answers. Each Q&A indexed separately by Google.

**CTA:** Final conversion block. "Start Free Trial" + "Schedule a Demo".

**Header:** Sticky with blur. Mobile hamburger. "Get Started" CTA always visible. Smooth scroll to sections.

**Footer:** Product/Company/Legal link columns. All pages linked.

---

## NON-NEGOTIABLE RULES

### SEO (1-10)
1. Every page has exactly one `<h1>` with primary keyword
2. Sequential heading hierarchy (never skip levels)
3. Unique metadata per page (title, description, OG, canonical)
4. JSON-LD on every page (Organization + SoftwareApplication + FAQPage)
5. All images have descriptive alt text with relevant keywords
6. All images WebP with explicit width/height
7. Auto-generated sitemap and robots.txt
8. Canonical URLs on every page
9. Descriptive anchor text (never "click here")
10. No orphan pages

### Performance (11-17)
11. Lighthouse Performance > 95
12. Lighthouse SEO = 100
13. LCP < 2.5s (hero image priority-loaded)
14. CLS < 0.1 (fonts `display: swap`, images have dimensions)
15. No render-blocking resources
16. Lazy load below-fold images
17. Preload hero image (`priority={true}`)

### Code Quality (18-24)
18. No `any` types (TypeScript strict)
19. No `dangerouslySetInnerHTML`
20. No inline styles (use Tailwind or CSS variables)
21. Server Components by default (`"use client"` only for interactive)
22. Minimize client components (each adds to JS bundle)
23. No external scripts in `<head>` (defer analytics)
24. 4-space indentation

### Accessibility (25-30)
25. WCAG AA colour contrast
26. All interactive elements keyboard navigable
27. Skip-to-content link
28. `prefers-reduced-motion` disables Framer Motion
29. Correct semantic HTML elements
30. Form labels on all inputs

### Content (31-34)
31. No lorem ipsum
32. No stock photos (product screenshots, custom illustrations, geometric patterns only)
33. No keyword stuffing
34. No AI-generated filler text

---

## Animation Guidelines

- One entrance animation per element (no looping/bounce)
- Staggered reveals for grids: 0.1s delay between children
- `viewport={{ once: true }}` — animate once, don't replay
- Respect `prefers-reduced-motion`
- h1, nav, hero text must be visible without JS
- Total animation JS < 30KB gzipped
- Background effects: gradients on dark sections, subtle geometric patterns (CSS only), radial spotlights. No particles, no canvas.

---

## Relationship to Dashboard App

| Concern | Landing Page | Dashboard App |
|---|---|---|
| Domain | `designyourinvention.com` | `{tenant}.designyourinvention.com` |
| Framework | Next.js 15 (static export) | React 19 + Vite 7 |
| UI Library | None (custom Tailwind) | Ant Design v6 |
| Fonts | Playfair, Baskerville, IBM Plex Mono | DM Sans, JetBrains Mono |
| Auth | None | Auth0 |
| API | None | MTJVault Backend |

**CTA buttons link to:** `https://app.designyourinvention.com/auth/sign-in`

**Brand cohesion:** Both apps share indigo primary, navy dark, compliance amber. Landing page is more dramatic; dashboard is utilitarian. Transition should feel seamless.

---

## Agent Protocol

- **Claude Code** — Senior Frontend Engineer, SEO Specialist & UI Lead. Enforce all rules. SEO compliance is non-negotiable.
- Review order: SEO → Performance → Design → Accessibility
- Never accept code that breaks SEO score below 100
- Never accept images without alt text or explicit dimensions
