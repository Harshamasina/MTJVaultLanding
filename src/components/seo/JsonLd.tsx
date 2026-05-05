import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, BRAND } from '@/lib/constants';
import { FAQ_ITEMS } from '@/lib/faq-data';

type OrganizationSchema = {
    '@context': 'https://schema.org';
    '@type': 'Organization';
    name: string;
    url: string;
    logo: string;
    image: string;
    description: string;
    legalName?: string;
    foundingDate?: string;
    address?: {
        '@type': 'PostalAddress';
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
    };
    contactPoint?: {
        '@type': 'ContactPoint';
        contactType: string;
        email: string;
        areaServed: string;
        availableLanguage: readonly string[];
    };
    sameAs?: readonly string[];
};

function buildOrganizationSchema(): OrganizationSchema {
    const schema: OrganizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-image.png`,
        description:
            'Enterprise IP management and patent docketing platform for law firms and pharma companies.',
    };

    if (BRAND.legalName && BRAND.legalName !== SITE_NAME) {
        schema.legalName = BRAND.legalName;
    }

    if (BRAND.foundingDate) {
        schema.foundingDate = BRAND.foundingDate;
    }

    if (BRAND.address.addressLocality) {
        schema.address = {
            '@type': 'PostalAddress',
            addressLocality: BRAND.address.addressLocality,
            addressRegion: BRAND.address.addressRegion,
            addressCountry: BRAND.address.addressCountry,
        };
    }

    if (BRAND.contact.email) {
        schema.contactPoint = {
            '@type': 'ContactPoint',
            contactType: BRAND.contact.contactType,
            email: BRAND.contact.email,
            areaServed: BRAND.contact.areaServed,
            availableLanguage: BRAND.contact.availableLanguage,
        };
    }

    const sameAs = BRAND.socialUrls.filter((url) => url.trim().length > 0);
    if (sameAs.length > 0) {
        schema.sameAs = sameAs;
    }

    return schema;
}

const organizationSchema = buildOrganizationSchema();

const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
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
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Contact us for pricing tailored to your team size and needs.',
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
        'Bulk Portfolio Import (XLSX/CSV)',
        'AI-Powered Prior Art Search (100+ jurisdictions via EPO)',
        'AI Patent Draft Generation (6 jurisdictions: US, EP, IN, WO, JP, CN)',
        'Jurisdiction-Specific Patent Law Rules',
        'Prior Art Snapshot & Version Control',
        'DOCX Export with Patent-Standard Formatting',
        'Cost Analytics with Multi-Currency FX Conversion',
    ],
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Features',
            item: `${SITE_URL}/#features`,
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: 'Compliance',
            item: `${SITE_URL}/#compliance`,
        },
        {
            '@type': 'ListItem',
            position: 4,
            name: 'Pricing',
            item: `${SITE_URL}/#pricing`,
        },
        {
            '@type': 'ListItem',
            position: 5,
            name: 'FAQ',
            item: `${SITE_URL}/#faq`,
        },
    ],
};

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
        </>
    );
}
