'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Sparkles,
    KeyRound,
    Users,
    ScrollText,
    Building2,
    Database,
    type LucideIcon,
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────
   SecurityMoatDiagram
   ──────────────────────────────────────────────────────────────────────
   Auto-cycling architecture diagram. The hexagonal mark's six facets
   each represent a security layer; every 4 seconds the active facet
   advances, the matching card highlights, and a node line draws out
   from the facet ending in the layer name.

   Facet → layer mapping (light → dark = surface → bedrock):
       0  top-right (lightest #A5B4FC) → AI Intelligence (Zero Retention)
       1  right             #818CF8    → Auth0 SSO
       2  bottom-right      #6366F1    → RBAC
       3  bottom-left       #4F46E5    → Audit Trails
       4  left              #312E81    → Tenant Isolation
       5  top-left (darkest #0F1B2D)  → Row-Level Security
   ────────────────────────────────────────────────────────────────────── */

interface Layer {
    title: string;
    description: string;
    Icon: LucideIcon;
}

const LAYERS: readonly Layer[] = [
    {
        title: 'AI Intelligence (Zero Retention)',
        description:
            'Claude API integration on the zero data retention tier. The feature that attracts prospects first.',
        Icon: Sparkles,
    },
    {
        title: 'Auth0 SSO',
        description:
            'Enterprise SSO with Auth0 Organizations. SAML and OIDC federation per tenant.',
        Icon: KeyRound,
    },
    {
        title: 'RBAC',
        description:
            'Four roles (Admin, Attorney, Paralegal, Read-only) plus granular permissions, enforced in your database, not in Auth0.',
        Icon: Users,
    },
    {
        title: 'Audit Trails',
        description:
            'Immutable, append-only logging on every mutation. The compliance feature pharma firms ask about first.',
        Icon: ScrollText,
    },
    {
        title: 'Tenant Isolation',
        description:
            "withTenantContext() transaction scoping. No tenant can ever see another's data.",
        Icon: Building2,
    },
    {
        title: 'Row-Level Security',
        description:
            "FORCE ROW LEVEL SECURITY on every table. The bedrock that even a rogue query can't bypass.",
        Icon: Database,
    },
];

interface FacetGeometry {
    points: string;
    line: { x1: number; y1: number; x2: number; y2: number };
    dot: { cx: number; cy: number };
    /** Label text split into 1 or 2 lines so it always fits inside the SVG
     *  viewBox at every viewport. The cards below carry the verbose title;
     *  these labels are the short visual annotation on the cube itself. */
    labelLines: readonly string[];
    labelX: number;
    /** y of the FIRST line baseline. Subsequent lines are positioned via
     *  tspan dy="1.1em". For top labels we set this to a negative number so
     *  the LAST line lands just above the dot. */
    labelY: number;
    labelAnchor: 'start' | 'end';
    annotationColor: string;
    gradId: string;
}

const FACETS: readonly FacetGeometry[] = [
    /* 0 — top-right (lightest) */
    {
        points: '340,50 440,108 340,175',
        line: { x1: 390, y1: 79, x2: 430, y2: 0 },
        dot: { cx: 430, cy: 0 },
        labelLines: ['AI', 'Intelligence'],
        labelX: 438,
        labelY: -14,
        labelAnchor: 'start',
        annotationColor: '#A5B4FC',
        gradId: 'moat-g0',
    },
    /* 1 — right
     * Line endpoint pulled in from x=540 → 520 so the "Auth0" tspan at
     * fontSize 12 with anchor=start fits inside the viewBox right edge (580).
     */
    {
        points: '440,108 440,233 340,175',
        line: { x1: 440, y1: 170.5, x2: 520, y2: 170 },
        dot: { cx: 520, cy: 170 },
        labelLines: ['Auth0', 'SSO'],
        labelX: 528,
        labelY: 165,
        labelAnchor: 'start',
        annotationColor: '#818CF8',
        gradId: 'moat-g1',
    },
    /* 2 — bottom-right */
    {
        points: '440,233 340,291 340,175',
        line: { x1: 390, y1: 262, x2: 430, y2: 345 },
        dot: { cx: 430, cy: 345 },
        labelLines: ['RBAC'],
        labelX: 438,
        labelY: 349,
        labelAnchor: 'start',
        annotationColor: '#6366F1',
        gradId: 'moat-g2',
    },
    /* 3 — bottom-left */
    {
        points: '340,291 240,233 340,175',
        line: { x1: 290, y1: 262, x2: 250, y2: 345 },
        dot: { cx: 250, cy: 345 },
        labelLines: ['Audit', 'Trails'],
        labelX: 242,
        labelY: 349,
        labelAnchor: 'end',
        annotationColor: '#4F46E5',
        gradId: 'moat-g3',
    },
    /* 4 — left
     * Line endpoint pulled in from x=140 → 160 so the "Isolation" tspan at
     * fontSize 12 with anchor=end fits inside the viewBox left edge (100).
     */
    {
        points: '240,233 240,108 340,175',
        line: { x1: 240, y1: 170.5, x2: 160, y2: 170 },
        dot: { cx: 160, cy: 170 },
        labelLines: ['Tenant', 'Isolation'],
        labelX: 152,
        labelY: 165,
        labelAnchor: 'end',
        annotationColor: '#818CF8',
        gradId: 'moat-g4',
    },
    /* 5 — top-left (darkest) */
    {
        points: '240,108 340,50 340,175',
        line: { x1: 290, y1: 79, x2: 250, y2: 0 },
        dot: { cx: 250, cy: 0 },
        labelLines: ['Row-Level', 'Security'],
        labelX: 242,
        labelY: -14,
        labelAnchor: 'end',
        annotationColor: '#A5B4FC',
        gradId: 'moat-g5',
    },
];

const CYCLE_MS = 4000;
const RESUME_AFTER_INTERACT_MS = 6000;

function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function SecurityMoatDiagram() {
    const [activeIdx, setActiveIdx] = useState(0);
    const cycleRef = useRef<number | null>(null);
    const resumeRef = useRef<number | null>(null);

    const stopCycle = useCallback(() => {
        if (cycleRef.current !== null) {
            window.clearInterval(cycleRef.current);
            cycleRef.current = null;
        }
        if (resumeRef.current !== null) {
            window.clearTimeout(resumeRef.current);
            resumeRef.current = null;
        }
    }, []);

    const startCycle = useCallback(() => {
        if (cycleRef.current !== null || prefersReducedMotion()) return;
        cycleRef.current = window.setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % LAYERS.length);
        }, CYCLE_MS);
    }, []);

    /* Kick off the auto-cycle on mount; clean up on unmount */
    useEffect(() => {
        startCycle();
        return stopCycle;
    }, [startCycle, stopCycle]);

    const jumpTo = useCallback(
        (i: number) => {
            stopCycle();
            setActiveIdx(i);
            if (prefersReducedMotion()) return;
            resumeRef.current = window.setTimeout(() => {
                resumeRef.current = null;
                startCycle();
            }, RESUME_AFTER_INTERACT_MS);
        },
        [startCycle, stopCycle],
    );

    const handleZoneEnter = useCallback(() => {
        stopCycle();
    }, [stopCycle]);

    const handleZoneLeave = useCallback(() => {
        if (cycleRef.current === null && resumeRef.current === null) {
            startCycle();
        }
    }, [startCycle]);

    return (
        <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-[minmax(440px,1fr)_minmax(0,1.1fr)] xl:gap-16">
            {/* ── Cube column ── */}
            <div
                className="flex w-full justify-center"
                onMouseEnter={handleZoneEnter}
                onMouseLeave={handleZoneLeave}
            >
                <svg
                    viewBox="100 -10 480 380"
                    className="w-full max-w-[480px] overflow-visible"
                    role="img"
                    aria-label="Six-layer security architecture diagram. Cube facets represent: AI Intelligence with zero data retention, Auth0 SSO, RBAC, Audit Trails, Tenant Isolation, and Row-Level Security."
                >
                    <defs>
                        <linearGradient id="moat-g0" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#A5B4FC" />
                            <stop offset="100%" stopColor="#818CF8" />
                        </linearGradient>
                        <linearGradient id="moat-g1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#818CF8" />
                            <stop offset="100%" stopColor="#6366F1" />
                        </linearGradient>
                        <linearGradient id="moat-g2" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#4F46E5" />
                        </linearGradient>
                        <linearGradient id="moat-g3" x1="1" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#4F46E5" />
                            <stop offset="100%" stopColor="#312E81" />
                        </linearGradient>
                        <linearGradient id="moat-g4" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#312E81" />
                            <stop offset="100%" stopColor="#0F1B2D" />
                        </linearGradient>
                        <linearGradient id="moat-g5" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="#0F1B2D" />
                            <stop offset="100%" stopColor="#4F46E5" />
                        </linearGradient>
                        <radialGradient id="moat-coreGlow" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Core glow halo — intensifies behind the active layer */}
                    <circle
                        cx="340"
                        cy="175"
                        r="55"
                        fill="url(#moat-coreGlow)"
                        opacity="0.55"
                    />

                    {/* Cube facets — clickable, dim when not active */}
                    {FACETS.map((facet, i) => (
                        <polygon
                            key={`facet-${i}`}
                            points={facet.points}
                            fill={`url(#${facet.gradId})`}
                            className="cursor-pointer"
                            style={{
                                opacity: i === activeIdx ? 1 : 0.22,
                                transition: 'opacity 400ms ease-out',
                            }}
                            onClick={() => jumpTo(i)}
                        />
                    ))}

                    {/* Outer hex border */}
                    <polygon
                        points="340,50 440,108 440,233 340,291 240,233 240,108"
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="1"
                        opacity="0.3"
                    />

                    {/* Inner white hexagonal core — the protected IP */}
                    <polygon
                        points="340,140 370,157 370,193 340,210 310,193 310,157"
                        fill="#ffffff"
                        opacity="0.92"
                    />
                    <circle cx="340" cy="175" r="4" fill="#6366F1" />
                    <circle cx="340" cy="175" r="1.5" fill="#ffffff" />

                    {/* Node lines, endpoint dots, and end-of-line labels.
                        Visible at every viewport. Each label is split into 1
                        or 2 lines via tspan so the text always fits inside
                        the viewBox horizontally (problem labels are stacked
                        vertically instead of overflowing horizontally). */}
                    <g pointerEvents="none">
                        {FACETS.map((facet, i) => {
                            const isActive = i === activeIdx;
                            return (
                                <g key={`anno-${i}`}>
                                    <line
                                        x1={facet.line.x1}
                                        y1={facet.line.y1}
                                        x2={facet.line.x2}
                                        y2={facet.line.y2}
                                        stroke={facet.annotationColor}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeDasharray="100"
                                        style={{
                                            strokeDashoffset: isActive ? 0 : 100,
                                            opacity: isActive ? 1 : 0,
                                            transition:
                                                'stroke-dashoffset 700ms ease-out, opacity 300ms ease-out',
                                        }}
                                    />
                                    <circle
                                        cx={facet.dot.cx}
                                        cy={facet.dot.cy}
                                        r="3.5"
                                        fill={facet.annotationColor}
                                        style={{
                                            opacity: isActive ? 1 : 0,
                                            transition: 'opacity 300ms ease-out',
                                            transitionDelay: isActive ? '500ms' : '0ms',
                                        }}
                                    />
                                    <text
                                        x={facet.labelX}
                                        y={facet.labelY}
                                        textAnchor={facet.labelAnchor}
                                        fill="#ffffff"
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            fontVariantNumeric: 'lining-nums',
                                            opacity: isActive ? 1 : 0,
                                            transition: 'opacity 350ms ease-out',
                                            transitionDelay: isActive ? '450ms' : '0ms',
                                        }}
                                    >
                                        {facet.labelLines.map((line, j) => (
                                            <tspan
                                                key={`line-${j}`}
                                                x={facet.labelX}
                                                dy={j === 0 ? 0 : '1.1em'}
                                            >
                                                {line}
                                            </tspan>
                                        ))}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </div>

            {/* ── Cards column ── */}
            <div
                className="grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2"
                onMouseEnter={handleZoneEnter}
                onMouseLeave={handleZoneLeave}
            >
                {LAYERS.map((layer, i) => {
                    const isActive = i === activeIdx;
                    const Icon = layer.Icon;
                    return (
                        <button
                            key={layer.title}
                            type="button"
                            onClick={() => jumpTo(i)}
                            aria-pressed={isActive}
                            aria-label={`${layer.title}, layer ${i + 1} of ${LAYERS.length}`}
                            className={`group relative cursor-pointer rounded-2xl border p-6 text-left transition-all duration-[350ms] ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
                                isActive
                                    ? '-translate-y-0.5 border-primary-light/55 bg-primary/[0.14] shadow-[0_12px_40px_-12px_rgba(99,102,241,0.35)]'
                                    : 'border-white/10 bg-white/[0.04] hover:border-primary-light/30 hover:bg-primary/[0.07]'
                            }`}
                        >
                            <span
                                className={`absolute right-5 top-4 font-mono text-[10px] font-semibold tracking-[0.08em] transition-opacity duration-[350ms] ${
                                    isActive
                                        ? 'text-primary-light opacity-100'
                                        : 'text-primary-light opacity-50'
                                }`}
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                {`0${i + 1}`}
                            </span>
                            <span
                                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[10px] transition-all duration-[350ms] ${
                                    isActive
                                        ? 'scale-[1.08] bg-primary-light/20 text-white'
                                        : 'bg-primary-light/[0.12] text-primary-light'
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                            </span>
                            <h3
                                className="text-[17px] font-bold leading-tight text-white"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                {layer.title}
                            </h3>
                            <p
                                className="mt-2 text-[13px] leading-relaxed text-text-on-dark/45"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {layer.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
