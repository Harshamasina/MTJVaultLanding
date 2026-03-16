import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { getAllSlugs, getPostBySlug } from '@/content/blog';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    return {
        title: `${post.title} — ${SITE_NAME}`,
        description: post.description,
        keywords: post.keywords,
        alternates: {
            canonical: `${SITE_URL}/blog/${post.slug}/`,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${SITE_URL}/blog/${post.slug}/`,
            siteName: SITE_NAME,
            type: 'article',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt ?? post.publishedAt,
            authors: [post.author.name],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return <BlogPostLayout post={post} />;
}
