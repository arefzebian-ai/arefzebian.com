"use client";

// Layout templates whose effects follow a section of the page (a navigation that
// changes while "Scroll Section" is in view) receive a ref to that section. Pages
// register their sections as site refs keyed by section id; this hands the
// template the same refs. Refs exist only in the browser, hence a client wrapper.
//
// The refs travel by context, not by cloning the template element: children
// coming from a server component may still be an unparsed RSC row (a lazy node,
// not an element) when this renders, and cloning one yields an element without a type.

import type { ReactNode } from "react";
import { useSiteRefs } from "./component";
import { SectionRefsContext } from "./contexts";

/** Gives the layout template it wraps a ref to each named page section: <SectionRefs scrollSection="hero">. */
export function SectionRefs({ children, ...sections }: { children: ReactNode; [prop: string]: unknown }) {
  const siteRef = useSiteRefs();
  const refs = Object.fromEntries(Object.entries(sections).map(([prop, section]) => [prop, siteRef(section as string)]));
  return <SectionRefsContext.Provider value={refs}>{children}</SectionRefsContext.Provider>;
}
