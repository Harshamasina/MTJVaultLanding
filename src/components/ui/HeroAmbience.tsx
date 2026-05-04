/**
 * Soft corner-anchored gradient ambience for the hero and the
 * section directly below it.
 *
 * Renders two large circular gradients positioned at the host
 * section's left and right corners, each with its centre off-screen
 * so only an inner quarter-circle is visible. Pair the `bottom`
 * variant on the hero with the `top` variant on the section
 * immediately below, and the two quarters combine across the
 * boundary into a full half-circle on each side.
 *
 * Hue palette is sampled from the brand logo cube:
 *   - Left blob:  deep navy-indigo of the dark face (#282f82 -> #6366f1)
 *   - Right blob: rich violet-indigo of the front face (#4338ca -> #818cf8)
 *
 * A soft white radial mask sits between the blobs and the section
 * content, keeping the centre column pure and readable while letting
 * the hue breathe at the edges.
 *
 * Statically server-rendered (no JS, no animation) so it's ~free
 * on Lighthouse. Place inside a relatively-positioned, overflow-hidden
 * ancestor so the off-screen halves of the circles get clipped to
 * the section bounds.
 */

interface HeroAmbienceProps {
    /** Which edge the quarter-circles anchor to. Use `bottom` on the
     *  hero and `top` on the section directly below it. */
    edge: 'bottom' | 'top';
}

const LEFT_GRADIENT =
    'radial-gradient(circle, rgba(40,47,130,0.13) 0%, rgba(67,76,175,0.115) 24%, rgba(99,102,241,0.10) 46%, rgba(129,140,248,0.06) 62%, rgba(255,255,255,0) 78%)';

const RIGHT_GRADIENT =
    'radial-gradient(circle, rgba(67,56,202,0.17) 0%, rgba(99,102,241,0.14) 24%, rgba(129,140,248,0.11) 46%, rgba(165,180,252,0.07) 62%, rgba(255,255,255,0) 78%)';

const CENTER_MASK =
    'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0) 80%)';

export function HeroAmbience({ edge }: HeroAmbienceProps) {
    const verticalAnchor = edge === 'bottom' ? { bottom: '-360px' } : { top: '-360px' };

    /* Desktop-only: the half-circle silhouettes need horizontal real
       estate to read correctly. On mobile/tablet (below lg) the
       hero collapses to a single column and the off-screen-anchored
       blobs fight the content area, so the whole ambience is hidden
       below the lg breakpoint. */
    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute z-0 h-205 w-205 rounded-full hidden lg:block"
                style={{
                    left: '-360px',
                    ...verticalAnchor,
                    background: LEFT_GRADIENT,
                    filter: 'blur(12px)',
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute z-0 h-205 w-205 rounded-full hidden lg:block"
                style={{
                    right: '-360px',
                    ...verticalAnchor,
                    background: RIGHT_GRADIENT,
                    filter: 'blur(12px)',
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-1 hidden lg:block"
                style={{ background: CENTER_MASK }}
            />
        </>
    );
}
