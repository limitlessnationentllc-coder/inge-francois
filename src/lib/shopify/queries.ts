/**
 * Storefront API GraphQL documents + response → Product mappers.
 *
 * NOTE: these queries target a standard Storefront API 2025-01 schema and
 * assume products are tagged with `department:<slug>` (matching
 * DepartmentSlug in src/types/product.ts) so the storefront can filter by
 * house department. Adjust the tag/metafield strategy here to match
 * however the real INGÉ FRANÇOIS store is organized once it's connected —
 * this is the one file that needs to change to match real store structure.
 */

import type { CommerceMode, Product, ProductLabel } from "@/types/product";

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment IngeProductFragment on Product {
    id
    handle
    title
    vendor
    tags
    descriptionHtml
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 8) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const PRODUCTS_BY_DEPARTMENT_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query ProductsByDepartment($query: String!, $first: Int = 24) {
    products(first: $first, query: $query) {
      edges {
        node {
          ...IngeProductFragment
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...IngeProductFragment
    }
  }
`;

// ---------------------------------------------------------------------------
// Raw Storefront API response shapes (subset of fields we query above)
// ---------------------------------------------------------------------------

interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  tags: string[];
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: ShopifyMoney };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: {
    edges: Array<{
      node: { id: string; title: string; availableForSale: boolean; price: ShopifyMoney };
    }>;
  };
}

export interface ProductsByDepartmentResponse {
  products: { edges: Array<{ node: ShopifyProductNode }> };
}

export interface ProductByHandleResponse {
  product: ShopifyProductNode | null;
}

const KNOWN_LABELS: ProductLabel[] = [
  "New",
  "Private Collection",
  "Limited",
  "Sourced for INGÉ",
  "Available by Request",
  "Private Client",
  "One of One",
  "INGÉ Originals",
  "Pre-Loved",
];

function labelsFromTags(tags: string[]): ProductLabel[] {
  return tags.filter((tag): tag is ProductLabel => KNOWN_LABELS.includes(tag as ProductLabel));
}

function commerceModeFromTags(tags: string[]): CommerceMode {
  if (tags.includes("concierge-only")) return "concierge-only";
  if (tags.includes("request-only")) return "request";
  return "bag";
}

function departmentFromTags(tags: string[]): Product["department"] | null {
  const tag = tags.find((t) => t.startsWith("department:"));
  if (!tag) return null;
  return tag.replace("department:", "") as Product["department"];
}

/** Maps a raw Storefront API product node into the app's canonical Product shape. */
export function mapShopifyProduct(node: ShopifyProductNode): Product | null {
  const department = departmentFromTags(node.tags);
  if (!department) return null; // untagged products are excluded from house departments

  return {
    id: node.id,
    handle: node.handle,
    name: node.title,
    department,
    designer: node.vendor || undefined,
    priceCents: Math.round(parseFloat(node.priceRange.minVariantPrice.amount) * 100),
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
    images: node.images.edges.map((e) => ({ url: e.node.url, alt: e.node.altText ?? node.title })),
    story: node.descriptionHtml.replace(/<[^>]+>/g, "").trim(),
    labels: labelsFromTags(node.tags),
    commerceMode: commerceModeFromTags(node.tags),
    variants: node.variants.edges.map((e) => ({
      id: e.node.id,
      title: e.node.title,
      available: e.node.availableForSale,
      priceCents: Math.round(parseFloat(e.node.price.amount) * 100),
      currencyCode: e.node.price.currencyCode,
    })),
    isDemo: false,
  };
}
