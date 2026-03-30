import { Check, X, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';
import { BookDemoButton } from '@/components/ui/BookDemoModal';

interface PlanFeature {
    text: string;
    included: boolean;
    detail?: string;
}

interface Plan {
    name: string;
    price: string;
    priceNote: string;
    description: string;
    target: string;
    recommended?: boolean;
    features: PlanFeature[];
    cta: string;
}

const PLANS: Plan[] = [
    {
        name: 'Starter',
        price: 'Free to start',
        priceNote: 'No credit card required',
        description: 'Everything you need to get off spreadsheets and manage your IP portfolio digitally.',
        target: 'Solo attorneys & small IP teams',
        features: [
            { text: 'Unlimited patent families', included: true },
            { text: 'PRV / PCT / NPE modules', included: true },
            { text: 'Office action & deadline tracking', included: true },
            { text: 'Annuity & maintenance fees', included: true },
            { text: 'Email deadline reminders', included: true },
            { text: 'CSV / Excel export', included: true },
            { text: 'Document attachments', included: true },
            { text: 'RBAC — up to 5 users', included: true, detail: '5 users' },
            { text: 'Basic audit log', included: true, detail: 'View only' },
            { text: 'Immutable audit trail', included: false },
            { text: '21 CFR Part 11 compliance', included: false },
            { text: 'Electronic signatures + re-auth', included: false },
            { text: 'SSO / SAML integration', included: false },
        ],
        cta: 'Book a Demo',
    },
    {
        name: 'Pharma Pro',
        price: 'Custom pricing',
        priceNote: 'Based on team size & modules',
        description: 'Regulatory-grade compliance and enterprise features for pharma IP teams.',
        target: 'Pharma IP teams & specialty law firms',
        recommended: true,
        features: [
            { text: 'Everything in Starter', included: true, detail: 'Included' },
            { text: 'Unlimited users & roles', included: true },
            { text: 'Immutable field-level audit trail', included: true, detail: 'FDA-grade' },
            { text: '21 CFR Part 11 compliance package', included: true },
            { text: 'Electronic signatures + re-auth', included: true },
            { text: 'SSO / SAML integration', included: true },
            { text: 'Foreign associate portal', included: true },
            { text: 'Orange Book / EMA auto-sync', included: true },
            { text: 'Portfolio import tool', included: true },
            { text: 'Dedicated onboarding', included: true },
            { text: 'Priority support', included: true },
        ],
        cta: 'Book a Demo',
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
                            Two plans built for different team sizes. Book a demo
                            and we&apos;ll walk you through pricing tailored to your needs.
                        </p>
                    </div>
                </FadeIn>

                {/* Plan Cards */}
                <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
                    {PLANS.map((plan, i) => (
                        <FadeIn key={plan.name} treeNode="tree-pricing" delay={i * 0.15}>
                            <div
                                className={`relative rounded-2xl border p-6 sm:p-8 h-full flex flex-col ${
                                    plan.recommended
                                        ? 'border-primary shadow-xl shadow-primary/10 ring-1 ring-primary'
                                        : 'border-card-border'
                                }`}
                            >
                                {/* Badge */}
                                {plan.recommended && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                            <Star className="w-3 h-3 fill-white" />
                                            Most Popular
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
                                    <div className="mt-3">
                                        <span
                                            className="text-xl font-bold text-text-primary"
                                            style={{ fontFamily: 'var(--font-mono)' }}
                                        >
                                            {plan.price}
                                        </span>
                                        <p
                                            className="text-xs text-text-muted mt-1"
                                            style={{ fontFamily: 'var(--font-body)' }}
                                        >
                                            {plan.priceNote}
                                        </p>
                                    </div>
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
                                <div className="mb-6">
                                    <BookDemoButton
                                        variant={plan.recommended ? 'primary' : 'secondary'}
                                        className="w-full justify-center"
                                    >
                                        {plan.cta}
                                    </BookDemoButton>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-card-border mb-6" />

                                {/* Features */}
                                <ul className="space-y-3 flex-1">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature.text}
                                            className="flex items-start gap-3"
                                        >
                                            {feature.included ? (
                                                <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                                            ) : (
                                                <X className="w-4 h-4 text-text-muted/30 shrink-0 mt-0.5" />
                                            )}
                                            <span
                                                className={`text-sm leading-snug ${
                                                    feature.included
                                                        ? 'text-text-primary'
                                                        : 'text-text-muted/40'
                                                }`}
                                                style={{ fontFamily: 'var(--font-body)' }}
                                            >
                                                {feature.text}
                                                {feature.detail && feature.included && (
                                                    <span
                                                        className="ml-1.5 text-[11px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded"
                                                        style={{ fontFamily: 'var(--font-mono)' }}
                                                    >
                                                        {feature.detail}
                                                    </span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
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
