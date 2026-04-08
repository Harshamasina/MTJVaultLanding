import Link from 'next/link';
import { ShieldCheck, FileCheck, Building2, Lock, Fingerprint, Server } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SITE_NAME } from '@/lib/constants';

function LinkedInIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function XSocialIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function YouTubeIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

const TRUST_BADGES = [
    { icon: ShieldCheck, label: 'SOC 2 Ready' },
    { icon: FileCheck, label: 'FDA 21 CFR Part 11' },
    { icon: Building2, label: 'Enterprise SSO' },
    { icon: Lock, label: 'AES-256 Encryption' },
    { icon: Fingerprint, label: 'MFA Authentication' },
    { icon: Server, label: 'AWS Infrastructure' },
];

const FOOTER_LINKS = {
    Product: [
        { label: 'Features', href: '/#features' },
        { label: 'AI Patent Drafting', href: '/#ai-drafting' },
        { label: 'Compliance', href: '/#compliance' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'FAQ', href: '/#faq' },
    ],
    Resources: [
        { label: 'What Is IP Management?', href: '/blog/what-is-ip-management-software/' },
        { label: 'Patent Docketing Guide', href: '/blog/patent-docketing-best-practices/' },
        { label: 'FDA 21 CFR Part 11 Guide', href: '/blog/fda-21-cfr-part-11-compliance-guide/' },
        { label: 'PCT Filing Management', href: '/blog/pct-filing-management-tips/' },
        { label: 'Blog', href: '/blog/' },
    ],
    Company: [
        { label: 'Contact', href: '/#contact' },
        { label: 'Support', href: '/support/' },
    ],
    Legal: [
        { label: 'Privacy Policy', href: '/privacy/' },
        { label: 'Terms of Service', href: '/terms/' },
    ],
} as const;

const SOCIAL_LINKS = [
    { label: 'LinkedIn', href: '#', icon: LinkedInIcon },
    { label: 'X', href: '#', icon: XSocialIcon },
    { label: 'YouTube', href: '#', icon: YouTubeIcon },
] as const;

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div>
            {/* ── Trust Card — sits on white bg, bottom half overlaps into footer ── */}
            <div className="relative z-10 pb-0">
                <Container>
                    <div className="rounded-2xl border border-primary/15 bg-navy-light p-8 sm:p-10 lg:p-12 shadow-2xl shadow-primary/10 mb-[-120px] sm:mb-[-140px]">
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                            {/* Left: Trust Badges */}
                            <div className="flex-[3]">
                                <p
                                    className="text-xs font-bold uppercase tracking-[0.15em] text-primary-light mb-4"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    Enterprise Trust
                                </p>
                                <h3
                                    className="text-xl sm:text-2xl font-bold text-white mb-6"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    Built for teams that can&apos;t afford to compromise on security
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {TRUST_BADGES.map((badge) => (
                                        <div
                                            key={badge.label}
                                            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/[0.04]"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-primary-light/10 flex items-center justify-center shrink-0">
                                                <badge.icon className="w-4 h-4 text-primary-light" />
                                            </div>
                                            <span
                                                className="text-[11px] sm:text-xs font-semibold text-white/80"
                                                style={{ fontFamily: 'var(--font-mono)' }}
                                            >
                                                {badge.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Testimonial */}
                            <div className="flex-[2] flex flex-col justify-center">
                                <div className="border-l-2 border-primary-light/30 pl-6">
                                    <svg className="w-8 h-8 text-primary-light/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                                    </svg>
                                    <blockquote>
                                        <p
                                            className="text-base sm:text-lg text-white/90 leading-relaxed italic"
                                            style={{ fontFamily: 'var(--font-body)' }}
                                        >
                                            Built by patent professionals, for patent professionals.
                                            Every feature exists because an IP team needed it.
                                        </p>
                                    </blockquote>
                                    <div className="mt-5 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <span className="text-sm font-bold text-primary-light" style={{ fontFamily: 'var(--font-mono)' }}>
                                                DI
                                            </span>
                                        </div>
                                        <div>
                                            <p
                                                className="text-sm font-semibold text-white"
                                                style={{ fontFamily: 'var(--font-display)' }}
                                            >
                                                Design Your Invention Team
                                            </p>
                                            <p
                                                className="text-xs text-white/40"
                                                style={{ fontFamily: 'var(--font-body)' }}
                                            >
                                                IP Management Platform
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ── Footer — dark navy, padded top to accommodate card overlap ── */}
            <footer className="bg-navy text-text-on-dark pt-40 sm:pt-48" role="contentinfo">
                <Container>
                    {/* Footer Links Grid */}
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6 lg:gap-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-2 lg:pr-8">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-xl font-bold tracking-tight no-underline"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                <span className="text-white">{SITE_NAME}</span>
                            </Link>
                            <p
                                className="mt-5 text-[15px] leading-relaxed text-text-on-dark/60 max-w-md"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                Enterprise IP management software for law firms and
                                pharma companies. Patent docketing, PCT/PRV/NPE case
                                management, and FDA 21 CFR Part 11 compliance — all
                                in one secure, multi-tenant platform.
                            </p>

                            {/* Social Icons */}
                            <div className="mt-8 flex items-center gap-5">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="text-text-on-dark/40 hover:text-primary-light transition-colors duration-200"
                                        aria-label={`Follow us on ${social.label}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <social.icon className="w-5.5 h-5.5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Link Columns */}
                        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                            <div key={category}>
                                <h3
                                    className="text-xs font-bold uppercase tracking-[0.15em] text-primary-light mb-5"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {category}
                                </h3>
                                <ul className="space-y-3.5">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-text-on-dark/60 hover:text-white transition-colors duration-200 no-underline"
                                                style={{ fontFamily: 'var(--font-body)' }}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Copyright Bar */}
                    <div className="border-t border-white/10 mt-16 py-8">
                        <p
                            className="text-xs text-text-on-dark/40 text-center"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            &copy; {currentYear} {SITE_NAME}. All rights reserved.
                        </p>
                    </div>
                </Container>
            </footer>
        </div>
    );
}
