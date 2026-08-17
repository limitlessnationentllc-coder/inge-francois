import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/lib/utils/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.handle}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <ProductImage image={product.images[0]} department={product.department} className="h-full w-full" />
        </div>
        {product.labels.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.labels.slice(0, 2).map((label) => (
              <span key={label} className="bg-noir-deep/80 px-2.5 py-1 font-sans text-[9px] uppercase tracking-wide text-gold-soft backdrop-blur-sm">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div>
        {product.designer && <p className="font-sans text-[11px] uppercase tracking-wide text-smoke">{product.designer}</p>}
        <h3 className="mt-0.5 font-display text-lg italic text-ivory transition group-hover:text-gold-soft">{product.name}</h3>
        <p className="mt-1 font-sans text-sm text-ivory-dim">
          {product.commerceMode === "concierge-only" ? "Price upon request" : formatPrice(product.priceCents, product.currencyCode)}
        </p>
      </div>
    </Link>
  );
}
