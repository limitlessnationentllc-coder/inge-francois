"use client";

import { useEffect } from "react";
import type { Product } from "@/types/product";
import { Hero } from "./Hero";
import {
  ConciergeTeaser,
  FeaturedCollections,
  HouseGallery,
  HouseStoryTeaser,
  IntroLine,
  OriginalsTeaser,
  PrivateClientInvitation,
  PrivateCollectionTeaser,
} from "./HomeSections";
import { markPageReady } from "@/lib/devVerification";

/**
 * Top-level homepage orchestrator. Renders Hero first (plays its own
 * autoplay intro sequence, no ScrollTrigger involved), then Act III's
 * sections (each creates its own ambient reveal ScrollTriggers) — this
 * component's own effect fires last among these siblings/children, which
 * is exactly when it's safe to refresh ScrollTrigger and mark the page
 * ready for verification.
 */
export function HomeExperience({ featuredProducts }: { featuredProducts: Product[] }) {
  useEffect(() => {
    markPageReady();
  }, []);

  return (
    <>
      <Hero />
      <IntroLine />
      <HouseGallery />
      <FeaturedCollections products={featuredProducts} />
      <PrivateCollectionTeaser />
      <ConciergeTeaser />
      <OriginalsTeaser />
      <HouseStoryTeaser />
      <PrivateClientInvitation />
    </>
  );
}
