import { Container } from '@/components/ui/Container';
import { BookDemoButton } from '@/components/ui/BookDemoModal';
import { WatchDemoButton } from '@/components/ui/WatchDemoModal';
import { HeroTreeVisual } from '@/components/ui/HeroTreeVisual';
import { AnimatedDashboard } from '@/components/ui/AnimatedDashboard';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
    return (
        <>
            {/* Hero — full viewport height */}
            <section className="h-screen flex flex-col justify-center pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 lg:pb-10 overflow-hidden">
                <Container>
                    <div className="flex items-start gap-8 lg:gap-16 xl:gap-20">
                        {/* Text Content — left */}
                        <div className="w-full lg:max-w-[52%] lg:shrink-0">
                            <h1
                                className="text-[2rem] font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                IP Management That Replaces Your{' '}
                                <span className="text-primary italic">
                                    Spreadsheets, Scattered Searches, and Drafting Tools
                                </span>
                            </h1>
                            <p
                                className="mt-5 text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg sm:max-w-2xl"
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
                        <div className="hidden lg:flex flex-1 min-w-0 items-start justify-center pt-2">
                            <div className="w-full max-w-[420px]">
                                <HeroTreeVisual />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Animated Dashboard — below the fold, appears on scroll */}
            <section id="hero-dashboard" className="py-10 sm:py-14 lg:py-16">
                <Container>
                    <AnimatedDashboard />
                </Container>
            </section>
        </>
    );
}
