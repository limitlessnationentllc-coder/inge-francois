import type { DepartmentSlug } from "@/types/product";
import { cn } from "@/lib/utils/cn";

interface PlaceholderPlateProps {
  seed: string;
  department: DepartmentSlug;
  alt: string;
  className?: string;
}

/**
 * Editorial placeholder used in place of real product photography until
 * the live Shopify catalog is connected. Deliberately styled as an
 * intentional part of the house's visual language (lacquer gradient +
 * department glyph) rather than a broken-image state — but always labeled
 * "Demo Placeholder" so it's never mistaken for real inventory.
 */
export function PlaceholderPlate({ seed, department, alt, className }: PlaceholderPlateProps) {
  const hash = hashSeed(seed);
  const angle = 130 + (hash % 60);
  const shift = hash % 3;

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-noir",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, var(--inge-cherry-bright) 0%, var(--inge-cherry) ${
          30 + shift * 5
        }%, var(--inge-cherry-deep) 68%, var(--inge-noir-deep) 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={NOISE_STYLE} />
      <DepartmentGlyph department={department} className="h-[38%] w-[38%] text-ivory/25" />
      <span className="absolute bottom-3 left-3 font-sans text-[9px] uppercase tracking-[0.22em] text-gold-soft/70">
        Demo Placeholder
      </span>
    </div>
  );
}

const NOISE_STYLE = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
};

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

function DepartmentGlyph({ department, className }: { department: DepartmentSlug; className?: string }) {
  const paths: Record<DepartmentSlug, string> = {
    "la-femme": "M32 6 L24 16 L27 20 L20 58 H44 L37 20 L40 16 Z M27 20 H37",
    "l-homme": "M20 14 L32 8 L44 14 L40 20 L36 16 V58 H28 V16 L24 20 Z",
    "les-sacs": "M18 26 H46 L44 56 H20 Z M24 26 V19 A8 8 0 0 1 40 19 V26",
    "les-souliers": "M14 48 H50 C50 40 44 40 40 36 L20 32 C16 34 14 40 14 48 Z M20 32 V24",
    "les-bijoux": "M32 12 L44 24 L32 54 L20 24 Z M20 24 H44 M32 12 L26 24 M32 12 L38 24",
    "maison": "M32 10 L48 26 V54 H16 V26 Z M26 54 V38 H38 V54",
    "originals": "M32 8 L37 25 L54 25 L40 35 L45 52 L32 42 L19 52 L24 35 L10 25 L27 25 Z",
    "private-collection": "M20 24 L32 10 L44 24 L32 56 Z M20 24 H44 M26 24 L32 56 M38 24 L32 56",
  };

  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.1" className={className}>
      <path d={paths[department]} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
