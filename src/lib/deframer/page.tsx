"use client";

// Page and layout-template wrappers: the props the original runtime's PageRoot gives every page.
//
//   export default asPage(HomePage);           -> minHeight 100vh, width auto, data-root
//   export default asLayoutTemplate(Main);     -> pages inside it render with display: contents,
//                                                 and it receives the route's <SectionRefs> refs
//
// Inside a layout template the page's root box must not create a box of its own
// (the original runtime renders it with `display: contents`), so pages read whether they sit
// in a template from context.

import { createContext, forwardRef, useContext, type ComponentType, type ReactNode } from "react";
import { SectionRefsContext } from "./contexts";

const InLayoutTemplate = createContext(false);
const PAGE_STYLE = { minHeight: "100vh", width: "auto" } as const;
const TEMPLATE_PAGE_STYLE = { ...PAGE_STYLE, display: "contents" } as const;

export function asPage<P extends object>(Page: ComponentType<P>): ComponentType<P & { style?: object }> {
  type Props = P & { style?: object };
  const RenderedPage = forwardRef<unknown, Props>(function RenderedPage(props, ref) {
    const inTemplate = useContext(InLayoutTemplate);
    const C = Page as ComponentType<any>;
    return <C data-root="" {...props} style={{ ...(inTemplate ? TEMPLATE_PAGE_STYLE : PAGE_STYLE), ...props.style }} ref={ref} />;
  });
  RenderedPage.displayName = (Page as any).displayName ?? Page.name;
  return RenderedPage as unknown as ComponentType<Props>;
}

export function asLayoutTemplate<P extends object>(Template: ComponentType<P>): ComponentType<P & { style?: object; children?: ReactNode }> {
  type Props = P & { style?: object; children?: ReactNode };
  const RenderedTemplate = forwardRef<unknown, Props>(function RenderedTemplate(props, ref) {
    const sectionRefs = useContext(SectionRefsContext);
    const C = Template as ComponentType<any>;
    return (
      <InLayoutTemplate.Provider value={true}>
        <C {...props} {...sectionRefs} style={{ ...PAGE_STYLE, ...props.style }} ref={ref} />
      </InLayoutTemplate.Provider>
    );
  });
  RenderedTemplate.displayName = (Template as any).displayName ?? Template.name;
  return RenderedTemplate as unknown as ComponentType<Props>;
}
