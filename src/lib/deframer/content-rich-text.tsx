"use client";

// <RichText>: The original runtime's text layer. Renders
//   <div data-component-type="RichTextContainer" style="justify-content:…;…;transform:none">
//     <p class="df-text text-body-16">…</p>
//   </div>
// and post-processes the rich children like the original runtime does: every tag gets the
// `df-text` class plus its text-style preset class, a `text` prop replaces
// the content (CMS / variable bound text), heading anchors are generated when
// an "anchor" preset exists, and text effects tokenize the strings.

import {
  Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo,
  type ReactElement, type ReactNode,
} from "react";
import { Fragment } from "react";
import { isMotionComponent, motion, unwrapMotionComponent } from "motion/react";
import { fontStore } from "./fonts";
import { useSVGStyle } from "./svg-style";
import { motionElement, transformTemplateForCenter, useMergedRef } from "./content-utils";
import { useTextEffect, type TextEffect, type Tokenizer } from "./content-text-effect";
import { textLayerEffectStyles } from "./content-filters";

type Presets = Record<string, string> | undefined;

const joinClassNames = (...names: unknown[]) => names.filter((n) => typeof n === "string" && n).join(" ");

const headingTags = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function slugify(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_?#[\]@!$&'*+,;:="<>%{}|\\^`/]+/gu, "-").replace(/^-+|-+$/g, "");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) return textOf((node.props as any).children);
  return "";
}

interface ProcessOptions {
  presets: Presets;
  plainText: string | undefined;
  anchorLinkOffsetY: number | undefined;
  slugCounters: Record<string, number>;
  tokenizer: Tokenizer | undefined;
}

/** `Our{" "}` in formatted JSX is one text run ("Our ") in the original runtime's output; keep it one run for tokenizing. */
function mergeAdjacentStrings(nodes: ReactNode[]): ReactNode[] {
  const merged: ReactNode[] = [];
  for (const node of nodes) {
    const last = merged.length - 1;
    if (typeof node === "string" && typeof merged[last] === "string") merged[last] += node;
    else merged.push(node);
  }
  return merged;
}

/** Walks the rich-text element tree (the original runtime's processRichTextChildren). */
function processRichText(element: ReactElement<any>, options: ProcessOptions, depth: number): ReactElement {
  let children = mergeAdjacentStrings(Children.toArray(element.props.children));
  // A `text` override keeps only the first branch and swaps its string content.
  if (options.plainText !== undefined) children = children.slice(0, 1);
  let onlyLineBreaks = true;
  children = children.map((child) => {
    if (!isValidElement(child) || child.type !== "br") onlyLineBreaks = false;
    if (isValidElement(child)) return processRichText(child as ReactElement<any>, options, depth + 1);
    const text = options.plainText !== undefined ? options.plainText : child;
    return typeof text === "string" && options.tokenizer ? options.tokenizer.text(text) : text;
  });

  const { "data-preset-tag": presetTag, ...props } = element.props;
  const type = element.type as any;
  if (typeof type === "string" || isMotionComponent(type)) {
    const tagName = typeof type === "string" ? type : unwrapMotionComponent(type) ?? type;
    const tag = presetTag || tagName;
    props.className = joinClassNames("df-text", props.className, typeof tag === "string" ? options.presets?.[tag] : undefined);
    if (options.tokenizer && depth === 0 && !onlyLineBreaks) Object.assign(props, options.tokenizer.props(props.style));
    const anchorPreset = options.presets?.anchor;
    if (headingTags.has(tagName) && anchorPreset) {
      let slug = slugify(children.map(textOf).join(""));
      const count = options.slugCounters[slug] ?? 0;
      options.slugCounters[slug] = count + 1;
      if (count > 0) slug += `-${count}`;
      props.id = slug;
      props.style = { ...props.style, scrollMarginTop: options.anchorLinkOffsetY };
      children = [
        <a key="anchor" href={`#${slug}`} className={joinClassNames("df-text", anchorPreset)}>
          {children}
        </a>,
      ];
    }
  }
  return cloneElement(element, props, ...children);
}

const verticalAlignmentToJustify = { top: "flex-start", center: "center", bottom: "flex-end" } as const;

function useLoadFonts(fonts: string[] | undefined) {
  const key = fonts?.join("\n") ?? "";
  useEffect(() => {
    if (key) void fontStore.loadFonts(key.split("\n"));
  }, [key]);
}

/** SVG wrapper used for "fit text" layers (text scaled to the layer like an image). */
const FitText = forwardRef<any, any>(function FitText({ viewBox, viewBoxScale = 1, children, style, ...props }, ref) {
  const svgStyle = useSVGStyle(style);
  return (
    <motion.svg {...props} style={svgStyle} ref={ref} viewBox={viewBox}>
      <motion.foreignObject width="100%" height="100%" className="df-fit-text" transform={`scale(${viewBoxScale})`} style={{ overflow: "visible", transformOrigin: "center center" }}>
        {children}
      </motion.foreignObject>
    </motion.svg>
  );
});

const RichTextContainer = forwardRef<HTMLElement, any>(function RichTextContainer(props, forwardedRef) {
  const {
    __fromCanvasComponent, _forwardedOverrideId, _forwardedOverrides, _usesDOMRect, anchorLinkOffsetY, as,
    bottom, center, children, environment, fonts, height, isEditable, left, name, opacity,
    positionSticky, positionStickyBottom, positionStickyLeft, positionStickyRight, positionStickyTop,
    right, rotation = 0, style, _initialStyle, stylesPresetsClassNames, text: plainText, top,
    verticalAlignment = "top", visible = true, width, withExternalLayout = false, viewBox, viewBoxScale = 1,
    effect, positionFixed, positionAbsolute, layoutIdKey, duplicatedFrom, __fromCodeComponentNode,
    backgroundBlur, brightness, contrast, grayscale, hueRotate, invert, saturate, sepia, blur, dropShadows, shadows,
    ...rest
  } = props;
  const [containerRef, setRef] = useMergedRef<HTMLElement>(forwardedRef);
  useLoadFonts(fonts);
  const textEffect = useTextEffect(effect as TextEffect | undefined, containerRef);

  const processed = useMemo(() => {
    if (!children) return undefined;
    return processRichText(
      children,
      { presets: stylesPresetsClassNames, plainText, anchorLinkOffsetY, slugCounters: {}, tokenizer: textEffect.getTokenizer() },
      children.type === Fragment ? -1 : 0,
    );
  }, [children, stylesPresetsClassNames, plainText, anchorLinkOffsetY, textEffect]);

  if (!visible) return null;

  const containerStyle: Record<string, unknown> = { opacity };
  const justifyContent = verticalAlignmentToJustify[verticalAlignment as keyof typeof verticalAlignmentToJustify];
  if (justifyContent && justifyContent !== "flex-start") containerStyle.justifyContent = justifyContent;
  if (!withExternalLayout) {
    Object.assign(containerStyle, { left, right, top, bottom, width, height, rotate: rotation });
    if (positionSticky) {
      Object.assign(containerStyle, {
        position: "sticky", willChange: "transform", zIndex: 1,
        top: positionStickyTop, right: positionStickyRight, bottom: positionStickyBottom, left: positionStickyLeft,
      });
    }
  }
  Object.assign(containerStyle, textLayerEffectStyles(props), _initialStyle, style);

  // Text layers with a layoutId keep their aspect ratio during layout animations.
  if (rest.layoutId) rest.layout = "preserve-aspect";
  const shared = {
    ...rest,
    ref: setRef,
    style: containerStyle,
    transformTemplate: rest.transformTemplate ?? transformTemplateForCenter(center),
    "data-name": rest["data-name"] ?? name,
    "data-component-type": "RichTextContainer",
  };

  if (typeof viewBox === "string") {
    if (as !== undefined) {
      const Component = motionElement(as);
      return (
        <Component {...shared}>
          <FitText viewBox={viewBox} viewBoxScale={viewBoxScale} style={{ width: "100%", height: "100%" }}>
            {processed}
          </FitText>
        </Component>
      );
    }
    return (
      <FitText {...shared} viewBox={viewBox} viewBoxScale={viewBoxScale}>
        {processed}
      </FitText>
    );
  }
  const Component = motionElement(as);
  return <Component {...shared}>{processed}</Component>;
});

/** Legacy HTML-string rich text (`html` / `htmlFromDesign`). */
const DeprecatedRichText = forwardRef<any, any>(function DeprecatedRichText(props, ref) {
  const { html, htmlFromDesign, stylesPresetsClassName, className, name, center, fonts, verticalAlignment, withExternalLayout, __fromCanvasComponent, text, style,
    backgroundBlur, brightness, contrast, grayscale, hueRotate, invert, saturate, sepia, blur, dropShadows, shadows, ...rest } = props;
  useLoadFonts(fonts);
  return (
    <motion.div
      {...rest}
      ref={ref}
      style={{ ...textLayerEffectStyles(props), ...style }}
      data-name={name}
      data-component-type="DeprecatedRichText"
      className={joinClassNames(className, stylesPresetsClassName)}
      transformTemplate={transformTemplateForCenter(center)}
      dangerouslySetInnerHTML={{ __html: html ?? htmlFromDesign ?? "" }}
    />
  );
});

export const RichText = forwardRef<HTMLElement, any>(function RichText({ children, html, htmlFromDesign, ...props }, ref) {
  const content = html || children || htmlFromDesign;
  if (typeof content === "string") {
    if (!props.stylesPresetsClassName && props.stylesPresetsClassNames && typeof props.stylesPresetsClassNames === "object") {
      props.stylesPresetsClassName = Object.values(props.stylesPresetsClassNames).join(" ");
    }
    return <DeprecatedRichText {...props} {...{ [typeof html === "string" ? "html" : "htmlFromDesign"]: content }} ref={ref} />;
  }
  if (!props.stylesPresetsClassNames && typeof props.stylesPresetsClassName === "string") {
    const [h1, h2, h3, p, a] = props.stylesPresetsClassName.split(" ");
    if (a !== undefined) props.stylesPresetsClassNames = { h1, h2, h3, p, a };
  }
  const { stylesPresetsClassName, ...containerProps } = props;
  return (
    <RichTextContainer {...containerProps} ref={ref}>
      {isValidElement(content) ? content : undefined}
    </RichTextContainer>
  );
});
