import type { Metadata } from 'next';
import Link from 'next/link';
import {
    Search,
    UserSearch,
    Building2,
    Hash,
    FileText,
    Brain,
    Shield,
    UserCheck,
    GitCompare,
    Lock,
    ShieldCheck,
    Layers,
    Eye,
    Users,
    Gauge,
    ScrollText,
    ArrowRight,
    Play,
    CheckCircle2,
} from 'lucide-react';
import { buildMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import { BookDemoButton } from '@/components/ui/BookDemoModal';
import { WatchDemoButton } from '@/components/ui/WatchDemoModal';
import { AnimatedPriorArtSearch } from '@/components/ui/AnimatedPriorArtSearch';
import { AnimatedAiDraftGeneration } from '@/components/ui/AnimatedAiDraftGeneration';
import { FadeIn } from '@/components/motion/FadeIn';

export const metadata: Metadata = buildMetadata({
    title: 'AI-Powered Prior Art Search & Patent Drafting Software',
    description:
        'Search 100+ patent jurisdictions, generate jurisdiction-compliant drafts in under 2 minutes, and maintain a complete audit trail. Built for patent attorneys, IP managers, and pharma teams.',
    path: '/ai-patent-drafting/',
});

/* ── Data ── */

const HERO_STATS = [
    { value: '100+', label: 'Jurisdictions Searchable' },
    { value: '6', label: 'Jurisdictions Supported' },
    { value: '<2 min', label: 'Draft Generation Time' },
    { value: '100%', label: 'Audit Trail Coverage' },
];

const SEARCH_MODES = [
    { icon: Search, title: 'Keywords', description: 'Search by technical terms across titles and abstracts. Handles hyphenation, stop words, and long compound queries automatically.' },
    { icon: UserSearch, title: 'Inventor', description: 'Find all filings by a specific inventor. Handles titles, hyphens, and name variations. Full paginated results, not just top 10.' },
    { icon: Building2, title: 'Applicant', description: 'Search by company or institution. Corporate suffixes (Inc., Ltd., GmbH, AG) are stripped automatically.' },
    { icon: Hash, title: 'Patent Number', description: 'Direct lookup by publication number in any format. Spaces, commas, slashes, and kind codes are handled automatically.' },
];

const DRAFT_FEATURES = [
    { icon: Brain, title: 'Novelty Analysis', description: 'How the invention differs from each cited reference, with risk-level assessments per reference.' },
    { icon: FileText, title: 'Claims & Abstract', description: 'Independent and dependent claims structured per jurisdiction conventions, plus a concise abstract within word limits.' },
    { icon: ScrollText, title: 'Detailed Description', description: 'Full patent specification with standard sections — Field, Background, Summary, Detailed Description, Examples.' },
    { icon: UserCheck, title: 'Attorney Instructions', description: 'Add custom guidance like "Emphasise the thermal regulation advantage" — the AI weighs instructions alongside jurisdiction rules.' },
];

const JURISDICTIONS = [
    { code: 'US', label: 'USPTO', color: '#dc2626', rules: '35 USC 101/102/103 compliance, means-plus-function format, Markush groups' },
    { code: 'EP', label: 'EPO', color: '#6366f1', rules: 'Article 52/54/56 EPC, two-part claim format, technical effect language' },
    { code: 'IN', label: 'IPO', color: '#d97706', rules: 'Section 3(d)/(i)/(j)/(k) exclusions, method-of-treatment prohibition, enhanced efficacy requirements' },
    { code: 'WO', label: 'WIPO', color: '#0ea5e9', rules: 'International-stage neutral drafting, broad claims for national phase entry' },
    { code: 'JP', label: 'JPO', color: '#059669', rules: 'Japanese Patent Act Articles 29/36 compliance, detailed embodiment requirements' },
    { code: 'CN', label: 'CNIPA', color: '#dc2626', rules: 'Article 22/25/26 compliance, explicit technical problem-solution format' },
];

const SECURITY_CARDS = [
    { icon: Layers, title: '5-Layer Prompt Defense', items: ['Input sanitisation — XML, HTML, zero-width Unicode stripped', 'Structural containment — user inputs in BEGIN/END markers', 'System prompt hardening — security rules override conflicts', 'Output validation — post-generation anomaly detection', 'Human review — mandatory attorney sign-off'] },
    { icon: Shield, title: 'Zero Data Retention', items: ['Anthropic zero-retention API policy', 'Prompts contain only invention details + public patent data', 'Generated content stored exclusively in your PostgreSQL database', 'No training on your data — ever'] },
    { icon: Users, title: 'Role-Based Access Control', items: ['draft:generate is separate from draft:write', 'Paralegals can create manual drafts and add review notes', 'Only authorised users can trigger AI generation', 'Server-side enforcement — frontend gating is defense-in-depth'] },
    { icon: Lock, title: 'Tenant Isolation', items: ['Every query runs inside Row-Level Security with forced policies', 'Cross-tenant data exposure is architecturally impossible', 'Enforced at the database engine level, not application logic'] },
    { icon: Gauge, title: 'Rate Limiting', items: ['Configurable per-tenant limits', 'Maximum concurrent generations and daily cap', 'Per-family cooldown period', 'Prevents runaway API costs'] },
    { icon: Eye, title: 'Complete Audit Trail', items: ['Who searched, what was saved, which prior art the AI considered', 'Every attorney edit, status change, and export logged', 'reason_for_change mandatory on sensitive transitions', 'Immutable, tamper-proof records'] },
];

const WORKFLOW_STEPS = [
    { number: '01', title: 'Search', description: 'Search prior art across 100+ jurisdictions' },
    { number: '02', title: 'Save', description: 'Save relevant references with relevance scoring' },
    { number: '03', title: 'Paste', description: 'Paste missing claims from USPTO or InPASS' },
    { number: '04', title: 'Select', description: 'Select references and describe the invention' },
    { number: '05', title: 'Generate', description: 'AI generates jurisdiction-compliant draft' },
    { number: '06', title: 'Review', description: 'Attorney reviews, adds instructions, regenerates' },
    { number: '07', title: 'Export', description: 'Export to DOCX for tracked-changes review' },
    { number: '08', title: 'Approve', description: 'Status workflow: draft → in_review → approved' },
];

const DIFFERENTIATORS = [
    { title: 'Not Generic AI', description: 'Jurisdiction-specific patent law rules are embedded in the system prompt, not left to the attorney to specify.' },
    { title: 'Not a Black Box', description: 'Prior art snapshots, token counts, model versions, and complete edit history are preserved for compliance.' },
    { title: 'Not a Replacement', description: 'The AI is the assistant; the attorney is the author. Mandatory review workflows ensure human judgment at every decision.' },
    { title: 'Not Standalone', description: 'Integrated directly into the patent family workflow — prior art, drafts, and prosecution history in one place.' },
];

const PAGE_FAQ = [
    { question: 'Is AI-generated content safe for patent filing?', answer: 'AI drafts are a starting point, not a final filing. Every draft includes a mandatory disclaimer, requires attorney review, and follows a status workflow (draft → in review → approved). No content can be exported without human sign-off. Prior art snapshots and generation metadata are preserved for audit.' },
    { question: 'How does the prior art search differ from Google Patents?', answer: 'The search queries the EPO global patent database (100+ jurisdictions) directly from within your patent family view. Results are saved with relevance scores and attorney notes as part of your auditable record. No context-switching between tools, no copy-pasting into spreadsheets.' },
    { question: 'What happens if the AI hallucinates a reference?', answer: 'The AI only analyzes prior art references you explicitly select and save. It cannot fabricate references because the input is a frozen snapshot of real patents from the EPO database. The snapshot is immutable — auditors can always verify exactly which references the AI considered.' },
    { question: 'Can I control what the AI generates?', answer: 'Yes. Attorney Instructions let you guide the generation: "Emphasise the thermal regulation advantage over Reference 3" or "Use cautious novelty language for the bispecific claims." The AI weighs these alongside jurisdiction-specific rules. You can also regenerate with different instructions — each version is preserved.' },
    { question: 'How are prior art snapshots preserved?', answer: 'When you generate a draft, the selected prior art references are frozen as an immutable snapshot. Each draft version has its own snapshot, so auditors can see exactly which references were considered for any version. Snapshots include publication numbers, titles, applicants, IPC codes, and relevance scores.' },
    { question: 'What AI model powers the drafting?', answer: 'The platform uses Anthropic Claude with extended thinking for patent draft generation. Model version and token counts are recorded with every generation for compliance. Anthropic\'s zero-retention API policy means your data is never stored by the AI provider.' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function AiPatentDraftingPage() {
    return (
        <main id="main-content">
            {/* ── 1. Hero ── */}
            <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
                <Container>
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-sm text-text-muted" style={{ fontFamily: 'var(--font-body)' }}>
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li>/</li>
                            <li className="text-text-primary font-medium">AI Patent Drafting</li>
                        </ol>
                    </nav>

                    <div className="max-w-3xl">
                        <h1
                            className="text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-[3.5rem]"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            AI-Powered Prior Art Search &{' '}
                            <span className="text-primary italic">Patent Drafting Software</span>
                        </h1>
                        <p
                            className="mt-5 text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Search 100+ jurisdictions, generate jurisdiction-compliant patent drafts
                            in under 2 minutes, and maintain a complete audit trail — from prior art
                            discovery to patent filing. Built for patent attorneys, IP managers, and
                            pharma teams.
                        </p>
                    </div>

                    {/* Stat counters */}
                    <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {HERO_STATS.map((stat) => (
                            <FadeIn key={stat.label}>
                                <div className="text-center p-5 sm:p-6 rounded-2xl border border-card-border bg-card-bg">
                                    <p
                                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary"
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p
                                        className="mt-1 text-xs sm:text-sm text-text-secondary"
                                        style={{ fontFamily: 'var(--font-body)' }}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 2. Problem Statement ── */}
            <section className="py-16 sm:py-20 lg:py-24 bg-page-bg-alt">
                <Container>
                    <FadeIn>
                        <div className="max-w-3xl mx-auto text-center">
                            <h2
                                className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                The Problem Every IP Team Faces
                            </h2>
                            <p
                                className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                Patent attorneys spend 60&ndash;80% of their drafting time on repetitive,
                                error-prone tasks: searching prior art across dozens of patent offices,
                                manually cross-referencing claims, adapting drafts for different jurisdictions,
                                and ensuring compliance with country-specific patent laws.
                            </p>
                            <p
                                className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                Prior art searches are scattered across Espacenet, Google Patents, USPTO, and
                                WIPO &mdash; each with different interfaces, query syntax, and coverage gaps.
                                Attorneys paste results into spreadsheets, lose track of what was considered,
                                and can&apos;t prove their search methodology to examiners.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.15}>
                        <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
                            <div className="text-center p-5 sm:p-6 rounded-2xl border border-card-border bg-card-bg">
                                <p className="text-2xl sm:text-3xl font-bold text-danger" style={{ fontFamily: 'var(--font-mono)' }}>60&ndash;80%</p>
                                <p className="mt-1 text-xs sm:text-sm text-text-secondary" style={{ fontFamily: 'var(--font-body)' }}>of drafting time on repetitive tasks</p>
                            </div>
                            <div className="text-center p-5 sm:p-6 rounded-2xl border border-card-border bg-card-bg">
                                <p className="text-2xl sm:text-3xl font-bold text-danger" style={{ fontFamily: 'var(--font-mono)' }}>4+ Tools</p>
                                <p className="mt-1 text-xs sm:text-sm text-text-secondary" style={{ fontFamily: 'var(--font-body)' }}>to search, no unified audit trail</p>
                            </div>
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* ── 3. Prior Art Search Deep Dive ── */}
            <section className="py-16 sm:py-20 lg:py-24">
                <Container>
                    <FadeIn>
                        <div className="max-w-2xl mb-12 lg:mb-16">
                            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary" style={{ fontFamily: 'var(--font-mono)' }}>Prior Art Search</span>
                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                                One Search Bar. 100+ Jurisdictions.{' '}
                                <span className="text-primary">Zero Context-Switching.</span>
                            </h2>
                        </div>
                    </FadeIn>

                    {/* Desktop: text + mockup */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <FadeIn>
                                <h3 className="text-xl font-bold text-text-primary mb-6" style={{ fontFamily: 'var(--font-display)' }}>Four Search Modes</h3>
                            </FadeIn>
                            <div className="flex flex-col gap-1">
                                {SEARCH_MODES.map((mode, i) => (
                                    <FadeIn key={mode.title} delay={i * 0.08}>
                                        <FeatureCard icon={mode.icon} title={mode.title} description={mode.description} />
                                    </FadeIn>
                                ))}
                            </div>

                            <FadeIn delay={0.4}>
                                <div className="mt-8 space-y-3">
                                    <h3 className="text-xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>Search, Save, Audit</h3>
                                    <ul className="space-y-2">
                                        {[
                                            'Advanced filters by IPC classification, date range, and jurisdiction',
                                            'One-click save with relevance scoring and attorney notes',
                                            'Deep patent detail: bibliographic data, abstracts, claims, family members',
                                            'Claims paste for US and Indian patents where claims aren\'t available via API',
                                            'External fallback links to Espacenet, WIPO, and Google Patents',
                                        ].map((item) => (
                                            <li key={item} className="flex gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <span className="text-[13px] text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        </div>
                        <FadeIn delay={0.2}>
                            <div className="sticky top-28">
                                <AnimatedPriorArtSearch />
                            </div>
                        </FadeIn>
                    </div>

                    {/* Mobile */}
                    <div className="lg:hidden space-y-8">
                        <div className="flex flex-col gap-1">
                            {SEARCH_MODES.map((mode, i) => (
                                <FadeIn key={mode.title} delay={i * 0.08}>
                                    <FeatureCard icon={mode.icon} title={mode.title} description={mode.description} />
                                </FadeIn>
                            ))}
                        </div>
                        <FadeIn delay={0.2}>
                            <AnimatedPriorArtSearch />
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* ── 4. AI Draft Generation Deep Dive ── */}
            <section className="py-16 sm:py-20 lg:py-24 bg-page-bg-alt">
                <Container>
                    <FadeIn>
                        <div className="max-w-2xl mb-12 lg:mb-16">
                            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary" style={{ fontFamily: 'var(--font-mono)' }}>AI Draft Generation</span>
                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                                Attorney-Guided AI That{' '}
                                <span className="text-primary">Understands Patent Law</span>
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
                        <FadeIn delay={0.1}>
                            <div className="sticky top-28">
                                <AnimatedAiDraftGeneration />
                            </div>
                        </FadeIn>
                        <div>
                            <FadeIn>
                                <h3 className="text-xl font-bold text-text-primary mb-6" style={{ fontFamily: 'var(--font-display)' }}>What the AI Produces</h3>
                            </FadeIn>
                            <div className="flex flex-col gap-1">
                                {DRAFT_FEATURES.map((feat, i) => (
                                    <FadeIn key={feat.title} delay={i * 0.08}>
                                        <FeatureCard icon={feat.icon} title={feat.title} description={feat.description} />
                                    </FadeIn>
                                ))}
                            </div>

                            <FadeIn delay={0.4}>
                                <div className="mt-8 space-y-3">
                                    <h3 className="text-xl font-bold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>Version Control</h3>
                                    <ul className="space-y-2">
                                        {[
                                            'Generate V1, review it, add instructions, regenerate V2',
                                            'Each version is a separate record with its own prior art snapshot',
                                            'Model version and token count recorded for every generation',
                                            'No overwrites — complete generation history preserved',
                                            'Mandatory AI disclaimer on every generated draft',
                                        ].map((item) => (
                                            <li key={item} className="flex gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <span className="text-[13px] text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    <div className="lg:hidden space-y-8">
                        <div className="flex flex-col gap-1">
                            {DRAFT_FEATURES.map((feat, i) => (
                                <FadeIn key={feat.title} delay={i * 0.08}>
                                    <FeatureCard icon={feat.icon} title={feat.title} description={feat.description} />
                                </FadeIn>
                            ))}
                        </div>
                        <FadeIn delay={0.2}>
                            <AnimatedAiDraftGeneration />
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* ── 5. Jurisdiction Rules Table ── */}
            <section className="py-16 sm:py-20 lg:py-24">
                <Container>
                    <FadeIn>
                        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
                            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                                6 Jurisdictions, Each With{' '}
                                <span className="text-primary">Specialised Rules</span>
                            </h2>
                            <p className="mt-4 text-base text-text-secondary leading-relaxed sm:text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                                Patent law rules are embedded in every generation &mdash; not left to the attorney to specify.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="max-w-4xl mx-auto grid gap-4">
                        {JURISDICTIONS.map((j, i) => (
                            <FadeIn key={j.code} delay={i * 0.06}>
                                <div className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border border-card-border bg-card-bg hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-200">
                                    <div className="shrink-0 flex items-center gap-2">
                                        <span className="text-sm sm:text-base font-bold" style={{ fontFamily: 'var(--font-mono)', color: j.color }}>{j.code}</span>
                                        <span className="text-xs sm:text-sm text-text-muted" style={{ fontFamily: 'var(--font-body)' }}>{j.label}</span>
                                    </div>
                                    <p className="text-[13px] sm:text-sm text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{j.rules}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 6. DOCX Export + Cost Analytics ── */}
            <section className="py-16 sm:py-20 lg:py-24 bg-page-bg-alt">
                <Container>
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                        <FadeIn>
                            <div className="p-6 sm:p-8 rounded-2xl border border-card-border bg-card-bg h-full">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                                    DOCX Export
                                </h3>
                                <p className="text-sm text-text-secondary mb-5 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                                    From AI draft to attorney&apos;s desk in one click. Export any draft as a
                                    professionally formatted Word document.
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        'Cover page with tenant name, invention title, jurisdiction, and version',
                                        'AI disclaimer callout on AI-generated drafts',
                                        'Patent-standard headings (FIELD, BACKGROUND, SUMMARY) auto-detected as H2',
                                        'Prior Art Appendix table with publication numbers and relevance scores',
                                        'Footer with tenant name, date, draft version, and page numbers',
                                    ].map((item) => (
                                        <li key={item} className="flex gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            <span className="text-[13px] text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <div className="p-6 sm:p-8 rounded-2xl border border-card-border bg-card-bg h-full">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5">
                                    <Gauge className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                                    Cost Analytics with FX Conversion
                                </h3>
                                <p className="text-sm text-text-secondary mb-5 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                                    See your total patent cost exposure in one currency. Converts everything
                                    using historical exchange rates.
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        '12 patent-relevant currencies — USD, EUR, INR, JPY, CNY, CHF, GBP, KRW, AUD, CAD, BRL, SGD',
                                        'Historical rate accuracy — uses the rate from the fee\'s due date, not today\'s rate',
                                        'Coverage reporting — shows which fees were converted and which currencies had missing rates',
                                        'Locale-aware formatting — INR in Lakhs/Crores, JPY/CNY in 万/億, USD/EUR/GBP in K/M/B',
                                    ].map((item) => (
                                        <li key={item} className="flex gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            <span className="text-[13px] text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* ── 7. Security & Compliance (Dark) ── */}
            <section className="py-16 sm:py-20 lg:py-24 bg-navy">
                <Container>
                    <FadeIn>
                        <div className="max-w-2xl mb-12 lg:mb-16">
                            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary-light" style={{ fontFamily: 'var(--font-mono)' }}>Security</span>
                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                                Built for Enterprise Procurement Reviews
                            </h2>
                            <p className="mt-4 text-base text-text-on-dark/70 leading-relaxed sm:text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                                Every security control is designed for regulated IP workflows and audit readiness.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {SECURITY_CARDS.map((card, i) => (
                            <FadeIn key={card.title} delay={i * 0.06}>
                                <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.04] h-full">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-light/10 mb-4">
                                        <card.icon className="w-5 h-5 text-primary-light" />
                                    </div>
                                    <h3 className="text-sm font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>{card.title}</h3>
                                    <ul className="space-y-1.5">
                                        {card.items.map((item) => (
                                            <li key={item} className="flex gap-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-primary-light/60 shrink-0 mt-0.5" />
                                                <span className="text-xs text-text-on-dark/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 8. Attorney Workflow Timeline ── */}
            <section className="py-16 sm:py-20 lg:py-24">
                <Container>
                    <FadeIn>
                        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
                            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                                How It Fits Into the{' '}
                                <span className="text-primary">Attorney&apos;s Workflow</span>
                            </h2>
                            <p className="mt-4 text-base text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                                Every step is audited. Every decision is traceable. Every draft is versioned.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {WORKFLOW_STEPS.map((step, i) => (
                            <FadeIn key={step.number} delay={i * 0.06}>
                                <div className="relative p-5 rounded-2xl border border-card-border bg-card-bg hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-200">
                                    <span
                                        className="text-[10px] font-bold text-primary mb-2 block"
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        STEP {step.number}
                                    </span>
                                    <h3 className="text-sm font-bold text-text-primary mb-1" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                                    <p className="text-xs text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{step.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 9. What Makes This Different ── */}
            <section className="py-16 sm:py-20 lg:py-24 bg-page-bg-alt">
                <Container>
                    <FadeIn>
                        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
                            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                                What Makes This <span className="text-primary">Different</span>
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
                        {DIFFERENTIATORS.map((d, i) => (
                            <FadeIn key={d.title} delay={i * 0.08}>
                                <div className="p-6 rounded-2xl border border-card-border bg-card-bg h-full hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-200">
                                    <h3 className="text-base font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-display)' }}>{d.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{d.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 10. FAQ ── */}
            <section className="py-16 sm:py-20 lg:py-24">
                <Container>
                    <FadeIn>
                        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
                            <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                                Frequently Asked Questions
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {PAGE_FAQ.map((faq, i) => (
                            <FadeIn key={faq.question} delay={i * 0.05}>
                                <details className="group rounded-2xl border border-card-border bg-card-bg overflow-hidden">
                                    <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                        <h3 className="text-sm sm:text-base font-semibold text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>{faq.question}</h3>
                                        <svg className="w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-6 pb-5">
                                        <p className="text-sm text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{faq.answer}</p>
                                    </div>
                                </details>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 11. CTA ── */}
            <section className="py-16 sm:py-20 lg:py-24">
                <Container>
                    <div className="max-w-2xl mx-auto text-center">
                        <h2
                            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Ready to Transform Your Patent Workflow?
                        </h2>
                        <p
                            className="mt-4 text-base text-text-secondary leading-relaxed sm:text-lg"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Start searching prior art and generating jurisdiction-compliant drafts today.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                            <BookDemoButton size="lg">
                                Book a Demo
                                <ArrowRight className="w-5 h-5" />
                            </BookDemoButton>
                            <WatchDemoButton variant="secondary" size="lg">
                                <Play className="w-5 h-5 fill-current" />
                                Watch Demo
                            </WatchDemoButton>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Page-level JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: PAGE_FAQ.map((faq) => ({
                            '@type': 'Question',
                            name: faq.question,
                            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                        })),
                    }),
                }}
            />
        </main>
    );
}

/* ── Reusable card component (same as Features/Compliance) ── */

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
    return (
        <article className="group flex gap-4 items-start p-4 rounded-xl border border-transparent transition-all duration-200 hover:border-card-border hover:bg-card-bg hover:shadow-md hover:shadow-black/[0.03]">
            <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mt-0.5">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-text-primary leading-snug" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary" style={{ fontFamily: 'var(--font-body)' }}>{description}</p>
            </div>
        </article>
    );
}
