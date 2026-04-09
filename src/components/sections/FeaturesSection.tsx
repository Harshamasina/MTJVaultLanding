import {
    FileText,
    GitBranch,
    FileCheck,
    Globe,
    Briefcase,
    AlertCircle,
    CalendarDays,
    DollarSign,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { AnimatedFamiliesTable } from '@/components/ui/AnimatedFamiliesTable';
import { AnimatedCalendar } from '@/components/ui/AnimatedCalendar';
import { FadeIn } from '@/components/motion/FadeIn';

interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
}

type MockupType = 'families' | 'calendar';

interface FeatureRow {
    features: Feature[];
    mockup: MockupType;
    mockupSide: 'left' | 'right';
}

const FEATURE_ROWS: FeatureRow[] = [
    {
        mockupSide: 'right',
        mockup: 'families',
        features: [
            {
                icon: FileText,
                title: 'Patent Docketing',
                description:
                    'Track every patent application from filing to grant in one unified view.',
            },
            {
                icon: GitBranch,
                title: 'Family Management',
                description:
                    'Group related patents into families with a visual tree showing how provisionals, PCTs, and national phases connect.',
            },
            {
                icon: FileCheck,
                title: 'PRV Application Tracking',
                description:
                    'Manage provisional applications linked to families with priority date and jurisdiction tracking.',
            },
            {
                icon: Globe,
                title: 'PCT Filing Management',
                description:
                    'International filings with Chapter 22 and 30/31 date tracking, publication numbers, and office assignments.',
            },
        ],
    },
    {
        mockupSide: 'left',
        mockup: 'calendar',
        features: [
            {
                icon: Briefcase,
                title: 'NPE Case Management',
                description:
                    'Full NPE lifecycle with office actions, annuity fees, and response tracking linked to parent families.',
            },
            {
                icon: AlertCircle,
                title: 'Office Action Tracking',
                description:
                    'Never miss a response deadline. Urgency color coding: green for on track, amber for due soon, red for overdue.',
            },
            {
                icon: DollarSign,
                title: 'Fee Management',
                description:
                    '42 fee types across 8 categories. Track paid, due, waived, and overdue fees with analytics dashboards.',
            },
            {
                icon: CalendarDays,
                title: 'Deadline Calendar',
                description:
                    'Color-coded calendar with month and year views for fees, office actions, and filing reminders.',
            },
        ],
    },
];

function FeatureCard({ icon: Icon, title, description }: Feature) {
    return (
        <article className="group flex gap-4 items-start p-5 rounded-xl border border-transparent transition-all duration-200 hover:border-card-border hover:bg-card-bg hover:shadow-md hover:shadow-black/[0.03]">
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
                    className="mt-1.5 text-[13px] leading-relaxed text-text-secondary"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {description}
                </p>
            </div>
        </article>
    );
}

function FeatureRowBlock({ row, index }: { row: FeatureRow; index: number }) {
    const cards = (
        <div className="flex flex-col gap-1">
            {row.features.map((feature, i) => (
                <FadeIn key={feature.title} delay={index * 0.15 + i * 0.08}>
                    <FeatureCard {...feature} />
                </FadeIn>
            ))}
        </div>
    );

    const mockup = (
        <FadeIn delay={index * 0.15 + 0.1}>
            <div className="flex items-center justify-center h-full">
                {row.mockup === 'families' ? <AnimatedFamiliesTable /> : <AnimatedCalendar />}
            </div>
        </FadeIn>
    );

    const isMockupRight = row.mockupSide === 'right';

    return (
        <div>
            {/* Desktop layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
                {isMockupRight ? (
                    <>
                        {cards}
                        {mockup}
                    </>
                ) : (
                    <>
                        {mockup}
                        {cards}
                    </>
                )}
            </div>
            {/* Mobile layout — cards then mockup */}
            <div className="lg:hidden space-y-8">
                {cards}
                {mockup}
            </div>
        </div>
    );
}

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 lg:py-32">
            <Container>
                {/* Section Heading */}
                <div id="tree-features" className="flex items-center gap-3 mb-6">
                    <span
                        className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Features
                    </span>
                </div>
                <FadeIn treeNode="tree-features">
                    <div className="max-w-2xl mb-16 lg:mb-20">
                        <h2
                            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            IP Management Software{' '}
                            <span className="text-primary">
                                Built for Patent Teams
                            </span>
                        </h2>
                        <p
                            className="mt-4 text-lg text-text-secondary leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Everything patent attorneys, IP managers, and pharma
                            teams need to manage their intellectual property
                            portfolio, from filing to grant.
                        </p>
                    </div>
                </FadeIn>

                {/* Alternating Feature Rows */}
                <div className="space-y-20 lg:space-y-28">
                    {FEATURE_ROWS.map((row, i) => (
                        <FeatureRowBlock key={i} row={row} index={i} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
