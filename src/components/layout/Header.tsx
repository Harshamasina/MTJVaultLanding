'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { BookDemoButton } from '@/components/ui/BookDemoModal';
import { BrandLogoLink } from '@/components/ui/BrandLogoLink';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Top blur veil — constrained to header width so it doesn't blur
                the tree spine running down the page edges. */}
            <div
                aria-hidden="true"
                className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
            >
                <div className="mx-auto w-full max-w-352 px-3 sm:px-4 lg:px-6">
                    <div
                        className="h-24 sm:h-28 backdrop-blur-md"
                        style={{
                            maskImage:
                                'linear-gradient(to bottom, black 55%, transparent)',
                            WebkitMaskImage:
                                'linear-gradient(to bottom, black 55%, transparent)',
                        }}
                    />
                </div>
            </div>

            <header
                className="fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-3"
                role="banner"
            >
                <div className="mx-auto w-full max-w-352 px-3 sm:px-4 lg:px-6">
                    <nav
                        className={`flex items-center h-14 xl:h-16 gap-4 px-3 sm:px-4 xl:pl-6 xl:pr-3 rounded-lg border backdrop-blur-xl transition-all duration-300 ${
                            isScrolled
                                ? 'bg-white/80 shadow-lg shadow-black/5 border-card-border'
                                : 'bg-white/60 shadow-sm border-card-border/50'
                        }`}
                        aria-label="Main navigation"
                    >
                        {/* Logo */}
                        <BrandLogoLink
                            ariaLabel={`${SITE_NAME} — Back to top`}
                            className="group flex shrink-0 items-center no-underline mr-auto xl:mr-0"
                        >
                            <Image
                                src="/logos/dyi-wordmark.svg"
                                alt={SITE_NAME}
                                width={320}
                                height={36}
                                priority
                                className="h-6 w-auto opacity-95 transition-opacity duration-400 ease-out group-hover:opacity-100 sm:h-7 xl:h-8"
                            />
                        </BrandLogoLink>

                        {/* Desktop Nav */}
                        <ul className="hidden xl:flex flex-1 items-center justify-center gap-6 2xl:gap-8">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="whitespace-nowrap text-text-primary/70 hover:text-primary transition-colors duration-200 text-[14px] 2xl:text-[15px] font-semibold"
                                        style={{ fontFamily: 'var(--font-body)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop CTA */}
                        <div className="hidden xl:flex shrink-0 items-center">
                            <BookDemoButton size="sm" />
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            className="xl:hidden p-2 text-text-primary hover:text-primary transition-colors cursor-pointer rounded-lg"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu — portaled to body to escape header backdrop-filter */}
            {mounted && createPortal(
                <div
                    id="mobile-menu"
                    className={`fixed inset-0 bg-white z-60 transition-all duration-300 xl:hidden ${
                        isMobileMenuOpen
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-full pointer-events-none'
                    }`}
                    aria-hidden={!isMobileMenuOpen}
                >
                    {/* Top bar — brand mark + close button */}
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 h-16">
                        <BrandLogoLink
                            ariaLabel={`${SITE_NAME} — Back to top`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="group flex items-center no-underline"
                        >
                            <Image
                                src="/logos/dyi-wordmark.svg"
                                alt={SITE_NAME}
                                width={320}
                                height={36}
                                className="h-9 w-auto opacity-95 transition-opacity duration-400 ease-out group-hover:opacity-100"
                            />
                        </BrandLogoLink>
                        <button
                            type="button"
                            className="p-2 text-text-primary hover:text-primary transition-colors cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        <ul className="flex flex-col items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-2xl font-medium text-text-primary hover:text-primary transition-colors"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col items-center gap-4 mt-4">
                            <BookDemoButton
                                size="lg"
                                className="min-w-50"
                            />
                        </div>
                    </div>
                </div>,
                document.body,
            )}
        </>
    );
}
