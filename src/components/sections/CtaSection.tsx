import { CreditCard, Clock, XCircle, Mail, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';
import { ContactForm } from '@/components/sections/ContactForm';

const TRUST_SIGNALS = [
    { icon: CreditCard, text: 'No credit card required' },
    { icon: Clock, text: 'Set up in minutes' },
    { icon: XCircle, text: 'Cancel anytime' },
];

const CONTACT_INFO = [
    {
        icon: Mail,
        label: 'Email',
        value: 'sales@designyourinvention.com',
        href: 'mailto:sales@designyourinvention.com',
    },
    {
        icon: MapPin,
        label: 'Headquarters',
        value: 'United States',
    },
    {
        icon: Clock,
        label: 'Response Time',
        value: 'Within 1 business day',
    },
];

export function CtaSection() {
    return (
        <section id="contact" className="py-24 lg:py-32">
            <Container>
                <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
                    {/* Left Column — CTA copy + contact info */}
                    <div className="lg:col-span-2">
                        {/* Section Heading — tree branch anchor */}
                        <div id="tree-contact" className="flex items-center gap-3 mb-6">
                            <span
                                className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                Contact
                            </span>
                        </div>
                        <FadeIn treeNode="tree-contact">
                            <h2
                                className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Ready to Modernize Your{' '}
                                <span className="text-primary">
                                    IP Management?
                                </span>
                            </h2>
                            <p
                                className="mt-5 text-lg text-text-secondary leading-relaxed"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                Join law firms and pharma teams who trust Design
                                Your Invention for patent docketing, compliance,
                                and portfolio management.
                            </p>

                            {/* Trust Signals */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                {TRUST_SIGNALS.map((signal) => (
                                    <div
                                        key={signal.text}
                                        className="flex items-center gap-2 text-text-muted"
                                    >
                                        <signal.icon className="w-4 h-4" />
                                        <span
                                            className="text-sm"
                                            style={{
                                                fontFamily: 'var(--font-body)',
                                            }}
                                        >
                                            {signal.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Details */}
                            <div className="mt-10 space-y-5">
                                {CONTACT_INFO.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p
                                                className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1"
                                                style={{
                                                    fontFamily:
                                                        'var(--font-mono)',
                                                }}
                                            >
                                                {item.label}
                                            </p>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                                                    style={{
                                                        fontFamily:
                                                            'var(--font-body)',
                                                    }}
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p
                                                    className="text-sm font-medium text-text-primary"
                                                    style={{
                                                        fontFamily:
                                                            'var(--font-body)',
                                                    }}
                                                >
                                                    {item.value}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right Column — Contact Form */}
                    <div className="lg:col-span-3">
                        <FadeIn treeNode="tree-contact" delay={0.15}>
                            <div className="rounded-2xl border border-card-border bg-card-bg p-8 lg:p-10 shadow-lg shadow-black/5">
                                <ContactForm />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </Container>
        </section>
    );
}
