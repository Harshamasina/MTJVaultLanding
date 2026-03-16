import Link from 'next/link';
import { CalendarDays, Clock } from 'lucide-react';
import type { BlogPost } from '@/content/blog/types';

export function BlogCard({ post }: { post: BlogPost }) {
    return (
        <article className="group rounded-xl border border-card-border bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <Link href={`/blog/${post.slug}/`} className="block p-6">
                <span
                    className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary mb-3 px-2 py-1 rounded bg-primary/5"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    {post.category}
                </span>

                <h2
                    className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    {post.title}
                </h2>

                <p
                    className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {post.description}
                </p>

                <div
                    className="flex items-center gap-4 text-xs text-text-muted"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime}
                    </span>
                </div>
            </Link>
        </article>
    );
}
