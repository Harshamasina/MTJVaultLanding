import { Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { HexCubeIllustration } from '@/components/illustrations/HexCubeIllustration';
import type { HeroCopy } from '@/types/careers';

interface CareersHeroProps {
    hero: HeroCopy;
}

export function CareersHero({ hero }: CareersHeroProps) {
    return (
        <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left column - copy */}
                    <div>
                        <span
                            className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-primary px-2.5 py-1 rounded bg-primary/5"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            {hero.eyebrow}
                        </span>
                        <h1
                            className="mt-5 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {hero.title}
                        </h1>
                        <p
                            className="mt-5 max-w-xl text-base text-text-secondary leading-relaxed sm:text-lg"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            {hero.description}
                        </p>
                        <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-page-bg-alt px-3 py-2 pr-5 border border-card-border">
                            <span className="flex w-9 h-9 items-center justify-center rounded-full bg-primary/10 shrink-0">
                                <Users className="w-4.5 h-4.5 text-primary" aria-hidden="true" />
                            </span>
                            <span
                                className="text-sm text-text-secondary"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {hero.tags.join(' • ')}
                            </span>
                        </div>
                    </div>

                    {/* Right column - illustration (hidden on small screens) */}
                    <div className="hidden lg:block">
                        <HexCubeIllustration className="max-w-xl ml-auto" />
                    </div>
                </div>
            </Container>
        </section>
    );
}
