import type { BlogPost } from './types';

import { post as whatIsIpManagement } from './what-is-ip-management-software';
import { post as patentDocketing } from './patent-docketing-best-practices';
import { post as fdaCompliance } from './fda-21-cfr-part-11-compliance-guide';
import { post as pctFiling } from './pct-filing-management-tips';
import { post as portfolioAnalytics } from './patent-portfolio-analytics-roi';

const allPosts: BlogPost[] = [
    whatIsIpManagement,
    patentDocketing,
    fdaCompliance,
    pctFiling,
    portfolioAnalytics,
];

/** All posts sorted by publishedAt descending (newest first) */
export function getAllPosts(): BlogPost[] {
    return [...allPosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    return allPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return allPosts.map((p) => p.slug);
}
