import { SITE_URL, SITE_NAME } from '@/lib/constants';
import type { BlogPost } from '@/content/blog/types';

export function BlogJsonLd({ post }: { post: BlogPost }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
            '@type': 'Person',
            name: post.author.name,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${post.slug}/`,
        },
        keywords: post.keywords.join(', '),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function BlogListJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `${SITE_NAME} Blog`,
        description: 'Insights on IP management, patent docketing, FDA compliance, and portfolio analytics for law firms and pharma companies.',
        url: `${SITE_URL}/blog/`,
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
