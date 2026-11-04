import type { Metadata } from "next";
import { SectionRefs } from "@/deframer/section-refs";
import TemplateGlobalNavigationTransparent from "@/layouts/template-global-navigation-transparent";
import HalvDraftPage from "@/views/halv-draft";

export const metadata: Metadata = {
  title: "Aref",
  openGraph: {
    type: "website",
    title: "Aref",
    description:
      "Aref Zebian is an industrial designer based in New York, working across physical products, digital experiences, and brand identity. His work takes ideas from early concepts through prototyping and into production.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
    url: "/halv-draft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aref",
    description:
      "Aref Zebian is an industrial designer based in New York, working across physical products, digital experiences, and brand identity. His work takes ideas from early concepts through prototyping and into production.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
  },
  alternates: {
    canonical: "/halv-draft",
  },
};

export default function Page() {
  return (
    <SectionRefs scrollSection="trigger">
      <TemplateGlobalNavigationTransparent visible={true}>
        <HalvDraftPage />
      </TemplateGlobalNavigationTransparent>
    </SectionRefs>
  );
}
