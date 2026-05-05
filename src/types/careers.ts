export type DetailBlock =
    | { kind: 'paragraph'; text: string }
    | { kind: 'bullets'; items: string[] }
    | { kind: 'group'; title: string; bullets: string[] }
    | { kind: 'steps'; items: { title: string; body: string }[] };

export interface DetailSection {
    heading: string;
    intro?: string;
    blocks: DetailBlock[];
}

export interface RoleDetail {
    tldr: string;
    sections: DetailSection[];
}

export interface BaseSalary {
    currency: string;
    minValue: number;
    maxValue: number;
    unitText: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
}

export interface Role {
    slug: string;
    department: string;
    title: string;
    summary: string;
    location: string;
    employmentType: string;
    compensation: string;
    responsibilities: string[];
    requirements: string[];
    applyEmail: string;
    applySubject: string;
    datePosted: string;
    /** Optional structured salary for JobPosting JSON-LD (Google for Jobs). */
    baseSalary?: BaseSalary;
    /** Optional occupational category (O*NET-SOC code or label). */
    occupationalCategory?: string;
    active: boolean;
    detail: RoleDetail;
}

export interface HeroCopy {
    eyebrow: string;
    title: string;
    description: string;
    tags: string[];
}

export interface PageMeta {
    title: string;
    description: string;
    path: string;
}

export interface GeneralCta {
    title: string;
    ctaLabel: string;
    ctaEmail: string;
    ctaSubject: string;
}

export interface CareersData {
    meta: PageMeta;
    hero: HeroCopy;
    roles: Role[];
    generalCta: GeneralCta;
}
