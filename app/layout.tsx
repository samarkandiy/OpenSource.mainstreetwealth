import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  composeGraph,
  organizationSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";
import { AUTHORS } from "@/lib/authors";

const SITE_URL = "https://opensource.mainstreetwealth.ai";
const MAIN_SITE_URL = "https://mainstreetwealth.ai";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Main Street Wealth · Open Source M&A Tools",
    template: "%s · Main Street Wealth Open Source",
  },
  description:
    "100 open source M&A tools for lower middle-market deals in home services and the trades. Valuation, QoE, deal structure, diligence, exit readiness, data, and AI agents — built by Main Street Wealth.",
  keywords: [
    "M&A tools",
    "open source M&A",
    "EBITDA calculator",
    "SDE calculator",
    "home services M&A",
    "HVAC M&A",
    "plumbing M&A",
    "roofing M&A",
    "pest control M&A",
    "landscaping M&A",
    "small business valuation",
    "exit readiness",
    "rollover equity",
    "quality of earnings",
    "Main Street Wealth",
  ],
  applicationName: "Main Street Wealth Open Source",
  category: "finance",
  authors: [
    { name: "Avaz Bokiev", url: "https://github.com/samarkandiy" },
    { name: "Main Street Wealth", url: MAIN_SITE_URL },
  ],
  creator: "Main Street Wealth",
  publisher: "Main Street Wealth",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Main Street Wealth Open Source",
    title: "Open source M&A tools for the trades",
    description:
      "Valuation, diligence, deal structure, exit readiness, open datasets, and AI tooling — all open source.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Main Street Wealth · Open Source",
    description:
      "100 open source M&A tools for lower middle-market deals in home services.",
    creator: "@MainStreetWlth",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add real tokens here when the properties are claimed.
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

// Site-wide @graph: Organization, WebSite with search action, and the two
// authors on the hub (Avaz as CTO, Rob as Founder/reviewer).
const siteGraph = composeGraph([
  organizationSchema(),
  websiteSchema(),
  personSchema(AUTHORS.avaz),
  personSchema(AUTHORS.rob),
]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href={MAIN_SITE_URL} />
        <link rel="preconnect" href={MAIN_SITE_URL} />
        {/* Help Google locate the publisher site. */}
        <link rel="me" href={MAIN_SITE_URL} />
        <JsonLd data={siteGraph} id="ld-site" />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
