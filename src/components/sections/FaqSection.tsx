import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { FAQ_ITEMS } from '@/lib/faq-data';

export function FaqSection() {
    return (
        <section id="faq" className="py-24 lg:py-32 bg-page-bg-alt">
            <Container>
                {/* Section Heading */}
                <div id="tree-faq" className="flex items-center gap-3 mb-6">
                    <span
                        className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        FAQ
                    </span>
                </div>
                <FadeIn treeNode="tree-faq">
                    <div className="max-w-2xl mb-12 lg:mb-16">
                        <h2
                            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Frequently Asked Questions
                        </h2>
                        <p
                            className="mt-4 text-lg text-text-secondary leading-relaxed"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Everything you need to know about Design Your Invention.
                            Can&apos;t find what you&apos;re looking for?{' '}
                            <a
                                href="#contact"
                                className="text-primary font-semibold hover:text-primary-dark transition-colors"
                            >
                                Contact our team
                            </a>
                            .
                        </p>
                    </div>
                </FadeIn>

                {/* Accordion in card */}
                <FadeIn treeNode="tree-faq" delay={0.1}>
                    <FaqAccordion items={FAQ_ITEMS} />
                </FadeIn>
            </Container>
        </section>
    );
}
