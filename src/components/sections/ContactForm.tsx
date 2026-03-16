'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONTACT_API_URL } from '@/lib/constants';

interface FormData {
    name: string;
    email: string;
    company: string;
    role: string;
    inquiryType: string;
    message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ROLES = [
    { value: '', label: 'Select your role' },
    { value: 'attorney', label: 'Patent Attorney' },
    { value: 'ip-manager', label: 'IP Manager / Director' },
    { value: 'pharma', label: 'Pharma IP Team' },
    { value: 'paralegal', label: 'Paralegal' },
    { value: 'other', label: 'Other' },
] as const;

const INQUIRY_TYPES = [
    { value: '', label: 'What can we help with?' },
    { value: 'demo', label: 'Schedule a Demo' },
    { value: 'pricing', label: 'Pricing & Plans' },
    { value: 'enterprise', label: 'Enterprise / Custom Plan' },
    { value: 'general', label: 'General Inquiry' },
] as const;

const INITIAL_FORM: FormData = {
    name: '',
    email: '',
    company: '',
    role: '',
    inquiryType: '',
    message: '',
};

export function ContactForm() {
    const [form, setForm] = useState<FormData>(INITIAL_FORM);
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch(CONTACT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(
                    data?.message || `Request failed (${res.status})`,
                );
            }

            setStatus('success');
            setForm(INITIAL_FORM);
        } catch (err) {
            setStatus('error');
            setErrorMessage(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong. Please try again.',
            );
        }
    }

    if (status === 'success') {
        return (
            <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3
                    className="text-xl font-bold text-text-primary mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Message Sent
                </h3>
                <p
                    className="text-sm text-text-secondary max-w-sm mx-auto"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Thanks for reaching out. We&apos;ll get back to you within
                    1 business day.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Email row */}
            <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                    label="Full Name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                />
                <FormField
                    label="Work Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@acmelaw.com"
                />
            </div>

            {/* Company + Role row */}
            <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                    label="Company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    required
                    placeholder="Acme Law LLP"
                />
                <FormSelect
                    label="Role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    options={ROLES}
                />
            </div>

            {/* Inquiry Type */}
            <FormSelect
                label="Inquiry Type"
                name="inquiryType"
                value={form.inquiryType}
                onChange={handleChange}
                required
                options={INQUIRY_TYPES}
            />

            {/* Message */}
            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-text-primary mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your IP management needs..."
                    className="w-full rounded-lg border border-card-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors resize-y"
                    style={{ fontFamily: 'var(--font-body)' }}
                />
            </div>

            {/* Error Message */}
            {status === 'error' && (
                <div className="flex items-center gap-2 text-danger text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span style={{ fontFamily: 'var(--font-body)' }}>
                        {errorMessage}
                    </span>
                </div>
            )}

            {/* Submit */}
            <Button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full justify-center"
                size="lg"
            >
                {status === 'submitting' ? (
                    'Sending...'
                ) : (
                    <>
                        Send Message
                        <Send className="w-4 h-4" />
                    </>
                )}
            </Button>
        </form>
    );
}

/* ── Reusable form primitives ── */

function FormField({
    label,
    name,
    type,
    value,
    onChange,
    required,
    placeholder,
}: {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-text-primary mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full rounded-lg border border-card-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
            />
        </div>
    );
}

function FormSelect({
    label,
    name,
    value,
    onChange,
    required,
    options,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    options: ReadonlyArray<{ value: string; label: string }>;
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-text-primary mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full rounded-lg border border-card-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors appearance-none cursor-pointer"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
