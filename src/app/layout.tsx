// Converted with Deframer · https://deframer.co

import type { Metadata, Viewport } from "next";
import { SiteStyles } from "@/deframer/styles";
import { SVGTemplates } from "@/deframer/content";
import { SiteRouter } from "@/deframer/route";
import { designTokens } from "@/styles/tokens";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arefzebian.com"),
  title: "Aref Zebian",
  description:
    "Aref Zebian is an industrial designer based in New York, working across physical products, digital experiences, and brand identity. His work takes ideas from early concepts through prototyping and into production.",
  robots: "max-image-preview:large",
  icons: {
    icon: [
      {
        url: "https://framerusercontent.com/images/uIblp054N39hDVmFjX8AThzegnY.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://framerusercontent.com/images/uIblp054N39hDVmFjX8AThzegnY.jpg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "https://framerusercontent.com/images/xQwk6drjdktnV9ZFmQRxA1gFKnE.png",
      },
    ],
  },
  openGraph: {
    type: "website",
    title: "Aref Zebian",
    description:
      "Aref Zebian is an industrial designer based in New York, working across physical products, digital experiences, and brand identity. His work takes ideas from early concepts through prototyping and into production.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aref Zebian",
    description:
      "Aref Zebian is an industrial designer based in New York, working across physical products, digital experiences, and brand identity. His work takes ideas from early concepts through prototyping and into production.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
  },
  other: {
    "df-search-index":
      "https://framerusercontent.com/sites/6MOzIUzONgzTeSafsoZWMO/searchIndex-TvP4mnGmh0oI.json",
    "df-search-index-fallback":
      "https://framerusercontent.com/sites/6MOzIUzONgzTeSafsoZWMO/searchIndex-LogRzo7nwHTL.json",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: undefined };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html> and <body> attributes may change before hydration (the site's custom code).
    <html lang="english" suppressHydrationWarning>
      <head>
        {/* Fonts and images load from the asset CDN: connect early, as the published site does */}
        <link rel="preconnect" href="https://framerusercontent.com" />
        <link rel="preconnect" href="https://framerusercontent.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <SiteStyles siteCSS={designTokens} />
      </head>
      <body suppressHydrationWarning>
        <div id="main">
          <SiteRouter>{children}</SiteRouter>
          <SVGTemplates />
        </div>
      </body>
    </html>
  );
}
