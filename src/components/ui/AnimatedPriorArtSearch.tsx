'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ── Animated Prior Art Search mockup — fixed height, loops infinitely ──
   Fixed height container — no layout shift. All content pre-rendered,
   phases only toggle opacity. Fast typing, snappy transitions.
   Timeline per cycle (~7s):
     0.3s  Start typing fast
     1.1s  Typing done → search button pulses → results + filters appear
     1.6s  IPC tags pop in
     2.0s  Detail sections visible
     2.5s  Abstract opens
     5.5s  Fade out
     6.0s  Reset
   Loops every 6.5s. */

const SEARCH_QUERY = 'Cancer Immunotherapy';

const TABS = ['Details', 'Related', 'Documents', 'Prior Art', 'Drafts', 'Fees', 'Audit'];

interface TitlePart {
    text: string;
    highlight?: boolean;
}

interface SearchResult {
    patentNo: string;
    jurisdiction: string;
    jurisdictionBg: string;
    jurisdictionText: string;
    title: TitlePart[];
    applicant: string;
    date: string;
    ipcCodes: string[];
    extraCodes?: number;
}

const RESULTS: SearchResult[] = [
    {
        patentNo: 'WO2026048712A1',
        jurisdiction: 'WO',
        jurisdictionBg: '#dbeafe',
        jurisdictionText: '#2563eb',
        title: [
            { text: 'Bispecific Antibody Compositions for ' },
            { text: 'Cancer', highlight: true },
            { text: ' ' },
            { text: 'Immunotherapy', highlight: true },
            { text: ' and Methods of Treatment' },
        ],
        applicant: 'NOVARTIS AG [CH]; DANA-FARBER CANCER INSTITUTE INC [US]',
        date: 'Published 2026-03-28',
        ipcCodes: ['A61K 39/ 395 A I', 'A61P 35/ 00 A I', 'C07K 16/ 28 A I'],
    },
    {
        patentNo: 'EP4285631B1',
        jurisdiction: 'EP',
        jurisdictionBg: '#ede9fe',
        jurisdictionText: '#6366f1',
        title: [
            { text: 'Modified NK Cell Compositions With Enhanced Anti-' },
            { text: 'Cancer', highlight: true },
            { text: ' ' },
            { text: 'Immunotherapy', highlight: true },
            { text: ' Activity' },
        ],
        applicant: 'CELLECTIS SA [FR]; INSTITUT CURIE [FR]',
        date: 'Published 2026-03-15',
        ipcCodes: ['C12N 5/ 0783 A I', 'A61K 35/ 17 A I', 'A61K 40/ 12 A I'],
        extraCodes: 3,
    },
    {
        patentNo: 'US20260078423A1',
        jurisdiction: 'US',
        jurisdictionBg: '#ede9fe',
        jurisdictionText: '#6366f1',
        title: [
            { text: 'Nanoparticle Drug Delivery Systems for Targeted ' },
            { text: 'Cancer', highlight: true },
            { text: ' ' },
            { text: 'Immunotherapy', highlight: true },
            { text: ' Applications' },
        ],
        applicant: 'MASSACHUSETTS INST TECHNOLOGY [US]; BRIGHAM AND WOMENS HOSPITAL INC [US]',
        date: 'Published 2026-03-12',
        ipcCodes: ['A61K 9/ 51 A I', 'A61K 47/ 69 A I', 'A61P 35/ 04 A I'],
        extraCodes: 2,
    },
];

const ABSTRACT_TEXT =
    'The present invention relates to bispecific antibody compositions that simultaneously bind programmed death-ligand 1 (PD-L1) and a tumor-associated antigen, thereby enhancing T-cell mediated anti-tumor immunity. The compositions demonstrate synergistic efficacy in combination with checkpoint inhibitor therapy across multiple solid tumor models.';

const DETAIL_SECTIONS = ['Bibliographic Data', 'Abstract', 'Claims', 'Family Members'];

/* ── Timing (relaxed to match AnimatedFamiliesTable pace) ── */
const TYPE_START = 800;
const TYPE_SPEED = 50;
const SEARCH_DONE = TYPE_START + SEARCH_QUERY.length * TYPE_SPEED + 400;
const RESULTS_IN = SEARCH_DONE + 600;
const IPC_IN = RESULTS_IN + 1200;
const DETAILS_IN = IPC_IN + 1000;
const ABSTRACT_IN = DETAILS_IN + 1200;
const FADE_OUT = ABSTRACT_IN + 3000;
const RESET_TIME = FADE_OUT + 800;
const LOOP_TIME = RESET_TIME + 800;

const MOCKUP_HEIGHT = 'h-[440px] sm:h-[480px] lg:h-[520px]';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function AnimatedPriorArtSearch() {
    const [typedText, setTypedText] = useState('');
    const [phase, setPhase] = useState<
        'idle' | 'typing' | 'searched' | 'results' | 'ipc' | 'details' | 'abstract' | 'fadeout'
    >('idle');

    const runCycle = useCallback(() => {
        setTypedText('');
        setPhase('idle');

        const timers: ReturnType<typeof setTimeout>[] = [];

        /* Typing — fast */
        let charIndex = 0;
        timers.push(setTimeout(() => {
            setPhase('typing');
            const interval = setInterval(() => {
                charIndex++;
                setTypedText(SEARCH_QUERY.slice(0, charIndex));
                if (charIndex >= SEARCH_QUERY.length) clearInterval(interval);
            }, TYPE_SPEED);
            timers.push(interval as unknown as ReturnType<typeof setTimeout>);
        }, TYPE_START));

        timers.push(setTimeout(() => setPhase('searched'), SEARCH_DONE));
        timers.push(setTimeout(() => setPhase('results'), RESULTS_IN));
        timers.push(setTimeout(() => setPhase('ipc'), IPC_IN));
        timers.push(setTimeout(() => setPhase('details'), DETAILS_IN));
        timers.push(setTimeout(() => setPhase('abstract'), ABSTRACT_IN));
        timers.push(setTimeout(() => setPhase('fadeout'), FADE_OUT));
        timers.push(setTimeout(() => { setTypedText(''); setPhase('idle'); }, RESET_TIME));

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
    const isTyping = phase === 'typing';
    const showCursor = phase === 'typing' || phase === 'idle';
    const searchDone = !['idle', 'typing'].includes(phase) && phase !== 'fadeout';
    const showResults = !['idle', 'typing', 'searched'].includes(phase) && phase !== 'fadeout';
    const showIpc = !['idle', 'typing', 'searched', 'results'].includes(phase) && phase !== 'fadeout';
    const showDetails = !['idle', 'typing', 'searched', 'results', 'ipc'].includes(phase) && phase !== 'fadeout';
    const showAbstract = phase === 'abstract';
    const visible = phase !== 'fadeout' && phase !== 'idle';

    return (
        <div
            aria-hidden="true"
            role="img"
            className={`relative rounded-xl border border-card-border bg-[#f8f8fa] shadow-2xl shadow-black/10 overflow-hidden ${MOCKUP_HEIGHT}`}
        >
            {/* ── Chrome Bar ── */}
            <div className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-white border-b border-card-border">
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

            {/* ── Tab Bar ── */}
            <div className="flex items-center gap-0 px-3 sm:px-5 bg-white border-b border-card-border overflow-hidden">
                {TABS.map((tab) => (
                    <span
                        key={tab}
                        className={`text-[7px] sm:text-[10px] px-1.5 sm:px-2.5 py-1.5 sm:py-2 whitespace-nowrap shrink-0 border-b-2 ${
                            tab === 'Prior Art' ? 'text-primary font-semibold border-primary' : 'text-text-muted border-transparent'
                        }`}
                        style={{ fontFamily: 'var(--font-dashboard)' }}
                    >{tab}</span>
                ))}
            </div>

            {/* ── Patent Search Header ── */}
            <div className="px-3 sm:px-5 pt-2.5 sm:pt-3 pb-2 sm:pb-2.5 bg-white border-b border-card-border">
                <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <span className="text-[10px] sm:text-sm font-bold text-text-primary" style={{ fontFamily: 'var(--font-dashboard)' }}>Patent Search</span>
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[9px] text-text-secondary border border-card-border rounded-md px-2 py-1 bg-white" style={{ fontFamily: 'var(--font-dashboard)' }}>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            Add Manually
                        </span>
                        <span className="inline-flex items-center gap-1 text-[9px] text-text-secondary border border-card-border rounded-md px-2 py-1 bg-white" style={{ fontFamily: 'var(--font-dashboard)' }}>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            Hide Search
                        </span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 sm:py-1.5 rounded-lg border border-card-border bg-page-bg-alt shrink-0">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                        <span className="text-[8px] sm:text-[10px] text-text-secondary font-medium" style={{ fontFamily: 'var(--font-dashboard)' }}>Keywords</span>
                        <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <div className="flex-1 flex items-center px-2 py-1 sm:py-1.5 rounded-lg border border-card-border bg-white min-w-0 h-[22px] sm:h-[28px]">
                        <span className="text-[8px] sm:text-[11px] text-text-primary" style={{ fontFamily: 'var(--font-dashboard)' }}>
                            {typedText}
                            {showCursor && (
                                <span className="inline-block w-px h-[10px] sm:h-[13px] bg-text-primary ml-px align-middle" style={{ animation: 'blink-cursor 0.8s step-end infinite' }} />
                            )}
                        </span>
                    </div>
                    <motion.span
                        className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[8px] sm:text-[10px] font-semibold text-white shrink-0 cursor-default"
                        style={{ fontFamily: 'var(--font-dashboard-mono)', backgroundColor: '#6366f1' }}
                        animate={
                            phase === 'searched'
                                ? { opacity: 1, scale: [1, 1.1, 1] }
                                : { opacity: searchDone || isTyping ? 1 : 0.5, scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                    >Search</motion.span>
                </div>
            </div>

            {/* ── Filters + Results Count (opacity only) ── */}
            <div
                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-white border-b border-card-border flex items-center justify-between transition-opacity duration-200"
                style={{ opacity: searchDone ? 1 : 0 }}
            >
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[7px] sm:text-[9px] text-text-secondary" style={{ fontFamily: 'var(--font-dashboard)' }}>
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                        Filters
                    </span>
                    <span className="text-[7px] sm:text-[9px] text-primary font-medium cursor-default" style={{ fontFamily: 'var(--font-dashboard)' }}>Clear</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[7px] sm:text-[9px] text-text-muted" style={{ fontFamily: 'var(--font-dashboard)' }}>Showing 1&ndash;25 of 25 results</span>
                    <div className="hidden sm:flex items-center gap-1">
                        <span className="text-[7px] sm:text-[9px] text-text-muted/50 px-1.5 py-0.5 border border-card-border rounded" style={{ fontFamily: 'var(--font-dashboard)' }}>&lt; Previous</span>
                        <span className="text-[7px] sm:text-[9px] text-text-primary px-1.5 py-0.5 border border-card-border rounded" style={{ fontFamily: 'var(--font-dashboard)' }}>Next &gt;</span>
                    </div>
                </div>
            </div>

            {/* ── Results area — fixed overflow, opacity-only transitions ── */}
            <div className="flex-1 px-3 sm:px-5 py-2 sm:py-3 overflow-hidden relative">
                {/* Placeholder when no results */}
                {!showResults && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted/20 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="text-[8px] sm:text-[10px] text-text-muted/40 text-center" style={{ fontFamily: 'var(--font-dashboard)' }}>
                            Search across 100+ patent jurisdictions by keyword, inventor, applicant, or patent number
                        </p>
                    </div>
                )}

                <div className="space-y-2 sm:space-y-2.5">
                {RESULTS.map((result, i) => (
                    <div
                        key={result.patentNo}
                        className="bg-white rounded-lg border border-card-border p-2.5 sm:p-3.5 transition-opacity duration-300"
                        style={{
                            opacity: showResults ? 1 : 0,
                            transitionDelay: showResults ? `${i * 100}ms` : '0ms',
                        }}
                    >
                        {/* Patent header row */}
                        <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-[8px] sm:text-[11px] font-bold text-text-primary shrink-0" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>{result.patentNo}</span>
                                <span className="text-[6px] sm:text-[8px] px-1.5 py-0.5 rounded-full font-semibold shrink-0" style={{ backgroundColor: result.jurisdictionBg, color: result.jurisdictionText }}>{result.jurisdiction}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="hidden sm:inline-flex items-center gap-0.5 text-[7px] sm:text-[9px] text-text-muted cursor-default" style={{ fontFamily: 'var(--font-dashboard)' }}>
                                    {i === 0 ? (
                                        <><svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>Hide Details</>
                                    ) : (
                                        <><svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>View Details</>
                                    )}
                                </span>
                                <span className="text-[7px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-semibold text-white cursor-default" style={{ fontFamily: 'var(--font-dashboard-mono)', backgroundColor: '#6366f1' }}>+ Save</span>
                            </div>
                        </div>

                        {/* Title with keyword highlights */}
                        <p className="text-[7px] sm:text-[10px] text-text-primary font-medium leading-snug mb-1" style={{ fontFamily: 'var(--font-dashboard)' }}>
                            {result.title.map((part, pi) =>
                                part.highlight
                                    ? <span key={pi} className="text-primary underline decoration-primary/30">{part.text}</span>
                                    : <span key={pi}>{part.text}</span>
                            )}
                        </p>

                        {/* Applicant + Date */}
                        <p className="text-[6px] sm:text-[8px] text-text-muted leading-snug truncate" style={{ fontFamily: 'var(--font-dashboard)' }}>{result.applicant}</p>
                        <p className="text-[6px] sm:text-[8px] text-text-muted mb-1.5" style={{ fontFamily: 'var(--font-dashboard)' }}>{result.date}</p>

                        {/* IPC Codes — opacity only */}
                        <div className="flex items-center gap-1 flex-wrap">
                            {result.ipcCodes.map((code) => (
                                <span
                                    key={code}
                                    className="text-[5px] sm:text-[7px] px-1 sm:px-1.5 py-0.5 rounded bg-page-bg-alt border border-card-border text-text-secondary transition-opacity duration-200"
                                    style={{ fontFamily: 'var(--font-dashboard-mono)', opacity: showIpc ? 1 : 0 }}
                                >{code}</span>
                            ))}
                            {result.extraCodes && (
                                <span
                                    className="text-[5px] sm:text-[7px] text-primary font-medium transition-opacity duration-200"
                                    style={{ fontFamily: 'var(--font-dashboard-mono)', opacity: showIpc ? 1 : 0 }}
                                >+{result.extraCodes} more</span>
                            )}
                        </div>

                        {/* Expanded detail — first result only, conditionally rendered */}
                        {i === 0 && showDetails && (
                            <div className="mt-2 sm:mt-2.5 border-t border-card-border pt-1.5">
                                {DETAIL_SECTIONS.map((section) => (
                                    <div key={section}>
                                        <div className="flex items-center gap-1.5 py-1 sm:py-1.5 border-b border-card-border/40">
                                            <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d={section === 'Abstract' && showAbstract ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'} />
                                            </svg>
                                            <span className="text-[7px] sm:text-[9px] text-text-secondary" style={{ fontFamily: 'var(--font-dashboard)' }}>{section}</span>
                                        </div>

                                        {/* Abstract content — only rendered when abstract phase */}
                                        {section === 'Abstract' && showAbstract && (
                                            <div className="pl-4 sm:pl-5 py-1.5 sm:py-2 border-b border-card-border/40">
                                                <p className="text-[6px] sm:text-[8px] text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-dashboard)' }}>
                                                    {ABSTRACT_TEXT}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#f8f8fa] to-transparent pointer-events-none rounded-b-xl" />

            <style>{`@keyframes blink-cursor { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }`}</style>
        </div>
    );
}
