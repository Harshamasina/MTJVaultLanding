import { Container } from '@/components/ui/Container';
import type { DetailBlock, DetailSection, Role } from '@/types/careers';

interface RoleDetailBodyProps {
    role: Role;
}

export function RoleDetailBody({ role }: RoleDetailBodyProps) {
    return (
        <section className="py-14 sm:py-16 lg:py-20">
            <Container>
                <div className="max-w-3xl mx-auto">
                    {/* TLDR callout */}
                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-7">
                        <p
                            className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-3"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            TL;DR
                        </p>
                        <SplitParagraphs
                            text={role.detail.tldr}
                            className="text-[15px] text-text-primary leading-relaxed space-y-4"
                        />
                    </div>

                    {/* Sections */}
                    <div className="mt-12 space-y-12">
                        {role.detail.sections.map((section) => (
                            <DetailSectionView key={section.heading} section={section} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}

function DetailSectionView({ section }: { section: DetailSection }) {
    return (
        <div>
            <h2
                className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {section.heading}
            </h2>
            {section.intro ? (
                <p
                    className="mt-3 text-[15px] text-text-secondary leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {section.intro}
                </p>
            ) : null}
            <div className="mt-5 space-y-6">
                {section.blocks.map((block, i) => (
                    <BlockView key={i} block={block} />
                ))}
            </div>
        </div>
    );
}

function BlockView({ block }: { block: DetailBlock }) {
    switch (block.kind) {
        case 'paragraph':
            return (
                <p
                    className="text-[15px] text-text-secondary leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {block.text}
                </p>
            );

        case 'bullets':
            return (
                <ul className="space-y-2.5 pl-5 list-disc marker:text-primary/60">
                    {block.items.map((item, i) => (
                        <li
                            key={i}
                            className="text-[15px] text-text-secondary leading-relaxed pl-1"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            );

        case 'group':
            return (
                <div>
                    <h3
                        className="text-base font-semibold text-text-primary"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        {block.title}
                    </h3>
                    <ul className="mt-3 space-y-2.5 pl-5 list-disc marker:text-primary/60">
                        {block.bullets.map((item, i) => (
                            <li
                                key={i}
                                className="text-[15px] text-text-secondary leading-relaxed pl-1"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            );

        case 'steps':
            return (
                <ol className="space-y-5">
                    {block.items.map((step, i) => (
                        <li key={i} className="flex gap-4">
                            <span
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0"
                                style={{ fontFamily: 'var(--font-mono)' }}
                                aria-hidden="true"
                            >
                                {i + 1}
                            </span>
                            <div className="pt-0.5">
                                <h3
                                    className="text-base font-semibold text-text-primary"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    className="mt-1.5 text-[15px] text-text-secondary leading-relaxed"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {step.body}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            );
    }
}

function SplitParagraphs({ text, className }: { text: string; className: string }) {
    const paragraphs = text.split(/\n\n+/);
    return (
        <div className={className} style={{ fontFamily: 'var(--font-body)' }}>
            {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </div>
    );
}
