import {
    FileWarning,
    ScrollText,
    KeyRound,
    ShieldCheck,
    Users,
    FolderLock,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';
import { BrowserFrame } from '@/components/ui/BrowserFrame';

const COMPLIANCE_ITEMS = [
    {
        icon: FileWarning,
        title: 'Reason-for-Change on Every Edit',
        description:
            'Any edit to a critical field — dates, statuses, legal events — requires a documented reason before saving. No silent changes.',
    },
    {
        icon: ScrollText,
        title: 'Full Audit Trail',
        description:
            'Every change logged with who made it, what changed, when it happened, and the before/after diff. Filterable by entity, user, date, and action.',
    },
    {
        icon: KeyRound,
        title: 'Electronic Signatures',
        description:
            'Re-authentication prompt before any approval action. Step-up auth challenge for high-risk operations like bulk deletes and status changes.',
    },
    {
        icon: ShieldCheck,
        title: 'Immutable Audit Records',
        description:
            'No edit or delete on audit history — ever. Read-only, tamper-proof records that satisfy regulatory inspections.',
    },
    {
        icon: Users,
        title: 'Role-Based Access Control',
        description:
            'Four roles — Tenant Admin, Attorney, Paralegal, Viewer — with granular permissions. Frontend restrictions backed by server-side enforcement.',
    },
    {
        icon: FolderLock,
        title: 'Secure Document Management',
        description:
            'Version-controlled uploads with presigned S3 downloads. File type restrictions, category-based organization, and full delete audit trail.',
    },
];


export function ComplianceSection() {
    return (
        <section id="compliance" className="py-24 lg:py-32 bg-page-bg-alt">
            <Container>
                {/* Section Heading */}
                <div id="tree-compliance" className="flex items-center gap-3 mb-6">
                    <span
                        className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Compliance
                    </span>
                </div>
                <FadeIn treeNode="tree-compliance">
                    <div className="max-w-2xl mb-16 lg:mb-20">
                        <h2
                            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            FDA 21 CFR Part 11{' '}
                            <span className="text-primary">
                                Built In, Not Bolted On
                            </span>
                        </h2>
                        <p
                            className="mt-4 text-lg text-text-secondary leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Every workflow in Design Your Invention is designed for
                            regulatory compliance from day one. Not an afterthought,
                            not an add-on — compliance is baked into every edit,
                            every action, every record.
                        </p>
                    </div>
                </FadeIn>

                {/* Compliance Checklist Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {COMPLIANCE_ITEMS.map((item, i) => (
                        <FadeIn key={item.title} treeNode="tree-compliance" delay={i * 0.1}>
                            <div className="flex gap-4">
                                {/* Checkmark Icon */}
                                <div className="shrink-0 mt-1">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3
                                        className="text-base font-semibold text-text-primary mb-1"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className="text-sm leading-relaxed text-text-secondary"
                                        style={{ fontFamily: 'var(--font-body)' }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Audit Trail Screenshot */}
                <FadeIn treeNode="tree-compliance" delay={0.2}>
                    <div className="mt-16 lg:mt-20">
                        <h3
                            className="text-lg font-semibold text-text-primary mb-6"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Audit Trail — Every Action Recorded
                        </h3>
                        <BrowserFrame
                            src="/images/audit.png"
                            alt="MTJVault audit trail showing timestamped records with actor, action type, entity, field changes, and reason-for-change for FDA 21 CFR Part 11 compliance"
                            width={1560}
                            height={740}
                        />
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}
