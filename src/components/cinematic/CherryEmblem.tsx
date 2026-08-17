import { cn } from "@/lib/utils/cn";

interface CherryEmblemProps {
  className?: string;
  size?: number;
  /**
   * "gloss" — filled, gradient, lacquered cherries (hero / signature moments)
   * "line" — engraved single-line mark (favicon, dividers, loading state, nav)
   */
  variant?: "gloss" | "line";
  title?: string;
}

/**
 * The INGÉ signature mark: three black-cherry glazed cherries, bound by
 * their stems in a ribbon-like knot, one serrated leaf. This is the house's
 * proprietary emblem — the recurring "drip" motif ultimately resolves into
 * this shape across the cinematic homepage (see components/cinematic/Hero.tsx).
 */
export function CherryEmblem({ className, size = 40, variant = "line", title = "INGÉ" }: CherryEmblemProps) {
  const gradientId = "inge-cherry-gloss";

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn(className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {variant === "gloss" && (
        <defs>
          <radialGradient id={gradientId} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#8a1c2e" />
            <stop offset="45%" stopColor="var(--inge-cherry, #4a0e1a)" />
            <stop offset="100%" stopColor="var(--inge-noir-deep, #050403)" />
          </radialGradient>
        </defs>
      )}

      {/* stems converging to the knot */}
      <path
        d="M32 12 C 30 20, 27 26, 23 34 M32 12 C 33 20, 35 27, 33 38 M32 12 C 32 22, 32 30, 30 42"
        fill="none"
        stroke={variant === "gloss" ? "var(--inge-gold, #c7a768)" : "currentColor"}
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* ribbon knot */}
      <path
        d="M27 11 C 29 8, 35 8, 37 11 C 35 13.5, 29 13.5, 27 11 Z"
        fill={variant === "gloss" ? "var(--inge-gold, #c7a768)" : "none"}
        stroke={variant === "gloss" ? "none" : "currentColor"}
        strokeWidth="1.1"
      />

      {/* leaf */}
      <path
        d="M32 13 C 38 10, 44 12, 45 17 C 39 19, 33 17, 32 13 Z"
        fill={variant === "gloss" ? "#2f4a2e" : "none"}
        stroke={variant === "gloss" ? "none" : "currentColor"}
        strokeWidth="1"
      />
      <path d="M33 14.5 C 37 14, 41 15, 43 17" fill="none" stroke={variant === "gloss" ? "rgba(255,255,255,0.35)" : "currentColor"} strokeWidth="0.6" />

      {/* three cherries */}
      {[
        { cx: 22, cy: 39, r: 9 },
        { cx: 33, cy: 43, r: 9.5 },
        { cx: 27, cy: 51, r: 8.5 },
      ].map((c, i) => (
        <g key={i}>
          <circle
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill={variant === "gloss" ? `url(#${gradientId})` : "none"}
            stroke={variant === "gloss" ? "none" : "currentColor"}
            strokeWidth="1.1"
          />
          {/* wet-gloss highlight stroke */}
          <path
            d={`M ${c.cx - c.r * 0.45} ${c.cy - c.r * 0.55} q ${c.r * 0.4} ${-c.r * 0.35} ${c.r * 0.75} ${-c.r * 0.1}`}
            fill="none"
            stroke={variant === "gloss" ? "rgba(255,255,255,0.55)" : "currentColor"}
            strokeWidth={variant === "gloss" ? 1.6 : 0.6}
            strokeLinecap="round"
            opacity={variant === "gloss" ? 0.9 : 0.5}
          />
          {/* droplet */}
          <path
            d={`M ${c.cx} ${c.cy + c.r} q -1.6 3.5 0 5.5 q 1.6 -2 0 -5.5 Z`}
            fill={variant === "gloss" ? "var(--inge-cherry-bright, #6e1424)" : "none"}
            stroke={variant === "gloss" ? "none" : "currentColor"}
            strokeWidth="0.8"
            opacity={variant === "gloss" ? 0.85 : 0.4}
          />
        </g>
      ))}
    </svg>
  );
}
