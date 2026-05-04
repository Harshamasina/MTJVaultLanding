import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import { CareersHero } from '@/components/sections/CareersHero';
import { RoleCard } from '@/components/sections/RoleCard';
import { CareersGeneralCta } from '@/components/sections/CareersGeneralCta';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import careersData from '@/data/careers.json';
import type { CareersData, Role } from '@/types/careers';

const careers = careersData as CareersData;

export const metadata: Metadata = buildMetadata({
    title: careers.meta.title,
    description: careers.meta.description,
    path: careers.meta.path,
});

function buildJobPostingSchema(role: Role) {
    return {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: role.title,
        description: role.summary,
        datePosted: role.datePosted,
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
    };
}

export default function CareersPage() {
    const activeRoles = careers.roles.filter((role) => role.active);

    return (
        <main id="main-content">
            <CareersHero hero={careers.hero} />

            <section className="pb-12 sm:pb-16 lg:pb-20">
                <Container>
                    <div className="space-y-8">
                        {activeRoles.map((role) => (
                            <RoleCard key={role.slug} role={role} />
                        ))}
                    </div>
                </Container>
            </section>

            <CareersGeneralCta cta={careers.generalCta} />

            {activeRoles.map((role) => (
                <script
                    key={`jsonld-${role.slug}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(buildJobPostingSchema(role)),
                    }}
                />
            ))}
        </main>
    );
}
