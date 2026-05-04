interface HexCubeIllustrationProps {
    className?: string;
}

export function HexCubeIllustration({ className = '' }: HexCubeIllustrationProps) {
    return (
        <svg
            width="900"
            height="520"
            viewBox="0 0 900 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
            aria-hidden="true"
            className={`w-full h-auto ${className}`}
        >
            <defs>
                {/* Soft background glow */}
                <radialGradient id="hex-bgGlow" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.24" />
                    <stop offset="45%" stopColor="#818CF8" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>

                {/* Cube facet gradients */}
                <linearGradient
                    id="hex-facetTopLeft"
                    x1="360"
                    y1="150"
                    x2="455"
                    y2="265"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.32" />
                </linearGradient>

                <linearGradient
                    id="hex-facetTopRight"
                    x1="540"
                    y1="150"
                    x2="455"
                    y2="265"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0.20" />
                </linearGradient>

                <linearGradient
                    id="hex-facetBottomLeft"
                    x1="360"
                    y1="350"
                    x2="455"
                    y2="265"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0.24" />
                </linearGradient>

                <linearGradient
                    id="hex-facetBottomRight"
                    x1="540"
                    y1="350"
                    x2="455"
                    y2="265"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.70" />
                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0.20" />
                </linearGradient>

                {/* Dotted plane pattern — densified rows + columns */}
                <pattern
                    id="hex-dotPattern"
                    width="15"
                    height="15"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="1.5" cy="1.5" r="0.95" fill="#818CF8" opacity="0.42" />
                </pattern>

                {/* Cube shadow blur */}
                <filter id="hex-cubeShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="16" />
                </filter>
            </defs>

            {/* Background glow */}
            <rect width="900" height="520" fill="url(#hex-bgGlow)" opacity="0.85" />

            {/* Circular contour rings behind cube */}
            <g opacity="0.28" stroke="#818CF8" strokeWidth="1">
                <circle cx="455" cy="255" r="90" />
                <circle cx="455" cy="255" r="130" />
                <circle cx="455" cy="255" r="170" />
                <circle cx="455" cy="255" r="210" />
            </g>

            {/* Perspective dotted plane — extends past the outer ring */}
            <path
                d="M-60 510 L960 510 L640 210 L260 210 Z"
                fill="url(#hex-dotPattern)"
                opacity="0.6"
            />

            {/* Fade overlay for dotted plane edges */}
            <path
                d="M-60 510 L960 510 L640 210 L260 210 Z"
                fill="url(#hex-bgGlow)"
                opacity="0.35"
            />

            {/* Soft cube shadow */}
            <ellipse
                cx="455"
                cy="365"
                rx="85"
                ry="22"
                fill="#6366F1"
                opacity="0.18"
                filter="url(#hex-cubeShadow)"
            />

            {/* Cube group
                Outer hex/cube outline points:
                  top: 455,110
                  upper-right: 560,170
                  lower-right: 560,315
                  bottom: 455,375
                  lower-left: 350,315
                  upper-left: 350,170
                  center: 455,245 */}
            <g>
                {/* Top-left facet */}
                <path
                    d="M455 110 L455 245 L350 170 Z"
                    fill="url(#hex-facetTopLeft)"
                    stroke="#C7D2FE"
                    strokeOpacity="0.38"
                    strokeWidth="1"
                />

                {/* Top-right facet */}
                <path
                    d="M455 110 L560 170 L455 245 Z"
                    fill="url(#hex-facetTopRight)"
                    stroke="#C7D2FE"
                    strokeOpacity="0.42"
                    strokeWidth="1"
                />

                {/* Right facet */}
                <path
                    d="M560 170 L560 315 L455 245 Z"
                    fill="#A5B4FC"
                    fillOpacity="0.22"
                    stroke="#C7D2FE"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                />

                {/* Bottom-right facet */}
                <path
                    d="M560 315 L455 375 L455 245 Z"
                    fill="url(#hex-facetBottomRight)"
                    stroke="#C7D2FE"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                />

                {/* Bottom-left facet */}
                <path
                    d="M455 375 L350 315 L455 245 Z"
                    fill="url(#hex-facetBottomLeft)"
                    stroke="#C7D2FE"
                    strokeOpacity="0.34"
                    strokeWidth="1"
                />

                {/* Left facet */}
                <path
                    d="M350 315 L350 170 L455 245 Z"
                    fill="#6366F1"
                    fillOpacity="0.26"
                    stroke="#C7D2FE"
                    strokeOpacity="0.34"
                    strokeWidth="1"
                />

                {/* Internal divider lines */}
                <path
                    d="M455 110 L455 375"
                    stroke="#FFFFFF"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                />
                <path
                    d="M350 170 L560 315"
                    stroke="#FFFFFF"
                    strokeOpacity="0.22"
                    strokeWidth="1"
                />
                <path
                    d="M560 170 L350 315"
                    stroke="#FFFFFF"
                    strokeOpacity="0.22"
                    strokeWidth="1"
                />
            </g>
        </svg>
    );
}
