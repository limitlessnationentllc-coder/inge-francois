import Link from "next/link";
import type { Department, Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { PlaceholderPlate } from "@/components/product/PlaceholderPlate";
import { Reveal } from "@/components/cinematic/Reveal";

export function DepartmentTemplate({ department, products }: { department: Department; products: Product[] }) {
  const hasDemo = products.some((p) => p.isDemo);
  const hasConciergeOnly = products.some((p) => p.commerceMode === "concierge-only");

  return (
    <div className="bg-noir pt-[6.25rem] md:pt-[7.25rem]">
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <PlaceholderPlate
          seed={`dept-hero-${department.slug}`}
          department={department.slug}
          alt={department.frenchName}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
        <div className="relative w-full px-5 pb-14 md:px-10 lg:px-16">
          <Reveal>
            <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">{department.number} — {department.englishName}</span>
            <h1 className="mt-3 max-w-2xl font-display text-4xl italic text-ivory sm:text-6xl">{department.frenchName}</h1>
            <p className="mt-4 max-w-xl font-sans text-sm text-ivory-dim sm:text-base">{department.description}</p>
          </Reveal>
        </div>
      </section>

      {hasDemo && (
        <div className="border-y border-gold-dim/40 bg-chocolate/50 px-5 py-3 text-center font-sans text-xs uppercase tracking-wide text-gold-soft md:px-10">
          Demo Content — placeholder catalog. Real <span className="wordmark-caps">INGÉ</span> inventory connects here once the Shopify store is live.
        </div>
      )}

      <section className="px-5 py-16 md:px-10 lg:px-16">
        {products.length === 0 ? (
          <p className="py-20 text-center font-sans text-sm text-smoke">
            This room is being curated. <Link href="/concierge" className="text-gold underline underline-offset-4">Speak with Concierge</Link> for early access.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <Reveal key={p.id}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {hasConciergeOnly && (
        <section className="border-t border-ivory/10 bg-charcoal px-5 py-16 text-center md:px-10">
          <Reveal className="mx-auto max-w-xl">
            <h2 className="font-display text-2xl italic text-ivory">Some pieces in this room are available by request only.</h2>
            <p className="mt-3 font-sans text-sm text-ivory-dim">
              Rare and privately sourced inventory is offered through <span className="wordmark-caps">INGÉ</span> Concierge, one client at a time.
            </p>
            <Link
              href="/concierge"
              className="mt-6 inline-block border border-gold px-8 py-3.5 font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir"
            >
              Speak With Concierge
            </Link>
          </Reveal>
        </section>
      )}
    </div>
  );
}
