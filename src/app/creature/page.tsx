import type { Metadata } from "next";
import TemplateGlobalNavigationFill from "@/layouts/template-global-navigation-fill";
import ComingSoonPage from "@/views/coming-soon";

export const metadata: Metadata = {
  title: "Creature — Coming Soon",
  openGraph: {
    type: "website",
    title: "Creature — Coming Soon",
    description: "Case study coming soon. A home robot designed to feel at home.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
    url: "/creature",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creature — Coming Soon",
    description: "Case study coming soon. A home robot designed to feel at home.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
  },
  alternates: {
    canonical: "/creature",
  },
};

export default function Page() {
  return (
    <TemplateGlobalNavigationFill footerVisible={false}>
      <ComingSoonPage />
    </TemplateGlobalNavigationFill>
  );
}
