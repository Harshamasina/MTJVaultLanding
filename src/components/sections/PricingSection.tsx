import { Check, X, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';
import { BookDemoButton } from '@/components/ui/BookDemoModal';

interface PlanFeature {
    text: string;
    included: boolean;
    detail?: string;
}

interface PlanGroup {
    label: string;
    features: PlanFeature[];
}

interface Plan {
    name: string;
    price: string;
    description: string;
    target: string;
    recommended?: boolean;
    featureGroups: PlanGroup[];
    cta: string;
}

const PLANS: Plan[] = [
    {
        name: 'Starter',
        price: 'TBA',
        description: 'Everything you need to get off spreadsheets and manage your IP portfolio digitally.',
        target: 'Solo attorneys, IP boutiques, small biotechs',
        featureGroups: [
            {
                label: 'Core Docketing',
                features: [
                    { text: 'Patent families', included: true, detail: 'Unlimited' },
                    { text: 'PRV / PCT / NPE modules', included: true },
                    { text: 'Office action & deadline tracking', included: true },
                    { text: 'Annuity / maintenance fees', included: true },
                    { text: 'Email deadline reminders', included: true },
                    { text: 'CSV / Excel export', included: true },
                    { text: 'Document attachments', included: true },
                    { text: 'RBAC (user roles)', included: true, detail: '5 users max' },
                ],
            },
            {
                label: 'Audit & Compliance',
                features: [
                    { text: 'Basic audit log', included: true, detail: 'View only' },
                    { text: 'Immutable field-level audit trail', included: false },
                    { text: '21 CFR Part 11 compliance package', included: false },
                    { text: 'Electronic signatures + re-auth', included: false },
                ],
            },
            {
                label: 'Enterprise & Access',
                features: [
                    { text: 'SSO / SAML integration', included: false },
                    { text: 'Foreign associate portal', included: false },
                    { text: 'Orange Book / EMA auto-sync', included: false },
                ],
            },
        ],
        cta: 'Get Started',
    },
    {
        name: 'Pharma Pro',
        price: 'TBA',
        description: 'Regulatory-grade compliance and enterprise features for pharma IP teams.',
        target: 'Mid-size pharma IP teams, specialty law firms',
        recommended: true,
        featureGroups: [
            {
                label: 'Core Docketing',
                features: [
                    { text: 'Patent families', included: true, detail: 'Unlimited' },
                    { text: 'PRV / PCT / NPE modules', included: true },
                    { text: 'Office action & deadline tracking', included: true },
                    { text: 'Annuity / maintenance fees', included: true },
                    { text: 'Email deadline reminders', included: true },
                    { text: 'CSV / Excel export', included: true },
                    { text: 'Document attachments', included: true },
                    { text: 'RBAC (user roles)', included: true, detail: 'Expanded' },
                ],
            },
            {
                label: 'Audit & Compliance',
                features: [
                    { text: 'Basic audit log', included: true },
                    { text: 'Immutable field-level audit trail', included: true, detail: 'FDA-grade' },
                    { text: '21 CFR Part 11 compliance package', included: true },
                    { text: 'Electronic signatures + re-auth', included: true },
                ],
            },
            {
                label: 'Enterprise & Access',
                features: [
                    { text: 'SSO / SAML integration', included: true },
                    { text: 'Foreign associate portal', included: true },
                    { text: 'Orange Book / EMA auto-sync', included: true },
                ],
            },
        ],
        cta: 'Get Started',
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="py-24 lg:py-32">
            <Container>
                {/* Section Heading */}
                <div id="tree-pricing" className="flex items-center gap-3 mb-6">
                    <span
                        className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Pricing
                    </span>
                </div>
                <FadeIn treeNode="tree-pricing">
                    <div className="max-w-2xl mb-16 lg:mb-20">
                        <h2
                            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Simple, Transparent{' '}
                            <span className="text-primary">Pricing</span>
                        </h2>
                        <p
                            className="mt-4 text-lg text-text-secondary leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Two plans. No hidden fees. Pick the one that fits your
                            team and start managing your IP portfolio today.
                        </p>
                    </div>
                </FadeIn>

                {/* Plan Cards */}
                <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
                    {PLANS.map((plan, i) => (
                        <FadeIn key={plan.name} treeNode="tree-pricing" delay={i * 0.15}>
                        <div
                            className={`relative rounded-2xl border p-8 ${
                                plan.recommended
                                    ? 'border-primary shadow-xl shadow-primary/10 ring-1 ring-primary'
                                    : 'border-card-border'
                            }`}
                        >
                            {/* Recommended Badge */}
                            {plan.recommended && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                        <Star className="w-3 h-3 fill-white" />
                                        Recommended
                                    </span>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-6">
                                <h3
                                    className="text-2xl font-bold text-text-primary"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {plan.name}
                                </h3>
                                {/* <div className="mt-3 flex items-baseline gap-1">
                                    <span
                                        className="text-4xl font-bold text-text-primary"
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        {plan.price}
                                    </span>
                                </div> */}
                                <p
                                    className="mt-3 text-sm text-text-secondary leading-relaxed"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {plan.description}
                                </p>
                                <p
                                    className="mt-2 text-xs text-text-muted"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    Best for: {plan.target}
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="mb-8">
                                <BookDemoButton
                                    variant={plan.recommended ? 'primary' : 'secondary'}
                                    className="w-full justify-center"
                                >
                                    {plan.cta}
                                </BookDemoButton>
                            </div>

                            {/* Feature Groups */}
                            <div className="space-y-6">
                                {plan.featureGroups.map((group) => (
                                    <div key={group.label}>
                                        <h4
                                            className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3 pb-2 border-b border-card-border"
                                            style={{ fontFamily: 'var(--font-mono)' }}
                                        >
                                            {group.label}
                                        </h4>
                                        <ul className="space-y-2.5">
                                            {group.features.map((feature) => (
                                                <li
                                                    key={feature.text}
                                                    className="flex items-start gap-3"
                                                >
                                                    {feature.included ? (
                                                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-text-muted/40 shrink-0 mt-0.5" />
                                                    )}
                                                    <span
                                                        className={`text-sm ${
                                                            feature.included
                                                                ? 'text-text-primary'
                                                                : 'text-text-muted/50'
                                                        }`}
                                                        style={{ fontFamily: 'var(--font-body)' }}
                                                    >
                                                        {feature.text}
                                                        {feature.detail && (
                                                            <span className="ml-1.5 text-xs font-medium text-primary">
                                                                {feature.detail}
                                                            </span>
                                                        )}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Enterprise CTA */}
                <FadeIn treeNode="tree-pricing" delay={0.3}>
                <div className="text-center mt-12">
                    <p
                        className="text-sm text-text-secondary"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Need a custom enterprise plan?{' '}
                        <a
                            href="#contact"
                            className="text-primary font-semibold hover:text-primary-dark transition-colors"
                        >
                            Contact us
                        </a>
                    </p>
                </div>
                </FadeIn>
            </Container>
        </section>
    );
}
