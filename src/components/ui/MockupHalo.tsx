interface MockupHaloProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Wraps an animated mockup with a soft indigo radial glow that bleeds
 * beyond the mockup's edges. Purely decorative atmosphere — the halo
 * sits behind the children via `-z-10` inside an `isolate` stacking
 * context so it never escapes the wrapper. Used to give product
 * mockups depth without baking the gradient into each mockup file.
 */
export function MockupHalo({ children, className = '' }: MockupHaloProps) {
    return (
        <div className={`relative isolate w-full min-w-0 ${className}`}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-12 sm:-inset-16 lg:-inset-20 -z-10"
                style={{
                    background:
                        'radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, rgba(129,140,248,0.12) 35%, transparent 65%)',
                    filter: 'blur(55px)',
                }}
            />
            {children}
        </div>
    );
}
