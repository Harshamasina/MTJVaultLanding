import type { Metadata } from 'next';
import { playfair, baskerville, ibmPlexMono } from '@/lib/fonts';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { TreeSpine } from '@/components/motion/TreeSpine';
import '@/styles/globals.css';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: `${SITE_NAME} — IP Management Software for Law Firms & Pharma`,
    description: SITE_DESCRIPTION,
    keywords: [
        'IP management software',
        'patent docketing system',
        'patent portfolio management',
        'patent management software',
        'intellectual property management',
        'FDA 21 CFR Part 11 compliance software',
        'patent fee tracking software',
        'PCT filing management tool',
    ],
    openGraph: {
        title: `${SITE_NAME} — IP Management Software`,
        description: 'Enterprise patent docketing and compliance platform.',
        url: SITE_URL,
        siteName: SITE_NAME,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'MTJVault IP Management Platform',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: `${SITE_NAME} — IP Management Software`,
        description: 'Enterprise patent docketing and compliance platform.',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: SITE_URL,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${playfair.variable} ${baskerville.variable} ${ibmPlexMono.variable}`}
        >
            <body>
                <a href="#main-content" className="skip-to-content">
                    Skip to content
                </a>
                <JsonLd />
                <Header />
                <div className="relative">
                    <TreeSpine />
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
