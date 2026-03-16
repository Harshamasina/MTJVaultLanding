import {
    ShieldCheck,
    Building2,
    Brain,
    ShieldAlert,
    Lock,
    KeyRound,
    User,
    Server,
    Database,
    HardDrive,
    ArrowRight,
    ArrowDown,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';

const SECURITY_ITEMS = [
    {
        icon: ShieldCheck,
        title: 'Auth0 Authentication',
        description:
            'Enterprise SSO-ready authentication powered by Auth0. Support for SAML, OAuth 2.0, and multi-factor authentication out of the box.',
    },
    {
        icon: Building2,
        title: 'Multi-Tenant Isolation with RLS',
        description:
            'Each organization gets fully isolated data enforced by Row-Level Security (RLS) at the database layer. Subdomain-based tenant resolution with zero cross-tenant data leakage.',
    },
    {
        icon: Brain,
        title: 'In-Memory Token Storage',
        description:
            'Tokens are never stored in localStorage or sessionStorage. In-memory only, with silent refresh — resistant to XSS attacks.',
    },
    {
        icon: ShieldAlert,
        title: 'Content Sanitization',
        description:
            'All user-generated content is sanitized before display. CSP-compatible patterns with no inline styles or raw HTML rendering.',
    },
    {
        icon: Lock,
        title: 'Encrypted at Rest & Transit',
        description:
            'All data encrypted in transit via HTTPS. Documents stored in encrypted S3 buckets with presigned URL access.',
    },
    {
        icon: KeyRound,
        title: 'Step-Up Re-Authentication',
        description:
            'High-risk actions — bulk deletes, status changes, electronic signatures — require re-authentication before execution.',
    },
];

export function SecuritySection() {
    return (
        <section id="security" className="py-24 lg:py-32 bg-navy">
            <Container>
                {/* Section Heading */}
                <div id="tree-security" className="flex items-center gap-3 mb-6">
                    <span
                        className="text-xs font-bold uppercase tracking-[0.15em] text-primary-light"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Security
                    </span>
                </div>
                <FadeIn treeNode="tree-security">
                    <div className="max-w-2xl mb-16 lg:mb-20">
                        <h2
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Enterprise-Grade Security{' '}
                            <span className="text-primary-light">
                                at Every Layer
                            </span>
                        </h2>
                        <p
                            className="mt-4 text-lg text-text-on-dark/60 leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Your intellectual property data is your most valuable
                            asset. We protect it with industry-standard security
                            practices — from authentication to storage.
                        </p>
                    </div>
                </FadeIn>

                {/* Security Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {SECURITY_ITEMS.map((item, i) => (
                        <FadeIn key={item.title} treeNode="tree-security" delay={i * 0.1} className="h-full">
                            <div
                                className="h-full rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:bg-white/8 hover:border-white/15"
                            >
                                <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-primary-light/10">
                                    <item.icon className="w-5 h-5 text-primary-light" />
                                </div>
                                <h3
                                    className="text-base font-semibold text-white mb-2"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed text-text-on-dark/50"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Data Flow Diagram */}
                <div className="mt-20 lg:mt-24">
                    <div id="tree-data-flow" className="flex items-center gap-3 mb-8">
                        <span
                            className="text-xs font-bold uppercase tracking-[0.15em] text-primary-light"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            How Your Data Flows
                        </span>
                    </div>
                <FadeIn treeNode="tree-data-flow" delay={0.2}>

                    {/* Desktop Flow — horizontal then vertical split */}
                    <div className="hidden lg:block">
                        {/* Top row: User → Auth0 → API */}
                        <div className="flex items-start justify-center gap-0">
                            <FlowNode
                                icon={User}
                                title="User Browser"
                                items={['HTTPS Only', 'In-Memory Tokens', 'No localStorage']}
                            />
                            <FlowArrow label="HTTPS" />
                            <FlowNode
                                icon={ShieldCheck}
                                title="Auth0 SSO"
                                items={['MFA / SAML', 'OAuth 2.0', 'Silent Refresh']}
                                highlight
                            />
                            <FlowArrow label="JWT Token" />
                            <FlowNode
                                icon={Server}
                                title="API Server"
                                items={['RBAC Enforcement', 'Tenant Validation', 'Input Sanitization']}
                            />
                        </div>

                        {/* Vertical arrow from API down to storage */}
                        <div className="flex justify-center">
                            {/* Offset to align with API Server center (3rd node) */}
                            <div className="flex flex-col items-center">
                                <div className="w-px h-6 bg-primary-light/30" />
                                <span
                                    className="text-[10px] font-medium text-primary-light/60 my-1"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    Encrypted
                                </span>
                                <ArrowDown className="w-3.5 h-3.5 text-primary-light/40" />
                            </div>
                        </div>

                        {/* Bottom row: Two storage nodes centered */}
                        <div className="flex justify-center gap-6 mt-2">
                            <FlowNode
                                icon={Database}
                                title="Isolated Tenant DB"
                                items={['Row-Level Security', 'Encrypted at Rest']}
                                small
                            />
                            <FlowNode
                                icon={HardDrive}
                                title="Encrypted S3"
                                items={['Presigned URLs', 'Version Control']}
                                small
                            />
                        </div>
                    </div>

                    {/* Mobile Flow — vertical */}
                    <div className="lg:hidden flex flex-col items-center gap-0">
                        <FlowNode
                            icon={User}
                            title="User Browser"
                            items={['HTTPS Only', 'In-Memory Tokens']}
                        />
                        <FlowArrowVertical label="HTTPS" />
                        <FlowNode
                            icon={ShieldCheck}
                            title="Auth0 SSO"
                            items={['MFA / SAML', 'OAuth 2.0']}
                            highlight
                        />
                        <FlowArrowVertical label="JWT Token" />
                        <FlowNode
                            icon={Server}
                            title="API Server"
                            items={['RBAC Enforcement', 'Tenant Validation']}
                        />
                        <FlowArrowVertical label="Encrypted" />
                        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                            <FlowNode
                                icon={Database}
                                title="Tenant DB"
                                items={['RLS Enforced', 'Encrypted']}
                                small
                            />
                            <FlowNode
                                icon={HardDrive}
                                title="S3 Storage"
                                items={['Presigned', 'Versioned']}
                                small
                            />
                        </div>
                    </div>
                </FadeIn>
                </div>
            </Container>
        </section>
    );
}

/* Flow Diagram Sub-Components */

function FlowNode({
    icon: Icon,
    title,
    items,
    highlight = false,
    small = false,
}: {
    icon: React.ElementType;
    title: string;
    items: string[];
    highlight?: boolean;
    small?: boolean;
}) {
    return (
        <div
            className={`rounded-xl border text-center shrink-0 ${
                highlight
                    ? 'border-primary-light/30 bg-primary-light/10'
                    : 'border-white/10 bg-white/5'
            } ${small ? 'p-4 w-40' : 'p-5 w-44'}`}
        >
            <div className={`mx-auto flex items-center justify-center rounded-lg ${
                highlight ? 'bg-primary-light/20' : 'bg-white/10'
            } ${small ? 'w-9 h-9 mb-2' : 'w-10 h-10 mb-3'}`}>
                <Icon className={`text-primary-light ${small ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </div>
            <h4
                className={`font-semibold text-white ${small ? 'text-xs' : 'text-sm'}`}
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {title}
            </h4>
            <ul className={`mt-2 space-y-1 ${small ? 'text-[10px]' : 'text-xs'}`}>
                {items.map((item) => (
                    <li key={item} className="text-text-on-dark/40" style={{ fontFamily: 'var(--font-body)' }}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function FlowArrow({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center justify-center px-2 pt-8 shrink-0">
            <span
                className="text-[10px] font-medium text-primary-light/60 mb-1"
                style={{ fontFamily: 'var(--font-mono)' }}
            >
                {label}
            </span>
            <div className="flex items-center">
                <div className="w-8 h-px bg-primary-light/30" />
                <ArrowRight className="w-3.5 h-3.5 text-primary-light/40 -ml-1" />
            </div>
        </div>
    );
}


function FlowArrowVertical({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center py-1 shrink-0">
            <div className="w-px h-4 bg-primary-light/30" />
            <span
                className="text-[10px] font-medium text-primary-light/60 my-1"
                style={{ fontFamily: 'var(--font-mono)' }}
            >
                {label}
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-primary-light/40" />
        </div>
    );
}
