'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, CTA_SIGNUP_URL, SITE_NAME } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
                isScrolled
                    ? 'bg-white/80 backdrop-blur-xl shadow-sm border-card-border'
                    : 'bg-transparent border-transparent'
            }`}
        >
            <Container>
                <nav
                    className="flex items-center justify-between h-16 lg:h-20"
                    aria-label="Main navigation"
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold tracking-tight relative z-50"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        <span className="text-text-primary">{SITE_NAME}</span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden lg:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-text-primary/70 hover:text-primary transition-colors duration-200 text-[15px] font-semibold"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link
                            href="#login"
                            className="text-text-primary/70 hover:text-primary transition-colors duration-200 text-[15px] font-semibold"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Log In
                        </Link>
                        <Button href={CTA_SIGNUP_URL} size="md">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        className="lg:hidden relative z-50 p-2 -mr-2 text-text-primary hover:text-primary transition-colors"
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
            </Container>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-menu"
                className={`fixed inset-0 bg-white z-40 transition-all duration-300 lg:hidden ${
                    isMobileMenuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-full pointer-events-none'
                }`}
                aria-hidden={!isMobileMenuOpen}
            >
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
                        <Link
                            href="#login"
                            className="text-lg text-text-secondary hover:text-primary transition-colors font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Log In
                        </Link>
                        <Button
                            href={CTA_SIGNUP_URL}
                            size="lg"
                            className="min-w-[200px]"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
