import { Mail, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import type { GeneralCta } from '@/types/careers';

interface CareersGeneralCtaProps {
    cta: GeneralCta;
}

export function CareersGeneralCta({ cta }: CareersGeneralCtaProps) {
    const mailto = `mailto:${cta.ctaEmail}?subject=${encodeURIComponent(cta.ctaSubject)}`;

    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <Container>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 justify-center text-center sm:text-left">
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                        <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                    </span>
                    <p
                        className="text-sm sm:text-[15px] text-text-secondary max-w-md leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        {cta.title}
                    </p>
                    <a
                        href={mailto}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors no-underline whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        {cta.ctaLabel}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                </div>
            </Container>
        </section>
    );
}
