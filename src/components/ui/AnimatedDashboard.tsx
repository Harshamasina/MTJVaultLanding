'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Animated dashboard mockup — pixel-accurate replica of dashboard.png ──
   Responsive: stacks vertically on mobile, full layout on desktop.
   Desktop: 2:1 aspect ratio matching 1600x800 screenshot.
   Mobile: natural height with stacked layout. */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const PRIMARY_ACTIONS = ['+ Add Family', '+ Add PRV', '+ Add PCT', '+ Add NPE'];
const SECONDARY_ACTIONS = ['Upload Document', 'Import Portfolio'];

const STATS = [
    { label: 'Total Families', value: 18, tone: '#6366f1', toneBg: '#ede9fe', toneBorder: 'color-mix(in srgb, #6366f1 20%, #e2e8f0)', text: '#6366f1', sub: '' },
    { label: 'Pending Deadlines', value: 172, tone: '#d97706', toneBg: '#fef3c7', toneBorder: 'color-mix(in srgb, #d97706 20%, #e2e8f0)', text: '#d97706', sub: 'next 30 days' },
    { label: 'Overdue Items', value: 15, tone: '#dc2626', toneBg: '#fee2e2', toneBorder: 'color-mix(in srgb, #dc2626 20%, #e2e8f0)', text: '#dc2626', sub: 'Requires immediate attention' },
    { label: 'Fees Due', value: 65, tone: '#6366f1', toneBg: '#ede9fe', toneBorder: 'color-mix(in srgb, #6366f1 20%, #e2e8f0)', text: '#6366f1', sub: '' },
];

const BARS = [
    { label: 'US', value: 82, color: '#3d3a8a' },
    { label: 'EP', value: 28, color: '#4f46e5' },
    { label: 'JP', value: 18, color: '#6366f1' },
    { label: 'CN', value: 12, color: '#818cf8' },
    { label: 'IN', value: 8, color: '#a5b4fc' },
    { label: 'KR', value: 5, color: '#c7d2fe' },
    { label: 'AU', value: 4, color: '#e0e7ff' },
];

const DONUT = [
    { label: 'US', pct: 38, color: '#3d3a8a' },
    { label: 'EP', pct: 22, color: '#4f46e5' },
    { label: 'JP', pct: 15, color: '#6366f1' },
    { label: 'CN', pct: 10, color: '#818cf8' },
    { label: 'IN', pct: 8, color: '#a5b4fc' },
    { label: 'Other', pct: 7, color: '#c7d2fe' },
];

interface NotifItem {
    title: string;
    meta: string;
    days: string;
    urgency: 'overdue' | 'due_soon' | 'upcoming';
}

const ANNUITY_FEES: NotifItem[] = [
    { title: 'Annuity Fee Due — EP26890...', meta: 'DEMO-2024-005 · EP4679899', days: '14 days', urgency: 'due_soon' },
    { title: 'Annuity Fee Due — 18/291,034', meta: 'DEMO-2024-011 · PROSECUTION', days: '7 days', urgency: 'due_soon' },
];

const OA_ITEMS: NotifItem[] = [
    { title: 'Prepare initial OA PRV prosecution filing — deadline imminent', meta: 'DEMO-2024-005 · Priority: HIGH', days: '3 days', urgency: 'overdue' },
    { title: 'Review US OA Phase 1 memo data for patent strategy update...', meta: 'DEMO-2024-011 · Priority: MEDIUM', days: '12 days', urgency: 'upcoming' },
    { title: 'File JP PCT/US2025/124343 continuation deadline in 10 days', meta: 'DEMO-2024-001 · PCT Filing', days: '10 days', urgency: 'due_soon' },
];

const REMINDERS: NotifItem[] = [
    { title: 'US OA Restriction Requirement response deadline', meta: 'DEMO-2024-010 · Office Action', days: '21 days', urgency: 'upcoming' },
];

const DOT_COLORS = { overdue: '#dc2626', due_soon: '#d97706', upcoming: '#4f46e5' };

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function AnimatedDashboard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={containerRef}
            aria-hidden="true"
            role="img"
            className="relative rounded-xl border border-card-border bg-[#f8f8fa] shadow-2xl shadow-black/10 overflow-hidden flex flex-col lg:aspect-[2/1]"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
            {/* ── Chrome Bar ── */}
            <div className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-white border-b border-card-border">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57]" />
                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-1.5 px-2 sm:px-4 py-0.5 sm:py-1 bg-page-bg-alt rounded-lg text-[8px] sm:text-[11px] text-text-muted border border-card-border"
                        style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        app.designyourinvention.com
                    </div>
                </div>
                <div className="w-6 sm:w-[52px]" />
            </div>

            {/* ── Quick Actions ── */}
            <div className="px-3 sm:px-5 py-1.5 sm:py-2.5 flex items-center gap-1 sm:gap-2 bg-white border-b border-card-border overflow-x-auto scrollbar-none">
                {PRIMARY_ACTIONS.map((label, i) => (
                    <motion.span
                        key={label}
                        className="text-[7px] sm:text-[10px] font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border text-primary whitespace-nowrap shrink-0"
                        style={{ fontFamily: 'var(--font-dashboard-mono)', backgroundColor: 'color-mix(in srgb, #6366f1 10%, white)', borderColor: 'color-mix(in srgb, #6366f1 28%, #e2e8f0)' }}
                        initial={{ opacity: 0, y: -5 }}
                        animate={inView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.25, delay: 0.35 + i * 0.05, ease: EASE }}
                    >
                        {label} <span className="text-[6px] sm:text-[8px] ml-0.5 opacity-60">›</span>
                    </motion.span>
                ))}
                {SECONDARY_ACTIONS.map((label, i) => (
                    <motion.span
                        key={label}
                        className="hidden sm:inline-flex text-[10px] font-semibold px-3 py-1.5 rounded-full border border-card-border text-text-secondary bg-white whitespace-nowrap shrink-0"
                        style={{ fontFamily: 'var(--font-dashboard-mono)' }}
                        initial={{ opacity: 0, y: -5 }}
                        animate={inView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.25, delay: 0.55 + i * 0.05, ease: EASE }}
                    >
                        {label}
                    </motion.span>
                ))}
            </div>

            {/* ── Dashboard Body ── */}
            <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

                {/* ── Left: Stats + Charts ── */}
                <div className="flex-[2] flex flex-col p-3 sm:p-4 gap-3 sm:gap-4 overflow-hidden">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 shrink-0">
                        {STATS.map((s, i) => (
                            <motion.div
                                key={s.label}
                                className="bg-white rounded-lg px-3 sm:px-4 py-2 sm:py-3"
                                style={{ border: `1px solid ${s.toneBorder}`, boxShadow: '0 2px 8px rgb(15 23 42 / 6%)' }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={inView ? { opacity: 1, y: 0 } : undefined}
                                transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: EASE }}
                            >
                                <div className="flex items-start justify-between">
                                    <p className="text-[8px] sm:text-[10px] font-bold text-text-secondary leading-tight" style={{ fontFamily: 'var(--font-dashboard)' }}>{s.label}</p>
                                    <div
                                        className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] rounded-lg flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: s.toneBg }}
                                    >
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={s.tone} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                                        </svg>
                                    </div>
                                </div>
                                <CountUp target={s.value} delay={0.6 + i * 0.08} color={s.text} size="text-lg sm:text-2xl" inView={inView} />
                                {s.sub && <p className="text-[6px] sm:text-[7px] text-text-muted mt-0.5 hidden sm:block" style={{ fontFamily: 'var(--font-dashboard)' }}>{s.sub}</p>}
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 min-h-0">
                        {/* Bar Chart */}
                        <motion.div
                            className="flex-1 bg-white rounded-lg border border-card-border p-3 sm:p-4 flex flex-col"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : undefined}
                            transition={{ duration: 0.4, delay: 0.85 }}
                        >
                            <p className="text-[9px] sm:text-[11px] font-semibold text-text-primary mb-2 sm:mb-3 shrink-0" style={{ fontFamily: 'var(--font-dashboard)' }}>
                                Families by Jurisdiction
                            </p>
                            <div className="flex items-end gap-1.5 sm:gap-3 px-1 sm:px-2 sm:flex-1" style={{ height: 120 }}>
                                {BARS.map((bar, i) => {
                                    const pct = (bar.value / 82) * 100;
                                    return (
                                        <div key={bar.label} className="flex-1 flex flex-col items-center h-full">
                                            <div className="flex-1 w-full flex items-end justify-center">
                                                <motion.div
                                                    className="w-[60%] rounded-t-[3px] sm:rounded-t-[4px]"
                                                    style={{ backgroundColor: bar.color }}
                                                    initial={{ height: '0%' }}
                                                    animate={inView ? { height: `${pct}%` } : undefined}
                                                    transition={{ duration: 0.7, delay: 1.0 + i * 0.08, ease: EASE }}
                                                />
                                            </div>
                                            <span className="text-[6px] sm:text-[9px] text-text-muted mt-1 sm:mt-1.5 shrink-0" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                                                {bar.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Donut Chart */}
                        <motion.div
                            className="flex-1 bg-white rounded-lg border border-card-border p-3 sm:p-4 flex flex-col items-center"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : undefined}
                            transition={{ duration: 0.4, delay: 0.9 }}
                        >
                            <p className="text-[9px] sm:text-[11px] font-semibold text-text-primary mb-2 sm:mb-3 self-start shrink-0" style={{ fontFamily: 'var(--font-dashboard)' }}>
                                Families by Origin Country
                            </p>
                            <div className="flex-1 flex items-center justify-center min-h-0 py-2 sm:py-0">
                                <DonutChart inView={inView} />
                            </div>
                            <div className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-0.5 sm:gap-y-1 justify-center mt-1 sm:mt-2 shrink-0">
                                {DONUT.map(seg => (
                                    <div key={seg.label} className="flex items-center gap-1">
                                        <span className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full" style={{ backgroundColor: seg.color }} />
                                        <span className="text-[7px] sm:text-[9px] text-text-muted" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>{seg.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ── Right: Notifications (hidden on mobile, visible md+) ── */}
                <div className="hidden md:flex flex-[1] flex-col bg-white border-l border-card-border overflow-hidden">
                    <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-1.5 sm:pb-2 border-b border-card-border/60 shrink-0">
                        <p className="text-[10px] sm:text-[12px] font-bold text-text-primary" style={{ fontFamily: 'var(--font-dashboard)' }}>Notifications</p>
                    </div>
                    <div className="flex-1 overflow-hidden px-3 sm:px-4 pt-2 sm:pt-3 space-y-1">
                        <NotifSection title="Annuity Fees" items={ANNUITY_FEES} baseDelay={1.1} inView={inView} />
                        <NotifSection title="Office Actions" items={OA_ITEMS} baseDelay={1.4} inView={inView} />
                        <NotifSection title="Reminders" items={REMINDERS} baseDelay={1.8} inView={inView} />
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#f8f8fa] to-transparent pointer-events-none rounded-b-xl" />
        </motion.div>
    );
}


/* ── Sub-components ── */

function NotifSection({ title, items, baseDelay, inView }: { title: string; items: NotifItem[]; baseDelay: number; inView: boolean }) {
    return (
        <div className="mb-2 sm:mb-3">
            <p className="text-[9px] sm:text-[10px] font-bold text-text-primary mb-1.5 sm:mb-2" style={{ fontFamily: 'var(--font-dashboard)' }}>{title}</p>
            <div className="space-y-1 sm:space-y-1.5">
                {items.map((item, i) => (
                    <motion.div
                        key={item.title}
                        className="flex items-start gap-2 sm:gap-2.5 py-0.5 sm:py-1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={inView ? { opacity: 1, x: 0 } : undefined}
                        transition={{ duration: 0.3, delay: baseDelay + i * 0.1, ease: EASE }}
                    >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-[3px] shrink-0" style={{ backgroundColor: DOT_COLORS[item.urgency] }} />
                        <div className="min-w-0 flex-1">
                            <p className="text-[8px] sm:text-[10px] text-text-primary leading-snug" style={{ fontFamily: 'var(--font-dashboard)' }}>{item.title}</p>
                            <p className="text-[6px] sm:text-[8px] text-text-muted leading-snug mt-0.5" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>{item.meta}</p>
                        </div>
                        <span className="text-[7px] sm:text-[9px] text-text-muted whitespace-nowrap shrink-0" style={{ fontFamily: 'var(--font-dashboard-mono)' }}>{item.days}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function CountUp({ target, delay, color, size = 'text-xl', inView }: { target: number; delay: number; color: string; size?: string; inView: boolean }) {
    const [count, setCount] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        if (!inView || started.current) return;
        started.current = true;
        const t = setTimeout(() => {
            const dur = 1200;
            const t0 = performance.now();
            (function step(now: number) {
                const p = Math.min((now - t0) / dur, 1);
                setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
                if (p < 1) requestAnimationFrame(step);
            })(performance.now());
        }, delay * 1000);
        return () => clearTimeout(t);
    }, [target, delay, inView]);

    return <p className={`${size} font-bold leading-tight`} style={{ fontFamily: 'var(--font-dashboard-mono)', color }}>{count}</p>;
}

function DonutChart({ inView }: { inView: boolean }) {
    const size = 160;
    const sw = 30;
    const r = (size - sw) / 2;
    const circ = 2 * Math.PI * r;
    let acc = 0;

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="-rotate-90" style={{ maxWidth: size, maxHeight: size }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={sw} />
            {DONUT.map((seg, i) => {
                const len = (seg.pct / 100) * circ;
                const off = -(acc / 100) * circ;
                acc += seg.pct;
                return (
                    <motion.circle
                        key={seg.label}
                        cx={size / 2} cy={size / 2} r={r}
                        fill="none" stroke={seg.color} strokeWidth={sw}
                        strokeDasharray={`${len} ${circ - len}`}
                        strokeDashoffset={off}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : undefined}
                        transition={{ duration: 0.5, delay: 1.1 + i * 0.08, ease: EASE }}
                    />
                );
            })}
        </svg>
    );
}
