import {
    FileText,
    GitBranch,
    FileCheck,
    Globe,
    Briefcase,
    AlertCircle,
    CalendarDays,
    DollarSign,
    FolderLock,
    Download,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { PctTimeline } from '@/components/sections/PctTimeline';

interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
}

interface FeatureGroup {
    id: string;
    label: string;
    features: Feature[];
    screenshot?: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
}

const FEATURE_GROUPS: FeatureGroup[] = [
    {
        id: 'core-patent',
        label: 'Core Patent Management',
        features: [
            {
                icon: FileText,
                title: 'Patent Docketing',
                description:
                    'Track every patent application from filing to grant in one unified view. Search, filter, and sort across your entire portfolio.',
            },
            {
                icon: GitBranch,
                title: 'Application Family Management',
                description:
                    'Group related patents into families with a visual family tree. See how provisionals, PCTs, and national phases connect.',
            },
            {
                icon: FileCheck,
                title: 'PRV Application Tracking',
                description:
                    'Manage provisional applications linked to families with priority date tracking, filing dates, and jurisdiction details.',
            },
            {
                icon: Globe,
                title: 'PCT Filing Management',
                description:
                    'International filings with PCT Chapter 22 and 30/31 date tracking. Publication numbers, filing dates, and office assignments built in.',
            },
        ],
        screenshot: {
            src: '/images/families.png',
            alt: 'MTJVault patent docketing list view showing application families with reference codes, status badges, jurisdictions, and priority dates',
            width: 1440,
            height: 860,
        },
    },
    {
        id: 'case-mgmt',
        label: 'Case Management',
        features: [
            {
                icon: Briefcase,
                title: 'NPE Case Management',
                description:
                    'Full NPE lifecycle management with office actions, annuity fees, and response tracking. Link cases to parent families automatically.',
            },
            {
                icon: AlertCircle,
                title: 'Office Action Tracking',
                description:
                    'Never miss a response deadline. Track office actions with urgency color coding — green for on track, amber for due soon, red for overdue.',
            },
            {
                icon: CalendarDays,
                title: 'Deadline Calendar',
                description:
                    'Calendar view with color-coded events for fees, office actions, and reminders. Month and year views with date range filtering.',
            },
        ],
        screenshot: {
            src: '/images/calendar.png',
            alt: 'MTJVault deadline calendar showing color-coded patent fees, office action deadlines, and reminder events across a monthly view',
            width: 1460,
            height: 760,
        },
    },
    {
        id: 'financial',
        label: 'Financial & Documents',
        features: [
            {
                icon: DollarSign,
                title: 'Fee Management',
                description:
                    '42 fee types across 8 categories. Track paid, due, waived, and overdue fees with analytics dashboards and status filtering.',
            },
            {
                icon: FolderLock,
                title: 'Document Vault',
                description:
                    'Secure document upload with version control. Presigned S3 downloads, file type restrictions, and category-based organization.',
            },
            {
                icon: Download,
                title: 'CSV Export & Bulk Actions',
                description:
                    'Export any docket view to CSV with one click. Select multiple records for status changes, deletion, or bulk operations.',
            },
        ],
    },
];

function FeatureCard({ icon: Icon, title, description }: Feature) {
    return (
        <article className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-200 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5">
            <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3
                className="text-lg font-semibold text-text-primary mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {title}
            </h3>
            <p
                className="text-sm leading-relaxed text-text-secondary"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                {description}
            </p>
        </article>
    );
}

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 lg:py-32">
            <Container>
                {/* Section Heading */}
                <div className="max-w-2xl mb-16 lg:mb-20">
                    <h2
                        className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Why IP Teams Choose{' '}
                        <span className="text-primary">
                            Design Your Invention
                        </span>
                    </h2>
                    <p
                        className="mt-4 text-lg text-text-secondary leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Everything patent attorneys, IP managers, and pharma
                        teams need to manage their intellectual property
                        portfolio — from filing to grant.
                    </p>
                </div>

                {/* Feature Groups */}
                <div className="space-y-24 lg:space-y-32">
                    {FEATURE_GROUPS.map((group) => (
                        <div key={group.label}>
                            {/* Sub-section Label */}
                            <div id={group.id} className="flex items-center gap-3 mb-8">
                                <span
                                    className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    {group.label}
                                </span>
                            </div>

                            {/* Feature Cards Grid */}
                            <div
                                className={`grid gap-6 ${
                                    group.features.length === 4
                                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                }`}
                            >
                                {group.features.map((feature) => (
                                    <FeatureCard
                                        key={feature.title}
                                        {...feature}
                                    />
                                ))}
                            </div>

                            {/* Screenshot */}
                            {group.screenshot && (
                                <div className="mt-12 lg:mt-16">
                                    <BrowserFrame
                                        src={group.screenshot.src}
                                        alt={group.screenshot.alt}
                                        width={group.screenshot.width}
                                        height={group.screenshot.height}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* PCT Timeline */}
                <PctTimeline />
            </Container>
        </section>
    );
}
