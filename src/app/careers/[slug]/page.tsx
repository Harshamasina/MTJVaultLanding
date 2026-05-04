import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/metadata';
import { RoleDetailHero } from '@/components/sections/RoleDetailHero';
import { RoleDetailBody } from '@/components/sections/RoleDetailBody';
import { RoleDetailApply } from '@/components/sections/RoleDetailApply';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import careersData from '@/data/careers.json';
import type { CareersData, DetailBlock, Role } from '@/types/careers';

const careers = careersData as CareersData;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return careers.roles
        .filter((role) => role.active)
        .map((role) => ({ slug: role.slug }));
}

function findRole(slug: string): Role | undefined {
    return careers.roles.find((role) => role.slug === slug && role.active);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const role = findRole(slug);
    if (!role) return {};

    return buildMetadata({
        title: `${role.title} - Careers`,
        description: role.summary,
        path: `/careers/${role.slug}/`,
    });
}

function flattenBlock(block: DetailBlock): string {
    switch (block.kind) {
        case 'paragraph':
            return block.text;
        case 'bullets':
            return block.items.map((b) => `• ${b}`).join('\n');
        case 'group':
            return `${block.title}\n${block.bullets.map((b) => `• ${b}`).join('\n')}`;
        case 'steps':
            return block.items
                .map((s, i) => `${i + 1}. ${s.title} - ${s.body}`)
                .join('\n');
    }
}

function buildJobPostingSchema(role: Role) {
    const datePosted = new Date(role.datePosted);
    const validThrough = new Date(datePosted);
    validThrough.setDate(validThrough.getDate() + 90);

    const fullDescription = [
        role.detail.tldr,
        ...role.detail.sections.map((section) => {
            const intro = section.intro ? `${section.intro}\n` : '';
            const body = section.blocks.map(flattenBlock).join('\n\n');
            return `${section.heading}\n${intro}${body}`;
        }),
    ].join('\n\n');

    return {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: role.title,
        description: fullDescription,
        datePosted: role.datePosted,
        validThrough: validThrough.toISOString().slice(0, 10),
        employmentType: 'FULL_TIME',
        hiringOrganization: {
            '@type': 'Organization',
            name: SITE_NAME,
            sameAs: SITE_URL,
        },
        jobLocationType: 'TELECOMMUTE',
        applicantLocationRequirements: {
            '@type': 'Country',
            name: 'India',
        },
        directApply: false,
        url: `${SITE_URL}/careers/${role.slug}/`,
        responsibilities: role.responsibilities.join(' '),
        qualifications: role.requirements.join(' '),
        incentiveCompensation: role.compensation,
    };
}

export default async function RoleDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const role = findRole(slug);

    if (!role) {
        notFound();
    }

    return (
        <main id="main-content">
            <RoleDetailHero role={role} />
            <RoleDetailBody role={role} />
            <RoleDetailApply role={role} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(buildJobPostingSchema(role)),
                }}
            />
        </main>
    );
}
