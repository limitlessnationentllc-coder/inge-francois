import Image from "next/image";
import type { DepartmentSlug, ProductImage as ProductImageType } from "@/types/product";
import { PlaceholderPlate } from "./PlaceholderPlate";
import { cn } from "@/lib/utils/cn";

interface ProductImageProps {
  image: ProductImageType;
  department: DepartmentSlug;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders either the demo PlaceholderPlate (image.url starting with
 * "placeholder:") or a real, optimized next/image once product photography
 * from the connected Shopify store is available. Components should always
 * render through this wrapper rather than choosing directly.
 */
export function ProductImage({ image, department, className, sizes, priority }: ProductImageProps) {
  if (image.url.startsWith("placeholder:")) {
    return <PlaceholderPlate seed={image.url.replace("placeholder:", "")} department={department} alt={image.alt} className={className} />;
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image src={image.url} alt={image.alt} fill sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"} className="object-cover" priority={priority} />
    </div>
  );
}
