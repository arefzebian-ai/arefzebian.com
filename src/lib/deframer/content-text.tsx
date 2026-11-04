"use client";

// <Text>: The original runtime's legacy text layer (before RichText). Its content is an HTML
// string (`rawHTML`, Draft.js markup); a `text` prop (variable or CMS bound)
// replaces the string inside it. Renders
//   <div data-component-type="Text" style="display:flex;…;line-height:1px;font-size:0px">
//     <span style="font-size: 0; …"><span style="direction: ltr; font-size: 0"><span>Text</span><br></span></span>
//   </div>
// The wrapper's --df-* variables style the innermost spans (base.css).

import { forwardRef, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { fontStore } from "./fonts";
import { useRouter } from "./route-core";
import { resolveLink } from "./route-link";
import { transformTemplateForCenter } from "./content-utils";

const justifyFor = { top: "flex-start", center: "center", bottom: "flex-end" } as const;

type Shadow = { x: number; y: number; blur: number; color: string };

/**
 * Draft markup is `[<a>]<outer><div|span><inline>TEXT</inline>…</…>`: the text
 * replaces everything between the first inline tag and its closing tag, followed
 * by a line break, and drops any further lines.
 */
const draftContent = new RegExp(
  "^((?:<a[^>]*>)?<[^>]+><(?:div|span)[^>]*><[^>]+>).*?(</[^>]+>).*?(</(?:div|span)></[^>]+>(?:</a>)?)$",
  "su",
);

function withText(rawHTML: string, text: string): string {
  return rawHTML.replace(draftContent, (_, open: string, inlineClose: string, close: string) => `${open}${text}${inlineClose}<br>${close}`);
}

/** Links to pages inside the markup (`data:framer/page-link,<page>`) become paths. */
function resolvePageLinks(html: string, resolve: (href: string) => string | undefined): string {
  if (!html.includes("data:framer/page-link,")) return html;
  return html.replace(/(<a\b[^>]*?\shref=)(["'])(data:framer\/page-link,[^"']*)\2/gi, (match, before: string, quote: string, href: string) => {
    const path = resolve(href.replace(/&amp;/g, "&"));
    return path ? `${before}${quote}${path.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}${quote}` : match;
  });
}

export const Text = forwardRef<HTMLDivElement, any>(function Text(props, ref) {
  const {
    rawHTML: rawHTMLProp, text, font = "16px Arial", fonts, alignment, verticalAlignment = "top", visible = true, opacity,
    name, center, style: styleProp, _initialStyle, shadows, className, autoSize, withExternalLayout = false,
    left, right, top, bottom, width, height, rotation = 0,
    positionSticky, positionStickyTop, positionStickyRight, positionStickyBottom, positionStickyLeft,
    // Editor and layout bookkeeping with no effect on a published page.
    __fromCanvasComponent, __link, _forwardedOverrideId, _forwardedOverrides, _constraints, _usesDOMRect,
    widthType, heightType, isEditable, environment, fontLoadStatus, preload, parentSize, innerRef,
    positionFixed, positionAbsolute, layoutIdKey, duplicatedFrom, __fromCodeComponentNode, transformTemplate,
    ...rest
  } = props;

  const fontKey = Array.isArray(fonts) ? fonts.join("\n") : "";
  useEffect(() => {
    if (fontKey) void fontStore.loadFonts(fontKey.split("\n"));
  }, [fontKey]);

  const router = useRouter();
  const html = useMemo(() => {
    let markup: string | undefined = rawHTMLProp;
    if (typeof text === "string") markup = markup ? withText(markup, text) : `<p style="font: ${font}">${text}</p>`;
    return markup ? resolvePageLinks(markup, (href) => resolveLink(href, router)) : undefined;
  }, [rawHTMLProp, text, font, router]);

  if (!visible || !html) return null;

  const style: Record<string, unknown> = {
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: justifyFor[verticalAlignment as keyof typeof justifyFor],
    flexShrink: 0,
  };
  if (opacity !== undefined && opacity !== 1) style.opacity = opacity;
  for (const key in _initialStyle) if (key.startsWith("--df-")) style[key] = _initialStyle[key];
  if (!withExternalLayout) {
    // A layer pinned on both sides takes its size from the pins.
    const pinnedX = Number.isFinite(left) && Number.isFinite(right);
    const pinnedY = Number.isFinite(top) && Number.isFinite(bottom);
    Object.assign(style, {
      left, right, top, bottom, rotate: rotation,
      width: autoSize ? "auto" : pinnedX ? undefined : width,
      height: autoSize ? "auto" : pinnedY ? undefined : height,
    });
    if (positionSticky) {
      Object.assign(style, {
        position: "sticky", willChange: "transform", zIndex: 1,
        top: positionStickyTop, right: positionStickyRight, bottom: positionStickyBottom, left: positionStickyLeft,
      });
    }
  }
  if (Array.isArray(shadows) && shadows.length) {
    style.textShadow = (shadows as Shadow[]).map((s) => `${s.x}px ${s.y}px ${s.blur}px ${s.color}`).join(", ");
  }
  // The markup sizes itself: the wrapper has no font of its own.
  Object.assign(style, styleProp, { lineHeight: "1px", fontSize: "0px" }, styleProp);
  if (alignment) style["--df-text-alignment"] = alignment;

  return (
    <motion.div
      {...rest}
      ref={ref}
      style={style}
      className={className}
      transformTemplate={transformTemplate ?? transformTemplateForCenter(center)}
      data-component-type="Text"
      data-name={rest["data-name"] ?? name}
      data-component-text-autosized={autoSize ? "true" : undefined}
      data-center={center}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});
