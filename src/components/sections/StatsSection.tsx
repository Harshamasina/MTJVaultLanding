'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/motion/FadeIn';

interface Stat {
    value: number;
    prefix?: string;
    suffix: string;
    label: string;
    sublabel: string;
}

type StatsVariant = 'cards' | 'minimal';

interface StatsSectionProps {
    stats: Stat[];
    variant?: StatsVariant;
    className?: string;
}

function useCountUp(target: number, isVisible: boolean, duration = 1500) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isVisible || hasAnimated.current) return;
        hasAnimated.current = true;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            setCount(target);
            return;
        }

        const startTime = performance.now();

        function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, [isVisible, target, duration]);

    return count;
}

function StatCard({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
    const count = useCountUp(stat.value, isVisible);

    return (
        <div className="text-center p-6 rounded-xl border border-card-border bg-card-bg">
            <div className="flex items-baseline justify-center gap-0.5">
                {stat.prefix && (
                    <span
                        className="text-3xl lg:text-4xl font-bold text-primary"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        {stat.prefix}
                    </span>
                )}
                <span
                    className="text-5xl lg:text-6xl font-bold text-primary tracking-tight"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {count}
                </span>
                <span
                    className="text-3xl lg:text-4xl font-bold text-primary"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {stat.suffix}
                </span>
            </div>
            <p
                className="mt-2 text-sm font-semibold text-text-primary"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {stat.label}
            </p>
            <p
                className="mt-1 text-xs text-text-muted"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                {stat.sublabel}
            </p>
        </div>
    );
}

function StatMinimal({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
    const count = useCountUp(stat.value, isVisible);

    return (
        <div className="text-center py-4">
            <div className="flex items-baseline justify-center gap-0.5">
                {stat.prefix && (
                    <span
                        className="text-3xl lg:text-4xl font-bold text-primary"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        {stat.prefix}
                    </span>
                )}
                <span
                    className="text-5xl lg:text-6xl font-bold text-text-primary tracking-tight"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {count}
                </span>
                <span
                    className="text-3xl lg:text-4xl font-bold text-text-primary"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {stat.suffix}
                </span>
            </div>
            <p
                className="mt-2 text-sm font-semibold text-text-primary"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {stat.label}
            </p>
            <p
                className="mt-1 text-xs text-text-muted"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                {stat.sublabel}
            </p>
        </div>
    );
}

export function StatsSection({ stats, variant = 'cards', className = '' }: StatsSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        const current = sectionRef.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);

    const StatComponent = variant === 'cards' ? StatCard : StatMinimal;

    return (
        <section ref={sectionRef} className={`py-20 lg:py-24 ${className}`}>
            <Container>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                    {stats.map((stat, i) => (
                        <FadeIn key={stat.label} delay={i * 0.1}>
                            <StatComponent
                                stat={stat}
                                isVisible={isVisible}
                            />
                        </FadeIn>
                    ))}
                </div>
            </Container>
        </section>
    );
}

/* Pre-defined stat sets */
export const HERO_STATS: Stat[] = [
    {
        value: 10,
        suffix: 'x',
        label: 'Faster Patent Docketing',
        sublabel: 'vs manual spreadsheets',
    },
    {
        value: 90,
        suffix: '%',
        label: 'Fewer Missed Deadlines',
        sublabel: 'with calendar & alerts',
    },
    {
        value: 100,
        suffix: '%',
        label: 'Audit Coverage',
        sublabel: 'from day one',
    },
    {
        value: 60,
        suffix: '%',
        label: 'Less Admin Time',
        sublabel: 'with bulk actions & automation',
    },
];

export const PRODUCT_STATS: Stat[] = [
    {
        value: 42,
        suffix: '+',
        label: 'Fee Types Supported',
        sublabel: 'across 8 categories',
    },
    {
        value: 5,
        suffix: '',
        label: 'Filing Types',
        sublabel: 'Family, PRV, PCT, NPE, Office Action',
    },
    {
        value: 100,
        suffix: '%',
        label: 'Audit Coverage',
        sublabel: 'every edit tracked & immutable',
    },
    {
        value: 0,
        suffix: '',
        label: 'Missed Deadlines',
        sublabel: 'with automated reminders',
    },
];
