import type { Metadata } from "next";
import { getNewProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/cinematic/Reveal";

export const metadata: Metadata = { title: "New", alternates: { canonical: "/new" } };

export default async function NewArrivalsPage() {
  const products = await getNewProducts();

  return (
    <div className="bg-noir px-5 pb-24 pt-[10.25rem] md:px-10 md:pt-[12.25rem] lg:px-16">
      <Reveal className="mb-12">
        <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">Just Entered the House</span>
        <h1 className="mt-2 font-display text-4xl italic text-ivory sm:text-5xl">New</h1>
      </Reveal>

      {products.length === 0 ? (
        <p className="font-sans text-sm text-smoke">Nothing new this week — check back soon.</p>
      ) : (
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
