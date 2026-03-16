import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { CTA_SIGNUP_URL, CTA_DEMO_URL } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="pt-32 pb-0 lg:pt-40 overflow-hidden">
            <Container>
                {/* Text Content */}
                <div className="max-w-3xl">
                    <h1
                        className="text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        IP Management Software{' '}
                        <span className="text-primary italic">
                            for Law Firms & Pharma
                        </span>
                    </h1>
                    <p
                        className="mt-6 text-lg leading-relaxed text-text-secondary max-w-2xl sm:text-xl"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        The modern patent docketing platform for IP teams.
                        Track patent families, PCT/PRV/NPE cases, fees, deadlines,
                        and FDA 21 CFR Part 11 compliance — all in one place.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Button href={CTA_SIGNUP_URL} size="lg">
                            Start Free Trial
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button href={CTA_DEMO_URL} variant="secondary" size="lg">
                            Watch Demo
                        </Button>
                    </div>
                </div>
            </Container>

            {/* Dashboard Screenshot — breaks out of container for wider feel */}
            <div id="hero-dashboard" className="mt-20 lg:mt-28 mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
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
