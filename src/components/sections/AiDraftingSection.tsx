import {
    Search,
    BookmarkPlus,
    FileSearch,
    Brain,
    GitCompare,
    Lock,
    Shield,
    UserCheck,
    ClipboardList,
    Globe,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { AnimatedPriorArtSearch } from '@/components/ui/AnimatedPriorArtSearch';
import { AnimatedAiDraftGeneration } from '@/components/ui/AnimatedAiDraftGeneration';
import { BookDemoButton } from '@/components/ui/BookDemoModal';
import { FadeIn } from '@/components/motion/FadeIn';

const JURISDICTIONS = [
    { code: 'US', label: 'USPTO', color: '#dc2626' },
    { code: 'EP', label: 'EPO', color: '#6366f1' },
    { code: 'IN', label: 'IPO', color: '#d97706' },
    { code: 'WO', label: 'WIPO', color: '#0ea5e9' },
    { code: 'JP', label: 'JPO', color: '#059669' },
    { code: 'CN', label: 'CNIPA', color: '#dc2626' },
];

const TRUST_ITEMS = [
    { icon: Shield, label: 'Zero Data Retention' },
    { icon: Lock, label: '5-Layer Prompt Defense' },
    { icon: UserCheck, label: 'Mandatory Attorney Review' },
    { icon: ClipboardList, label: 'Complete Audit Trail' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function AiDraftingSection() {
    return (
        <section id="ai-drafting" className="py-24 lg:py-32">
            <Container>
                {/* ── Section Heading ── */}
                <div id="tree-ai" className="flex items-center gap-3 mb-6">
                    <span
                        className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        AI Drafting
                    </span>
                </div>
                <FadeIn treeNode="tree-ai">
                    <div className="max-w-3xl mb-16 lg:mb-20">
                        <h2
                            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            AI-Powered Prior Art Search &{' '}
                            <span className="text-primary">Patent Drafting</span>
                        </h2>
                        <p
                            className="mt-4 text-lg text-text-secondary leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            One search bar. 100+ jurisdictions. Jurisdiction-compliant
                            drafts in under 2 minutes. Every step audited.
                        </p>
                    </div>
                </FadeIn>

                {/* ── Sub-sections ── */}
                <div className="space-y-20 lg:space-y-28">
                    {/* ─── Prior Art Search: Text left, Mockup right ─── */}
                    <div>
                        {/* Desktop */}
                        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
                            <FadeIn delay={0.1}>
                                <PriorArtContent />
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <AnimatedPriorArtSearch />
                            </FadeIn>
                        </div>
                        {/* Mobile */}
                        <div className="lg:hidden space-y-8">
                            <FadeIn>
                                <PriorArtContent />
                            </FadeIn>
                            <FadeIn delay={0.15}>
                                <AnimatedPriorArtSearch />
                            </FadeIn>
                        </div>
                    </div>

                    {/* ─── AI Draft Generation: Mockup left, Text right ─── */}
                    <div>
                        {/* Desktop */}
                        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
                            <FadeIn delay={0.1}>
                                <AnimatedAiDraftGeneration />
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <DraftingContent />
                            </FadeIn>
                        </div>
                        {/* Mobile */}
                        <div className="lg:hidden space-y-8">
                            <FadeIn>
                                <DraftingContent />
                            </FadeIn>
                            <FadeIn delay={0.15}>
                                <AnimatedAiDraftGeneration />
                            </FadeIn>
                        </div>
                    </div>
                </div>

                {/* ── Trust Strip ── */}
                <FadeIn delay={0.1}>
                    <div className="mt-16 lg:mt-24 flex flex-wrap items-center justify-center gap-3 lg:gap-5">
                        {TRUST_ITEMS.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/15 bg-primary/[0.03]"
                            >
                                <item.icon className="w-4 h-4 text-primary shrink-0" />
                                <span
                                    className="text-[11px] sm:text-xs font-semibold text-text-primary"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                {/* ── CTA ── */}
                <FadeIn delay={0.15}>
                    <div className="mt-10 flex justify-center">
                        <BookDemoButton size="lg">
                            Book a Demo
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </BookDemoButton>
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}

/* ── Sub-section card data (icon + title + description, same as Features/Compliance) ── */

const PRIOR_ART_CARDS: { icon: React.ElementType; title: string; description: string }[] = [
    {
        icon: Globe,
        title: '100+ Jurisdictions, One Search Bar',
        description: 'Search the entire EPO global patent database without leaving your portfolio or switching tools.',
    },
    {
        icon: Search,
        title: 'Four Search Modes',
        description: 'Keywords, Inventor, Applicant, and Patent Number. Each handles edge cases like hyphens, suffixes, and kind codes automatically.',
    },
    {
        icon: BookmarkPlus,
        title: 'One-Click Save With Relevance Scoring',
        description: 'Save relevant patents to your family with relevance scoring, attorney notes, and full audit trail.',
    },
    {
        icon: FileSearch,
        title: 'Deep Patent Detail',
        description: 'Bibliographic data, abstracts, claims, and family members, all accessible from every search result.',
    },
];

const DRAFTING_CARDS: { icon: React.ElementType; title: string; description: string }[] = [
    {
        icon: Brain,
        title: 'Draft in Under 2 Minutes',
        description: 'Select prior art references, describe your invention, and generate a full patent specification.',
    },
    {
        icon: Shield,
        title: 'Jurisdiction-Specific Rules',
        description: 'Patent law rules for US, EP, IN, WO, JP, and CN are embedded in every generation automatically.',
    },
    {
        icon: UserCheck,
        title: 'Mandatory Attorney Review',
        description: 'Every AI-generated draft includes a disclaimer and requires human sign-off before filing.',
    },
    {
        icon: GitCompare,
        title: 'Version Control & Immutable Snapshots',
        description: 'Generate V1, review, add instructions, regenerate V2. Each version is a separate immutable record.',
    },
];

function AiCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
    return (
        <article className="group flex gap-4 items-start p-4 rounded-xl border border-transparent transition-all duration-200 hover:border-card-border hover:bg-card-bg hover:shadow-md hover:shadow-black/[0.03]">
            <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mt-0.5">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
                <h3
                    className="text-[15px] font-semibold text-text-primary leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    {title}
                </h3>
                <p
                    className="mt-1 text-[13px] leading-relaxed text-text-secondary"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {description}
                </p>
            </div>
        </article>
    );
}

function PriorArtContent() {
    return (
        <div>
            <h3
                className="text-2xl font-bold text-text-primary sm:text-3xl mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                Search 100+ Patent Jurisdictions{' '}
                <span className="text-primary">From One Place</span>
            </h3>
            <div className="flex flex-col gap-1">
                {PRIOR_ART_CARDS.map((card) => (
                    <AiCard key={card.title} {...card} />
                ))}
            </div>
        </div>
    );
}

function DraftingContent() {
    return (
        <div>
            <h3
                className="text-2xl font-bold text-text-primary sm:text-3xl mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                Generate Patent Drafts{' '}
                <span className="text-primary">Across 6 Jurisdictions</span>
            </h3>
            <div className="flex flex-col gap-1 mb-6">
                {DRAFTING_CARDS.map((card) => (
                    <AiCard key={card.title} {...card} />
                ))}
            </div>

            {/* Jurisdiction Badges */}
            <div className="flex flex-wrap gap-2">
                {JURISDICTIONS.map((j) => (
                    <div
                        key={j.code}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-card-border bg-card-bg"
                    >
                        <span
                            className="text-xs font-bold"
                            style={{ fontFamily: 'var(--font-mono)', color: j.color }}
                        >
                            {j.code}
                        </span>
                        <span
                            className="text-xs text-text-secondary"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            {j.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
