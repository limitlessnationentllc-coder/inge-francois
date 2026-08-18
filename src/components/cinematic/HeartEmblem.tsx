import { cn } from "@/lib/utils/cn";

interface HeartEmblemProps {
  className?: string;
  size?: number;
  title?: string;
}

/**
 * The house's personal mark, for the top brand bar: three glazed cherries —
 * her three children — arranged in a heart, each carried on its own gold
 * stem. The gold linework binding them is her.
 */
export function HeartEmblem({ className, size = 34, title = "Ingé" }: HeartEmblemProps) {
  const gradientId = "inge-heart-cherry-gloss";

  const cherries = [
    { cx: 20, cy: 32, r: 11.5 }, // left child
    { cx: 44, cy: 32, r: 11.5 }, // right child
    { cx: 32, cy: 47, r: 12 }, // youngest, forms the heart's point
  ];

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={cn(className)} role="img" aria-label={title}>
      <title>{title}</title>
      <defs>
        <radialGradient id={gradientId} cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#8a1c2e" />
          <stop offset="45%" stopColor="#4a0e1a" />
          <stop offset="100%" stopColor="#1c0509" />
        </radialGradient>
      </defs>

      {/* the gold stems — her, holding the three together */}
      <path d="M20 32 C 20 20, 26 12, 32 9" fill="none" stroke="#c7a768" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M44 32 C 44 20, 38 12, 32 9" fill="none" stroke="#c7a768" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32 47 C 32 30, 32 16, 32 9" fill="none" stroke="#c7a768" strokeWidth="1.2" strokeLinecap="round" />

      {/* three cherries in a heart */}
      {cherries.map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r={c.r} fill={`url(#${gradientId})`} />
          <path
            d={`M ${c.cx - c.r * 0.45} ${c.cy - c.r * 0.5} q ${c.r * 0.45} ${-c.r * 0.4} ${c.r * 0.8} ${-c.r * 0.1}`}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>
      ))}
    </svg>
  );
}
