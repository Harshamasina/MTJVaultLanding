export interface FaqItem {
    question: string;
    answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is IP management software?',
        answer:
            'IP management software is a specialized platform that helps law firms, corporations, and patent teams manage their intellectual property portfolios — including patent applications, PCT filings, office actions, deadlines, fees, and compliance requirements. It replaces spreadsheets and email-based tracking with a structured, searchable, and auditable system.',
    },
    {
        question: 'How does the platform handle FDA 21 CFR Part 11 compliance?',
        answer:
            'Compliance is built into every workflow — not bolted on. Every edit to a critical field requires a documented reason-for-change. The full audit trail logs who made each change, what changed, and when — with immutable, tamper-proof records. Electronic signatures require re-authentication, and role-based access control ensures only authorized users can perform sensitive actions.',
    },
    {
        question: 'Can I manage PCT and PRV filings in one place?',
        answer:
            'Yes. The platform links PRV (provisional), PCT (international), and NPE (national phase entry) cases to their parent patent families. You can see the entire filing hierarchy in a visual family tree, track deadlines across all filing types, and manage office actions and fees from a single dashboard.',
    },
    {
        question: 'What patent fee types are supported?',
        answer:
            'The platform supports 42 fee types across 8 categories — including filing fees, examination fees, issue fees, maintenance/annuity fees, extension fees, petition fees, PCT fees, and miscellaneous fees. Each fee can be tracked as due, paid, waived, or overdue with full analytics and CSV export.',
    },
    {
        question: 'Is the platform multi-tenant?',
        answer:
            'Yes. Each organization gets a dedicated subdomain (e.g., yourfirm.designyourinvention.com) with fully isolated data. Tenant isolation is enforced at the database level using Row-Level Security (RLS), ensuring zero cross-tenant data leakage. Your data is completely separate from every other organization on the platform.',
    },
    {
        question: 'How does role-based access control work?',
        answer:
            'The platform supports four roles: Tenant Admin, Attorney, Paralegal, and Viewer. Each role has granular permissions — for example, Viewers can browse and search but cannot create, edit, or delete records. Permissions are enforced both in the UI and on the server, so access control cannot be bypassed.',
    },
    {
        question: 'Can I export my data?',
        answer:
            'Yes. Every list view — families, PRV applications, PCT filings, NPE cases, fees, and audit logs — supports one-click CSV export with all columns included. You can also use bulk actions to select multiple records for status changes or deletion with a single operation.',
    },
    {
        question: 'What security measures are in place?',
        answer:
            'The platform uses Auth0 for enterprise-grade authentication with support for SSO, SAML, and multi-factor authentication. Tokens are stored in-memory only (never localStorage), all data is encrypted in transit and at rest, and documents are stored in encrypted S3 buckets with presigned URL access. High-risk actions require step-up re-authentication.',
    },
    {
        question: 'Can I import my existing patent portfolio from spreadsheets?',
        answer:
            'Yes. You can upload your existing Excel or CSV file and the system validates every row before anything touches the database. You get a color-coded preview showing which families will be created, which filings will be merged, and which will be skipped. One click to confirm — all records are created in a single atomic transaction with full audit trail. Up to 5,000 filings per import.',
    },
    {
        question: 'What integrations are available?',
        answer:
            'The platform is a cloud-based web application that runs entirely in your browser — no installation or plugins required. It supports CSV export for every list view, presigned S3 document downloads, and Auth0 SSO integration for enterprise identity providers including SAML and OAuth 2.0. A REST API is available for custom integrations with existing firm systems.',
    },
    {
        question: 'Is AI-generated patent drafting safe for filing?',
        answer:
            'AI-generated drafts are designed as a starting point, not a final filing. Every AI draft includes a mandatory disclaimer stating it requires attorney review before filing. The platform enforces a status workflow — draft, in review, approved — so no AI-generated content can be exported or acted on without human sign-off. Prior art snapshots, model versions, and token counts are preserved for every generation, giving you a complete audit trail for compliance.',
    },
    {
        question: 'Which jurisdictions does AI patent drafting support?',
        answer:
            'The AI drafting engine supports six jurisdictions: US (USPTO — 35 USC 101/102/103), EP (EPO — Article 52/54/56 EPC), IN (Indian Patent Office — Section 3(d)/(i)/(j)/(k) exclusions), WO (WIPO/PCT — international-stage neutral drafting), JP (JPO — Articles 29/36), and CN (CNIPA — Article 22/25/26). Each jurisdiction has specialized rules embedded in the generation process, so claims format, novelty language, and compliance checks adapt automatically.',
    },
    {
        question: 'How does prior art search work in the platform?',
        answer:
            'The prior art search queries the EPO global patent database covering 100+ jurisdictions — without leaving your patent family view. Four search modes are available: Keywords (technical terms across titles and abstracts), Inventor (handles name variations and titles), Applicant (strips corporate suffixes automatically), and Patent Number (any format, kind codes handled). Results can be filtered by IPC classification, date range, and jurisdiction. Relevant patents are saved directly to your family with relevance scoring and attorney notes, creating an auditable prior art record.',
    },
];
