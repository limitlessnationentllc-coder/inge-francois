import Link from "next/link";
import type { Product } from "@/types/product";
import { getDepartment } from "@/lib/data/departments";
import { ProductImage } from "./ProductImage";
import { ProductActions } from "./ProductActions";
import { formatPrice } from "@/lib/utils/format";
import { Reveal } from "@/components/cinematic/Reveal";

export function ProductDetail({ product }: { product: Product }) {
  const department = getDepartment(product.department);

  return (
    <div className="bg-noir pt-[6.25rem] md:pt-[7.25rem]">
      <nav aria-label="Breadcrumb" className="px-5 pt-6 font-sans text-[11px] uppercase tracking-wide text-smoke md:px-10 lg:px-16">
        <Link href={`/${department.slug}`} className="hover:text-gold">
          {department.frenchName}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ivory/70">{product.name}</span>
      </nav>

      {product.isDemo && (
        <div className="mx-5 mt-6 border border-gold-dim/40 bg-chocolate/50 px-4 py-2.5 text-center font-sans text-xs uppercase tracking-wide text-gold-soft md:mx-10 lg:mx-16">
          Demo Content — this listing is placeholder catalog data, not real available inventory.
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 px-5 py-10 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16">
        <div className="flex flex-col gap-4">
          {product.images.map((img, i) => (
            <Reveal key={i}>
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                <ProductImage image={img} department={product.department} className="h-full w-full" priority={i === 0} />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            {product.designer && <p className="font-sans text-xs uppercase tracking-house text-smoke">{product.designer}</p>}
            <h1 className="mt-2 font-display text-3xl italic text-ivory sm:text-4xl">{product.name}</h1>
            {product.collectionName && <p className="mt-1 font-sans text-sm text-gold-soft">{product.collectionName}</p>}
            <p className="mt-4 font-sans text-xl text-ivory">
              {product.commerceMode === "concierge-only" ? "Price upon request" : formatPrice(product.priceCents, product.currencyCode)}
            </p>
            {product.labels.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.labels.map((label) => (
                  <span key={label} className="border border-gold-dim/60 px-2.5 py-1 font-sans text-[10px] uppercase tracking-wide text-gold-soft">
                    {label}
                  </span>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal>
            <ProductActions product={product} />
          </Reveal>

          <Reveal className="flex flex-col gap-5 border-t border-ivory/10 pt-6 font-sans text-sm text-ivory-dim">
            <p className="leading-relaxed">{product.story}</p>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.materials && (
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-smoke">Materials</dt>
                  <dd className="mt-1 text-ivory">{product.materials}</dd>
                </div>
              )}
              {product.fit && (
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-smoke">Fit</dt>
                  <dd className="mt-1 text-ivory">{product.fit}</dd>
                </div>
              )}
              {product.provenance && (
                <div className="sm:col-span-2">
                  <dt className="text-[11px] uppercase tracking-wide text-smoke">Provenance &amp; Authentication</dt>
                  <dd className="mt-1 text-ivory">{product.provenance}</dd>
                </div>
              )}
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-smoke">Shipping</dt>
                <dd className="mt-1 text-ivory">{product.shippingNote ?? "Complimentary shipping, insured. Ships in 2–7 business days."}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
