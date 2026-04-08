import {
    ShieldCheck,
    Building2,
    Brain,
    ShieldAlert,
    Lock,
    KeyRound,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';

const TRUST_BADGES = [
    { icon: ShieldCheck, label: 'Auth0 SSO' },
    { icon: Lock, label: '256-bit Encryption' },
    { icon: Building2, label: 'Row-Level Isolation' },
    { icon: KeyRound, label: 'Step-Up Auth' },
    { icon: Brain, label: 'Zero Token Storage' },
    { icon: ShieldAlert, label: 'CSP Sanitization' },
];

const SECURITY_ITEMS = [
    {
        icon: ShieldCheck,
        title: 'Auth0 Authentication',
        description:
            'Enterprise SSO-ready with SAML, OAuth 2.0, and multi-factor authentication out of the box.',
    },
    {
        icon: Building2,
        title: 'Multi-Tenant Isolation with RLS',
        description:
            'Each organization gets fully isolated data enforced by Row-Level Security at the database layer.',
    },
    {
        icon: Brain,
        title: 'In-Memory Token Storage',
        description:
            'Tokens never stored in localStorage. In-memory only with silent refresh, resistant to XSS.',
    },
    {
        icon: ShieldAlert,
        title: 'Content Sanitization',
        description:
            'All user content sanitized before display. CSP-compatible with no raw HTML rendering.',
    },
    {
        icon: Lock,
        title: 'Encrypted at Rest & Transit',
        description:
            'Data encrypted via HTTPS in transit. Documents in encrypted S3 with presigned URL access.',
    },
    {
        icon: KeyRound,
        title: 'Step-Up Re-Authentication',
        description:
            'Bulk deletes, status changes, and electronic signatures require re-authentication.',
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
                    <div className="max-w-2xl mb-12 lg:mb-16">
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
                            practices, from authentication to storage.
                        </p>
                    </div>
                </FadeIn>

                {/* Trust Badges Bar */}
                <FadeIn treeNode="tree-security" delay={0.1}>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-14 lg:mb-18">
                        {TRUST_BADGES.map((badge) => (
                            <div
                                key={badge.label}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-primary-light/20 bg-primary-light/[0.06]"
                            >
                                <badge.icon className="w-3.5 h-3.5 text-primary-light" />
                                <span
                                    className="text-[11px] sm:text-xs font-semibold text-primary-light"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    {badge.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                {/* Security Cards — 2-column layout */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {SECURITY_ITEMS.map((item, i) => (
                        <FadeIn key={item.title} treeNode="tree-security" delay={0.15 + i * 0.08} className="h-full">
                            <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 transition-all duration-200 hover:bg-white/[0.07] hover:border-white/15">
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-light/10 mt-0.5">
                                        <item.icon className="w-5 h-5 text-primary-light" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3
                                            className="text-[15px] font-semibold text-white leading-snug"
                                            style={{ fontFamily: 'var(--font-display)' }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className="mt-1.5 text-[13px] leading-relaxed text-text-on-dark/45"
                                            style={{ fontFamily: 'var(--font-body)' }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </Container>
        </section>
    );
}
