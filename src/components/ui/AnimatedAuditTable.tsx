'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ── Animated audit trail table ──
   Fixed-height container. When rows expand, detail panels appear inline
   between table rows — bottom rows naturally disappear via overflow-hidden.
   2 rows auto-expand in sequence. Scroll-triggered, loops. */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

interface ExpandData {
    fields: { field: string; previous: string; newValue: string }[];
    reasonText: string;
}

interface AuditRow {
    timestamp: string;
    actor: string;
    action: string;
    entity: string;
    changes: string;
    reason: string;
    expand?: ExpandData;
}

/* ── Dynamic date helpers ── */
function fmtDate(d: Date): string {
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fmtTimestamp(daysAgo: number, time: string): string {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return `${fmtDate(d)}, ${time}`;
}

const ACTION_PILL: Record<string, string> = {
    Updated: 'bg-primary/10 text-primary',
    Created: 'bg-emerald-100 text-emerald-700',
    Deleted: 'bg-red-100 text-red-700',
};

const AUDIT_ROWS: AuditRow[] = [
    {
        timestamp: fmtTimestamp(0, '15:11'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Updated',
        entity: 'NPE Case Form: REPM24-0005-4637-855c-9ca12b20f6a1',
        changes: 'Changed Grant Date, Grant Number',
        reason: 'No longer active',
        expand: {
            fields: [
                { field: 'Status', previous: 'active', newValue: 'completed' },
            ],
            reasonText: 'Status changed to completed from reminder card action.',
        },
    },
    {
        timestamp: fmtTimestamp(0, '15:11'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Deleted',
        entity: 'NPE Case: 2b53f0a4-63a4-4146-a487-07cde93b1f82',
        changes: 'Deleted',
        reason: 'Re-assign active',
    },
    {
        timestamp: fmtTimestamp(0, '15:11'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Updated',
        entity: 'NPE Case Form: REPM24-D006-4637-855c-9ca12b20f6a1',
        changes: 'Changed Status',
        reason: 'No longer active',
        expand: {
            fields: [
                { field: 'Jurisdiction', previous: 'GB', newValue: 'US' },
            ],
            reasonText: 'Changing the jurisdiction.',
        },
    },
    {
        timestamp: fmtTimestamp(1, '14:07'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Created',
        entity: 'PRV Application: 574a9f91-5dca-4a01-a415-8e3bc72d0a4f',
        changes: 'Changed Application Number',
        reason: 'Updates fee accrual deadline',
    },
    {
        timestamp: fmtTimestamp(4, '14:07'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Updated',
        entity: 'PCT Filing: d7346b2e-de06-4fc3-81d2-55a543a478da',
        changes: 'Changed Status',
        reason: 'Priority re-assessment',
    },
    {
        timestamp: fmtTimestamp(5, '14:07'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Created',
        entity: 'NPE Case: a1ae5737-4bd2-a5a9-c116-fa2b4ad9a5a0',
        changes: 'Created',
        reason: 'Filed provisional',
    },
    {
        timestamp: fmtTimestamp(7, '11:42'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Updated',
        entity: 'PRV Application: 82beef14-5731-8f26-1a95-bb63a2c8e9d7',
        changes: 'Partially modified',
        reason: 'Fee schedule update',
    },
    {
        timestamp: fmtTimestamp(9, '09:18'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Created',
        entity: 'NPE Case: ed714408-812a-494e-bk18-da5bbdce0f23',
        changes: 'Created',
        reason: 'Portfolio migration',
    },
    {
        timestamp: fmtTimestamp(10, '16:33'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Deleted',
        entity: 'PCT Filing: 9a82cf61-1247-4e5b-b892-7c3fd9e10ba4',
        changes: 'Deleted',
        reason: 'Duplicate entry removed',
    },
    {
        timestamp: fmtTimestamp(11, '10:05'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Created',
        entity: 'PRV Application: c4f29183-8832-49a1-ae67-2b5d6f0ec71a',
        changes: 'Created',
        reason: 'New provisional filing',
    },
    {
        timestamp: fmtTimestamp(12, '14:22'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Updated',
        entity: 'NPE Case: 5e9d13a2-7fab-4c02-91ae-cc84b6d2f3e8',
        changes: 'Changed Assignee',
        reason: 'Transfer of ownership recorded',
    },
    {
        timestamp: fmtTimestamp(14, '08:47'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Updated',
        entity: 'PRV Application: d87e42c5-3f15-4a89-b5c1-9ed4a7b08f62',
        changes: 'Changed Priority Date',
        reason: 'Amended per examiner request',
    },
    {
        timestamp: fmtTimestamp(15, '11:19'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Created',
        entity: 'NPE Case: 7bc45a90-29d8-4f33-a612-48ef0c71d5b3',
        changes: 'Created',
        reason: 'National phase entry - EP',
    },
    {
        timestamp: fmtTimestamp(17, '15:50'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Deleted',
        entity: 'PCT Filing: ab3c7714-6e41-4d90-8f2b-1a45de89c0a7',
        changes: 'Deleted',
        reason: 'Filing withdrawn by applicant',
    },
    {
        timestamp: fmtTimestamp(19, '09:30'),
        actor: 'demopatent@designyourinvention.com',
        action: 'Updated',
        entity: 'NPE Case: f2a89106-cc54-4b17-9d63-87bfae02e4c9',
        changes: 'Changed Grant Number',
        reason: 'Grant certificate received',
    },
];

const EXPAND_ROWS = [0, 2];
const EXPAND_TIMES = [1500, 4000];
const COLLAPSE_TIME = 7000;
const LOOP_TIME = 8500;

export function AnimatedAuditTable() {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, margin: '-80px' });
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const runCycle = useCallback(() => {
        setExpandedRows(new Set());
        const timers: ReturnType<typeof setTimeout>[] = [];

        EXPAND_TIMES.forEach((time, i) => {
            timers.push(setTimeout(() => {
                setExpandedRows(prev => new Set([...prev, EXPAND_ROWS[i]]));
            }, time));
        });

        timers.push(setTimeout(() => setExpandedRows(new Set()), COLLAPSE_TIME));
        return timers;
    }, []);

    useEffect(() => {
        if (!inView) return;
        let timers = runCycle();
        const interval = setInterval(() => {
            timers.forEach(clearTimeout);
            timers = runCycle();
        }, LOOP_TIME);
        return () => { timers.forEach(clearTimeout); clearInterval(interval); };
    }, [runCycle, inView]);

    return (
        <motion.div
            ref={containerRef}
            aria-hidden="true"
            role="img"
            className="relative rounded-xl border border-card-border bg-[#f8f8fa] shadow-2xl shadow-black/10 overflow-hidden flex flex-col select-none h-120 sm:h-135 lg:h-150"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
            {/* Chrome Bar */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-page-bg-alt border-b border-card-border shrink-0">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-1.5 px-2 sm:px-3 py-0.5 bg-white rounded-md text-[8px] sm:text-[9px] text-text-muted border border-card-border"
                        style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                        app.designyourinvention.com
                    </div>
                </div>
                <div className="w-6 sm:w-[40px]" />
            </div>

            {/* Filter Row — single row, all filters inline, matching audit.png */}
            <motion.div
                className="px-3 sm:px-4 py-2 sm:py-2.5 flex items-end gap-2 sm:gap-3 bg-white border-b border-card-border overflow-x-auto scrollbar-none shrink-0"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                {[
                    { label: 'Event Type', value: 'All' },
                    { label: 'Entity ID', value: 'All' },
                    { label: 'Action', value: 'All' },
                    { label: 'Date From', value: fmtDate((() => { const d = new Date(); d.setDate(d.getDate() - 19); return d; })()) },
                    { label: 'Date To', value: fmtDate(new Date()) },
                ].map(f => (
                    <div key={f.label} className="shrink-0 flex-1 min-w-[60px]">
                        <span className="text-[6px] sm:text-[8px] text-text-muted block mb-0.5" style={{ fontFamily: 'var(--font-dashboard)' }}>{f.label}</span>
                        <span className="text-[7px] sm:text-[9px] font-medium px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-card-border text-text-secondary bg-page-bg-alt flex items-center justify-between gap-1 w-full"
                            style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                            <span className="truncate text-text-secondary">{f.value}</span>
                            <span className="opacity-40 text-[6px] shrink-0">▾</span>
                        </span>
                    </div>
                ))}
                <span className="text-[7px] sm:text-[9px] font-medium text-primary whitespace-nowrap shrink-0 pb-1.5"
                    style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                    Clear Filters
                </span>
            </motion.div>

            {/* Table area — white card on gray bg */}
            <div className="flex-1 flex flex-col mx-2 sm:mx-3 mt-2 sm:mt-2.5 mb-2 rounded-lg border border-card-border bg-white overflow-hidden relative">

            {/* Table Header */}
            <div className="shrink-0 border-b border-card-border">
                <div className="grid px-3 sm:px-4 py-1.5 sm:py-2"
                    style={{ gridTemplateColumns: 'minmax(90px,1fr) minmax(100px,1.5fr) 60px minmax(100px,1.8fr) minmax(80px,1fr) minmax(70px,1fr) 50px' }}>
                    {['Timestamp', 'Actor', 'Action', 'Entity', 'Changes', 'Reason', ''].map(col => (
                        <span key={col || 'action-col'} className="text-[7px] sm:text-[9px] font-semibold text-text-muted uppercase tracking-wider truncate pr-2"
                            style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                            {col}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scrollable table body — fixed height, overflow hidden */}
            <div className="flex-1 overflow-hidden relative">
                <div>
                    {AUDIT_ROWS.map((row, i) => {
                        const isExpanded = expandedRows.has(i) && !!row.expand;
                        return (
                            <div key={`row-${i}`}>
                                {/* Row */}
                                <motion.div
                                    className={`grid px-3 sm:px-4 py-1.5 sm:py-2 border-b border-card-border/40 transition-colors duration-300 ${
                                        isExpanded ? 'bg-primary/[0.04]' : ''
                                    }`}
                                    style={{ gridTemplateColumns: 'minmax(90px,1fr) minmax(100px,1.5fr) 60px minmax(100px,1.8fr) minmax(80px,1fr) minmax(70px,1fr) 50px' }}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={inView ? { opacity: 1, x: 0 } : undefined}
                                    transition={{ duration: 0.3, delay: 0.5 + i * 0.06, ease: EASE }}
                                >
                                    <span className="text-[7px] sm:text-[9px] text-text-muted truncate pr-2"
                                        style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                                        {row.timestamp}
                                    </span>
                                    <span className="text-[7px] sm:text-[9px] text-primary truncate pr-2"
                                        style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                                        {row.actor}
                                    </span>
                                    <span className="pr-2">
                                        <span className={`text-[6px] sm:text-[8px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${ACTION_PILL[row.action] ?? 'bg-gray-100 text-gray-600'}`}
                                            style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                                            {row.action}
                                        </span>
                                    </span>
                                    <span className="text-[7px] sm:text-[9px] text-text-secondary truncate pr-2"
                                        style={{ fontFamily: 'var(--font-dashboard)' }}>
                                        {row.entity}
                                    </span>
                                    <span className="text-[7px] sm:text-[9px] text-text-secondary truncate pr-2 hidden sm:block"
                                        style={{ fontFamily: 'var(--font-dashboard)' }}>
                                        {row.changes}
                                    </span>
                                    <span className="text-[7px] sm:text-[9px] text-text-muted truncate pr-2 hidden md:block"
                                        style={{ fontFamily: 'var(--font-dashboard)' }}>
                                        {row.reason}
                                    </span>
                                    <span className="text-[6px] sm:text-[8px] text-primary font-medium whitespace-nowrap"
                                        style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                                        {row.expand ? (isExpanded ? '▾ Details' : '▸ Details') : ''}
                                    </span>
                                </motion.div>

                                {/* Inline expand panel — pushes rows below it down, overflow hides them */}
                                <AnimatePresence>
                                    {isExpanded && row.expand && (
                                        <motion.div
                                            className="bg-page-bg-alt/60 border-b border-card-border overflow-hidden"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: EASE }}
                                        >
                                            <div className="px-4 sm:px-6 py-3 sm:py-4">
                                                {/* Field diff table */}
                                                <div className="mb-3">
                                                    <div className="grid grid-cols-3 gap-2 border-b border-card-border/60 pb-1 mb-1.5">
                                                        {['Field', 'Previous Value', 'New Value'].map(h => (
                                                            <span key={h} className="text-[7px] sm:text-[9px] font-semibold text-text-muted"
                                                                style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                                                                {h}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    {row.expand.fields.map(f => (
                                                        <div key={f.field} className="grid grid-cols-3 gap-2 py-1.5 border-b border-card-border/30">
                                                            <span className="text-[8px] sm:text-[10px] font-medium text-text-primary"
                                                                style={{ fontFamily: 'var(--font-dashboard)' }}>
                                                                {f.field}
                                                            </span>
                                                            <span className="text-[8px] sm:text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded w-fit"
                                                                style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                                                                {f.previous}
                                                            </span>
                                                            <span className="text-[8px] sm:text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded w-fit"
                                                                style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                                                                {f.newValue}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Reason for change */}
                                                <div>
                                                    <p className="text-[7px] sm:text-[9px] font-semibold text-text-muted mb-1"
                                                        style={{ fontFamily: 'var(--font-dashboard-mono)' }}>
                                                        Reason for Change
                                                    </p>
                                                    <p className="text-[8px] sm:text-[10px] text-text-secondary leading-relaxed"
                                                        style={{ fontFamily: 'var(--font-dashboard)' }}>
                                                        {row.expand.reasonText}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom fade inside the scroll area */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            {/* Close table card wrapper */}
            </div>
        </motion.div>
    );
}
