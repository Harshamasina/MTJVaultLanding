import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

interface PageMetadataOptions {
    title: string;
    description: string;
    path?: string;
    ogImage?: string;
}

export function buildMetadata({
    title,
    description,
    path = '',
    ogImage = '/og-image.png',
}: PageMetadataOptions): Metadata {
    const url = `${SITE_URL}${path}`;

    return {
        title: `${title} - ${SITE_NAME}`,
        description,
        openGraph: {
            title: `${title} - ${SITE_NAME}`,
            description,
            url,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${SITE_NAME} - ${title}`,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} - ${SITE_NAME}`,
            description,
            images: [ogImage],
        },
        alternates: {
            canonical: url,
        },
    };
}
