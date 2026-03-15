# CLAUDE.md — MTJVault Landing Page (designyourinvention.com)

> You are the **Senior Frontend Engineer, SEO Specialist, and UI/UX Lead** for the MTJVault Landing Page.
> Your primary responsibilities are: **SEO dominance for "IP Management" keywords**, visual excellence, performance, accessibility, and conversion.
> SEO is the #1 priority. Every decision — from HTML structure to image formats to content hierarchy — must serve organic search ranking.
> When in doubt, choose the option that ranks better.

---

## 🏗️ What We're Building

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

## 🧰 Tech Stack

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
```json
{
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postbuild": "next-sitemap"
}
```

### next.config.ts
```typescript
const nextConfig = {
    output: 'export',          // Static HTML export — no Node.js server needed
    images: {
        unoptimized: true,     // Required for static export (use manual WebP/AVIF)
    },
    trailingSlash: true,       // /features/ not /features — better for SEO
};
```

> If deploying to **Vercel**, remove `output: 'export'` to get automatic image optimization and ISR. Only use static export for non-Vercel hosts.

---

## 🔍 SEO — THE #1 PRIORITY

> Every architectural and content decision must serve organic search ranking. This section is non-negotiable.

### Target Keywords

**Primary (head terms):**
| Keyword | Search Intent | Target Page |
|---|---|---|
| IP Management Software | Commercial / Navigational | Homepage |
| Patent Docketing System | Commercial | Homepage, Features |
| Patent Portfolio Management | Commercial | Homepage, Features |
| Patent Management Software | Commercial | Homepage |
| Intellectual Property Management | Informational / Commercial | Homepage |

**Secondary (long-tail):**
| Keyword | Target Page |
|---|---|
| IP management for law firms | Features, Homepage |
| patent fee tracking software | Features |
| PCT filing management tool | Features |
| FDA 21 CFR Part 11 compliance software | Compliance |
| patent deadline management | Features |
| patent docketing for pharma | Homepage, Compliance |
| IP portfolio analytics | Features |
| patent office action tracking | Features |
| multi-tenant IP management | Features |
| patent annuity fee management | Features |

### On-Page SEO Rules

#### 1. Semantic HTML Structure (Non-Negotiable)
```html
<!-- EVERY page must have exactly ONE h1 -->
<h1>IP Management Software for Law Firms & Pharma</h1>

<!-- Heading hierarchy must be sequential — never skip levels -->
<h2>Features</h2>
  <h3>Patent Docketing</h3>
  <h3>PCT Filing Management</h3>
<h2>Compliance</h2>
  <h3>FDA 21 CFR Part 11</h3>

<!-- Use semantic elements, not div soup -->
<header>     <!-- site header/nav -->
<nav>        <!-- navigation -->
<main>       <!-- primary content -->
<section>    <!-- thematic grouping -->
<article>    <!-- self-contained content -->
<aside>      <!-- secondary content -->
<footer>     <!-- site footer -->
```

#### 2. Metadata (Every Page)
```typescript
// app/page.tsx
export const metadata: Metadata = {
    title: 'MTJVault — IP Management Software for Law Firms & Pharma',
    description: 'Enterprise patent docketing, PCT/PRV/NPE case management, and FDA 21 CFR Part 11 compliance. Trusted by IP teams worldwide.',
    keywords: ['IP management software', 'patent docketing system', 'patent portfolio management', 'FDA 21 CFR Part 11'],
    openGraph: {
        title: 'MTJVault — IP Management Software',
        description: 'Enterprise patent docketing and compliance platform.',
        url: 'https://designyourinvention.com',
        siteName: 'MTJVault',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MTJVault IP Management Platform' }],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'MTJVault — IP Management Software',
        description: 'Enterprise patent docketing and compliance platform.',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://designyourinvention.com',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};
```

#### 3. JSON-LD Structured Data (Every Page)
```typescript
// components/JsonLd.tsx — render in layout.tsx
const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MTJVault',
    url: 'https://designyourinvention.com',
    logo: 'https://designyourinvention.com/logo.png',
    description: 'Enterprise IP management and patent docketing platform.',
    sameAs: [
        // Add social profiles when available
    ],
};

const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MTJVault',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Multi-tenant IP management software for patent docketing, PCT/PRV/NPE case management, and FDA 21 CFR Part 11 compliance.',
    offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '0',
        highPrice: '299',
        offerCount: '3',
    },
    featureList: [
        'Patent Docketing',
        'Application Family Management',
        'PRV Application Tracking',
        'PCT Filing Management',
        'NPE Case Management',
        'Office Action Tracking',
        'Patent Fee Management',
        'Document Management',
        'Audit Trail with FDA 21 CFR Part 11 Compliance',
        'Multi-tenant Architecture',
        'Role-Based Access Control',
        'CSV Export',
        'Deadline Reminders',
        'Fee Analytics Dashboard',
    ],
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is IP management software?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'IP management software is a specialized platform that helps law firms, corporations, and patent teams manage their intellectual property portfolios — including patent applications, PCT filings, office actions, deadlines, and compliance requirements.',
            },
        },
        // More FAQ items...
    ],
};
```

#### 4. Image SEO
- **All images must have descriptive `alt` text** containing relevant keywords (naturally, not stuffed)
- **Use WebP format** for all raster images (AVIF as progressive enhancement)
- **Use SVG** for icons, logos, and geometric illustrations
- **Filename convention**: `patent-docketing-dashboard.webp` not `screenshot1.webp`
- **next/image dimensions**: always specify `width` and `height` to prevent CLS
- **Lazy load below-fold images**: `loading="lazy"` (default in next/image)
- **Eager load above-fold images**: `priority={true}` on hero images

#### 5. Internal Linking
- Every section heading should be linkable (anchor IDs)
- Footer must link to all pages/sections
- Use descriptive link text: "View patent docketing features" not "Click here"
- Breadcrumb-style navigation on sub-pages

#### 6. Content Quality Rules
- **Write for humans first, search engines second** — Google penalises keyword stuffing
- **First 100 words of the page must contain the primary keyword** naturally
- **Each section should answer a specific search query** the user might have
- **FAQ section must contain real questions** patent attorneys search for
- **Minimum 1,500 words of meaningful content** on the homepage (spread across sections)
- **Unique content on every page** — no duplicate paragraphs between pages

### Technical SEO

#### Sitemap (next-sitemap config)
```javascript
// next-sitemap.config.js
module.exports = {
    siteUrl: 'https://designyourinvention.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    outDir: './out',               // for static export
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
        ],
        additionalSitemaps: [],
    },
};
```

#### Performance Targets (Core Web Vitals = Ranking Signal)
| Metric | Target | Why |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Google ranking factor |
| FID (First Input Delay) | < 100ms | Google ranking factor |
| CLS (Cumulative Layout Shift) | < 0.1 | Google ranking factor |
| Lighthouse Performance | > 95 | Composite score |
| Lighthouse SEO | 100 | Must be perfect |
| Lighthouse Accessibility | > 95 | Supports SEO |
| TTI (Time to Interactive) | < 3.5s | User experience |

#### Performance Rules
- **Zero render-blocking CSS** — Tailwind is purged at build time
- **Defer non-critical JS** — Framer Motion animations load after paint
- **Preload critical fonts** — `next/font` handles this automatically
- **No layout shift** — all images/embeds have explicit dimensions
- **Minimal JS bundle** — static export = no React hydration on pure content pages
- **Use `loading="lazy"` on all below-fold images**
- **Preconnect to external origins** if any (Google Fonts is handled by next/font)

---

## 🎨 Design System

### Aesthetic Direction

**Design Reference: Ironclad.com** — legal tech SaaS that communicates trust, authority, and modernity. Clean, spacious, light background, professional. Product screenshots as proof.

**Layout Concept: Patent Family Tree with Railway-style animated spine** — A single indigo SVG line grows continuously from top to bottom as the user scrolls (like Railway.app's landing page). At key points, the line branches into child nodes (cards) that fade in as the line reaches them. The line IS the page — it's the spine that connects everything. Cards are fruits on the tree.

**Background: Light** — matches the dashboard app. White/off-white base with white cards. One optional dark navy section (hero or final CTA) for dramatic contrast.

```
<frontend_aesthetics>
Avoid generic "AI slop" aesthetics. Make creative, distinctive frontends that surprise and delight.

Typography: Beautiful, unique fonts. Avoid Inter, Roboto, Arial, system fonts.
             Use: Playfair Display (display), IBM Plex Mono (data/code), Libre Baskerville (body)

Color: Light background matching the dashboard app.
       Page background: #ffffff or #f8f9fa (light, clean)
       Cards: #ffffff with subtle shadow + #e2e8f0 border
       Tree connector: #6366F1 (indigo) with subtle glow
       Headings: #0f172a (dark navy text)
       Body text: #64748b (secondary)
       CTA buttons: #6366F1 (indigo, solid)
       Compliance accent: #d97706 (amber — compliance section only)
       Optional dark section: #0f1b2d (hero or final CTA only)

Motion: Railway.app-style continuous line drawing.
        One SVG path for the entire tree — mapped to scroll position via
        Framer Motion useScroll() + useTransform() → pathLength.
        Cards fade in with whileInView when the line reaches them.
        Branch points use SVG cubic bezier curves for smooth splits.
        The tree GROWS as you scroll — it feels alive.

Backgrounds: Light base (#ffffff or #f8f9fa) — clean and open.
             White cards with subtle shadows float above the background.
             Indigo tree line is the visual anchor running down the center.
             Optional: one dark navy section for hero or CTA contrast.
             Subtle dot grid or geometric pattern on light bg (very faint).

NEVER: All-dark pages, purple gradients, Inter/Roboto/Space Grotesk,
       static flat layouts with no motion, generic SaaS templates.
</frontend_aesthetics>
```

### The Tree Animation — How It Works

The tree is the soul of the page. It's inspired by Railway.app's vertical line but adapted as a patent family tree:

```
1. Page loads → a single indigo line starts at the hero section
2. User scrolls → the line DRAWS downward, following scroll position
   (Framer Motion useScroll → useTransform → SVG pathLength)
3. Line reaches a branch point → SPLITS left/right with bezier curves
4. Each branch extends into a card → card FADES IN as line reaches it
5. Branches MERGE back → single line continues downward
6. Repeat branching at pricing (3 branches) and other sections
7. Line ends at the final CTA → the tree is complete

The line is always:
  - Centered on the page
  - Indigo (#6366F1) with a subtle glow shadow
  - 2-3px width
  - Smooth cubic bezier curves at branch points
  - Dot/circle markers at branch nodes
```

**Key technical detail:** The entire tree is ONE continuous SVG `<path>` element overlaid on the page. The `pathLength` is animated from 0 to 1 based on scroll progress. Cards are positioned absolutely or in the flow, and fade in based on their position relative to the scroll-driven line.

**Responsive:** On mobile (< 768px), the tree collapses to a single vertical line (no branches) with cards stacked linearly. The branching only appears on desktop (>= 1024px).

### Color Palette (Light Background — Matches Dashboard)

Colors are derived from the dashboard's `global.css` for brand cohesion:

```css
:root {
    /* Page background — light, matching dashboard content area */
    --page-bg: #ffffff;
    --page-bg-alt: #f8f9fa;
    --card-bg: #ffffff;
    --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
    --card-border: #e2e8f0;

    /* Primary — matches dashboard --primary */
    --primary: #6366F1;
    --primary-light: #818cf8;
    --primary-dark: #4f46e5;

    /* Dark section (hero or CTA only) — matches dashboard --sidebar-bg */
    --navy: #0f1b2d;
    --navy-light: #1b2f54;

    /* Text — matches dashboard */
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --text-muted: #94a3b8;
    --text-on-dark: #e2e8f0;

    /* Compliance accent — matches dashboard --compliance */
    --compliance: #d97706;

    /* Status — matches dashboard */
    --success: #059669;
    --danger: #dc2626;

    /* Tree — the visual spine of the page */
    --tree-line: #6366F1;
    --tree-line-width: 2.5px;
    --tree-glow: 0 0 8px rgba(99, 102, 241, 0.25);
    --tree-node-dot: #6366F1;
    --tree-node-dot-size: 10px;
}
```

### Why Light Background?

The dashboard app uses a light content area (#f5f5f5) with white cards. The landing page should feel like the **same brand** — when a user clicks "Start Free Trial" and enters the dashboard, the transition is seamless. Light background also:
- Makes the indigo tree line pop as the visual anchor
- Feels more Ironclad (their page is mostly light)
- Cards with subtle shadows look premium on white
- Better readability for long-form content (features, FAQ)

### Typography

```typescript
// app/fonts.ts
import { Playfair_Display, Libre_Baskerville, IBM_Plex_Mono } from 'next/font/google';

export const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',               // Critical for CLS
    variable: '--font-display',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const baskerville = Libre_Baskerville({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-body',
    weight: ['400', '700'],
});

export const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
    weight: ['400', '500', '600'],
});
```

**Usage rules:**
| Font | Usage | CSS Variable |
|---|---|---|
| Playfair Display | Headings (h1–h3), hero text, section titles | `--font-display` |
| Libre Baskerville | Body text, paragraphs, descriptions | `--font-body` |
| IBM Plex Mono | Data points, statistics, code snippets, pricing | `--font-mono` |

### Responsive Breakpoints
```
sm: 640px    (large mobile)
md: 768px    (tablet)
lg: 1024px   (small desktop)
xl: 1280px   (standard desktop — primary target)
2xl: 1536px  (large monitors)
```

Test at: 375px (iPhone SE), 768px (iPad), 1280px (laptop), 1920px (desktop).

---

## 🏛️ Architecture

### Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata, JsonLd
│   ├── page.tsx                # Homepage (all sections)
│   ├── features/
│   │   └── page.tsx            # Features deep-dive (optional sub-page)
│   ├── compliance/
│   │   └── page.tsx            # FDA compliance deep-dive (optional sub-page)
│   ├── pricing/
│   │   └── page.tsx            # Pricing page (optional sub-page)
│   ├── robots.ts               # Dynamic robots.txt
│   ├── sitemap.ts              # Dynamic sitemap
│   └── not-found.tsx           # Custom 404
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav with CTA
│   │   └── Footer.tsx          # Links, legal, social
│   ├── sections/
│   │   ├── HeroSection.tsx     # Above-the-fold hero
│   │   ├── FeaturesSection.tsx  # Product features grid
│   │   ├── ComplianceSection.tsx # FDA 21 CFR Part 11
│   │   ├── PricingSection.tsx   # Tier cards
│   │   ├── FaqSection.tsx       # Accordion FAQ with schema
│   │   ├── CtaSection.tsx       # Final call-to-action
│   │   └── TestimonialsSection.tsx # Social proof (when available)
│   ├── ui/
│   │   ├── Button.tsx          # Styled button variants
│   │   ├── Badge.tsx           # Feature badges
│   │   ├── Card.tsx            # Feature/pricing cards
│   │   └── Container.tsx       # Max-width wrapper
│   ├── seo/
│   │   ├── JsonLd.tsx          # Structured data component
│   │   └── Breadcrumbs.tsx     # Breadcrumb with schema
│   └── motion/
│       ├── FadeIn.tsx          # Scroll-triggered fade
│       ├── StaggerChildren.tsx  # Staggered reveal
│       └── CountUp.tsx         # Animated number counter
├── lib/
│   ├── constants.ts            # Site-wide constants, URLs
│   └── metadata.ts             # Shared metadata helpers
├── styles/
│   └── globals.css             # Tailwind directives, CSS variables
└── public/
    ├── og-image.png            # 1200x630 Open Graph image
    ├── favicon.ico
    ├── apple-touch-icon.png
    └── images/
        ├── hero-dashboard.webp  # Hero screenshot
        └── ...                  # Feature screenshots
```

### Page Architecture

**Single-Page with 3 routes:**

```
/                → Main landing page (all sections, single long page)
/pricing/        → Dedicated pricing page (SEO value)
/contact/        → Contact form / Request Demo

Nav hash links:  #features, #compliance, #pricing, #faq (smooth scroll)
Future pages:    /about, /blog, /resources, /solutions
```

---

## 📄 Page Sections — Family Tree Layout (Light Background)

The page has a **light background** (white / #f8f9fa). A single **indigo SVG line** runs down the center of the page like a spine — it draws continuously as the user scrolls (Railway.app style). At key moments, the line branches into child cards that fade in. This is a patent family tree growing in real-time.

### Tree Structure Overview

```
    Light background (#ffffff) throughout
    Indigo line (#6366F1) runs down the center

                    ┌─────────────────┐
                    │   Hero (Root)   │  ← Optional dark navy OR light with bold text
                    │  Product mockup │
                    └────────┬────────┘
                             │  ← Indigo line DRAWS downward with scroll
                             ●  ← Node dot
                    ┌────────▼────────┐
                    │   Logo Bar      │  ← "Trusted by IP teams worldwide"
                    └────────┬────────┘
                             │  ← Line continues drawing
                             ●
                    ┌────────┴────────┐  ← Line CURVES left and right
                    │                 │
              ┌─────▼─────┐    ┌─────▼─────┐
              │ Features  │    │ Compliance │  ← White cards with shadow
              │  (expand  │    │ (FDA 21CFR)│     fade in as line reaches
              │   below)  │    │            │
              └─────┬─────┘    └─────┬─────┘
                    │                │
              ┌─────▼─────┐    ┌─────▼─────┐
              │ 4 feature │    │ Checklist  │  ← Feature detail cards
              │   cards   │    │ + screenshot│
              └─────┬─────┘    └─────┬─────┘
                    │                │
                    └────────┬───────┘  ← Lines MERGE back
                             ●
                    ┌────────▼────────┐
                    │  How It Works   │  ← 3-step process
                    │  (01, 02, 03)   │
                    └────────┬────────┘
                             │
                             ●
                    ┌────────┴─────────────┐  ← Line splits into 3
                    │         │            │
              ┌─────▼───┐ ┌──▼────┐ ┌─────▼───┐
              │ Starter │ │  Pro  │ │Enterprise│  ← Pricing cards
              └─────────┘ └───────┘ └──────────┘
                             │
                             ●  ← Merge back
                    ┌────────▼────────┐
                    │      FAQ        │  ← Accordion
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  CTA (Leaf)     │  ← Optional dark navy for contrast
                    │  "Get Started"  │
                    └─────────────────┘
                             ●  ← Tree ends (leaf node)
```

### The SVG Tree Spine — Technical Detail

```typescript
// The entire tree is ONE SVG overlaid on the page
// It's positioned fixed/absolute with pointer-events: none
// The path includes all verticals, branches, and merges

<svg className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-10">
    <motion.path
        d="M 0,0 L 0,400           // vertical down to logo bar
           L 0,600                   // continue to branch point
           C 0,620 -200,640 -200,660 // curve left (features)
           C 0,620  200,640  200,660 // curve right (compliance)
           ..."                      // continue for all sections
        stroke="var(--tree-line)"
        strokeWidth="var(--tree-line-width)"
        fill="none"
        style={{ pathLength: scrollProgress }}  // 0 to 1 based on scroll
        filter="url(#glow)"        // subtle indigo glow
    />
    {/* Node dots at branch points */}
    <motion.circle cx="0" cy="400" r="5" fill="var(--tree-node-dot)"
        style={{ opacity: dotOpacity }} />
</svg>

// scrollProgress comes from:
const { scrollYProgress } = useScroll();
const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
```
                    ┌────────▼────────┐
                    │    CTA (Leaf)   │  ← Final conversion
                    └─────────────────┘
```

### Connector Line Component

```typescript
// components/tree/TreeConnector.tsx
'use client';
import { motion } from 'framer-motion';

interface TreeConnectorProps {
    height?: number;
    branches?: 'none' | 'split-2' | 'split-3' | 'merge';
}

// Vertical SVG line that draws on scroll using Framer Motion pathLength
// Branches split left/right with curved connectors
// Color: var(--tree-connector) = #6366F1
// Glow effect: subtle box-shadow with var(--tree-connector-glow)
```

### Section 1: Hero (Root Node)

```
+----------------------------------------------------------+
| [Nav: Logo | Features | Compliance | Pricing | FAQ | CTA] |
+----------------------------------------------------------+
|  (light background — #ffffff or #f8f9fa)                   |
|                                                            |
|   Design Your Invention's                                  |
|   *Future*                                                 |
|    ↑ Playfair Display    ↑ italic indigo accent            |
|                                                            |
|   The modern patent IP management platform for pharma      |
|   companies and law firms. Visualize your portfolio         |
|   like never before.                                       |
|        ↑ Libre Baskerville body text, --text-secondary     |
|                                                            |
|   [Start Free Trial →]  [Watch Demo]                       |
|    ↑ indigo solid          ↑ outline/ghost variant         |
|                                                            |
|   [Hero image: floating dashboard screenshot]              |
|    ↑ Real screenshot with shadow + slight perspective      |
|      Shows families table or family tree visualization     |
|                                                            |
|              ● ← First tree node dot appears here          |
|              │ ← Indigo line starts drawing downward       |
+----------------------------------------------------------+
```

**SEO notes:**
- `<h1>` must contain "IP Management Software" — this is the primary keyword
- First paragraph must naturally include "patent docketing", "law firms", "pharma"
- Hero image: `alt="MTJVault IP management dashboard showing patent portfolio overview"`
- CTA buttons: link to Auth0 signup or Calendly demo booking

### Section 2: Features

```
+----------------------------------------------------------+
| Why IP Teams Choose MTJVault                               |
+----------------------------------------------------------+
| [Icon] Patent Docketing    | [Icon] PCT Filing Mgmt      |
| Track every patent          | International filings with   |
| application from filing     | PCT 22 and 30/31 date        |
| to grant in one view.       | tracking built in.           |
+----------------------------------------------------------+
| [Icon] PRV Applications    | [Icon] NPE Case Management  |
| Provisional applications    | Full NPE lifecycle with      |
| linked to families with     | office actions, deadlines,   |
| priority date tracking.     | and response tracking.       |
+----------------------------------------------------------+
| [Icon] Fee Management      | [Icon] Document Vault        |
| 42 fee types across 8       | Secure upload, version       |
| categories. Track paid,     | control, and presigned       |
| due, waived, and overdue.   | S3 downloads.                |
+----------------------------------------------------------+
| [Icon] Deadline Reminders  | [Icon] Audit Trail           |
| Never miss a filing         | Every change logged with     |
| deadline. Calendar and      | who, what, when, and why.    |
| list views with filters.    | FDA 21 CFR Part 11 ready.    |
+----------------------------------------------------------+
| [Icon] Multi-Tenant        | [Icon] Role-Based Access     |
| Each firm gets isolated     | Admin, Attorney, Paralegal,  |
| data. Subdomain-based       | Viewer roles with granular   |
| tenant resolution.          | permission controls.          |
+----------------------------------------------------------+
| [Icon] CSV Export           | [Icon] Bulk Actions          |
| Export any docket view       | Select multiple records for  |
| to CSV with one click.       | status changes, deletion,    |
| All columns included.        | or export operations.         |
+----------------------------------------------------------+
```

**SEO notes:**
- `<h2>` with keyword variation: "Why IP Teams Choose MTJVault" or "Patent Management Features"
- Each feature card is an `<article>` with its own `<h3>`
- Feature descriptions should naturally contain long-tail keywords
- This section is critical for ranking on feature-specific queries

### Section 3: Compliance

```
+----------------------------------------------------------+
| FDA 21 CFR Part 11 Compliance — Built In, Not Bolted On   |
+----------------------------------------------------------+
|                                                            |
| [Visual: Audit trail screenshot or compliance checklist]   |
|                                                            |
| ✓ Reason-for-change on every critical field edit           |
| ✓ Full audit trail with user, timestamp, and diff          |
| ✓ Electronic signature flow with re-authentication         |
| ✓ Immutable audit records — no edit or delete              |
| ✓ Role-based access control (RBAC)                         |
| ✓ Secure document management with version control          |
|                                                            |
| [Learn More About Compliance]                              |
|                                                            |
+----------------------------------------------------------+
```

**SEO notes:**
- `<h2>` containing "FDA 21 CFR Part 11 Compliance"
- This section targets pharma companies searching for compliance software
- Bullet points map directly to the product's actual compliance features
- Consider a dedicated `/compliance/` page later for deeper content

### Section 4: Pricing

```
+----------------------------------------------------------+
| Simple, Transparent Pricing                                |
+----------------------------------------------------------+
| +----------------+ +------------------+ +----------------+ |
| | Starter        | | Professional     | | Enterprise     | |
| |                | | (RECOMMENDED)    | |                | |
| | $XX/mo         | | $XX/mo           | | Custom         | |
| |                | |                  | |                | |
| | ✓ Feature 1    | | ✓ Everything in  | | ✓ Everything   | |
| | ✓ Feature 2    | |   Starter        | |   in Pro       | |
| | ✓ Feature 3    | | ✓ Feature 4      | | ✓ SSO/SAML     | |
| |                | | ✓ Feature 5      | | ✓ Dedicated    | |
| | [Start Free]   | | [Start Free]     | | [Contact Us]   | |
| +----------------+ +------------------+ +----------------+ |
+----------------------------------------------------------+
```

**SEO notes:**
- `<h2>`: "Simple, Transparent Pricing" or "IP Management Software Pricing"
- Pricing schema markup (already in SoftwareApplication schema)
- Each tier in its own `<article>` element

### Section 5: FAQ

```
+----------------------------------------------------------+
| Frequently Asked Questions                                 |
+----------------------------------------------------------+
| [+] What is IP management software?                       |
|     IP management software is a specialized platform...    |
|                                                            |
| [+] How does MTJVault handle FDA 21 CFR Part 11?          |
|     MTJVault has compliance built into every workflow...   |
|                                                            |
| [+] Can I manage PCT and PRV filings in one place?        |
|     Yes. MTJVault links PRV, PCT, and NPE cases to...     |
|                                                            |
| [+] What patent fee types does MTJVault support?           |
|     MTJVault supports 42 fee types across 8 categories... |
|                                                            |
| [+] Is MTJVault multi-tenant?                              |
|     Yes. Each organization gets a dedicated subdomain...   |
|                                                            |
| [+] How does role-based access control work?               |
|     MTJVault supports four roles: Tenant Admin, ...        |
|                                                            |
| [+] Can I export my data?                                  |
|     Yes. Every list view supports CSV export with...       |
|                                                            |
| [+] What security measures are in place?                   |
|     MTJVault uses Auth0 for authentication with in-memory..|
+----------------------------------------------------------+
```

**SEO notes:**
- **This section directly generates FAQ rich snippets in Google** via FAQPage schema
- Questions must be real queries patent attorneys search for
- Answers should be 2-4 sentences — concise but complete
- Each Q&A is indexed separately by Google — high-value SEO real estate

### Section 6: CTA (Final)

```
+----------------------------------------------------------+
| Ready to Modernise Your IP Management?                     |
|                                                            |
| Join law firms and pharma teams who trust MTJVault         |
| for patent docketing and compliance.                       |
|                                                            |
| [Start Free Trial]        [Schedule a Demo]                |
+----------------------------------------------------------+
```

### Header (Sticky Nav)

```
+----------------------------------------------------------+
| [Logo]  Features  Compliance  Pricing  FAQ    [Get Started]|
+----------------------------------------------------------+
```

- Sticky on scroll with background blur
- Mobile: hamburger menu with full-screen overlay
- "Get Started" button always visible (CTA)
- Smooth scroll to sections on click

### Footer

```
+----------------------------------------------------------+
| MTJVault                                                   |
|                                                            |
| Product           Company          Legal                   |
| Features          About            Privacy Policy          |
| Pricing           Contact          Terms of Service        |
| Compliance        Blog (future)    Cookie Policy           |
| Documentation                                              |
|                                                            |
| © 2026 MTJVault. All rights reserved.                     |
+----------------------------------------------------------+
```

---

## ⚠️ NON-NEGOTIABLE RULES

### SEO Rules
1. **Every page has exactly one `<h1>`** — containing the primary keyword for that page
2. **Heading hierarchy is sequential** — never skip from h2 to h4
3. **Every page has unique metadata** — title, description, OG tags, canonical URL
4. **JSON-LD structured data on every page** — Organization + SoftwareApplication + FAQPage (where applicable)
5. **All images have descriptive alt text** — relevant keywords, natural language
6. **All images are WebP** — with explicit width/height to prevent CLS
7. **Sitemap and robots.txt are auto-generated** — and kept current
8. **Canonical URLs on every page** — prevent duplicate content
9. **Internal links use descriptive anchor text** — never "click here"
10. **No orphan pages** — every page is reachable from navigation and sitemap

### Performance Rules
11. **Lighthouse Performance score > 95** on every page
12. **Lighthouse SEO score = 100** — non-negotiable
13. **LCP < 2.5s** — hero image must be priority-loaded
14. **CLS < 0.1** — all fonts use `display: swap`, all images have dimensions
15. **No render-blocking resources** — fonts via next/font, CSS purged by Tailwind
16. **Lazy load below-fold images** — `loading="lazy"` on everything below hero
17. **Preload hero image** — `priority={true}` on the hero Image component

### Code Quality Rules
18. **No `any` types** — TypeScript strict mode
19. **No `dangerouslySetInnerHTML`** — content is static, no excuse
20. **No inline styles** — use Tailwind classes or CSS variables
21. **All components are Server Components by default** — only add `"use client"` for interactive components (animations, accordions, mobile menu)
22. **Minimise client components** — every `"use client"` boundary adds to the JS bundle
23. **No external scripts in `<head>`** — defer analytics/tracking to after hydration
24. **4-space indentation** in all files

### Accessibility Rules
25. **WCAG AA colour contrast** — especially on navy backgrounds with parchment text
26. **All interactive elements keyboard navigable** — tab order, focus rings
27. **Skip-to-content link** — first focusable element on the page
28. **Reduced motion support** — `prefers-reduced-motion` disables Framer Motion animations
29. **Semantic HTML** — every section, nav, header, footer, article, main is correct
30. **Form labels** — if contact form is added, all inputs have labels

### Content Rules
31. **No lorem ipsum** — every text element must be real, relevant content
32. **No stock photos** — use product screenshots, custom illustrations, or geometric patterns
33. **No keyword stuffing** — write naturally, optimize structure not repetition
34. **No AI-generated filler text** — Google detects and penalises thin/repetitive content

---

## 🎬 Animation Guidelines

### Framer Motion Patterns

```typescript
// components/motion/FadeIn.tsx
'use client';
import { motion } from 'framer-motion';

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    );
}
```

### Animation Rules
- **One entrance animation per element** — no looping, no bounce
- **Staggered reveals** for grids/lists — 0.1s delay between children
- **`viewport={{ once: true }}`** — animate once on scroll, don't replay
- **Respect `prefers-reduced-motion`** — wrap all motion in a check:
  ```typescript
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  ```
- **No animations on critical content** — h1, nav, and hero text must be visible without JS
- **Keep total animation JS < 30KB gzipped** — Framer Motion tree-shakes well but monitor it

### Background Effects
- Navy-to-darker gradients on dark sections
- Subtle geometric grid patterns (CSS `background-image`, not images)
- Radial gradient spotlight effects behind key content
- No particle effects, no canvas animations — they tank performance

---

## 📋 Build Order

```
1. Foundation
   → Next.js 15 project setup with App Router
   → TypeScript strict mode
   → Tailwind CSS v4 with CSS variables
   → next/font with Playfair Display, Libre Baskerville, IBM Plex Mono
   → Global styles (CSS variables, colour palette)
   → Container component (max-width wrapper)
   → Button component (primary, secondary, ghost variants)

2. Layout
   → Header (sticky nav, mobile hamburger, CTA button)
   → Footer (links grid, legal, copyright)
   → Root layout.tsx (fonts, metadata, JsonLd, Header, Footer)

3. Homepage Sections (in visual order)
   → HeroSection (h1, subtitle, CTAs, hero image)
   → FeaturesSection (12-feature grid with icons)
   → ComplianceSection (FDA checklist, screenshot)
   → PricingSection (3-tier cards)
   → FaqSection (accordion with FAQPage schema)
   → CtaSection (final conversion block)

4. SEO Layer
   → JSON-LD structured data (Organization, SoftwareApplication, FAQPage)
   → Metadata on every page
   → Sitemap generation (next-sitemap)
   → robots.txt
   → Open Graph image (1200x630)
   → Canonical URLs

5. Motion Layer
   → FadeIn component (scroll-triggered)
   → StaggerChildren component (grid reveals)
   → Hero entrance animation (staggered text + image)
   → Reduced motion support

6. Performance Audit
   → Lighthouse audit (target: Perf 95+, SEO 100, A11y 95+)
   → Bundle analysis (next build --analyze)
   → Image optimization (WebP, dimensions, lazy loading)
   → Core Web Vitals verification
```

---

## 🧪 Testing Checklist

### SEO Validation
- [ ] `<h1>` present on every page with primary keyword
- [ ] Heading hierarchy sequential (no skipped levels)
- [ ] Unique `<title>` and `<meta description>` on every page
- [ ] Canonical URL set on every page
- [ ] JSON-LD validates at schema.org/validator (no errors)
- [ ] Open Graph tags render correctly (use og debugger tools)
- [ ] Twitter Card tags render correctly
- [ ] Sitemap.xml accessible and lists all pages
- [ ] robots.txt allows indexing
- [ ] All images have descriptive alt text
- [ ] All images are WebP with explicit dimensions
- [ ] No broken links (internal or external)
- [ ] FAQ section generates rich snippets in Google's Rich Results Test
- [ ] Page loads meaningful content without JavaScript (SSG)

### Performance Validation
- [ ] Lighthouse Performance > 95 (desktop)
- [ ] Lighthouse Performance > 90 (mobile)
- [ ] Lighthouse SEO = 100
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse Best Practices > 95
- [ ] LCP < 2.5s on 4G connection
- [ ] CLS < 0.1 (no layout shift from fonts/images)
- [ ] No render-blocking resources in Network tab
- [ ] Total JS bundle < 100KB gzipped (excluding Framer Motion)
- [ ] Hero image loads with priority (not lazy)
- [ ] Below-fold images lazy load

### Visual Validation
- [ ] Fonts load correctly (Playfair, Baskerville, IBM Plex Mono)
- [ ] Colour palette matches spec (navy, parchment, amber)
- [ ] No flash of unstyled text (FOUT)
- [ ] Animations trigger on scroll (staggered reveals)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Background gradients/patterns render correctly

### Responsive Validation
- [ ] 375px (iPhone SE): single column, hamburger menu, no overflow
- [ ] 768px (iPad): 2-column features, nav still works
- [ ] 1280px (laptop): full layout, 3-column pricing
- [ ] 1920px (desktop): content doesn't stretch beyond max-width
- [ ] No horizontal scrollbar at any breakpoint
- [ ] Touch targets > 44px on mobile

### Accessibility Validation
- [ ] Skip-to-content link works
- [ ] Tab navigation reaches all interactive elements
- [ ] Focus rings visible on all interactive elements
- [ ] Colour contrast passes WCAG AA (check navy + parchment combos)
- [ ] Screen reader announces sections and headings correctly
- [ ] Mobile menu is keyboard accessible and traps focus

---

## 🤝 Agent Collaboration Protocol

- **You (Claude Code)** — Senior Frontend Engineer, SEO Specialist & UI Lead. Review all code. Enforce all rules. SEO compliance is non-negotiable. Do not execute any plan until the Human Developer confirms.
- **GPT Codex** — Developer agent. Produces implementations. All code reviewed before merging. Always write code with 4-space indentation.
- **Human developers** — Product owners. Final say on product decisions.

When reviewing code:
1. Check SEO rules first — metadata, structured data, semantic HTML, heading hierarchy
2. Check performance — no render-blocking resources, images optimized, lazy loading
3. Check design — fonts, colors, spacing match the aesthetic spec
4. Check accessibility — contrast, keyboard nav, screen reader compatibility
5. Never accept code that breaks SEO score below 100
6. Never accept images without alt text or explicit dimensions

---

## 🔗 Relationship to Dashboard App

| Concern | Landing Page | Dashboard App |
|---|---|---|
| Domain | `designyourinvention.com` | `{tenant}.designyourinvention.com` |
| Framework | Next.js 15 (static export) | React 19 + Vite 7 |
| UI Library | None (custom Tailwind) | Ant Design v6 |
| Fonts | Playfair, Baskerville, IBM Plex Mono | DM Sans, JetBrains Mono |
| Colors | Indigo #6366F1, Navy #0f1b2d, Compliance #d97706 | Same palette (from global.css) |
| Auth | None | Auth0 |
| API | None | MTJVault Backend |
| Repo | Separate | Separate |
| Deployment | Vercel / S3+CloudFront | S3+CloudFront (wildcard subdomain) |
| Design Reference | Ironclad.com + Family Tree layout | Enterprise utility (AntD) |

**The CTA buttons link to:** `https://app.designyourinvention.com/auth/sign-in` or the Auth0 universal login page. This is the only connection between the two apps.

**Brand cohesion:** Both apps share the same indigo primary, navy dark tones, and compliance amber. The landing page is more dramatic (dark hero, animated tree connectors), while the dashboard is clean and utilitarian. A user clicking "Start Free Trial" should feel the transition is seamless.
