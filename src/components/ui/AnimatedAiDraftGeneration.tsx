'use client';

import { useState, useEffect, useCallback } from 'react';

/* ── Animated AI Draft Generation mockup — fixed height, loops infinitely ──
   Fixed height flex-col container. Sidebar stretches full height.
   State-driven phases, opacity-only transitions, dynamic dates.
   Timeline per cycle:
     0.8s  Sidebar drafts appear staggered
     2.4s  First draft selected, badges + export appear in main panel
     3.6s  Accordion section rows appear
     5.0s  Claims section expands with claim cards
     8.0s  Fade out
     8.8s  Reset
   Loops every ~9.5s. */

const TABS = ['Details', 'Related', 'Documents', 'Prior Art', 'Drafts', 'Fees', 'Audit'];

/* ── Dynamic date helper ── */
function daysAgo(n: number): string {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
}

interface DraftItem {
    status: string;
    statusColor: string;
    statusBg: string;
    jurisdiction: string;
    jurisdictionColor: string;
    version: string;
    title: string;
    daysAgo: number;
}

const DRAFTS: DraftItem[] = [
    {
        status: 'Approved',
        statusColor: '#059669',
        statusBg: '#d1fae5',
        jurisdiction: 'US',
        jurisdictionColor: '#dc2626',
        version: 'v4',
        title: 'CRISPR-Cas9 Base Editor for Sickle Cell Diseas\u2026',
        daysAgo: 0,
    },
    {
        status: 'In Review',
        statusColor: '#2563eb',
        statusBg: '#dbeafe',
        jurisdiction: 'EP',
        jurisdictionColor: '#6366f1',
        version: 'v3',
        title: 'CRISPR-Cas9 Base Editor for Sickle Cell \u2014 EP\u2026',
        daysAgo: 0,
    },
    {
        status: 'Draft',
        statusColor: '#64748b',
        statusBg: '#f1f5f9',
        jurisdiction: 'US',
        jurisdictionColor: '#dc2626',
        version: 'v2',
        title: 'CRISPR-Cas9 Base Editor for Sickle Cell Diseas\u2026',
        daysAgo: 1,
    },
    {
        status: 'In Review',
        statusColor: '#2563eb',
        statusBg: '#dbeafe',
        jurisdiction: 'WO',
        jurisdictionColor: '#0ea5e9',
        version: 'v1',
        title: 'CRISPR-Cas9 Base Editor for Sickle Cell \u2014 PCT\u2026',
        daysAgo: 3,
    },
    {
        status: 'Rejected',
        statusColor: '#dc2626',
        statusBg: '#fee2e2',
        jurisdiction: 'IN',
        jurisdictionColor: '#d97706',
        version: 'v1',
        title: 'CRISPR-Cas9 Base Editor for Sickle Cell \u2014 IPO\u2026',
        daysAgo: 5,
    },
];

const SECTIONS = [
    'Invention Details',
    'Claims',
    'Abstract',
    'Description',
    'Novelty Analysis',
    'Attorney Instructions',
    'Prior Art Snapshot',
    'AI Metadata',
];

const CLAIMS = [
    {
        number: 1,
        text: 'A composition comprising a Cas9 nickase fused to a cytidine deaminase and a single guide RNA targeting the HBB gene at codon 6, wherein the composition converts the sickle cell mutation (GAG\u2192GTG) to a benign Makassar variant (GAG\u2192GCG) with an editing efficiency of at least 80% in CD34+ hematopoietic stem cells.',
    },
    {
        number: 2,
        text: 'The composition of claim 1, wherein the cytidine deaminase comprises an engineered APOBEC3A variant with a W104A substitution that restricts the editing window to positions 4\u20138 of the protospacer.',
    },
    {
        number: 3,
        text: 'The composition of claim 2, wherein the guide RNA comprises a spacer sequence of 5\u2032-GUUUCAUAGUGAUAGACAUC-3\u2032 and a modified scaffold with 2\u2032-O-methyl and phosphorothioate modifications at the first and last three nucleotides.',
    },
];

const NOVELTY_TEXT = [
    { level: 'High', color: '#dc2626', bg: '#fee2e2', ref: 'WO2026048712A1', text: 'Overlapping bispecific antibody architecture — differentiate by dual-targeting mechanism and binding affinity range.' },
    { level: 'Medium', color: '#d97706', bg: '#fef3c7', ref: 'EP4285631B1', text: 'Similar NK cell modification approach — emphasize distinct cytokine signaling pathway and manufacturing process.' },
    { level: 'Low', color: '#059669', bg: '#d1fae5', ref: 'US20260078423A1', text: 'Different delivery modality (nanoparticle vs. cell therapy) — minimal novelty risk, cite for background only.' },
];

/* ── Timing ── */
const SIDEBAR_IN = 800;
const SELECTED = 2400;
const SECTIONS_IN = 3600;
const CLAIMS_IN = 5000;
const CLAIMS_CLOSE = 7200;
const NOVELTY_IN = 7800;
const FADE_OUT = 10800;
const RESET_TIME = 11600;
const LOOP_TIME = 12300;

const MOCKUP_HEIGHT = 'h-[440px] sm:h-[480px] lg:h-[520px]';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function AnimatedAiDraftGeneration() {
    const [phase, setPhase] = useState<
        'idle' | 'sidebar' | 'selected' | 'sections' | 'claims' | 'claims-closing' | 'novelty' | 'fadeout'
    >('idle');

    const runCycle = useCallback(() => {
        setPhase('idle');
        const timers: ReturnType<typeof setTimeout>[] = [];

        timers.push(setTimeout(() => setPhase('sidebar'), SIDEBAR_IN));
        timers.push(setTimeout(() => setPhase('selected'), SELECTED));
        timers.push(setTimeout(() => setPhase('sections'), SECTIONS_IN));
        timers.push(setTimeout(() => setPhase('claims'), CLAIMS_IN));
        timers.push(setTimeout(() => setPhase('claims-closing'), CLAIMS_CLOSE));
        timers.push(setTimeout(() => setPhase('novelty'), NOVELTY_IN));
        timers.push(setTimeout(() => setPhase('fadeout'), FADE_OUT));
        timers.push(setTimeout(() => setPhase('idle'), RESET_TIME));

        return timers;
    }, []);

    useEffect(() => {
        let timers = runCycle();
        const interval = setInterval(() => {
            timers.forEach(clearTimeout);
            timers = runCycle();
        }, LOOP_TIME);
        return () => { timers.forEach(clearTimeout); clearInterval(interval); };
    }, [runCycle]);

    /* ── Derived ── */
    const notFade = phase !== 'fadeout' && phase !== 'idle';
    const showSidebar = phase !== 'idle' && notFade;
    const showSelected = !['idle', 'sidebar'].includes(phase) && notFade;
    const showSections = !['idle', 'sidebar', 'selected'].includes(phase) && notFade;
    const showClaims = phase === 'claims';
    const showNovelty = phase === 'novelty';

    const createdDate = daysAgo(0);
    const updatedDate = daysAgo(0);

    return (
        <div
            aria-hidden="true"
            role="img"
            className={`relative rounded-xl border border-card-border bg-[#f8f8fa] shadow-2xl shadow-black/10 overflow-hidden flex flex-col select-none ${MOCKUP_HEIGHT}`}
        >
            {/* ── Chrome Bar ── */}
            <div className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-white border-b border-card-border shrink-0">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57]" />
                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-1.5 px-2 sm:px-4 py-0.5 sm:py-1 bg-page-bg-alt rounded-lg text-[8px] sm:text-[11px] text-text-muted border border-card-border" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        app.designyourinvention.com
                    </div>
                </div>
                <div className="w-6 sm:w-[52px]" />
            </div>

            {/* ── Family Header ── */}
            <div className="px-3 sm:px-5 py-2 sm:py-3 bg-white border-b border-card-border shrink-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" /></svg>
                            <span className="text-[9px] sm:text-[13px] font-bold text-text-primary truncate" style={{ fontFamily: 'var(--font-dashboard)' }}>
                                CRISPR-Cas9 Base Editor for Sickle Cell Disease, SCDx-201
                            </span>
                        </div>
                        <p className="text-[7px] sm:text-[9px] text-text-muted pl-5.5 sm:pl-6" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                            RXB-2026-GEN-004 &middot; US
                        </p>
                    </div>
                    <span className="text-[7px] sm:text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0" style={{ fontFamily: 'var(--font-dashboard-mono)', backgroundColor: '#dbeafe', color: '#2563eb' }}>Active</span>
                </div>
            </div>

            {/* ── Tab Bar ── */}
            <div className="flex items-center gap-0 px-3 sm:px-5 bg-white border-b border-card-border overflow-hidden shrink-0">
                {TABS.map((tab) => (
                    <span
                        key={tab}
                        className={`text-[7px] sm:text-[10px] px-1.5 sm:px-2.5 py-1.5 sm:py-2 whitespace-nowrap shrink-0 border-b-2 ${
                            tab === 'Drafts' ? 'text-primary font-semibold border-primary' : 'text-text-muted border-transparent'
                        }`}
                        style={{ fontFamily: 'var(--font-dashboard)' }}
                    >{tab}</span>
                ))}
            </div>

            {/* ── Two-Panel Body — flex-1 fills remaining height ── */}
            <div className="flex flex-col sm:flex-row flex-1 min-h-0 overflow-hidden">

                {/* ── Left Sidebar — stretches full height ── */}
                <div className="hidden sm:flex sm:flex-[1] sm:min-w-[140px] sm:max-w-[180px] bg-white border-r border-card-border flex-col">
                    {/* Sidebar Header */}
                    <div className="px-2.5 sm:px-3 pt-2 sm:pt-3 pb-1.5 flex items-center justify-between shrink-0">
                        <span className="text-[9px] sm:text-[11px] font-bold text-text-primary" style={{ fontFamily: 'var(--font-dashboard)' }}>Drafts</span>
                        <span className="text-[7px] sm:text-[9px] px-2 py-0.5 rounded-md font-semibold text-white cursor-default" style={{ fontFamily: 'var(--font-dashboard-mono)', backgroundColor: '#6366f1' }}>+ New</span>
                    </div>

                    {/* Status Filter */}
                    <div className="px-2.5 sm:px-3 pb-1.5 shrink-0">
                        <div className="flex items-center justify-between px-2 py-1 rounded border border-card-border bg-page-bg-alt">
                            <span className="text-[7px] sm:text-[9px] text-text-secondary" style={{ fontFamily: 'var(--font-dashboard)' }}>All Statuses</span>
                            <svg className="w-2 h-2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    {/* Draft Items — scrollable to show all drafts */}
                    <div className="flex-1 overflow-y-auto scrollbar-none">
                        {DRAFTS.map((draft, i) => (
                            <div
                                key={`${draft.jurisdiction}-${draft.version}`}
                                className={`px-2.5 sm:px-3 py-2 sm:py-2.5 border-b border-card-border/50 cursor-default transition-all duration-300 ${
                                    showSelected && i === 0
                                        ? 'border-l-[3px] border-l-primary bg-primary/[0.03]'
                                        : 'border-l-[3px] border-l-transparent'
                                }`}
                                style={{
                                    opacity: showSidebar ? 1 : 0,
                                    transitionDelay: showSidebar ? `${i * 150}ms` : '0ms',
                                }}
                            >
                                <div className="flex items-center gap-1 mb-0.5 flex-wrap">
                                    <span className="text-[6px] sm:text-[7px] px-1 py-0.5 rounded font-semibold leading-none" style={{ backgroundColor: draft.statusBg, color: draft.statusColor }}>{draft.status}</span>
                                    <span className="text-[6px] sm:text-[7px] font-bold leading-none" style={{ color: draft.jurisdictionColor }}>{draft.jurisdiction}</span>
                                    <span className="text-[6px] sm:text-[7px] text-text-muted leading-none" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>{draft.version}</span>
                                </div>
                                <p className="text-[7px] sm:text-[9px] text-text-primary font-medium leading-snug truncate" style={{ fontFamily: 'var(--font-dashboard)' }}>{draft.title}</p>
                                <p className="text-[6px] sm:text-[7px] text-text-muted mt-0.5" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>{daysAgo(draft.daysAgo)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right Main Panel ── */}
                <div className="flex-[3] flex flex-col overflow-hidden relative">

                    {/* Placeholder when nothing selected */}
                    {!showSelected && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted/20 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                            </svg>
                            <p className="text-[8px] sm:text-[10px] text-text-muted/40 text-center" style={{ fontFamily: 'var(--font-dashboard)' }}>
                                Select a draft to view invention details, claims, and AI-generated content
                            </p>
                        </div>
                    )}

                    {/* Status Badges + Export */}
                    <div
                        className="px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1.5 flex items-center justify-between gap-2 transition-opacity duration-300 shrink-0"
                        style={{ opacity: showSelected ? 1 : 0 }}
                    >
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[6px] sm:text-[8px] px-1.5 py-0.5 rounded font-semibold" style={{ backgroundColor: '#d1fae5', color: '#059669' }}>Approved</span>
                            <span className="text-[6px] sm:text-[8px] px-1.5 py-0.5 rounded font-semibold" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>US</span>
                            <span className="text-[6px] sm:text-[8px] px-1.5 py-0.5 rounded font-medium text-text-secondary bg-page-bg-alt border border-card-border" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>v4</span>
                            <span className="text-[6px] sm:text-[8px] px-1.5 py-0.5 rounded font-medium text-text-secondary bg-page-bg-alt border border-card-border" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>AI</span>
                        </div>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[7px] sm:text-[9px] text-text-secondary border border-card-border rounded-md px-2 py-0.5 bg-white cursor-default" style={{ fontFamily: 'var(--font-dashboard)' }}>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Export DOCX
                        </span>
                    </div>

                    {/* Created / Updated dates — dynamic */}
                    <div
                        className="px-3 sm:px-4 pb-2 transition-opacity duration-300 shrink-0"
                        style={{ opacity: showSelected ? 1 : 0 }}
                    >
                        <p className="text-[6px] sm:text-[8px] text-text-muted" style={{ fontFamily: 'var(--font-dashboard)' }}>
                            Created {createdDate} &nbsp;&nbsp; Updated {updatedDate}
                        </p>
                    </div>

                    {/* Accordion Sections */}
                    <div className="px-3 sm:px-4 flex-1 overflow-hidden">
                        {SECTIONS.map((section, i) => (
                            <div
                                key={section}
                                className="border-b border-card-border/60 transition-opacity duration-300"
                                style={{
                                    opacity: showSections ? 1 : 0,
                                    transitionDelay: showSections ? `${i * 60}ms` : '0ms',
                                }}
                            >
                                {/* Section header row */}
                                <div className="flex items-center gap-1.5 py-1.5 sm:py-2">
                                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={
                                            (section === 'Claims' && showClaims) || (section === 'Novelty Analysis' && showNovelty)
                                                ? 'M19 9l-7 7-7-7'
                                                : 'M9 5l7 7-7 7'
                                        } />
                                    </svg>
                                    <span className="text-[8px] sm:text-[10px] text-text-primary font-medium" style={{ fontFamily: 'var(--font-dashboard)' }}>{section}</span>
                                </div>

                                {/* Novelty Analysis expanded content — conditionally rendered */}
                                {section === 'Novelty Analysis' && showNovelty && (
                                    <div className="pl-4 sm:pl-5 pb-2 space-y-1.5">
                                        {NOVELTY_TEXT.map((item, ni) => (
                                            <div
                                                key={item.ref}
                                                className="bg-page-bg-alt rounded-md border border-card-border p-2 sm:p-2.5 transition-opacity duration-300"
                                                style={{ opacity: showNovelty ? 1 : 0, transitionDelay: `${ni * 100}ms` }}
                                            >
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <span className="text-[6px] sm:text-[7px] px-1 py-0.5 rounded font-semibold leading-none" style={{ backgroundColor: item.bg, color: item.color }}>{item.level} Risk</span>
                                                    <span className="text-[6px] sm:text-[8px] font-bold text-text-primary" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>{item.ref}</span>
                                                </div>
                                                <p
                                                    className="text-[6px] sm:text-[8px] text-text-secondary leading-relaxed"
                                                    style={{
                                                        fontFamily: 'var(--font-dashboard)',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Claims expanded content — conditionally rendered */}
                                {section === 'Claims' && showClaims && (
                                    <div className="pl-4 sm:pl-5 pb-2">
                                        <div className="pb-1.5 flex items-center justify-between">
                                            <span className="text-[6px] sm:text-[8px] px-1.5 py-0.5 rounded font-semibold" style={{ fontFamily: 'var(--font-dashboard-mono)', backgroundColor: '#ede9fe', color: '#6366f1' }}>20 claims</span>
                                            <div className="hidden sm:flex items-center gap-2">
                                                <span className="text-[7px] text-primary font-medium flex items-center gap-0.5 cursor-default" style={{ fontFamily: 'var(--font-dashboard)' }}>
                                                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                                    Parsed
                                                </span>
                                                <span className="text-[7px] text-text-muted font-medium flex items-center gap-0.5 cursor-default" style={{ fontFamily: 'var(--font-dashboard)' }}>
                                                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                                    Raw Text
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            {CLAIMS.map((claim, ci) => (
                                                <div
                                                    key={claim.number}
                                                    className="bg-page-bg-alt rounded-md border border-card-border p-2 sm:p-2.5 transition-opacity duration-300"
                                                    style={{ opacity: showClaims ? 1 : 0, transitionDelay: `${ci * 100}ms` }}
                                                >
                                                    <p className="text-[7px] sm:text-[9px] font-bold text-text-primary mb-0.5" style={{ fontFamily: 'var(--font-dashboard)' }}>Claim {claim.number}</p>
                                                    <p
                                                        className="text-[6px] sm:text-[8px] text-text-secondary leading-relaxed"
                                                        style={{
                                                            fontFamily: 'var(--font-dashboard)',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: ci === 0 ? 4 : 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                        }}
                                                    >{claim.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#f8f8fa] to-transparent pointer-events-none rounded-b-xl" />
        </div>
    );
}
