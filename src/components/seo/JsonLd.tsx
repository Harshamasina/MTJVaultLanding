import { SITE_URL, SITE_NAME } from '@/lib/constants';

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
        'Enterprise IP management and patent docketing platform for law firms and pharma companies.',
    sameAs: [],
};

const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
        'Multi-tenant IP management software for patent docketing, PCT/PRV/NPE case management, and FDA 21 CFR Part 11 compliance.',
    offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '0',
        highPrice: '299',
        offerCount: '3',
    },
    featureList: [
        'Patent Docketing',
        'Application Family Management',
        'PRV Application Tracking',
        'PCT Filing Management',
        'NPE Case Management',
        'Office Action Tracking',
        'Patent Fee Management (42 fee types across 8 categories)',
        'Document Management with Version Control',
        'Audit Trail with FDA 21 CFR Part 11 Compliance',
        'Multi-tenant Architecture',
        'Role-Based Access Control',
        'CSV Export',
        'Deadline Reminders',
        'Fee Analytics Dashboard',
    ],
};

export function JsonLd() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(softwareSchema),
                }}
            />
        </>
    );
}
