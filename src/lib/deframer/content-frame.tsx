"use client";

// Legacy <Frame> (still used by hand-written code components): a motion div
// that turns layer props (size, width, background, radius, center, …)
// into styles. Published sites render it as data-component-type="Frame",
// which the base CSS positions absolutely.

import { Children, forwardRef } from "react";
import { BackgroundImage, type ImageBackground } from "./content-image";
import { motionElement, transformTemplateForCenter } from "./content-utils";

/** Props that map 1:1 onto a CSS property (the original runtime's extractStyleFromProps list). */
const styleProps: Array<[string, string]> = [
  ["width", "width"], ["height", "height"], ["minWidth", "minWidth"], ["minHeight", "minHeight"],
  ["maxWidth", "maxWidth"], ["maxHeight", "maxHeight"],
  ["top", "top"], ["right", "right"], ["bottom", "bottom"], ["left", "left"], ["position", "position"],
  ["overflow", "overflow"], ["opacity", "opacity"], ["border", "border"], ["borderRadius", "borderRadius"],
  ["radius", "borderRadius"], ["color", "color"], ["shadow", "boxShadow"],
  ["x", "x"], ["y", "y"], ["z", "z"], ["rotate", "rotate"], ["rotateX", "rotateX"], ["rotateY", "rotateY"], ["rotateZ", "rotateZ"],
  ["scale", "scale"], ["scaleX", "scaleX"], ["scaleY", "scaleY"], ["skew", "skew"], ["skewX", "skewX"], ["skewY", "skewY"],
  ["originX", "originX"], ["originY", "originY"], ["originZ", "originZ"],
];

/** The original runtime-only props that never reach the DOM. */
const frameOnlyProps = new Set([
  ...styleProps.map(([prop]) => prop),
  "size", "background", "backgroundColor", "image", "center", "visible", "name", "alt", "preserve3d", "backfaceVisible",
  "perspective", "cornerShape", "__fromCanvasComponent", "__fromCodeComponentNode", "_constraints", "_border", "_initialStyle",
  "componentType", "parentSize", "widthType", "heightType", "positionFixed", "positionAbsolute", "positionSticky",
  "positionStickyTop", "positionStickyRight", "positionStickyBottom", "positionStickyLeft", "layoutIdKey", "duplicatedFrom",
  "fitImageDimension", "__portal", "as", "style", "children", "positionTransition", "layoutTransition",
]);

const isImageObject = (value: unknown): value is ImageBackground =>
  !!value && typeof value === "object" && "src" in (value as object);

function hasEvents(props: Record<string, unknown>): boolean {
  return Object.keys(props).some(
    (key) => key === "drag" || key.startsWith("while") || (typeof props[key] === "function" && key.startsWith("on") && !key.includes("Animation")),
  );
}

const pointerHandlers = ["onClick", "onDoubleClick", "onMouse", "onMouseDown", "onMouseUp", "onTapDown", "onTap", "onTapUp", "onPointer", "onPointerDown", "onPointerUp", "onTouch", "onTouchDown", "onTouchUp"];

function cursorFor(props: Record<string, unknown>): string | undefined {
  if (props.drag) return "grab";
  return Object.keys(props).some((key) => pointerHandlers.includes(key.replace(/Capture$/, ""))) ? "pointer" : undefined;
}

export const Frame = forwardRef<HTMLElement, any>(function Frame(props, ref) {
  const { visible = true, style, children, center, name, __portal } = props;
  if (!visible) return null;

  const css: Record<string, unknown> = { display: "block", flex: style?.flex ?? "0 0 auto" };
  if (!props.__fromCanvasComponent && props.background === undefined) css.backgroundColor = "rgba(0, 170, 255, 0.3)";
  const scrollable = ["scroll", "auto"].includes(props.overflow) || ["scroll", "auto"].includes(style?.overflow);
  if (!hasEvents(props) && !props.__fromCanvasComponent && !scrollable && !(style && "pointerEvents" in style)) css.pointerEvents = "none";
  if (Children.count(children) > 0 && Children.toArray(children).every((c) => typeof c === "string" || typeof c === "number")) {
    Object.assign(css, { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" });
  }

  // Default 200×200 box unless sized or pinned on both sides.
  const sized: Record<string, unknown> = {};
  if (props.size !== undefined) sized.width = sized.height = props.size;
  for (const [prop, cssName] of styleProps) if (props[prop] !== undefined) sized[cssName] = props[prop];
  if (props.size === undefined && !props.__fromCanvasComponent) {
    if (sized.width === undefined && !(sized.left !== undefined && sized.right !== undefined)) css.width = 200;
    if (sized.height === undefined && !(sized.top !== undefined && sized.bottom !== undefined)) css.height = 200;
  }
  if (!props.__fromCanvasComponent) {
    if (center === true) Object.assign(sized, { left: "50%", top: "50%" });
    else if (center === "x") sized.left = "50%";
    else if (center === "y") sized.top = "50%";
  }
  if (props.preserve3d !== undefined) sized.transformStyle = props.preserve3d ? "preserve-3d" : "flat";
  if (props.backfaceVisible !== undefined) sized.backfaceVisibility = props.backfaceVisible ? "visible" : "hidden";
  if (props.perspective !== undefined) sized.perspective = props.perspective;
  if (props.cornerShape !== undefined) sized.cornerShape = `superellipse(${props.cornerShape})`;
  if (typeof props.backgroundColor === "string") sized.backgroundColor = props.backgroundColor;
  else if (typeof props.background === "string") sized.background = props.background;

  Object.assign(css, props._initialStyle, sized, style);
  css.overflowX ??= css.overflow;
  css.overflowY ??= css.overflow;
  delete css.overflow;
  if (props.positionSticky) {
    Object.assign(css, {
      position: "sticky", willChange: "transform", zIndex: 1,
      top: props.positionStickyTop, right: props.positionStickyRight, bottom: props.positionStickyBottom, left: props.positionStickyLeft,
    });
  }
  const finalStyle = css.transform ? css : { x: 0, y: 0, ...css };

  const background = typeof props.image === "string" ? { alt: "", src: props.image } : isImageObject(props.background) ? props.background : undefined;
  if (props.fitImageDimension && background?.pixelWidth && background.pixelHeight) {
    finalStyle[props.fitImageDimension] = "auto";
    finalStyle.aspectRatio = background.pixelWidth / background.pixelHeight;
  }

  const motionProps: Record<string, unknown> = {};
  for (const key in props) if (!frameOnlyProps.has(key)) motionProps[key] = props[key];
  if (props.positionTransition || props.layoutTransition) motionProps.layout = true;
  if (center && !motionProps.transformTemplate) motionProps.transformTemplate = transformTemplateForCenter(center);

  const cursor = cursorFor(props);
  const Component = motionElement(props.as);
  return (
    <Component
      data-component-type={props.componentType ?? "Frame"}
      data-cursor={cursor}
      data-highlight={cursor === "pointer" ? true : undefined}
      data-layoutid={props.layoutId}
      data-name={props["data-name"] === undefined ? name : undefined}
      {...motionProps}
      style={finalStyle}
      ref={ref}
    >
      {background && <BackgroundImage image={background} alt={props.alt ?? ""} layoutId={props.layoutId} />}
      {children}
      {__portal}
    </Component>
  );
});
