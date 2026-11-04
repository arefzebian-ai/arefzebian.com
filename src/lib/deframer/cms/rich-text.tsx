"use client";

// CMS rich text. Records hold it as a plain JSON tree:
//
//   [
//     { "type": "h3", "children": ["Why design matters"] },
//     { "type": "p", "dir": "auto", "children": ["A well-crafted ", { "type": "strong", "children": ["design"] }] },
//     { "type": "p", "children": [{ "type": "a", "href": "/journal/next-post", "children": ["Read on"] }] },
//     { "type": "component", "name": "YouTube", "props": { "url": "https://youtu.be/…" } }
//   ]
//
// - an array is a fragment, a string is text;
// - `{ type: <tag>, …attributes, children }` is an HTML element (the attributes sit under
//   `props` instead when one of them is called type, children or props);
// - `{ type: "a", href, … }` is a link: The original runtime's <Link> around a motion.a. `href` is a path
//   ("/journal/next-post#faq"), a URL, or a page link object (`{ webPageId: "/journal/:slug", … }`,
//   kept where the target depends on the visitor's locale). `openInNewTab` defaults to true for
//   external links and false for internal ones; `smoothScroll`, `rel` (extra rel values) and
//   `preserveParams` are the link's options; other keys are the anchor's attributes;
// - `{ type: "component", name, props }` renders a component of the collection's
//   `richTextComponents`, with the page's component presets for that name. A prop value
//   `{ "richText": … }` is rich text itself, `{ "component": "<name>" }` another registered component.
//
// renderRichText builds exactly the elements the original runtime's bundled rich-text reader builds.

import { Fragment, createElement, type ComponentType, type ReactNode } from "react";
import { motion } from "motion/react";
import { AutoBreakpointVariant } from "../breakpoints";
import { ComponentPresetsConsumer } from "../component";
import { jsx } from "../jsx-runtime";
import { Link } from "../route-link";
import { isInternalHref } from "../route-paths";

type Preloadable = ComponentType<any> & { preload?: () => unknown };

export interface RichTextOptions {
  /** Components rich text embeds, by the name the records use. */
  components?: Record<string, Preloadable>;
  /**
   * Embedded components without a `variant` prop show the variant named after the page's
   * breakpoint (the original runtime's current reader). False for sites published with older readers,
   * which render them as they are.
   */
  followBreakpoint?: boolean;
}

/** Keys of an `a` node that configure the link rather than the anchor. */
const LINK_OPTIONS = new Set(["href", "openInNewTab", "smoothScroll", "rel", "preserveParams"]);

/** The original runtime gives every rich-text link a node id: inside another link it renders as a span (route-link.tsx). */
const LINK_NODE_ID = "rich-text-link";

export function renderRichText(content: unknown, { components = {}, followBreakpoint = true }: RichTextOptions = {}): ReactNode {
  const render = (node: any): ReactNode => {
    if (node === null || typeof node !== "object") return node;
    if (Array.isArray(node)) return createElement(Fragment, undefined, ...node.map(render));
    if (node.type === "component") return renderComponent(node);
    const children: ReactNode[] = Array.isArray(node.children) ? node.children.map(render) : [];
    const attributes = attributesOf(node);
    if (node.type !== "a") return createElement(node.type, attributes, ...children);
    const link: Record<string, any> = {};
    const anchor: Record<string, any> = {};
    for (const [key, value] of Object.entries(attributes ?? {})) (LINK_OPTIONS.has(key) ? link : anchor)[key] = value;
    const { href, openInNewTab, rel, ...options } = link;
    const linkProps = { ...options, href, openInNewTab: openInNewTab ?? (typeof href === "string" && !isInternalHref(href)), relValues: rel, nodeId: LINK_NODE_ID };
    return createElement(Link, linkProps, createElement(motion.a, Object.keys(anchor).length ? anchor : undefined, ...children));
  };

  const component = (name: string): Preloadable => {
    const Component = components[name];
    if (!Component) throw new Error(`Rich text component "${name}" is not in the collection's richTextComponents`);
    Component.preload?.();
    return Component;
  };

  /** Prop values: nested rich text and component references resolved, everything else as stored. */
  const resolveProp = (value: any): any => {
    if (value === null || typeof value !== "object") return value;
    if (Array.isArray(value)) return value.map(resolveProp);
    const keys = Object.keys(value);
    if (keys.length === 1 && keys[0] === "richText") return render(value.richText);
    if (keys.length === 1 && keys[0] === "component" && typeof value.component === "string") return component(value.component);
    return Object.fromEntries(keys.map((key) => [key, resolveProp(value[key])]));
  };

  const renderComponent = (node: { name: string; props?: Record<string, unknown> }): ReactNode => {
    const Component = component(node.name);
    const props = resolveProp(node.props ?? {});
    return jsx(ComponentPresetsConsumer, {
      componentIdentifier: node.name,
      children: (presets: Record<string, unknown>) =>
        followBreakpoint ? jsx(AutoBreakpointVariant, { component: Component, props: { ...presets, ...props } }) : jsx(Component, { ...presets, ...props }),
    });
  };

  return render(content);
}

/** An element node's attributes (React props), or undefined when it has none. */
function attributesOf(node: Record<string, any>): Record<string, any> | undefined {
  if ("props" in node) return node.props ?? undefined;
  let attributes: Record<string, any> | undefined;
  for (const key in node) {
    if (key === "type" || key === "children") continue;
    (attributes ??= {})[key] = node[key];
  }
  return attributes;
}
