import Image from 'next/image';

interface BrowserFrameProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    url?: string;
    className?: string;
    priority?: boolean;
}

export function BrowserFrame({
    src,
    alt,
    width,
    height,
    url = 'designyourinvention.com',
    className = '',
    priority = false,
}: BrowserFrameProps) {
    return (
        <div className={`relative ${className}`}>
            {/* Browser Window */}
            <div className="rounded-xl border border-card-border bg-white shadow-2xl shadow-black/10 overflow-hidden">
                {/* Chrome Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-page-bg-alt border-b border-card-border">
                    {/* Traffic Light Dots */}
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>

                    {/* URL Bar */}
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-2 px-4 py-1 bg-white rounded-md text-xs text-text-muted border border-card-border max-w-xs w-full justify-center">
                            <svg
                                className="w-3 h-3 text-success flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            <span
                                className="truncate"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                {url}
                            </span>
                        </div>
                    </div>

                    {/* Spacer to balance the dots */}
                    <div className="w-[52px]" />
                </div>

                {/* Screenshot */}
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full h-auto"
                    priority={priority}
                />
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-page-bg to-transparent pointer-events-none rounded-b-xl" />
        </div>
    );
}
