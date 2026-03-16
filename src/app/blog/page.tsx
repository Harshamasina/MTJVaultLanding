import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogListJsonLd } from '@/components/blog/BlogJsonLd';
import { getAllPosts } from '@/content/blog';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
    title: `IP Management Blog — ${SITE_NAME}`,
    description:
        'Insights on IP management, patent docketing, FDA 21 CFR Part 11 compliance, PCT filing management, and portfolio analytics for law firms and pharma companies.',
    keywords: [
        'IP management blog',
        'patent docketing insights',
        'patent management articles',
        'FDA compliance blog',
        'intellectual property management',
    ],
    alternates: {
        canonical: `${SITE_URL}/blog/`,
    },
    openGraph: {
        title: `IP Management Blog — ${SITE_NAME}`,
        description: 'Insights on IP management, patent docketing, and compliance for law firms and pharma.',
        url: `${SITE_URL}/blog/`,
        siteName: SITE_NAME,
        type: 'website',
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <main id="main-content">
            <BlogListJsonLd />

            <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-12 lg:mb-16">
                            <h1
                                className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem]"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                IP Management Blog
                            </h1>
                            <p
                                className="mt-4 text-lg text-text-secondary max-w-2xl"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                Practical insights on patent docketing, FDA compliance, PCT filing
                                management, and portfolio analytics for law firms and pharma IP teams.
                            </p>
                        </div>

                        {/* Post Grid */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
