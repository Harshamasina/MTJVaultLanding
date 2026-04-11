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
    { value: 'IP Attorney', label: 'IP Attorney' },
    { value: 'Patent Paralegal', label: 'Patent Paralegal' },
    { value: 'IP Director', label: 'IP Director' },
    { value: 'CTO / VP Engineering', label: 'CTO / VP Engineering' },
    { value: 'Legal Operations', label: 'Legal Operations' },
    { value: 'Other', label: 'Other' },
] as const;

export const INQUIRY_TYPE_OPTIONS = [
    { value: '', label: 'What can we help with?' },
    { value: 'General Inquiry', label: 'General Inquiry' },
    { value: 'Product Question', label: 'Product Question' },
    { value: 'Pricing', label: 'Pricing & Plans' },
    { value: 'Partnership', label: 'Partnership' },
    { value: 'Technical Support', label: 'Technical Support' },
    { value: 'Other', label: 'Other' },
] as const;
