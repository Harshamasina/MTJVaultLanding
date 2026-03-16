import Link from 'next/link';
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

const FOOTER_LINKS = {
    Product: [
        { label: 'Features', href: '#features' },
        { label: 'Compliance', href: '#compliance' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
    ],
    Resources: [
        { label: 'Blog', href: '/blog/' },
        { label: 'What Is IP Management?', href: '/blog/what-is-ip-management-software/' },
        { label: 'Patent Docketing Guide', href: '/blog/patent-docketing-best-practices/' },
        { label: 'FDA Compliance Guide', href: '/blog/fda-21-cfr-part-11-compliance-guide/' },
    ],
    Company: [
        { label: 'Contact', href: '#contact' },
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
        <footer className="bg-navy text-text-on-dark" role="contentinfo">
            <Container>
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-2 lg:grid-cols-5 lg:gap-16">
                    {/* Brand Column — spans 2 cols on lg */}
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
                <div className="border-t border-white/10 py-8">
                    <p
                        className="text-xs text-text-on-dark/40 text-center"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        &copy; {currentYear} {SITE_NAME}. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
