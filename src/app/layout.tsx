import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CartProvider } from "@/components/layout/CartProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// `||` (not `??`) deliberately — an empty-string env var (e.g. a platform
// auto-detecting the key from .env.example with no value set) must also
// fall back, not just an unset/undefined one.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ingefrancois.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "INGÉ — A House of Modern Luxury | INGÉ FRANÇOIS",
    template: "%s | INGÉ",
  },
  description:
    "INGÉ FRANÇOIS is a private luxury boutique based in Stockbridge, GA, serving Henry County and the south metro Atlanta area — curated designer fashion, handbags, shoes, jewelry, pre-loved pieces, and original INGÉ designs.",
  openGraph: {
    title: "INGÉ — A House of Modern Luxury",
    description: "Curated. Intentional. Exclusively INGÉ. A private luxury boutique in Stockbridge, GA.",
    url: siteUrl,
    siteName: "INGÉ FRANÇOIS",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0908",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "INGÉ FRANÇOIS",
  alternateName: "INGÉ",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  description:
    "INGÉ FRANÇOIS is a private luxury boutique — curated designer fashion, handbags, shoes, jewelry, and pre-loved pieces, alongside original INGÉ designs.",
  areaServed: [
    { "@type": "City", name: "Stockbridge, GA" },
    { "@type": "AdministrativeArea", name: "Henry County, GA" },
    { "@type": "Place", name: "South Metro Atlanta" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable}`}>
      <body className="bg-noir text-ivory">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CartProvider>
          <SmoothScroll>
            <Nav />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScroll>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
