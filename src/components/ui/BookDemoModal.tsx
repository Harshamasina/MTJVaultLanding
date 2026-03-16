'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONTACT_API_URL } from '@/lib/constants';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BookDemoButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children?: React.ReactNode;
}

interface DemoFormData {
    name: string;
    email: string;
    company: string;
    role: string;
    phone: string;
    notes: string;
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

const INITIAL_FORM: DemoFormData = {
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    notes: '',
};

export function BookDemoButton({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
}: BookDemoButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Hydration guard — document.body not available during SSR
    useEffect(() => setMounted(true), []);

    return (
        <>
            <Button
                variant={variant}
                size={size}
                className={className}
                onClick={() => setIsOpen(true)}
            >
                {children || 'Book a Demo'}
            </Button>
            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <DemoModal onClose={() => setIsOpen(false)} />
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </>
    );
}

function DemoModal({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState<DemoFormData>(INITIAL_FORM);
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Close on Escape
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

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
                body: JSON.stringify({
                    ...form,
                    inquiryType: 'demo',
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(
                    data?.message || `Request failed (${res.status})`,
                );
            }

            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMessage(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong. Please try again.',
            );
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="demo-modal-title"
                className="relative w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-card-border bg-white p-8 shadow-2xl"
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-page-bg-alt transition-colors cursor-pointer"
                    aria-label="Close dialog"
                >
                    <X className="w-5 h-5" />
                </button>

                {status === 'success' ? (
                    <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                        <h3
                            id="demo-modal-title"
                            className="text-xl font-bold text-text-primary mb-2"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Demo Request Received
                        </h3>
                        <p
                            className="text-sm text-text-secondary max-w-sm mx-auto"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            We&apos;ll reach out within 1 business day to
                            schedule your personalized demo.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-6 text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <h3
                            id="demo-modal-title"
                            className="text-xl font-bold text-text-primary mb-1"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Book a Demo
                        </h3>
                        <p
                            className="text-sm text-text-secondary mb-6"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            See how Design Your Invention can streamline your IP
                            workflow. We&apos;ll reach out to schedule a time.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name + Email */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <ModalField
                                    label="Full Name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Jane Smith"
                                />
                                <ModalField
                                    label="Work Email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="jane@acmelaw.com"
                                />
                            </div>

                            {/* Company + Role */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <ModalField
                                    label="Company"
                                    name="company"
                                    type="text"
                                    value={form.company}
                                    onChange={handleChange}
                                    required
                                    placeholder="Acme Law LLP"
                                />
                                <div>
                                    <label
                                        htmlFor="demo-role"
                                        className="block text-sm font-semibold text-text-primary mb-1.5"
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                        }}
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="demo-role"
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors appearance-none cursor-pointer"
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                        }}
                                    >
                                        {ROLES.map((opt) => (
                                            <option
                                                key={opt.value}
                                                value={opt.value}
                                                disabled={opt.value === ''}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Phone */}
                            <ModalField
                                label="Phone (optional)"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                            />

                            {/* Notes */}
                            <div>
                                <label
                                    htmlFor="demo-notes"
                                    className="block text-sm font-semibold text-text-primary mb-1.5"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                    }}
                                >
                                    Anything specific you&apos;d like to see?{' '}
                                    <span className="font-normal text-text-muted">
                                        (optional)
                                    </span>
                                </label>
                                <textarea
                                    id="demo-notes"
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="e.g. PCT filing workflows, compliance audit trail..."
                                    className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors resize-y"
                                    style={{
                                        fontFamily: 'var(--font-body)',
                                    }}
                                />
                            </div>

                            {/* Error */}
                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-danger text-sm">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                        }}
                                    >
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
                                        Request Demo
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    );
}

function ModalField({
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
                htmlFor={`demo-${name}`}
                className="block text-sm font-semibold text-text-primary mb-1.5"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {label}
            </label>
            <input
                id={`demo-${name}`}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
            />
        </div>
    );
}
