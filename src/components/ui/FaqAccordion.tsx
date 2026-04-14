'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/lib/faq-data';

function FaqAccordionItem({ item, isOpen, onToggle }: {
    item: FaqItem;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className={`border-b border-card-border/60 transition-colors duration-200 ${isOpen ? 'bg-primary/[0.02]' : ''}`}>
            <button
                type="button"
                className="w-full flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6 text-left cursor-pointer group"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span
                    className={`text-sm sm:text-base font-semibold pr-6 transition-colors duration-200 ${
                        isOpen ? 'text-primary' : 'text-text-primary group-hover:text-primary'
                    }`}
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    {item.question}
                </span>
                <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-all duration-300 ${
                        isOpen ? 'rotate-180 text-primary' : 'text-text-muted'
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 pb-4 sm:pb-5' : 'max-h-0'
                }`}
            >
                <div className="px-4 sm:px-6">
                    <div className="border-l-2 border-primary/20 pl-4">
                        <p
                            className="text-sm leading-relaxed text-text-secondary"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            {item.answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="max-w-3xl mx-auto rounded-2xl border border-card-border bg-card-bg shadow-sm overflow-hidden">
            {items.map((item, index) => (
                <FaqAccordionItem
                    key={item.question}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                />
            ))}
        </div>
    );
}
