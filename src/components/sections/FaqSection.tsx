'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SITE_URL } from '@/lib/constants';

interface FaqItem {
    question: string;
    answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is IP management software?',
        answer:
            'IP management software is a specialized platform that helps law firms, corporations, and patent teams manage their intellectual property portfolios — including patent applications, PCT filings, office actions, deadlines, fees, and compliance requirements. It replaces spreadsheets and email-based tracking with a structured, searchable, and auditable system.',
    },
    {
        question: 'How does Design Your Invention handle FDA 21 CFR Part 11?',
        answer:
            'Compliance is built into every workflow — not bolted on. Every edit to a critical field requires a documented reason-for-change. The full audit trail logs who made each change, what changed, and when — with immutable, tamper-proof records. Electronic signatures require re-authentication, and role-based access control ensures only authorized users can perform sensitive actions.',
    },
    {
        question: 'Can I manage PCT and PRV filings in one place?',
        answer:
            'Yes. Design Your Invention links PRV (provisional), PCT (international), and NPE (national phase entry) cases to their parent patent families. You can see the entire filing hierarchy in our visual family tree, track deadlines across all filing types, and manage office actions and fees from a single dashboard.',
    },
    {
        question: 'What patent fee types does Design Your Invention support?',
        answer:
            'Design Your Invention supports 42 fee types across 8 categories — including filing fees, examination fees, issue fees, maintenance/annuity fees, extension fees, petition fees, PCT fees, and miscellaneous fees. Each fee can be tracked as due, paid, waived, or overdue with full analytics and CSV export.',
    },
    {
        question: 'Is Design Your Invention multi-tenant?',
        answer:
            'Yes. Each organization gets a dedicated subdomain (e.g., yourfirm.designyourinvention.com) with fully isolated data. Tenant isolation is enforced at the database level using Row-Level Security (RLS), ensuring zero cross-tenant data leakage. Your data is completely separate from every other organization on the platform.',
    },
    {
        question: 'How does role-based access control work?',
        answer:
            'Design Your Invention supports four roles: Tenant Admin, Attorney, Paralegal, and Viewer. Each role has granular permissions — for example, Viewers can browse and search but cannot create, edit, or delete records. Permissions are enforced both in the UI and on the server, so access control cannot be bypassed.',
    },
    {
        question: 'Can I export my data?',
        answer:
            'Yes. Every list view — families, PRV applications, PCT filings, NPE cases, fees, and audit logs — supports one-click CSV export with all columns included. You can also use bulk actions to select multiple records for status changes or deletion with a single operation.',
    },
    {
        question: 'What security measures are in place?',
        answer:
            'Design Your Invention uses Auth0 for enterprise-grade authentication with support for SSO, SAML, and multi-factor authentication. Tokens are stored in-memory only (never localStorage), all data is encrypted in transit and at rest, and documents are stored in encrypted S3 buckets with presigned URL access. High-risk actions require step-up re-authentication.',
    },
    {
        question: 'How long does it take to get started?',
        answer:
            'You can sign up and start using Design Your Invention in minutes. There is no complex onboarding or migration process — create your account, set up your organization, invite your team, and begin adding patent families. If you have existing data in spreadsheets, our support team can help with bulk import.',
    },
    {
        question: 'Do I need to install anything?',
        answer:
            'No. Design Your Invention is a cloud-based web application — it runs entirely in your browser. There is nothing to install, no servers to manage, and no software to update. All you need is a modern web browser and an internet connection. Works on desktop, tablet, and mobile.',
    },
];

function FaqAccordionItem({ item, isOpen, onToggle }: {
    item: FaqItem;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-card-border">
            <button
                type="button"
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span
                    className="text-base font-semibold text-text-primary pr-8 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    {item.question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
            >
                <p
                    className="text-sm leading-relaxed text-text-secondary pr-12"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {item.answer}
                </p>
            </div>
        </div>
    );
}

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return (
        <section id="faq" className="py-24 lg:py-32 bg-page-bg-alt">
            {/* FAQPage JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            <Container>
                {/* Section Heading */}
                <div className="max-w-2xl mb-16 lg:mb-20">
                    <div id="tree-faq" className="flex items-center gap-3 mb-6">
                        <span
                            className="text-xs font-bold uppercase tracking-[0.15em] text-primary"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            FAQ
                        </span>
                    </div>
                    <h2
                        className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Frequently Asked{' '}
                        <span className="text-primary">Questions</span>
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

                {/* Accordion */}
                <div className="max-w-3xl mx-auto">
                    {FAQ_ITEMS.map((item, index) => (
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
            </Container>
        </section>
    );
}
