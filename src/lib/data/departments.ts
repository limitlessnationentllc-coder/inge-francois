import type { Department, DepartmentSlug } from "@/types/product";

/**
 * The House departments. Nav exposes a restrained subset (see
 * components/layout/Nav.tsx); this list is the full set used to drive
 * department landing pages, the homepage house gallery, and product routing.
 */
export const DEPARTMENTS: Department[] = [
  {
    slug: "la-femme",
    number: "01",
    frenchName: "Womenswear",
    englishName: "La Femme",
    tagline: "Tailoring for the room you already command.",
    description:
      "Suits, blazers, skirts, and dresses built for the executive, the founder, the woman whose calendar has no soft edges. Structured where it matters, fluid where it counts.",
  },
  {
    slug: "l-homme",
    number: "02",
    frenchName: "Menswear",
    englishName: "L'Homme",
    tagline: "Quiet authority, precisely cut.",
    description:
      "A tightly edited menswear selection — tailoring, outerwear, and considered essentials for men who dress with intent rather than noise.",
  },
  {
    slug: "les-sacs",
    number: "03",
    frenchName: "Handbags",
    englishName: "Les Sacs",
    tagline: "The object that enters the room first.",
    description:
      "Handbags, pocketbooks, and clutches sourced and designed for permanence — new and pre-loved alike, each one authenticated and carried for decades, not seasons.",
  },
  {
    slug: "les-souliers",
    number: "04",
    frenchName: "Shoes",
    englishName: "Les Souliers",
    tagline: "Every step, considered.",
    description:
      "Designer footwear selected for the woman and man who stand, walk, and lead all day — without ever appearing to try.",
  },
  {
    slug: "les-bijoux",
    number: "05",
    frenchName: "Jewelry & Accessories",
    englishName: "Les Bijoux",
    tagline: "Small pieces, unmistakable presence.",
    description:
      "Fine and demi-fine jewelry, and the accessories that finish a look without announcing themselves.",
  },
  {
    slug: "maison",
    number: "07",
    frenchName: "Beauty & Home",
    englishName: "Maison",
    tagline: "The house, beyond the wardrobe.",
    description:
      "A curated edit of beauty and lifestyle objects — the first expression of INGÉ beyond fashion, chosen with the same restraint as everything else.",
  },
  {
    slug: "originals",
    number: "06",
    frenchName: "INGÉ Originals",
    englishName: "The House Line",
    tagline: "Where the house begins to speak for itself.",
    description:
      "Proprietary INGÉ designs — the first pieces conceived, not merely curated. A small collection today; the foundation of an original fashion house tomorrow.",
  },
  {
    slug: "private-collection",
    number: "08",
    frenchName: "The Private Collection",
    englishName: "Rare & By Invitation",
    tagline: "Not listed. Not repeated.",
    description:
      "Rare, limited, and privately sourced pieces available only by request. One of one, when we say one of one.",
  },
];

export function getDepartment(slug: DepartmentSlug): Department {
  const dept = DEPARTMENTS.find((d) => d.slug === slug);
  if (!dept) throw new Error(`Unknown department: ${slug}`);
  return dept;
}
