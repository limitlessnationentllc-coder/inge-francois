"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useCart } from "@/components/layout/CartProvider";
import { formatPrice } from "@/lib/utils/format";

export function ProductActions({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants.find((v) => v.available)?.id ?? product.variants[0]?.id);
  const [added, setAdded] = useState(false);
  const { addLine } = useCart();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const hasMultipleVariants = product.variants.length > 1 && product.variants[0]?.title !== "One Size";

  const conciergePrefill = `/concierge?piece=${encodeURIComponent(product.name)}`;

  return (
    <div className="flex flex-col gap-6">
      {hasMultipleVariants && (
        <div>
          <label htmlFor="variant" className="font-sans text-[11px] uppercase tracking-house text-smoke">
            {product.department === "les-souliers" || product.department === "l-homme" ? "Size" : "Size / Variant"}
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={!v.available}
                onClick={() => setVariantId(v.id)}
                className={`border px-4 py-2 font-sans text-xs uppercase tracking-wide transition ${
                  v.id === variantId ? "border-gold text-gold" : "border-ivory/25 text-ivory/70 hover:border-ivory/60"
                } ${!v.available ? "cursor-not-allowed opacity-30 line-through" : ""}`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {product.commerceMode === "bag" && variant && (
          <button
            type="button"
            disabled={!variant.available}
            onClick={() => {
              addLine(product, variant);
              setAdded(true);
              window.setTimeout(() => setAdded(false), 2200);
            }}
            className="w-full bg-gold py-4 font-sans text-xs uppercase tracking-house text-noir transition hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!variant.available ? "Out of Stock" : added ? "Added to Bag ✓" : `Add to Bag — ${formatPrice(variant.priceCents, variant.currencyCode)}`}
          </button>
        )}

        {(product.commerceMode === "request" || product.commerceMode === "concierge-only") && (
          <Link
            href={conciergePrefill}
            className="w-full border border-gold py-4 text-center font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir"
          >
            Request This Piece
          </Link>
        )}

        {product.labels.some((l) => l === "Private Collection" || l === "One of One" || l === "Available by Request") && (
          <Link
            href={conciergePrefill}
            className="w-full py-3 text-center font-sans text-xs uppercase tracking-house text-ivory-dim underline underline-offset-4 transition hover:text-gold"
          >
            Speak With INGÉ Concierge
          </Link>
        )}
      </div>
    </div>
  );
}
