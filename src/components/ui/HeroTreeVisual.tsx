'use client';

import { motion } from 'framer-motion';

/* ── Professional patent family tree visualization ──
   Clean, monochromatic indigo design with smooth SVG connectors.
   4-level hierarchy: Family → 2 PRVs → PCT → 4 NPEs.
   Reflects real patent flow: provisionals lead to PCT, PCT enters national phases.
   Decorative only — communicates product concept at a glance. */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function HeroTreeVisual() {
    return (
        <motion.div
            aria-hidden="true"
            role="img"
            className="relative select-none"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
            <div className="relative flex flex-col items-center gap-0">

                {/* ─── Level 1: Patent Family (Root) ─── */}
                <FadeCard delay={0.5}>
                    <TreeCard
                        level="root"
                        label="Patent Family"
                        title="Oncology Platform, Family A"
                        rows={[
                            ['Family ID', 'ONC-0005'],
                            ['Jurisdiction', 'United States'],
                            ['Priority Date', '01 Mar 2024'],
                        ]}
                    />
                </FadeCard>

                {/* Root → PRV branch point */}
                <ConnectorLine delay={0.9} />
                <NodeDot delay={1.05} />
                <BranchSplit delay={1.1} />

                {/* ─── Level 2: Two Provisional Applications ─── */}
                <div className="flex items-start gap-5 w-full mt-0">
                    <FadeCard delay={1.2} className="flex-1">
                        <TreeCard
                            level="child"
                            label="Provisional"
                            title="mRNA Delivery Vector"
                            status="Filed"
                            rows={[
                                ['App No.', 'US63/988,001'],
                                ['Filed', '18 Mar 2024'],
                            ]}
                        />
                    </FadeCard>
                    <FadeCard delay={1.35} className="flex-1">
                        <TreeCard
                            level="child"
                            label="Provisional"
                            title="Conjugate Formulation"
                            status="Filed"
                            rows={[
                                ['App No.', 'US63/988,002'],
                                ['Filed', '01 Mar 2024'],
                            ]}
                        />
                    </FadeCard>
                </div>

                {/* PRVs merge → node → PCT */}
                <MergeLine delay={1.5} />
                <NodeDot delay={1.65} />
                <ConnectorLine delay={1.7} />

                {/* ─── Level 3: PCT Filing ─── */}
                <FadeCard delay={1.75}>
                    <TreeCard
                        level="child"
                        label="PCT Filing"
                        title="PCT/US2025/124343"
                        status="National Phase"
                        rows={[
                            ['Int. Filing', '01 Jul 2025'],
                            ['Ch. II Demand', '15 Jan 2026'],
                        ]}
                    />
                </FadeCard>

                {/* PCT → NPE branch point */}
                <ConnectorLine delay={2.0} />
                <NodeDot delay={2.1} />
                <BranchSplit delay={2.15} width={240} branches={3} />

                {/* ─── Level 4: Three NPE National Phase Entries ─── */}
                <div className="flex items-start gap-3 w-full mt-0">
                    <FadeCard delay={2.3} className="flex-1">
                        <TreeCard
                            level="grandchild"
                            label="NPE"
                            title="EP National Phase"
                            status="Granted"
                            rows={[['Grant', 'EP4679899']]}
                        />
                    </FadeCard>
                    <FadeCard delay={2.4} className="flex-1">
                        <TreeCard
                            level="grandchild"
                            label="NPE"
                            title="US Continuation"
                            status="Active"
                            rows={[['App', '18/291,034']]}
                        />
                    </FadeCard>
                    <FadeCard delay={2.5} className="flex-1">
                        <TreeCard
                            level="grandchild"
                            label="NPE"
                            title="JP National Phase"
                            status="Pending"
                            rows={[['App', 'JP2028-519834']]}
                        />
                    </FadeCard>
                </div>

            </div>
        </motion.div>
    );
}


/* ─────────────────────────────────────────────
   Tree building blocks
   ───────────────────────────────────────────── */

type CardLevel = 'root' | 'child' | 'grandchild';

const LEVEL_STYLES: Record<CardLevel, { card: string; label: string }> = {
    root: {
        card: 'px-5 py-4 bg-white border border-primary/22 shadow-lg shadow-primary/[0.10] ring-1 ring-primary/[0.07]',
        label: 'bg-primary/10 text-primary',
    },
    child: {
        card: 'px-4 py-3.5 bg-white border border-card-border shadow-md shadow-black/[0.05]',
        label: 'bg-primary/[0.07] text-primary/80',
    },
    grandchild: {
        card: 'px-3.5 py-3 bg-white border border-card-border shadow-md shadow-black/[0.05]',
        label: 'bg-primary/[0.07] text-primary/80',
    },
};

const STATUS_COLORS: Record<string, string> = {
    'Filed': 'bg-primary/10 text-primary',
    'Active': 'bg-emerald-50 text-emerald-700',
    'Granted': 'bg-emerald-50 text-emerald-700',
    'National Phase': 'bg-primary/10 text-primary',
    'Pending': 'bg-amber-50 text-amber-700',
    'Draft': 'bg-text-muted/10 text-text-muted',
};

function TreeCard({
    level,
    label,
    title,
    status,
    rows,
}: {
    level: CardLevel;
    label: string;
    title: string;
    status?: string;
    rows: [string, string][];
}) {
    const s = LEVEL_STYLES[level];
    const isRoot = level === 'root';
    const isGrandchild = level === 'grandchild';

    return (
        <div className={`rounded-xl ${s.card}`}>
            {/* Header: label + status badge */}
            <div className="flex items-center justify-between gap-2 mb-2">
                <span
                    className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md ${s.label}`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {label}
                </span>
                {status && (
                    <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-600'}`}
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        {status}
                    </span>
                )}
            </div>

            {/* Title */}
            <p
                className={`font-semibold text-text-primary leading-snug truncate ${
                    isRoot ? 'text-[13px]' : isGrandchild ? 'text-[11px]' : 'text-xs'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {title}
            </p>

            {/* Data rows */}
            <div className={`mt-2 space-y-1 ${isGrandchild ? 'text-[10px]' : 'text-[11px]'}`}>
                {rows.map(([rowLabel, value]) => (
                    <div key={rowLabel} className="flex justify-between gap-3">
                        <span className="text-text-muted shrink-0" style={{ fontFamily: 'var(--font-body)' }}>
                            {rowLabel}
                        </span>
                        <span className="text-text-secondary font-medium truncate text-right" style={{ fontFamily: 'var(--font-mono)' }}>
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}


/* ── Connector primitives ── */

function ConnectorLine({ delay }: { delay: number }) {
    return (
        <motion.div
            className="w-px h-8 bg-gradient-to-b from-primary/38 to-primary/22 mx-auto"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.35, delay, ease: EASE }}
            style={{ transformOrigin: 'top' }}
        />
    );
}

function NodeDot({ delay }: { delay: number }) {
    return (
        <motion.div
            className="relative z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay, ease: EASE }}
        >
            <div className="w-2.5 h-2.5 rounded-full bg-primary ring-[3px] ring-primary/16" />
        </motion.div>
    );
}

function BranchSplit({ delay, width = 140, branches = 2 }: { delay: number; width?: number; branches?: number }) {
    const cx = width / 2;
    // Calculate evenly-spaced endpoints
    const endpoints = Array.from({ length: branches }, (_, i) =>
        branches === 1 ? cx : (i / (branches - 1)) * width
    );

    return (
        <div className="relative" style={{ width, height: 20 }}>
            <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                viewBox={`0 0 ${width} 20`}
                fill="none"
                preserveAspectRatio="none"
            >
                {endpoints.map((ex, i) => (
                    <motion.path
                        key={i}
                        d={`M ${cx} 0 C ${cx} 14, ${ex} 6, ${ex} 20`}
                        stroke="rgb(99 102 241 / 0.33)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: delay + i * 0.03, ease: EASE }}
                    />
                ))}
            </svg>
        </div>
    );
}

function MergeLine({ delay }: { delay: number }) {
    /* Full-width merge: two lines from left-center and right-center
       of the PRV row converge to the center bottom. Uses same
       percentage approach as FlexBranchSplit for alignment. */
    const vw = 1000;
    const vh = 120;
    const cx = vw / 2;
    // Left PRV center = 25%, Right PRV center = 75%
    const leftX = vw * 0.25;
    const rightX = vw * 0.75;

    return (
        <div className="relative w-full" style={{ height: 40 }}>
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${vw} ${vh}`}
                preserveAspectRatio="none"
                fill="none"
            >
                <motion.path
                    d={`M ${leftX} 0 C ${leftX} ${vh * 0.65}, ${cx} ${vh * 0.35}, ${cx} ${vh}`}
                    stroke="rgb(99 102 241 / 0.33)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay, ease: EASE }}
                />
                <motion.path
                    d={`M ${rightX} 0 C ${rightX} ${vh * 0.65}, ${cx} ${vh * 0.35}, ${cx} ${vh}`}
                    stroke="rgb(99 102 241 / 0.33)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: delay + 0.05, ease: EASE }}
                />
            </svg>
        </div>
    );
}

function FadeCard({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}
