import { ArrowRight, CreditCard, Clock, XCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CTA_SIGNUP_URL, CTA_DEMO_URL } from '@/lib/constants';
import { FadeIn } from '@/components/motion/FadeIn';

const TRUST_SIGNALS = [
    { icon: CreditCard, text: 'No credit card required' },
    { icon: Clock, text: 'Set up in minutes' },
    { icon: XCircle, text: 'Cancel anytime' },
];

export function CtaSection() {
    return (
        <section className="py-24 lg:py-32">
            <Container>
                <FadeIn>
                <div className="text-center max-w-2xl mx-auto">
                    <h2
                        className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Ready to Modernize Your{' '}
                        <span className="text-primary">IP Management?</span>
                    </h2>
                    <p
                        className="mt-5 text-lg text-text-secondary leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Join law firms and pharma teams who trust Design Your
                        Invention for patent docketing, compliance, and
                        portfolio management.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Button href={CTA_SIGNUP_URL} size="lg">
                            Start Free Trial
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button href={CTA_DEMO_URL} variant="secondary" size="lg">
                            Schedule a Demo
                        </Button>
                    </div>

                    {/* Trust Signals */}
                    <div className="mt-8 flex flex-wrap justify-center gap-6">
                        {TRUST_SIGNALS.map((signal) => (
                            <div
                                key={signal.text}
                                className="flex items-center gap-2 text-text-muted"
                            >
                                <signal.icon className="w-4 h-4" />
                                <span
                                    className="text-sm"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {signal.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                </FadeIn>
            </Container>
        </section>
    );
}
