/**
 * Public data-access layer for the storefront.
 *
 * Every page/component that needs product or department data imports from
 * here — never directly from `lib/data` or `lib/shopify/client`. This is
 * the single seam where the app switches from demo content to a live
 * Shopify store: once SHOPIFY_STORE_DOMAIN and
 * SHOPIFY_STOREFRONT_ACCESS_TOKEN are set, these functions transparently
 * start returning real catalog data instead of DEMO_PRODUCTS, with no
 * component changes required.
 */

import type { DepartmentSlug, Product } from "@/types/product";
import { isShopifyConfigured, shopifyFetch } from "./client";
import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_BY_DEPARTMENT_QUERY,
  mapShopifyProduct,
  type ProductByHandleResponse,
  type ProductsByDepartmentResponse,
} from "./queries";
import { DEMO_PRODUCTS, getDemoProductByHandle, getDemoProductsByDepartment } from "@/lib/data/demo-products";

export { isShopifyConfigured };

export async function getProductsByDepartment(department: DepartmentSlug): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return getDemoProductsByDepartment(department);
  }

  try {
    const data = await shopifyFetch<ProductsByDepartmentResponse>({
      query: PRODUCTS_BY_DEPARTMENT_QUERY,
      variables: { query: `tag:'department:${department}'`, first: 24 },
      revalidate: 60,
    });
    return data.products.edges.map((e) => mapShopifyProduct(e.node)).filter((p): p is Product => p !== null);
  } catch (err) {
    console.error(`[shopify] getProductsByDepartment(${department}) failed, falling back to demo data:`, err);
    return getDemoProductsByDepartment(department);
  }
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  if (!isShopifyConfigured()) {
    return getDemoProductByHandle(handle);
  }

  try {
    const data = await shopifyFetch<ProductByHandleResponse>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      revalidate: 60,
    });
    if (!data.product) return undefined;
    return mapShopifyProduct(data.product) ?? undefined;
  } catch (err) {
    console.error(`[shopify] getProductByHandle(${handle}) failed, falling back to demo data:`, err);
    return getDemoProductByHandle(handle);
  }
}

export async function getNewProducts(): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return DEMO_PRODUCTS.filter((p) => p.labels.includes("New"));
  }
  try {
    const allDepartments: DepartmentSlug[] = [
      "la-femme",
      "l-homme",
      "les-sacs",
      "les-souliers",
      "les-bijoux",
      "maison",
      "originals",
      "private-collection",
    ];
    const results = await Promise.all(allDepartments.map((d) => getProductsByDepartment(d)));
    return results.flat().filter((p) => p.labels.includes("New"));
  } catch (err) {
    console.error("[shopify] getNewProducts failed, falling back to demo data:", err);
    return DEMO_PRODUCTS.filter((p) => p.labels.includes("New"));
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const allDepartments: DepartmentSlug[] = [
    "la-femme",
    "l-homme",
    "les-sacs",
    "les-souliers",
    "les-bijoux",
    "maison",
    "originals",
    "private-collection",
  ];
  const results = await Promise.all(allDepartments.map((d) => getProductsByDepartment(d)));
  return results
    .flat()
    .filter((p) => [p.name, p.designer, p.collectionName].filter(Boolean).some((s) => s!.toLowerCase().includes(q)));
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return DEMO_PRODUCTS.filter((p) => p.labels.includes("New") || p.labels.includes("INGÉ Originals")).slice(0, limit);
  }

  // A real store would likely use a "Featured" collection or metafield;
  // for now this composes department queries. Replace with a dedicated
  // collection query once the storefront structure is finalized.
  try {
    const departments: DepartmentSlug[] = ["la-femme", "les-sacs", "originals"];
    const results = await Promise.all(departments.map((d) => getProductsByDepartment(d)));
    return results.flat().slice(0, limit);
  } catch (err) {
    console.error("[shopify] getFeaturedProducts failed, falling back to demo data:", err);
    return DEMO_PRODUCTS.slice(0, limit);
  }
}
