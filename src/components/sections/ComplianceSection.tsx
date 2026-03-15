import {
    FileWarning,
    ScrollText,
    KeyRound,
    ShieldCheck,
    Users,
    FolderLock,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';

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

interface AuditRow {
    timestamp: string;
    actor: string;
    action: string;
    actionColor: string;
    entity: string;
    changes: string;
    reason: string;
}

const AUDIT_DATA: AuditRow[] = [
    {
        timestamp: '15 Mar 2026 10:48',
        actor: 'sarah.chen@acmelaw.com',
        action: 'Update',
        actionColor: 'bg-primary/10 text-primary',
        entity: 'Patent Family: CB-ONC-0005',
        changes: 'Changed: Filing Date, Status',
        reason: 'Priority date correction per USPTO notice',
    },
    {
        timestamp: '15 Mar 2026 10:45',
        actor: 'james.wu@acmelaw.com',
        action: 'Create',
        actionColor: 'bg-success/10 text-success',
        entity: 'PRV Application: US63/900002',
        changes: 'Created',
        reason: '—',
    },
    {
        timestamp: '14 Mar 2026 16:30',
        actor: 'sarah.chen@acmelaw.com',
        action: 'Update',
        actionColor: 'bg-primary/10 text-primary',
        entity: 'NPE Case: EP National Phase',
        changes: 'Changed: Grant Date, Grant Number, Patent Expiry Date',
        reason: 'Grant received from EPO',
    },
    {
        timestamp: '14 Mar 2026 09:15',
        actor: 'admin@acmelaw.com',
        action: 'Delete',
        actionColor: 'bg-danger/10 text-danger',
        entity: 'Document: Draft OA Response v2',
        changes: 'Deleted',
        reason: 'Superseded by final version',
    },
    {
        timestamp: '13 Mar 2026 17:05',
        actor: 'james.wu@acmelaw.com',
        action: 'Update',
        actionColor: 'bg-primary/10 text-primary',
        entity: 'PCT Filing: PCT/US2026/1243434',
        changes: 'Changed: Status',
        reason: 'National phase entry completed',
    },
    {
        timestamp: '13 Mar 2026 14:22',
        actor: 'lisa.park@acmelaw.com',
        action: 'Create',
        actionColor: 'bg-success/10 text-success',
        entity: 'Annuity Fee: Year 2 — AU2026900456',
        changes: 'Created',
        reason: '—',
    },
];

export function ComplianceSection() {
    return (
        <section id="compliance" className="py-24 lg:py-32 bg-page-bg-alt">
            <Container>
                {/* Section Heading */}
                <div className="max-w-2xl mb-16 lg:mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 max-w-12 bg-primary/40" />
                        <span
                            className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            Compliance
                        </span>
                    </div>
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

                {/* Compliance Checklist Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {COMPLIANCE_ITEMS.map((item) => (
                        <div key={item.title} className="flex gap-4">
                            {/* Checkmark Icon */}
                            <div className="flex-shrink-0 mt-1">
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
                    ))}
                </div>

                {/* Audit Trail Preview */}
                <div className="mt-16 lg:mt-20">
                    <h3
                        className="text-lg font-semibold text-text-primary mb-6"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Audit Trail — Every Action Recorded
                    </h3>
                    <div className="rounded-xl border border-card-border bg-white shadow-lg shadow-black/5 overflow-hidden">
                        {/* Filter Bar */}
                        <div className="flex flex-wrap items-center gap-4 px-5 py-4 border-b border-card-border bg-page-bg-alt">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-muted" style={{ fontFamily: 'var(--font-body)' }}>Entity Type</span>
                                <span className="text-xs font-medium text-text-primary px-3 py-1.5 bg-white rounded-md border border-card-border" style={{ fontFamily: 'var(--font-body)' }}>
                                    Patent Family
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-muted" style={{ fontFamily: 'var(--font-body)' }}>Action</span>
                                <span className="text-xs font-medium text-text-primary px-3 py-1.5 bg-white rounded-md border border-card-border" style={{ fontFamily: 'var(--font-body)' }}>
                                    All
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-muted" style={{ fontFamily: 'var(--font-body)' }}>Actor</span>
                                <span className="text-xs font-medium text-text-primary px-3 py-1.5 bg-white rounded-md border border-card-border" style={{ fontFamily: 'var(--font-body)' }}>
                                    Select actor
                                </span>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left" style={{ fontFamily: 'var(--font-body)' }}>
                                <thead>
                                    <tr className="border-b border-card-border">
                                        <th className="px-5 py-3.5 text-xs font-semibold text-text-primary tracking-wide">Timestamp</th>
                                        <th className="px-5 py-3.5 text-xs font-semibold text-text-primary tracking-wide">Actor</th>
                                        <th className="px-5 py-3.5 text-xs font-semibold text-text-primary tracking-wide">Action</th>
                                        <th className="px-5 py-3.5 text-xs font-semibold text-text-primary tracking-wide">Entity</th>
                                        <th className="px-5 py-3.5 text-xs font-semibold text-text-primary tracking-wide">Changes</th>
                                        <th className="px-5 py-3.5 text-xs font-semibold text-text-primary tracking-wide">Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AUDIT_DATA.map((row, i) => (
                                        <tr key={i} className="border-b border-card-border last:border-b-0 hover:bg-page-bg-alt/50 transition-colors">
                                            <td className="px-5 py-3.5 text-xs text-text-secondary whitespace-nowrap">{row.timestamp}</td>
                                            <td className="px-5 py-3.5 text-xs text-text-secondary">{row.actor}</td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded ${row.actionColor}`}>
                                                    {row.action}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-xs text-text-secondary">{row.entity}</td>
                                            <td className="px-5 py-3.5 text-xs text-text-secondary">{row.changes}</td>
                                            <td className="px-5 py-3.5 text-xs text-text-secondary">{row.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
