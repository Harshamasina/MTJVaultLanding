'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyEmailButtonProps {
    email: string;
    className?: string;
}

export function CopyEmailButton({ email, className = '' }: CopyEmailButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API unavailable. The email text is still selectable
            // by the user, so the fallback degrades gracefully.
        }
    };

    return (
        <div
            className={`inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg pl-4 pr-1.5 py-1.5 ${className}`}
        >
            <span
                className="text-sm text-text-primary select-all"
                style={{ fontFamily: 'var(--font-mono)' }}
            >
                {email}
            </span>
            <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-text-muted hover:text-primary hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
            >
                {copied ? (
                    <Check className="w-4 h-4 text-success" aria-hidden="true" />
                ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                )}
            </button>
            <span className="sr-only" aria-live="polite">
                {copied ? 'Email copied to clipboard' : ''}
            </span>
        </div>
    );
}
