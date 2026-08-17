import { getFeaturedProducts } from "@/lib/shopify";
import { HomeExperience } from "@/components/cinematic/HomeExperience";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(6);
  return <HomeExperience featuredProducts={featuredProducts} />;
}
