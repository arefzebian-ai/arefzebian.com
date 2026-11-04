import type { Metadata } from "next";
import { PageRoute } from "@/deframer/route";
import TemplateGlobalNavigationFill from "@/layouts/template-global-navigation-fill";
import NotFoundPage from "@/views/not-found";

export const metadata: Metadata = {
  title: "Aref",
  openGraph: {
    type: "website",
    title: "Aref",
    description:
      "Aref Zebian is an industrial designer based in New York, working across physical products, digital experiences, and brand identity. His work takes ideas from early concepts through prototyping and into production.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
    url: "/404",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aref",
    description:
      "Aref Zebian is an industrial designer based in New York, working across physical products, digital experiences, and brand identity. His work takes ideas from early concepts through prototyping and into production.",
    images: ["https://framerusercontent.com/images/MHBgpUNH3e06O8tPG5fcPGmzk.png"],
  },
  alternates: {
    canonical: "/404",
  },
};

export default function NotFound() {
  return (
    <PageRoute routeId="/404">
      <TemplateGlobalNavigationFill footerVisible={false}>
        <NotFoundPage />
      </TemplateGlobalNavigationFill>
    </PageRoute>
  );
}
