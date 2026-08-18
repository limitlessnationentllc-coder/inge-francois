export interface NavItem {
  label: string;
  href: string;
}

/** The restrained top-level navigation, per brand brief. */
export const NAV_ITEMS: NavItem[] = [
  { label: "New", href: "/new" },
  { label: "Womenswear", href: "/la-femme" },
  { label: "Menswear", href: "/l-homme" },
  { label: "Handbags", href: "/les-sacs" },
  { label: "Shoes", href: "/les-souliers" },
  { label: "Jewelry & Accessories", href: "/les-bijoux" },
  { label: "Beauty & Home", href: "/maison" },
  { label: "INGÉ Originals", href: "/originals" },
  { label: "Private Collection", href: "/private-collection" },
  { label: "Concierge", href: "/concierge" },
  { label: "The House", href: "/the-house" },
];
