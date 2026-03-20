'use client';

import {
    Upload,
    Eye,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';

const STEPS = [
    {
        number: '01',
        icon: Upload,
        title: 'Upload',
        subtitle: 'Drop your file',
        details: [
            'Download our pre-built template or use your own spreadsheet',
            'Supports XLSX and CSV formats',
            'Up to 5,000 filings per file (~1,000 patent families)',
            'Extra columns are safely ignored',
        ],
    },
    {
        number: '02',
        icon: Eye,
        title: 'Preview',
        subtitle: 'See what changes',
        details: [
            'Every row validated before anything touches your database',
            'Color-coded summary: new families, provisionals, PCTs, national entries',
            'Existing records flagged — skip duplicates automatically',
            'Clear error messages with row number and field',
        ],
    },
    {
        number: '03',
        icon: CheckCircle2,
        title: 'Confirm',
        subtitle: 'One click. Done.',
        details: [
            'All records created in a single atomic transaction',
            'Full audit trail logged for every record',
            'Import history with download links to original files',
            'If anything fails, nothing is written — zero partial imports',
        ],
    },
];

export function ImportSection() {
    return (
        <section id="import" className="pt-8 pb-24 lg:pt-12 lg:pb-32 bg-page-bg relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)',
                backgroundSize: '32px 32px',
            }} />

            <Container className="relative">
                {/* Section Header */}
                <div id="tree-import" className="flex items-center gap-3 mb-6">
                    <span
                        className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Portfolio Import
                    </span>
                </div>

                <FadeIn treeNode="tree-import">
                    <div className="max-w-3xl mb-12 lg:mb-16">
                        <h2
                            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Migrate your entire portfolio in{' '}
                            <span className="text-primary">hours, not months</span>
                        </h2>
                        <p
                            className="mt-4 text-lg text-text-secondary leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Upload your existing spreadsheet, preview exactly what will change,
                            and confirm with one click. No data entry, no reformatting, no risk.
                        </p>
                    </div>
                </FadeIn>

                {/* 3-Step Flow */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 relative">
                    {/* Connector lines (desktop only) */}
                    <div className="hidden lg:block absolute top-18 left-[calc(33.33%-1rem)] right-[calc(33.33%-1rem)] z-0">
                        <div className="flex items-center justify-between">
                            <motion.div
                                className="flex-1 h-0.5 bg-linear-to-r from-primary/40 to-primary/40 mx-4"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                style={{ transformOrigin: 'left' }}
                            />
                            <motion.div
                                className="flex-1 h-0.5 bg-linear-to-r from-primary/40 to-primary/40 mx-4"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                style={{ transformOrigin: 'left' }}
                            />
                        </div>
                    </div>

                    {STEPS.map((step, i) => (
                        <FadeIn key={step.number} treeNode="tree-import" delay={i * 0.15}>
                            <div className="relative z-10 group">
                                {/* Mobile connector arrow */}
                                {i > 0 && (
                                    <div className="flex justify-center py-3 lg:hidden">
                                        <ArrowRight className="w-5 h-5 text-primary/40 rotate-90" />
                                    </div>
                                )}

                                <div className="rounded-2xl border border-card-border bg-card-bg p-8 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
                                    {/* Step number + icon */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                                                <step.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <span
                                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center"
                                                style={{ fontFamily: 'var(--font-mono)' }}
                                            >
                                                {step.number}
                                            </span>
                                        </div>
                                        <div>
                                            <h3
                                                className="text-xl font-bold text-text-primary"
                                                style={{ fontFamily: 'var(--font-display)' }}
                                            >
                                                {step.title}
                                            </h3>
                                            <p
                                                className="text-sm text-text-secondary"
                                                style={{ fontFamily: 'var(--font-body)' }}
                                            >
                                                {step.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <ul className="space-y-3">
                                        {step.details.map((detail) => (
                                            <li key={detail} className="flex gap-3">
                                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <span
                                                    className="text-sm text-text-secondary leading-relaxed"
                                                    style={{ fontFamily: 'var(--font-body)' }}
                                                >
                                                    {detail}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </Container>
        </section>
    );
}
