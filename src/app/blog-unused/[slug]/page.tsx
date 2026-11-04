import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TemplateGlobalNavigationFill from "@/layouts/template-global-navigation-fill";
import BlogItemPage from "@/views/blog-item";
import itemMetadata from "./metadata.json";

// The full published item list also validates on-demand requests in live previews.
const publishedItemParams: Array<{ slug: string }> = [
  { slug: "the-art-of-minimalism-creating-impactful-designs-with-less" },
  { slug: "art-direction-from-scratch-creating-a-unique-art-direction-for-a-brand" },
  { slug: "we-launched-a-new-project-redefining-sustainable-branding" },
  { slug: "designing-with-purpose-how-design-can-drive-business-goals" },
  { slug: "breaking-the-rules-an-inside-look-at-designing-outside-the-box" },
  { slug: "designing-for-the-user-a-guide-to-creating-intuitive-user-experiences" },
  { slug: "a-fresh-take-on-minimalistic-brand-project-unveiled" },
  { slug: "pioneering-creativity-in-digital-craftsmanship" },
  { slug: "inside-our-studio-launching-a-minimalist-packaging-project" },
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
    <TemplateGlobalNavigationFill footerVisible={true}>
      <BlogItemPage />
    </TemplateGlobalNavigationFill>
  );
}
