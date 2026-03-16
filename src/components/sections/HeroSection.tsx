import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { BookDemoButton } from '@/components/ui/BookDemoModal';
import { HeroTreeVisual } from '@/components/ui/HeroTreeVisual';
import { CTA_DEMO_URL } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="pt-28 pb-0 sm:pt-32 lg:pt-40 overflow-hidden">
            <Container>
                <div className="flex items-start gap-8 lg:gap-12">
                    {/* Text Content — left */}
                    <div className="w-full lg:max-w-[55%] lg:shrink-0">
                        <h1
                            className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem]"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            IP Management Software{' '}
                            <span className="text-primary italic">
                                for Law Firms & Pharma
                            </span>
                        </h1>
                        <p
                            className="mt-5 text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg sm:max-w-2xl"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            The modern patent docketing platform for IP teams.
                            Track patent families, PCT/PRV/NPE cases, fees, deadlines,
                            and FDA 21 CFR Part 11 compliance — all in one place.
                        </p>
                        <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                            <BookDemoButton size="lg">
                                Book a Demo
                                <ArrowRight className="w-5 h-5" />
                            </BookDemoButton>
                            <Button href={CTA_DEMO_URL} variant="secondary" size="lg">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    {/* Family Tree Visual — right, hidden below lg */}
                    <div className="hidden lg:block flex-1 min-w-0">
                        <HeroTreeVisual />
                    </div>
                </div>
            </Container>

            {/* Dashboard Screenshot */}
            <div id="hero-dashboard" className="mt-16 sm:mt-20 lg:mt-28 mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
                <BrowserFrame
                    src="/images/dashboard.png"
                    alt="MTJVault IP management dashboard showing patent portfolio overview with stat cards, jurisdiction charts, and deadline notifications"
                    width={1560}
                    height={680}
                    priority
                />
            </div>
        </section>
    );
}
