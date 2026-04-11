'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BrandLogoLinkProps {
    children: React.ReactNode;
    className?: string;
    ariaLabel: string;
    /**
     * Optional caller hook fired before the scroll logic runs.
     * Used by the mobile menu to close itself when the logo is tapped.
     */
    onClick?: () => void;
}

/**
 * Brand logo link used by Header and Footer.
 *
 * Why this exists: Next.js App Router does not fire a scroll when a <Link>
 * targets a hash on the current pathname (e.g. clicking href="/#hero" while
 * already on "/"). The URL updates but the page stays put. This component
 * intercepts that case, smooth-scrolls to the top manually, and updates the
 * URL via history.replaceState so the address bar still shows /#hero.
 *
 * On other pathnames (e.g. /blog), the click falls through to a normal
 * Next.js Link navigation, and the destination page's native hash anchor
 * handles the scroll.
 */
export function BrandLogoLink({
    children,
    className,
    ariaLabel,
    onClick,
}: BrandLogoLinkProps) {
    const pathname = usePathname();

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            // Run any caller-side cleanup first (e.g. close the mobile menu).
            onClick?.();

            // If we're already on the homepage, intercept and smooth-scroll.
            if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (window.location.hash !== '#hero') {
                    window.history.replaceState(null, '', '/#hero');
                }
            }
            // Otherwise let <Link> navigate to /#hero normally — the browser
            // will honor the #hero anchor on the destination page.
        },
        [pathname, onClick],
    );

    return (
        <Link
            href="/#hero"
            onClick={handleClick}
            aria-label={ariaLabel}
            className={className}
        >
            {children}
        </Link>
    );
}
