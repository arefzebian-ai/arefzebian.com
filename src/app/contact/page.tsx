import type { Metadata } from "next";
import TemplateGlobalNavigationFill from "@/layouts/template-global-navigation-fill";
import ContactPage from "@/views/contact";

export const metadata: Metadata = {
  title: "Aref",
  openGraph: {
    type: "website",
    title: "Aref",
    description:
      "Aref Zebian is an industrial designer based in New York, working across physical products, digital experiences, and brand identity. His work takes ideas from early concepts through prototyping and into production.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aref",
    description:
      "Aref Zebian is an industrial designer based in New York, working across physical products, digital experiences, and brand identity. His work takes ideas from early concepts through prototyping and into production.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return (
    <TemplateGlobalNavigationFill footerVisible={false}>
      <ContactPage />
    </TemplateGlobalNavigationFill>
  );
}
