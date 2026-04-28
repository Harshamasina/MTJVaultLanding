import { Container } from '@/components/ui/Container';
import { BookDemoButton } from '@/components/ui/BookDemoModal';
import { WatchDemoButton } from '@/components/ui/WatchDemoModal';
import { HeroTreeVisual } from '@/components/ui/HeroTreeVisual';
import { HoneycombPattern } from '@/components/ui/HoneycombPattern';
import { AnimatedDashboard } from '@/components/ui/AnimatedDashboard';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
    return (
        <>
            {/* Hero — natural flow on mobile, min-viewport-height on desktop.
                min-h-screen (not h-screen) so short viewports can GROW the
                section to fit content instead of overflowing above the
                padding into the fixed navbar. */}
            <section
                id="hero"
                aria-label="Hero"
                className="relative flex flex-col pt-28 sm:pt-32 pb-10 sm:pb-14 lg:min-h-screen lg:justify-center lg:pt-32 lg:pb-32 xl:pt-36 xl:pb-36 overflow-hidden"
            >
                <HoneycombPattern />
                <Container className="relative">
                    <div className="flex items-start lg:items-center gap-8 lg:gap-16 xl:gap-20">
                        {/* Text Content — left */}
                        <div className="w-full lg:max-w-[52%] lg:shrink-0">
                            <h1
                                className="text-[2.375rem] font-bold leading-[1.1] tracking-tight text-text-primary sm:text-[2.75rem] md:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Patent IP Management That Replaces Your{' '}
                                <span className="text-primary italic">
                                    Spreadsheets, Scattered Searches, and Drafting Tools
                                </span>
                            </h1>
                            <p
                                className="mt-5 text-[17px] leading-relaxed text-text-secondary sm:mt-6 sm:text-lg sm:max-w-2xl"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                Patent docketing, prior art search, and AI-powered drafting
                                in one audited platform, built for law firms and pharma
                                teams. Manage PCT/PRV/NPE cases, track fees and deadlines,
                                and maintain FDA 21 CFR Part 11 compliance.
                            </p>
                            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                                <BookDemoButton size="lg">
                                    Book a Demo
                                    <ArrowRight className="w-5 h-5" />
                                </BookDemoButton>
                                <WatchDemoButton variant="secondary" size="lg">
                                    <Play className="w-5 h-5 fill-current" />
                                    Watch Demo
                                </WatchDemoButton>
                            </div>
                        </div>

                        {/* Family Tree Visual — right, hidden below lg */}
                        <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center">
                            <div className="w-full max-w-105">
                                <HeroTreeVisual />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Animated Dashboard — below the fold, appears on scroll.
                No MockupHalo wrap: the dashboard spans the container's
                full width on lg+, so the halo would extend past the
                viewport and get clipped by overflow-hidden, breaking
                the effect. The dashboard is already a strong focal
                point with its own shadow and 2:1 aspect. */}
            <section id="hero-dashboard" className="py-10 sm:py-14 lg:py-16">
                <Container>
                    <AnimatedDashboard />
                </Container>
            </section>
        </>
    );
}
