export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    updatedAt?: string;
    author: {
        name: string;
        role: string;
    };
    category: string;
    readingTime: string;
    keywords: string[];
    content: React.ComponentType;
}
