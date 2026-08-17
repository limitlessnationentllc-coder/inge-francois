export interface NavItem {
  label: string;
  href: string;
}

/** The restrained top-level navigation, per brand brief. */
export const NAV_ITEMS: NavItem[] = [
  { label: "New", href: "/new" },
  { label: "La Femme", href: "/la-femme" },
  { label: "L'Homme", href: "/l-homme" },
  { label: "Les Sacs", href: "/les-sacs" },
  { label: "Les Souliers", href: "/les-souliers" },
  { label: "Les Bijoux", href: "/les-bijoux" },
  { label: "Maison", href: "/maison" },
  { label: "INGÉ Originals", href: "/originals" },
  { label: "Private Collection", href: "/private-collection" },
  { label: "Concierge", href: "/concierge" },
  { label: "The House", href: "/the-house" },
];
