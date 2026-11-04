import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRefs } from "@/deframer/section-refs";
import TemplateGlobalNavigationTransparent from "@/layouts/template-global-navigation-transparent";
import WorksItemPage from "@/views/works-item";
import itemMetadata from "./metadata.json";

// The full published item list also validates on-demand requests in live previews.
const publishedItemParams: Array<{ slug: string }> = [
  { slug: "halv" },
  { slug: "aether" },
  { slug: "revimo" },
  { slug: "rivited" },
  { slug: "creature" },
  { slug: "pelagostone" },
];
const publishedItemKeys = new Set(publishedItemParams.map((item) => JSON.stringify([item["slug"]])));
function assertPublishedItem(params: { slug: string }): void {
  if (!publishedItemKeys.has(JSON.stringify([params["slug"]]))) notFound();
}

// Title, description and social image of every CMS item, evaluated at conversion time.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const values = await params;
  assertPublishedItem(values);
  return Object.hasOwn(itemMetadata, values.slug)
    ? (itemMetadata as Record<string, Metadata>)[values.slug]
    : {};
}

// Every CMS item is prerendered; other URLs answer with the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedItemParams;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const values = await params;
  assertPublishedItem(values);
  return (
    <SectionRefs scrollSection="trigger">
      <TemplateGlobalNavigationTransparent visible={true}>
        <WorksItemPage />
      </TemplateGlobalNavigationTransparent>
    </SectionRefs>
  );
}
