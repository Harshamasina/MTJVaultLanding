'use client';

import { motion } from 'framer-motion';

/* ── Simplified patent family tree built with HTML/CSS ──
   Visual impression only — cards are small, text is decorative.
   Matches the real product's family tree layout. */

const LINE_COLOR = 'rgb(99 102 241 / 0.25)';

export function HeroTreeVisual() {
    return (
        <motion.div
            className="relative select-none"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            aria-hidden="true"
        >
            <div className="animate-hero-float">
                <div className="relative">
                    {/* Tree layout */}
                    <div className="flex flex-col items-center gap-0">
                        {/* Level 1: Patent Family (root) */}
                        <TreeCard
                            type="family"
                            title="CB-ONC-0005"
                            badge="Patent Family"
                            rows={[
                                ['Family Name', 'Oncology Platform Family A'],
                                ['Jurisdiction', 'US'],
                                ['Priority Date', '01 Mar 2024'],
                            ]}
                        />

                        <Connector height={28} />
                        <ConnectorLabel>PRV Applications (2)</ConnectorLabel>
                        <Connector height={12} />

                        {/* Level 2: PRV Applications */}
                        <div className="flex items-start gap-5 relative">
                            <BranchLines />
                            <TreeCard
                                type="prv"
                                title="mRNA Delivery Vector"
                                badge="PRV"
                                status="Filed"
                                rows={[
                                    ['App ID', 'US63/988001'],
                                    ['Filed', '18 Mar 2024'],
                                ]}
                                small
                            />
                            <TreeCard
                                type="prv"
                                title="Conjugate Formulation"
                                badge="PRV"
                                status="Filed"
                                rows={[
                                    ['App ID', 'US63/988002'],
                                    ['Filed', '01 Mar 2024'],
                                ]}
                                small
                            />
                        </div>

                        <Connector height={28} />
                        <ConnectorLabel>PCT Filings (1)</ConnectorLabel>
                        <Connector height={12} />

                        {/* Level 3: PCT Filing */}
                        <TreeCard
                            type="pct"
                            title="PCT for mRNA Delivery Vec..."
                            badge="PCT"
                            status="Draft"
                            rows={[
                                ['PCT #', 'PCT/US2025/1243434'],
                                ['Filed', '01 Jul 2025'],
                            ]}
                        />

                        <Connector height={28} />
                        <ConnectorLabel>NPE Cases (5)</ConnectorLabel>
                        <Connector height={12} />

                        {/* Level 4: All 5 NPE Cases in single row */}
                        <div className="flex items-start gap-2.5 relative">
                            <BranchLines count={5} />
                            <TreeCard
                                type="npe"
                                title="EP National Phase"
                                badge="NPE"
                                status="Active"
                                rows={[
                                    ['Filed', '11 Sep 2027'],
                                    ['Grant #', 'EP4679899215'],
                                ]}
                                compact
                            />
                            <TreeCard
                                type="npe"
                                title="US National Phase"
                                badge="NPE"
                                status="Active"
                                rows={[
                                    ['Filed', '20 Feb 2028'],
                                    ['Grant #', 'US20261511219'],
                                ]}
                                compact
                            />
                            <TreeCard
                                type="npe"
                                title="IN National Phase"
                                badge="NPE"
                                status="Pending"
                                rows={[
                                    ['Filed', '05 Apr 2028'],
                                    ['App #', 'IN202841017234'],
                                ]}
                                compact
                            />
                            <TreeCard
                                type="npe"
                                title="JP National Phase"
                                badge="NPE"
                                status="Filed"
                                rows={[
                                    ['Filed', '18 Jun 2028'],
                                    ['App #', 'JP2028-519834'],
                                ]}
                                compact
                            />
                            <TreeCard
                                type="npe"
                                title="AU National Phase"
                                badge="NPE"
                                status="Filed"
                                rows={[
                                    ['Filed', '02 Aug 2028'],
                                    ['App #', 'AU2028/204571'],
                                ]}
                                compact
                            />
                        </div>

                        <Connector height={24} />

                        {/* Level 5: Office Actions + Fees */}
                        <div className="flex items-start gap-2.5">
                            <MiniCard type="oa" title="EP Office Action" status="Open" />
                            <MiniCard type="fee" title="IN Annuity Fee" status="Due" />
                            <MiniCard type="oa" title="US Office Action" status="Open" />
                            <MiniCard type="fee" title="JP Annuity Fee" status="Due" />
                            <MiniCard type="oa" title="AU Office Action" status="Open" />
                        </div>
                    </div>

                    {/* Fade edge — bottom only, tree bleeds naturally on sides */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-page-bg to-transparent" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Tree building blocks ── */

const TYPE_STYLES = {
    family: { dot: 'bg-primary', border: 'border-primary/20', bg: 'bg-white' },
    prv: { dot: 'bg-primary-light', border: 'border-primary/15', bg: 'bg-primary/[0.02]' },
    pct: { dot: 'bg-teal-500', border: 'border-teal-500/15', bg: 'bg-teal-50/50' },
    npe: { dot: 'bg-emerald-500', border: 'border-emerald-500/15', bg: 'bg-emerald-50/50' },
    oa: { dot: 'bg-amber-500', border: 'border-amber-500/20', bg: 'bg-amber-50/50' },
    fee: { dot: 'bg-rose-500', border: 'border-rose-500/20', bg: 'bg-rose-50/50' },
};

function TreeCard({
    type,
    title,
    badge,
    status,
    rows,
    small,
    compact,
}: {
    type: keyof typeof TYPE_STYLES;
    title: string;
    badge: string;
    status?: string;
    rows: [string, string][];
    small?: boolean;
    compact?: boolean;
}) {
    const s = TYPE_STYLES[type];
    return (
        <div
            className={`rounded-lg border ${s.border} ${s.bg} shadow-sm ${
                compact ? 'px-2.5 py-2 w-[130px]' :
                small ? 'px-3 py-2.5 w-[155px]' : 'px-4 py-3 w-[200px]'
            }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-1.5">
                <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${s.dot}/10 text-text-muted`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {badge}
                </span>
                {status && (
                    <span
                        className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${
                            status === 'Filed' ? 'bg-primary/10 text-primary' :
                            status === 'Draft' ? 'bg-text-muted/10 text-text-muted' :
                            status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' :
                            status === 'Pending' ? 'bg-amber-500/10 text-amber-600' :
                            status === 'Open' ? 'bg-amber-500/10 text-amber-600' :
                            status === 'Due' ? 'bg-rose-500/10 text-rose-600' :
                            'bg-gray-100 text-gray-500'
                        }`}
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        {status}
                    </span>
                )}
            </div>

            {/* Title */}
            <p
                className={`font-semibold text-text-primary truncate ${
                    compact ? 'text-[9px]' : small ? 'text-[10px]' : 'text-[11px]'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {title}
            </p>

            {/* Data rows */}
            <div className={`mt-1.5 space-y-0.5 ${compact ? 'text-[7px]' : small ? 'text-[8px]' : 'text-[9px]'}`}>
                {rows.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-2">
                        <span className="text-text-muted" style={{ fontFamily: 'var(--font-body)' }}>
                            {label}
                        </span>
                        <span
                            className="text-text-secondary font-medium truncate text-right"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MiniCard({
    type,
    title,
    status,
}: {
    type: keyof typeof TYPE_STYLES;
    title: string;
    status: string;
}) {
    const s = TYPE_STYLES[type];
    return (
        <div className={`rounded-md border ${s.border} ${s.bg} shadow-sm px-2 py-1.5 w-[90px]`}>
            <div className="flex items-center justify-between mb-1">
                <span
                    className={`text-[7px] font-bold uppercase tracking-wider text-text-muted`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {type === 'oa' ? 'Office Action' : 'Fee'}
                </span>
                <span
                    className={`text-[7px] font-semibold px-1 py-0.5 rounded-full ${
                        status === 'Open' ? 'bg-amber-500/10 text-amber-600' :
                        'bg-rose-500/10 text-rose-600'
                    }`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {status}
                </span>
            </div>
            <p
                className="text-[9px] font-semibold text-text-primary truncate"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {title}
            </p>
        </div>
    );
}

function Connector({ height }: { height: number }) {
    return (
        <div
            className="w-px shrink-0"
            style={{ height, backgroundColor: LINE_COLOR }}
        />
    );
}

function ConnectorLabel({ children }: { children: React.ReactNode }) {
    return (
        <span
            className="text-[8px] font-medium text-text-muted/60 py-0.5"
            style={{ fontFamily: 'var(--font-mono)' }}
        >
            {children}
        </span>
    );
}

function BranchLines({ count = 2 }: { count?: number }) {
    return (
        <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 pointer-events-none"
            style={{ width: 'calc(100% - 40px)', height: 12 }}
        >
            {/* Horizontal bar */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ backgroundColor: LINE_COLOR }}
            />
            {/* Vertical drops — evenly spaced */}
            {Array.from({ length: count }, (_, i) => (
                <div
                    key={i}
                    className="absolute top-0 w-px h-full"
                    style={{
                        backgroundColor: LINE_COLOR,
                        left: count === 1 ? '50%' : `${(i / (count - 1)) * 100}%`,
                    }}
                />
            ))}
        </div>
    );
}
