/**
 * @deprecated Disabled in favour of the corner-gradient HeroAmbience
 * pattern (see `src/components/ui/HeroAmbience.tsx`). The export
 * below is a no-op so any lingering imports render nothing; the
 * original full implementation is preserved underneath as a
 * reference in case the hex-lattice direction is revisited.
 *
 * --- Original docstring ---
 * Honeycomb (benzene-ring) tessellation rendered as an SVG background.
 * Decorative atmosphere for the hero — the molecular lattice connotation
 * lands strongly for pharma IP buyers without alienating general patent
 * counsel. Statically server-rendered (no JS, no animation) so it costs
 * ~zero on Lighthouse.
 *
 * Two pre-computed grids handle responsiveness:
 *   - Landscape (md+) — wide viewBox, sparser large cells.
 *   - Portrait (mobile) — taller viewBox, more rows, slightly smaller
 *     cells so portrait phones still see a coherent hexagon frame.
 * Tailwind responsive classes show the appropriate one per breakpoint.
 *
 * The pattern fades to transparent before the section's bottom edge via
 * mask-image, so transition into the next section stays seamless without
 * a visible boundary.
 *
 * Place inside a relatively-positioned `overflow-hidden` ancestor; the
 * pattern absolute-fills its parent.
 */
export function HoneycombPattern() {
    return null;
}

/* === Original implementation preserved below for reference ===================
   The export above short-circuits to null. The code below is intentionally
   kept dead-code so the implementation can be revived without rewriting it.
   ============================================================================ */

interface HoneycombData {
    nodes: [number, number][];
    edges: [number, number][];
}

/* Hex grid is computed once at module load (pure function, no DOM
   access) so the SVG nodes/edges arrays are inlined into the static
   markup at build time when the component is server-rendered. */
function buildHoneycomb(cols: number, rows: number, r: number): HoneycombData {
    const hexW = Math.sqrt(3) * r;         // horizontal cell pitch
    const hexH = 1.5 * r;                  // vertical cell pitch
    const xStart = -hexW * 0.5;
    const yStart = -hexH * 0.5;

    const nodeMap = new Map<string, number>();
    const nodes: [number, number][] = [];
    const edgeSet = new Set<string>();

    const addNode = (x: number, y: number): number => {
        const rx = Math.round(x);
        const ry = Math.round(y);
        const key = `${rx},${ry}`;
        const existing = nodeMap.get(key);
        if (existing !== undefined) return existing;
        const idx = nodes.length;
        nodeMap.set(key, idx);
        nodes.push([rx, ry]);
        return idx;
    };

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const offX = (row % 2 === 0) ? 0 : hexW / 2;
            const cx = xStart + col * hexW + offX + hexW / 2;
            const cy = yStart + row * hexH + r;
            // 6 pointy-top vertices (angles starting at -90°)
            const verts: number[] = [];
            for (let i = 0; i < 6; i++) {
                const a = -Math.PI / 2 + i * Math.PI / 3;
                verts.push(addNode(cx + r * Math.cos(a), cy + r * Math.sin(a)));
            }
            // 6 closed edges; canonical key dedupes shared sides
            for (let i = 0; i < 6; i++) {
                const a = verts[i];
                const b = verts[(i + 1) % 6];
                edgeSet.add(a < b ? `${a}-${b}` : `${b}-${a}`);
            }
        }
    }

    const edges: [number, number][] = Array.from(edgeSet).map(s => {
        const [a, b] = s.split('-').map(Number);
        return [a, b];
    });

    return { nodes, edges };
}

/* Sparse, large cells. Counter-intuitively reads as more subtle than
   denser tessellation: each hexagon is a clear deliberate shape rather
   than mesh texture, and fewer total lines means lower cumulative
   visual weight even at the same per-line alpha. Matches the density
   of pattern backgrounds on Linear / Vercel / Stripe rather than
   wallpaper-style dense honeycombs. */
const HC_LANDSCAPE = buildHoneycomb(8, 6, 145);
/* Portrait grid — narrower, taller. Slightly smaller cells (r=110) so
   the proportions still feel right inside a phone viewport, and one
   extra row to fill the longer vertical space. */
const HC_PORTRAIT = buildHoneycomb(5, 8, 110);

/* Two masks composited with `intersect` — pattern only shows where BOTH
   are non-transparent. Effect:
     - Vertical fade hides the bottom of the section (seamless transition
       into the next section).
     - Radial fade dims the centre where the headline + tree visual sit
       to ~30% strength (translucent black, not transparent) so a soft
       ghost of the pattern remains behind content, full strength at
       edges/corners.
   Result: pattern reads as a clear frame at the edges with subtle
   atmospheric depth bleeding behind the content. */
const MASK_VERTICAL = 'linear-gradient(to bottom, black 0%, black 35%, transparent 90%)';
const MASK_RADIAL = 'radial-gradient(ellipse 70% 70% at 50% 35%, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.30) 22%, black 70%)';
const MASK = `${MASK_VERTICAL}, ${MASK_RADIAL}`;

/* On portrait phones, content is single-column and the centre of the
   viewport is roughly where the headline mid-point sits. Shift the
   radial mask centre slightly lower to better cover the mobile content
   area, which spans more vertical space. */
const MASK_RADIAL_PORTRAIT = 'radial-gradient(ellipse 75% 60% at 50% 50%, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.30) 25%, black 70%)';
const MASK_PORTRAIT = `${MASK_VERTICAL}, ${MASK_RADIAL_PORTRAIT}`;

interface GridSvgProps {
    data: HoneycombData;
    viewBox: string;
    className: string;
}

function GridSvg({ data, viewBox, className }: GridSvgProps) {
    return (
        <svg
            viewBox={viewBox}
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g stroke="rgba(99,102,241,0.10)" strokeWidth={1} fill="none">
                {data.edges.map(([a, b], i) => {
                    const [x1, y1] = data.nodes[a];
                    const [x2, y2] = data.nodes[b];
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
            </g>
            {data.nodes.map(([x, y], i) => (
                <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={4}
                    fill="none"
                    stroke="rgba(99,102,241,0.35)"
                    strokeWidth={1.4}
                />
            ))}
        </svg>
    );
}

// Renamed from `HoneycombPattern` so the disabled no-op export at the
// top of this file remains the active export. Body kept verbatim.
function _HoneycombPatternDisabled() {
    return (
        <>
            {/* Portrait grid — phones (below md). Taller viewBox + radial
                mask shifted lower to cover mobile content area. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden md:hidden"
                style={{
                    maskImage: MASK_PORTRAIT,
                    WebkitMaskImage: MASK_PORTRAIT,
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in',
                }}
            >
                <GridSvg
                    data={HC_PORTRAIT}
                    viewBox="0 0 600 1000"
                    className="w-full h-full"
                />
            </div>

            {/* Landscape grid — tablets and desktop (md+). Wide viewBox
                with the original 8x6 sparse layout. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block"
                style={{
                    maskImage: MASK,
                    WebkitMaskImage: MASK,
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in',
                }}
            >
                <GridSvg
                    data={HC_LANDSCAPE}
                    viewBox="0 0 1440 900"
                    className="w-full h-full"
                />
            </div>
        </>
    );
}
