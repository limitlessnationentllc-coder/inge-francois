import type { Metadata } from "next";
import { searchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/cinematic/Reveal";

export const metadata: Metadata = { title: "Search" };

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const products = q ? await searchProducts(q) : [];

  return (
    <div className="min-h-[70vh] bg-noir px-5 pb-24 pt-[10.25rem] md:px-10 md:pt-[12.25rem] lg:px-16">
      <Reveal className="mb-12">
        <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">Search</span>
        <h1 className="mt-2 font-display text-3xl italic text-ivory sm:text-4xl">
          {q ? `Results for “${q}”` : "Search the House"}
        </h1>
      </Reveal>

      {q && products.length === 0 && (
        <p className="font-sans text-sm text-smoke">
          Nothing matched “{q}” in the current catalog. For rare or hard-to-find pieces, try{" "}
          <a href="/concierge" className="wordmark-caps text-gold underline underline-offset-4">
            INGÉ Concierge
          </a>
          .
        </p>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <Reveal key={p.id}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
