export const SITE_URL = 'https://designyourinvention.com';
export const SITE_NAME = 'Design Your Invention';
export const SITE_DESCRIPTION =
    'Enterprise IP management with AI-powered prior art search and patent drafting. Patent docketing, PCT/PRV/NPE case management, and FDA 21 CFR Part 11 compliance.';

export const NAV_LINKS = [
    { label: 'Features', href: '/#features' },
    { label: 'AI Drafting', href: '/#ai-drafting' },
    { label: 'Compliance', href: '/#compliance' },
    { label: 'Security', href: '/#security' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/#contact' },
] as const;

export const CTA_SIGNUP_URL = '/#get-started';
export const CTA_DEMO_URL = '/#contact';

/* ── Shared form enums (must match backend validation) ── */

export const ROLE_OPTIONS = [
    { value: '', label: 'Select your role' },
    { value: 'Patent Attorney', label: 'Patent Attorney' },
    { value: 'IP Manager', label: 'IP Manager' },
    { value: 'Paralegal / Docketing Specialist', label: 'Paralegal / Docketing Specialist' },
    { value: 'Pharma / Biotech IP Team', label: 'Pharma / Biotech IP Team' },
    { value: 'Law Firm Partner', label: 'Law Firm Partner' },
    { value: 'Founder / Inventor', label: 'Founder / Inventor' },
    { value: 'Other', label: 'Other' },
] as const;

export const INQUIRY_TYPE_OPTIONS = [
    { value: '', label: 'What can we help with?' },
    { value: 'Book a product demo', label: 'Book a product demo' },
    { value: 'Discuss pricing', label: 'Discuss pricing' },
    { value: 'Migrate existing portfolio', label: 'Migrate existing portfolio' },
    { value: 'AI drafting workflow', label: 'AI drafting workflow' },
    { value: 'Compliance / Part 11 controls', label: 'Compliance / Part 11 controls' },
    { value: 'Other', label: 'Other' },
] as const;

/* Portfolio Size — used for lead qualification. Submitted to the backend
 * as a structured field via ContactMessagePayload; also folded into the
 * message body so existing backends that don't yet know about the field
 * still surface it to the recipient. */
export const PORTFOLIO_SIZE_OPTIONS = [
    { value: '', label: 'Select portfolio size' },
    { value: '1-50 families', label: '1–50 families' },
    { value: '51-250 families', label: '51–250 families' },
    { value: '251-1,000 families', label: '251–1,000 families' },
    { value: '1,000+ families', label: '1,000+ families' },
] as const;
