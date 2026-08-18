/**
 * Canonical product/department shapes used by the UI.
 *
 * These are intentionally decoupled from Shopify's raw Storefront API
 * response shape — `lib/shopify` maps real Storefront API data into this
 * shape, and `lib/data` (demo content) is authored directly in this shape.
 * Swapping the data source never requires touching a component.
 */

export type DepartmentSlug =
  | "la-femme"
  | "l-homme"
  | "les-sacs"
  | "les-souliers"
  | "les-bijoux"
  | "maison"
  | "originals"
  | "private-collection";

export type ProductLabel =
  | "New"
  | "Private Collection"
  | "Limited"
  | "Sourced for INGÉ"
  | "Available by Request"
  | "Private Client"
  | "One of One"
  | "INGÉ Originals"
  | "Pre-Loved";

export type CommerceMode = "bag" | "request" | "concierge-only";

export interface ProductVariant {
  id: string;
  title: string;
  available: boolean;
  priceCents: number;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  /** approximate dominant tone, used for placeholder gradients */
  tone?: string;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  department: DepartmentSlug;
  designer?: string;
  collectionName?: string;
  priceCents: number;
  currencyCode: string;
  images: ProductImage[];
  story: string;
  materials?: string;
  fit?: string;
  provenance?: string;
  shippingNote?: string;
  labels: ProductLabel[];
  commerceMode: CommerceMode;
  variants: ProductVariant[];
  /** true when this row is demo/placeholder content, not real inventory */
  isDemo: boolean;
}

export interface Department {
  slug: DepartmentSlug;
  number: string;
  frenchName: string;
  englishName: string;
  tagline: string;
  description: string;
}

export interface CartLine {
  productId: string;
  handle: string;
  name: string;
  variantId: string;
  variantTitle: string;
  priceCents: number;
  currencyCode: string;
  image: ProductImage;
  quantity: number;
}
