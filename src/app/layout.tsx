import type { Metadata } from "next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ingefrancois.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "INGÉ — A House of Modern Luxury | INGÉ FRANÇOIS",
    template: "%s | INGÉ",
  },
  description:
    "INGÉ FRANÇOIS is a private luxury boutique — curated designer fashion, handbags, shoes, jewelry, and original INGÉ designs. Enter the house.",
  openGraph: {
    title: "INGÉ — A House of Modern Luxury",
    description: "Curated. Intentional. Exclusively INGÉ.",
    url: siteUrl,
    siteName: "INGÉ FRANÇOIS",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable}`}>
      <body className="bg-noir text-ivory">
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
