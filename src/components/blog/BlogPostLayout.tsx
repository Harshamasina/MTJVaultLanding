import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { CalendarDays, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import { BlogJsonLd } from '@/components/blog/BlogJsonLd';
import type { BlogPost } from '@/content/blog/types';

export function BlogPostLayout({ post }: { post: BlogPost }) {
    const Content = post.content;

    return (
        <main id="main-content">
            <BlogJsonLd post={post} />

            <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        {/* Breadcrumb */}
                        <nav
                            aria-label="Breadcrumb"
                            className="flex items-center gap-1.5 text-xs text-text-muted mb-8"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            <Link
                                href="/"
                                className="hover:text-primary transition-colors"
                            >
                                Home
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link
                                href="/blog/"
                                className="hover:text-primary transition-colors"
                            >
                                Blog
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-text-secondary truncate max-w-[200px]">
                                {post.title}
                            </span>
                        </nav>

                        {/* Post Header */}
                        <header className="mb-12">
                            <span
                                className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary mb-4 px-2 py-1 rounded bg-primary/5"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                {post.category}
                            </span>

                            <h1
                                className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem] leading-[1.15] mb-6"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                {post.title}
                            </h1>

                            <div
                                className="flex flex-wrap items-center gap-4 text-sm text-text-muted"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                <span>{post.author.name}</span>
                                <span className="w-1 h-1 rounded-full bg-text-muted" />
                                <span className="flex items-center gap-1.5">
                                    <CalendarDays className="w-4 h-4" />
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    {post.readingTime}
                                </span>
                            </div>
                        </header>

                        {/* Post Body */}
                        <article className="blog-prose">
                            <Content />
                        </article>

                        {/* Back to Blog */}
                        <div className="mt-16 pt-8 border-t border-card-border">
                            <Link
                                href="/blog/"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to all articles
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
