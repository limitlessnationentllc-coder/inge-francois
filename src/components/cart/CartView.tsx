"use client";

import Link from "next/link";
import { useCart } from "@/components/layout/CartProvider";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/utils/format";
import { DEMO_PRODUCTS } from "@/lib/data/demo-products";
import { isShopifyConfigured } from "@/lib/shopify";

export function CartView() {
  const { lines, removeLine, setQuantity, totalCents, currencyCode } = useCart();
  const shopifyLive = isShopifyConfigured();

  return (
    <div className="mx-auto min-h-[70vh] max-w-4xl px-5 pb-24 pt-[10.25rem] md:px-8 md:pt-[12.25rem]">
      <h1 className="font-display text-3xl italic text-ivory sm:text-4xl">Your Bag</h1>

      {lines.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="font-sans text-sm text-smoke">Your bag is empty.</p>
          <Link href="/la-femme" className="border border-gold px-8 py-3.5 font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir">
            Enter the House
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-10 flex flex-col divide-y divide-ivory/10 border-y border-ivory/10">
            {lines.map((line) => {
              const product = DEMO_PRODUCTS.find((p) => p.id === line.productId);
              return (
                <li key={line.variantId} className="flex gap-5 py-6">
                  <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden">
                    <ProductImage image={line.image} department={product?.department ?? "la-femme"} className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <Link href={`/product/${line.handle}`} className="font-display text-lg italic text-ivory hover:text-gold-soft">
                          {line.name}
                        </Link>
                        <p className="mt-1 font-sans text-xs uppercase tracking-wide text-smoke">{line.variantTitle}</p>
                      </div>
                      <span className="font-sans text-sm text-ivory">{formatPrice(line.priceCents * line.quantity, line.currencyCode)}</span>
                    </div>
                    <div className="flex items-center gap-3 font-sans text-sm text-ivory/80">
                      <button onClick={() => setQuantity(line.variantId, line.quantity - 1)} className="h-7 w-7 border border-ivory/20 hover:border-gold" aria-label={`Decrease quantity of ${line.name}`}>
                        −
                      </button>
                      <span>{line.quantity}</span>
                      <button onClick={() => setQuantity(line.variantId, line.quantity + 1)} className="h-7 w-7 border border-ivory/20 hover:border-gold" aria-label={`Increase quantity of ${line.name}`}>
                        +
                      </button>
                      <button onClick={() => removeLine(line.variantId)} className="ml-4 font-sans text-[11px] uppercase tracking-wide text-smoke hover:text-gold">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col items-end gap-4">
            <div className="flex w-full max-w-xs justify-between font-sans text-base text-ivory">
              <span>Subtotal</span>
              <span>{formatPrice(totalCents, currencyCode)}</span>
            </div>
            <button
              disabled={!shopifyLive}
              className="w-full max-w-xs bg-gold py-4 font-sans text-xs uppercase tracking-house text-noir transition hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
              title={shopifyLive ? undefined : "Checkout activates once the Shopify store is connected"}
            >
              {shopifyLive ? "Proceed to Checkout" : "Checkout — Coming Soon"}
            </button>
            {!shopifyLive && (
              <p className="max-w-xs text-right font-sans text-xs text-smoke">
                This build isn&apos;t connected to a live Shopify store yet, so checkout is disabled. Once{" "}
                <code className="text-gold-soft">SHOPIFY_STORE_DOMAIN</code> and{" "}
                <code className="text-gold-soft">SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> are set, this button activates real
                checkout automatically.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
