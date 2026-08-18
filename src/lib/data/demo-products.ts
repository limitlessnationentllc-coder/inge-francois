import type { Product } from "@/types/product";

/**
 * ⚠️ DEMO CONTENT — NOT REAL INVENTORY
 * -------------------------------------------------------------------------
 * This file is placeholder catalog data used only until a real Shopify
 * store is connected (see src/lib/shopify/index.ts). Names, prices,
 * designers, and stories below are fictional and exist purely to exercise
 * the UI. Every product here carries `isDemo: true`, which the templates
 * use to render a visible "Demo Content" indicator — never present this
 * data as real available stock.
 *
 * Images use the PlaceholderPlate system (see
 * src/components/product/PlaceholderPlate.tsx) instead of external image
 * URLs, so the app has zero third-party network dependencies until real
 * product photography is connected.
 * -------------------------------------------------------------------------
 */

function plate(seed: string, alt: string) {
  return { url: `placeholder:${seed}`, alt };
}

export const DEMO_PRODUCTS: Product[] = [
  // ---------------------------------------------------------------- La Femme
  {
    id: "demo-lf-01",
    handle: "the-oxblood-tailored-blazer",
    name: "The Oxblood Tailored Blazer",
    department: "la-femme",
    designer: "INGÉ Atelier Selection",
    collectionName: "Executive Line",
    priceCents: 189000,
    currencyCode: "USD",
    images: [plate("lf-01-a", "Oxblood single-breasted blazer, structured shoulder"), plate("lf-01-b", "Detail of oxblood blazer lapel")],
    story:
      "Cut for the boardroom and built to outlast the season. A single-breasted silhouette with a structured shoulder and a nipped waist, in a wool-silk oxblood twill that reads black from a distance and cherry up close.",
    materials: "Wool-silk twill, cupro lining, horn buttons",
    fit: "Tailored fit. True to size; model wears size 4.",
    shippingNote: "Ships in 2–4 business days.",
    labels: ["New"],
    commerceMode: "bag",
    variants: [
      { id: "v-lf-01-2", title: "US 2", available: true, priceCents: 189000, currencyCode: "USD" },
      { id: "v-lf-01-4", title: "US 4", available: true, priceCents: 189000, currencyCode: "USD" },
      { id: "v-lf-01-6", title: "US 6", available: true, priceCents: 189000, currencyCode: "USD" },
      { id: "v-lf-01-8", title: "US 8", available: false, priceCents: 189000, currencyCode: "USD" },
    ],
    isDemo: true,
  },
  {
    id: "demo-lf-02",
    handle: "the-column-sheath-dress",
    name: "The Column Sheath, Noir",
    department: "la-femme",
    designer: "Sourced for INGÉ",
    priceCents: 142000,
    currencyCode: "USD",
    images: [plate("lf-02-a", "Black column sheath dress")],
    story:
      "A dress with one job: to make an entrance unremarkable in its ease and unforgettable in its line. Double-faced crepe, fully lined, a back seam that does the work of a corset without asking anything of you.",
    materials: "Double-faced silk crepe",
    fit: "Fitted. Sizes down; we recommend sizing up.",
    labels: ["Sourced for INGÉ"],
    commerceMode: "bag",
    variants: [
      { id: "v-lf-02-s", title: "S", available: true, priceCents: 142000, currencyCode: "USD" },
      { id: "v-lf-02-m", title: "M", available: true, priceCents: 142000, currencyCode: "USD" },
      { id: "v-lf-02-l", title: "L", available: true, priceCents: 142000, currencyCode: "USD" },
    ],
    isDemo: true,
  },
  {
    id: "demo-lf-03",
    handle: "the-charcoal-pencil-skirt",
    name: "The Charcoal Pencil Skirt",
    department: "la-femme",
    designer: "INGÉ Atelier Selection",
    priceCents: 78000,
    currencyCode: "USD",
    images: [plate("lf-03-a", "Charcoal pencil skirt")],
    story:
      "The skirt every jacket in this house was designed to sit beside. High-waisted, back-vented, cut from a wool suiting with just enough stretch to survive a full calendar.",
    materials: "Wool suiting, 3% elastane",
    fit: "High-waisted, tailored fit.",
    labels: [],
    commerceMode: "bag",
    variants: [
      { id: "v-lf-03-2", title: "US 2", available: true, priceCents: 78000, currencyCode: "USD" },
      { id: "v-lf-03-4", title: "US 4", available: true, priceCents: 78000, currencyCode: "USD" },
      { id: "v-lf-03-6", title: "US 6", available: true, priceCents: 78000, currencyCode: "USD" },
    ],
    isDemo: true,
  },

  // ---------------------------------------------------------------- L'Homme
  {
    id: "demo-lh-01",
    handle: "the-midnight-two-piece-suit",
    name: "The Midnight Two-Piece Suit",
    department: "l-homme",
    designer: "Sourced for INGÉ",
    priceCents: 265000,
    currencyCode: "USD",
    images: [plate("lh-01-a", "Midnight navy two-piece men's suit")],
    story:
      "A suit built the way a house should be — from the frame out. Half-canvassed, hand-finished lapels, a silhouette that holds its shape from a Monday board meeting to a Thursday dinner.",
    materials: "Super 130s wool, half-canvas construction",
    fit: "Modern tailored fit.",
    labels: ["Sourced for INGÉ"],
    commerceMode: "request",
    variants: [
      { id: "v-lh-01-38", title: "38R", available: true, priceCents: 265000, currencyCode: "USD" },
      { id: "v-lh-01-40", title: "40R", available: true, priceCents: 265000, currencyCode: "USD" },
      { id: "v-lh-01-42", title: "42R", available: true, priceCents: 265000, currencyCode: "USD" },
    ],
    isDemo: true,
  },
  {
    id: "demo-lh-02",
    handle: "the-oxblood-leather-overcoat",
    name: "The Oxblood Leather Overcoat",
    department: "l-homme",
    designer: "INGÉ Originals",
    priceCents: 340000,
    currencyCode: "USD",
    images: [plate("lh-02-a", "Oxblood leather overcoat, men's")],
    story:
      "Lacquered oxblood lambskin, cut long. The house signature translated into outerwear — this is the coat the cherry-glaze motif was always leading to.",
    materials: "Lambskin leather, bemberg lining",
    fit: "Long, relaxed fit.",
    labels: ["INGÉ Originals", "Limited"],
    commerceMode: "request",
    variants: [
      { id: "v-lh-02-m", title: "M", available: true, priceCents: 340000, currencyCode: "USD" },
      { id: "v-lh-02-l", title: "L", available: true, priceCents: 340000, currencyCode: "USD" },
    ],
    isDemo: true,
  },

  // ---------------------------------------------------------------- Les Sacs
  {
    id: "demo-ls-01",
    handle: "the-cherry-lacquer-clutch",
    name: "The Cherry Lacquer Clutch",
    department: "les-sacs",
    designer: "INGÉ Originals",
    priceCents: 98000,
    currencyCode: "USD",
    images: [plate("ls-01-a", "Glossy black cherry lacquer clutch bag")],
    story:
      "Patent calfskin, finished to the exact gloss of a black-cherry glaze. The house's founding object — every other piece in this collection was designed to be worn near it.",
    materials: "Patent calfskin, brushed brass hardware",
    provenance: "Designed in-house. INGÉ Originals, first release.",
    labels: ["INGÉ Originals", "One of One"],
    commerceMode: "request",
    variants: [{ id: "v-ls-01", title: "One Size", available: true, priceCents: 98000, currencyCode: "USD" }],
    isDemo: true,
  },
  {
    id: "demo-ls-02",
    handle: "the-structured-top-handle",
    name: "The Structured Top-Handle",
    department: "les-sacs",
    designer: "Sourced for INGÉ",
    priceCents: 415000,
    currencyCode: "USD",
    images: [plate("ls-02-a", "Structured black leather top-handle bag")],
    story:
      "Architectural, unbothered, and built from a single hide chosen for its grain. A bag that has never once needed to raise its voice.",
    materials: "Full-grain calfskin, gold-tone hardware",
    provenance: "Sourced through a private atelier relationship. Authentication card included.",
    labels: ["Private Collection", "Available by Request", "Pre-Loved"],
    commerceMode: "concierge-only",
    variants: [{ id: "v-ls-02", title: "One Size", available: true, priceCents: 415000, currencyCode: "USD" }],
    isDemo: true,
  },
  {
    id: "demo-ls-03",
    handle: "the-quilted-shoulder-bag",
    name: "The Quilted Shoulder Bag",
    department: "les-sacs",
    designer: "INGÉ Atelier Selection",
    priceCents: 168000,
    currencyCode: "USD",
    images: [plate("ls-03-a", "Quilted burgundy leather shoulder bag")],
    story: "Diamond-quilted burgundy lambskin on a chain you can wear cross-body without apologizing for it.",
    materials: "Quilted lambskin, chain-link strap",
    labels: [],
    commerceMode: "bag",
    variants: [{ id: "v-ls-03", title: "One Size", available: true, priceCents: 168000, currencyCode: "USD" }],
    isDemo: true,
  },
  {
    id: "demo-ls-04",
    handle: "pre-loved-tote-gently-carried",
    name: "Pre-Loved Structured Tote",
    department: "les-sacs",
    designer: "Pre-Loved Selection",
    priceCents: 89000,
    currencyCode: "USD",
    images: [plate("ls-04-a", "Gently used structured leather tote, pre-loved")],
    story:
      "Gently carried, quietly inspected. Every pre-loved piece at INGÉ is authenticated and restored by hand before it re-enters the house — worn once, not worn out.",
    materials: "Full-grain leather, brass hardware",
    fit: "Excellent pre-loved condition.",
    provenance: "Authenticated and hand-restored. Full condition report available.",
    labels: ["Pre-Loved"],
    commerceMode: "bag",
    variants: [{ id: "v-ls-04", title: "One Size", available: true, priceCents: 89000, currencyCode: "USD" }],
    isDemo: true,
  },

  // ------------------------------------------------------------ Les Souliers
  {
    id: "demo-lsh-01",
    handle: "the-lacquer-stiletto",
    name: "The Lacquer Stiletto, 95mm",
    department: "les-souliers",
    designer: "INGÉ Originals",
    priceCents: 92000,
    currencyCode: "USD",
    images: [plate("lsh-01-a", "Glossy oxblood lacquer stiletto heel")],
    story:
      "The heel that closes Act II. Patent leather in the house oxblood, a 95mm heel engineered for a full day on your feet — because we tested it on ours.",
    materials: "Patent leather, leather sole, 95mm heel",
    fit: "True to size.",
    labels: ["INGÉ Originals"],
    commerceMode: "bag",
    variants: [
      { id: "v-lsh-01-37", title: "EU 37", available: true, priceCents: 92000, currencyCode: "USD" },
      { id: "v-lsh-01-38", title: "EU 38", available: true, priceCents: 92000, currencyCode: "USD" },
      { id: "v-lsh-01-39", title: "EU 39", available: true, priceCents: 92000, currencyCode: "USD" },
      { id: "v-lsh-01-40", title: "EU 40", available: false, priceCents: 92000, currencyCode: "USD" },
    ],
    isDemo: true,
  },
  {
    id: "demo-lsh-02",
    handle: "the-executive-loafer",
    name: "The Executive Loafer",
    department: "les-souliers",
    designer: "Sourced for INGÉ",
    priceCents: 87000,
    currencyCode: "USD",
    images: [plate("lsh-02-a", "Black leather men's loafer")],
    story: "A penny loafer with nothing left to prove — hand-welted, burnished by hand, built to be resoled for decades.",
    materials: "Calfskin, leather sole, hand-welted",
    fit: "True to size.",
    labels: ["Sourced for INGÉ"],
    commerceMode: "bag",
    variants: [
      { id: "v-lsh-02-9", title: "US 9", available: true, priceCents: 87000, currencyCode: "USD" },
      { id: "v-lsh-02-10", title: "US 10", available: true, priceCents: 87000, currencyCode: "USD" },
      { id: "v-lsh-02-11", title: "US 11", available: true, priceCents: 87000, currencyCode: "USD" },
    ],
    isDemo: true,
  },

  // -------------------------------------------------------------- Les Bijoux
  {
    id: "demo-lb-01",
    handle: "the-drip-pendant",
    name: "The Drip Pendant, 18k Vermeil",
    department: "les-bijoux",
    designer: "INGÉ Originals",
    priceCents: 32000,
    currencyCode: "USD",
    images: [plate("lb-01-a", "Gold teardrop pendant necklace")],
    story:
      "A single suspended drop, cast in 18k gold vermeil — the cherry-glaze motif resolved into its most literal form. The house signature, worn close.",
    materials: "18k gold vermeil over sterling silver",
    labels: ["INGÉ Originals"],
    commerceMode: "bag",
    variants: [{ id: "v-lb-01", title: "One Size", available: true, priceCents: 32000, currencyCode: "USD" }],
    isDemo: true,
  },
  {
    id: "demo-lb-02",
    handle: "the-signet-ring-oxblood-enamel",
    name: "The Signet Ring, Oxblood Enamel",
    department: "les-bijoux",
    designer: "INGÉ Originals",
    priceCents: 41000,
    currencyCode: "USD",
    images: [plate("lb-02-a", "Gold signet ring with oxblood enamel")],
    story: "Hand-enameled in the house oxblood, set in solid brass with a gold-plated finish. Unmarked. Unmistakable.",
    materials: "Gold-plated brass, vitreous enamel",
    labels: ["INGÉ Originals", "Limited"],
    commerceMode: "bag",
    variants: [
      { id: "v-lb-02-6", title: "Size 6", available: true, priceCents: 41000, currencyCode: "USD" },
      { id: "v-lb-02-7", title: "Size 7", available: true, priceCents: 41000, currencyCode: "USD" },
      { id: "v-lb-02-8", title: "Size 8", available: true, priceCents: 41000, currencyCode: "USD" },
    ],
    isDemo: true,
  },
  {
    id: "demo-lb-03",
    handle: "vintage-diamond-line-bracelet",
    name: "Vintage Diamond Line Bracelet",
    department: "les-bijoux",
    designer: "Private Estate Source",
    priceCents: 1250000,
    currencyCode: "USD",
    images: [plate("lb-03-a", "Vintage diamond line bracelet")],
    story:
      "A mid-century line bracelet sourced from a private estate, approximately 8 carats total weight. Provenance and independent appraisal available on request.",
    materials: "Platinum, natural diamonds (~8ct TW)",
    provenance: "Privately sourced. GIA appraisal available on request.",
    labels: ["Private Collection", "One of One", "Available by Request", "Pre-Loved"],
    commerceMode: "concierge-only",
    variants: [{ id: "v-lb-03", title: "One of One", available: true, priceCents: 1250000, currencyCode: "USD" }],
    isDemo: true,
  },

  // ------------------------------------------------------------------ Maison
  {
    id: "demo-ma-01",
    handle: "noir-cherry-candle",
    name: "Noir Cherry — House Candle",
    department: "maison",
    designer: "INGÉ Originals",
    priceCents: 8800,
    currencyCode: "USD",
    images: [plate("ma-01-a", "Black glass candle, dark cherry scent")],
    story: "Black cherry, dark tobacco leaf, and a whisper of oakmoss, poured into blackened glass. The house, as a scent.",
    materials: "Coconut-soy wax blend, cotton wick",
    labels: ["INGÉ Originals"],
    commerceMode: "bag",
    variants: [{ id: "v-ma-01", title: "220g", available: true, priceCents: 8800, currencyCode: "USD" }],
    isDemo: true,
  },
  {
    id: "demo-ma-02",
    handle: "the-lacquer-vanity-tray",
    name: "The Lacquer Vanity Tray",
    department: "maison",
    designer: "Sourced for INGÉ",
    priceCents: 24500,
    currencyCode: "USD",
    images: [plate("ma-02-a", "Oxblood lacquer vanity tray")],
    story: "Hand-lacquered in oxblood over carved walnut. A resting place for the pieces you take off last.",
    materials: "Lacquered walnut",
    labels: ["Sourced for INGÉ"],
    commerceMode: "bag",
    variants: [{ id: "v-ma-02", title: "One Size", available: true, priceCents: 24500, currencyCode: "USD" }],
    isDemo: true,
  },

  // ------------------------------------------------------------------ Originals
  {
    id: "demo-or-01",
    handle: "founding-collection-cherry-trench",
    name: "The Founding Collection — Cherry Trench",
    department: "originals",
    designer: "INGÉ Originals",
    collectionName: "Founding Collection, No. 1",
    priceCents: 285000,
    currencyCode: "USD",
    images: [plate("or-01-a", "Oxblood trench coat, INGÉ Originals")],
    story:
      "Piece No. 1 of the house's first proprietary collection. A trench reimagined in the INGÉ oxblood, belted, double-breasted, cut for a woman who arrives before her reputation does.",
    materials: "Cotton-silk gabardine",
    provenance: "Designed and produced for INGÉ Originals. Founding Collection.",
    labels: ["INGÉ Originals", "Limited"],
    commerceMode: "request",
    variants: [
      { id: "v-or-01-s", title: "S", available: true, priceCents: 285000, currencyCode: "USD" },
      { id: "v-or-01-m", title: "M", available: true, priceCents: 285000, currencyCode: "USD" },
    ],
    isDemo: true,
  },
  {
    id: "demo-or-02",
    handle: "founding-collection-drip-clasp-bag",
    name: "The Founding Collection — Drip-Clasp Bag",
    department: "originals",
    designer: "INGÉ Originals",
    collectionName: "Founding Collection, No. 2",
    priceCents: 195000,
    currencyCode: "USD",
    images: [plate("or-02-a", "Black leather handbag with cherry-drip gold clasp")],
    story:
      "The signature clasp — cast from the same silhouette as the house drip motif — closes over black lacquer calfskin. Piece No. 2.",
    materials: "Lacquer calfskin, cast gold-tone clasp",
    provenance: "Designed and produced for INGÉ Originals. Founding Collection.",
    labels: ["INGÉ Originals", "One of One"],
    commerceMode: "request",
    variants: [{ id: "v-or-02", title: "One Size", available: true, priceCents: 195000, currencyCode: "USD" }],
    isDemo: true,
  },
  {
    id: "demo-or-03",
    handle: "founding-collection-signature-heel",
    name: "The Founding Collection — Signature Heel",
    department: "originals",
    designer: "INGÉ Originals",
    collectionName: "Founding Collection, No. 3",
    priceCents: 98000,
    currencyCode: "USD",
    images: [plate("or-03-a", "Oxblood lacquer heel, INGÉ Originals signature")],
    story: "The heel from the film. Piece No. 3 of the Founding Collection, produced in a first run of 200 pairs worldwide.",
    materials: "Lacquered leather, 90mm heel",
    labels: ["INGÉ Originals", "Limited"],
    commerceMode: "bag",
    variants: [
      { id: "v-or-03-37", title: "EU 37", available: true, priceCents: 98000, currencyCode: "USD" },
      { id: "v-or-03-38", title: "EU 38", available: true, priceCents: 98000, currencyCode: "USD" },
      { id: "v-or-03-39", title: "EU 39", available: false, priceCents: 98000, currencyCode: "USD" },
    ],
    isDemo: true,
  },

  // ------------------------------------------------------------- Private Collection
  {
    id: "demo-pc-01",
    handle: "archival-couture-gown-1998",
    name: "Archival Couture Gown, c. 1998",
    department: "private-collection",
    designer: "Privately Sourced Archive",
    priceCents: 890000,
    currencyCode: "USD",
    images: [plate("pc-01-a", "Archival black couture evening gown")],
    story:
      "A single archival gown, sourced privately and authenticated through the house's provenance process. Available for private viewing by appointment only.",
    materials: "Silk duchesse, hand-beaded bodice",
    provenance: "Privately sourced archive piece. Full provenance file available to Concierge clients.",
    labels: ["Private Collection", "One of One", "Available by Request"],
    commerceMode: "concierge-only",
    variants: [{ id: "v-pc-01", title: "One of One", available: true, priceCents: 890000, currencyCode: "USD" }],
    isDemo: true,
  },
  {
    id: "demo-pc-02",
    handle: "rare-exotic-leather-tote",
    name: "Rare Exotic-Leather Tote",
    department: "private-collection",
    designer: "Private Estate Source",
    priceCents: 620000,
    currencyCode: "USD",
    images: [plate("pc-02-a", "Rare exotic leather tote bag")],
    story:
      "A rare tote in a sustainably sourced exotic leather, offered to Private Clientele ahead of any public listing. Full CITES documentation provided.",
    materials: "Exotic leather (CITES-compliant), palladium hardware",
    provenance: "Full CITES and authentication documentation available on request.",
    labels: ["Private Collection", "Available by Request"],
    commerceMode: "concierge-only",
    variants: [{ id: "v-pc-02", title: "One of One", available: true, priceCents: 620000, currencyCode: "USD" }],
    isDemo: true,
  },
];

export function getDemoProductsByDepartment(department: string) {
  return DEMO_PRODUCTS.filter((p) => p.department === department);
}

export function getDemoProductByHandle(handle: string) {
  return DEMO_PRODUCTS.find((p) => p.handle === handle);
}
