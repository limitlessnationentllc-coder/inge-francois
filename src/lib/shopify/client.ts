/**
 * Shopify Storefront API client.
 *
 * Reads credentials from environment variables only — never hardcode a
 * store domain or token here. See `.env.example` at the project root for
 * the variables this file expects, and README.md for setup instructions.
 *
 * This file is intentionally the ONLY place that talks to Shopify's HTTP
 * API. `src/lib/shopify/index.ts` decides whether to call it (real store
 * connected) or fall back to demo data (no store connected yet).
 */

const STOREFRONT_API_VERSION = "2025-01";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

/** True once both required env vars are present. */
export function isShopifyConfigured(): boolean {
  return Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);
}

interface ShopifyFetchArgs<TVariables extends Record<string, unknown> = Record<string, unknown>> {
  query: string;
  variables?: TVariables;
  /** Next.js fetch cache/revalidate options */
  cache?: RequestCache;
  revalidate?: number | false;
}

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

/**
 * Low-level GraphQL fetch against the Shopify Storefront API.
 * Throws if Shopify isn't configured — callers in lib/shopify/index.ts
 * are expected to check `isShopifyConfigured()` first and fall back to
 * demo data instead of calling this directly.
 */
export async function shopifyFetch<T, TVariables extends Record<string, unknown> = Record<string, unknown>>({
  query,
  variables,
  cache = "force-cache",
  revalidate,
}: ShopifyFetchArgs<TVariables>): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error(
      "Shopify Storefront API is not configured. Set SHOPIFY_STORE_DOMAIN and " +
        "SHOPIFY_STOREFRONT_ACCESS_TOKEN in your environment. See .env.example."
    );
  }

  const endpoint = `https://${STORE_DOMAIN}/api/${STOREFRONT_API_VERSION}/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN as string,
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    ...(revalidate !== undefined ? { next: { revalidate } } : { cache }),
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as ShopifyGraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(`Shopify Storefront API error: ${json.errors.map((e) => e.message).join("; ")}`);
  }

  if (!json.data) {
    throw new Error("Shopify Storefront API returned no data.");
  }

  return json.data;
}
