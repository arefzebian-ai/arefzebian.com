"use client";

// <Image>: a motion element (layoutId, variants, ... keep working) whose
// `background` image is rendered the way the original runtime's published runtime does it:
//
//   <div style="position:absolute;border-radius:inherit;corner-shape:inherit;top:0;right:0;bottom:0;left:0"
//        data-background-image-wrapper="true">
//     <img decoding="async" loading width height sizes srcset src alt style="display:block;width:100%;…;object-fit:cover">
//   </div>
//
// Tiled images become a repeating CSS background on the wrapper instead.
// An optional `lightbox` opens the image full-screen with a shared-layout animation.

import {
  forwardRef, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState,
  type CSSProperties, type MouseEvent, type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, MotionConfigContext } from "motion/react";
import { motionElement, useMergedRef } from "./content-utils";

export interface ImageBackground {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
  fit?: "fill" | "fit" | "stretch" | "tile";
  positionX?: string;
  positionY?: string;
  pixelWidth?: number;
  pixelHeight?: number;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  preferredSize?: string;
  nodeFixedSize?: { width: number; height: number };
  backgroundSize?: number;
}

const isBrowser = typeof document !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

/** The original runtime marks images further than 1000px down the page as lazy. */
export function getLoadingLazyAtYPosition(offset: number): "lazy" | undefined {
  return offset > 1000 ? "lazy" : undefined;
}

// ---------------------------------------------------------------------------
// Background image

const wrapperStyle: CSSProperties = {
  position: "absolute",
  borderRadius: "inherit",
  cornerShape: "inherit",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
} as CSSProperties;

const placeholderSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="126" height="126"><path id="a" d="M126 0v21.584L21.584 126H0v-17.585L108.415 0H126Zm0 108.414V126h-17.586L126 108.414Zm0-84v39.171L63.585 126H24.414L126 24.414Zm0 42v39.17L105.584 126h-39.17L126 66.414ZM105.586 0 0 105.586V66.415L66.415 0h39.171Zm-42 0L0 63.586V24.415L24.415 0h39.171Zm-42 0L0 21.586V0h21.586Z" fill="rgb(136, 136, 136, 0.2)" fill-rule="evenodd"/></svg>';

const placeholderStyle: CSSProperties = {
  backgroundRepeat: "repeat",
  backgroundPosition: "left top",
  backgroundSize: "64px auto",
  backgroundImage: `url('data:image/svg+xml,${placeholderSVG.replaceAll("#", "%23").replaceAll("'", "%27").replaceAll('"', "%22")}')`,
};

function objectFit(fit: ImageBackground["fit"]): CSSProperties["objectFit"] {
  return fit === "fit" ? "contain" : fit === "stretch" ? "fill" : "cover";
}

function objectPosition(x = "center", y = "center"): string {
  return x === "center" && y === "center" ? "center" : `${x} ${y}`;
}

function imageStyle(image: ImageBackground): CSSProperties {
  return {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    cornerShape: "inherit",
    objectPosition: objectPosition(image.positionX, image.positionY),
    objectFit: objectFit(image.fit),
  } as CSSProperties;
}

function withScaleDownTo(url: string, size: number | null): string {
  try {
    const parsed = new URL(url);
    if (size) parsed.searchParams.set("scale-down-to", String(size));
    else parsed.searchParams.delete("scale-down-to");
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * srcSet for images that did not get one at build time (code components):
 * fixed-size nodes get 1x/2x/2.2x variants, others the 512/1024/2048/4096 steps.
 */
function computeSrcSet(image: ImageBackground, src: string): { src: string; srcSet?: string } {
  if (!["auto", "lossless"].includes(image.preferredSize ?? "")) return { src };
  const { pixelWidth: w, pixelHeight: h, nodeFixedSize: node } = image;
  if (node) {
    if (!w || !h || !node.width || !node.height) return { src };
    const maxSide = Math.max(w, h);
    const ratio = Math.max(node.width / w, node.height / h);
    const [first, ...rest] = [1, 2, 2.2].map((scale) => ({ scale, url: withScaleDownTo(src, Math.round(maxSide * scale * ratio)) }));
    return { src: first.url, srcSet: rest.map(({ url, scale }) => `${url} ${scale}x`).join(", ") };
  }
  if (!w || !h) return { src };
  const lead = Math.max(w, h), ratio = lead / Math.min(w, h), horizontal = w >= h;
  const entries: string[] = [];
  for (const step of [512, 1024, 2048, 4096]) {
    if (lead <= step) break;
    const width = horizontal ? step : Math.trunc(step / ratio);
    if (width >= 512) entries.push(`${withScaleDownTo(src, step)} ${width}w`);
  }
  entries.push(`${withScaleDownTo(src, null)} ${w}w`);
  return { src, srcSet: entries.join(", ") };
}

/** Starts with decoding="async" (as server-rendered) and switches to "auto" once the image is loaded. */
function useDecoding() {
  const switchToAuto = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) node.decoding = "auto";
  }, []);
  const onLoad = useCallback((event: { currentTarget: HTMLImageElement }) => {
    event.currentTarget.decoding = "auto";
  }, []);
  return { ref: switchToAuto, onLoad };
}

function StaticImage({ image, alt, draggable }: { image: ImageBackground; alt?: string; draggable?: boolean }) {
  const decoding = useDecoding();
  const source = image.src ?? "";
  const { src, srcSet } = "srcSet" in image ? { src: source, srcSet: image.srcSet } : computeSrcSet(image, source);
  return (
    <img
      ref={decoding.ref}
      decoding="async"
      fetchPriority={image.fetchPriority}
      // Make the browser's default explicit: preloaders can set it before hydration.
      loading={image.loading ?? "eager"}
      width={image.pixelWidth}
      height={image.pixelHeight}
      sizes={srcSet ? image.sizes : undefined}
      srcSet={srcSet}
      src={src}
      onLoad={decoding.onLoad}
      alt={alt ?? image.alt ?? ""}
      style={imageStyle(image)}
      draggable={draggable}
    />
  );
}

/** The absolutely positioned layer that paints an Image/Frame `background`. */
export function BackgroundImage({ image, alt, draggable, layoutId }: { image: ImageBackground; alt?: string; draggable?: boolean; layoutId?: string }) {
  let style: CSSProperties = wrapperStyle;
  let content: ReactNode = null;
  let animated = !!layoutId;
  if (typeof image.src === "string") {
    if (image.fit === "tile" && image.pixelWidth && image.pixelHeight) {
      // Tiles are drawn at half their pixel size (assets are 2x).
      const scale = typeof image.backgroundSize === "number" ? image.backgroundSize : 1;
      const tileWidth = Math.round(scale * (image.pixelWidth / 2) * 2) / 2;
      style = {
        ...wrapperStyle,
        backgroundImage: `url(${image.src})`,
        backgroundRepeat: "repeat",
        backgroundPosition: objectPosition(image.positionX, image.positionY),
        border: 0,
        backgroundSize: `${tileWidth}px auto`,
      };
      animated = true;
    } else {
      content = <StaticImage image={image} alt={alt} draggable={draggable} />;
    }
  } else {
    style = { ...wrapperStyle, ...placeholderStyle };
  }
  const id = layoutId ? `${layoutId}-background` : undefined;
  return animated ? (
    <motion.div layoutId={id} style={style} data-background-image-wrapper>
      {content}
    </motion.div>
  ) : (
    <div style={style} data-background-image-wrapper>
      {content}
    </div>
  );
}

// ---------------------------------------------------------------------------
// <Image>

function intrinsicSizeOf(background: ImageBackground | undefined) {
  if (!background) return undefined;
  if (background.pixelWidth && background.pixelHeight) return { width: background.pixelWidth, height: background.pixelHeight };
  if (background.src === undefined) return { width: 1, height: 1 };
  return undefined;
}

const ImageElement = forwardRef<HTMLElement, any>(function ImageElement(props, ref) {
  const { background, children, alt, draggable, fitImageDimension, style: styleProp, as, ...rest } = props;
  const style: Record<string, unknown> = { ...styleProp };
  const intrinsic = useMemo(() => intrinsicSizeOf(background), [background]);
  const [measured, setMeasured] = useState<{ src: string; width: number; height: number }>();

  // Without known pixel dimensions, `fitImageDimension` needs the natural size of the file.
  useIsomorphicLayoutEffect(() => {
    if (!background?.src || !fitImageDimension || intrinsic) return;
    const src = background.src;
    let active = true;
    const probe = document.createElement("img");
    probe.onload = () => active && probe.naturalWidth && probe.naturalHeight && setMeasured({ src, width: probe.naturalWidth, height: probe.naturalHeight });
    probe.src = src;
    return () => { active = false; probe.onload = null; };
  }, [background?.src, fitImageDimension, intrinsic]);

  const size = intrinsic ?? (measured?.src === background?.src ? measured : undefined);
  if (fitImageDimension && size) {
    style[fitImageDimension] = "auto";
    style.aspectRatio = size.width / size.height;
  }
  if (background) delete style.background;

  const Component = motionElement(as);
  return (
    <Component {...rest} style={style} ref={ref} draggable={draggable}>
      {background && <BackgroundImage image={background} alt={alt} draggable={draggable} />}
      {children}
    </Component>
  );
});

export const Image = forwardRef<HTMLElement, any>(function Image({ lightbox, lightboxClassName, ...props }, ref) {
  if (!lightbox) return <ImageElement {...props} ref={ref} />;
  return <LightboxImage {...props} lightbox={lightbox} lightboxClassName={lightboxClassName} forwardedRef={ref} />;
});

// ---------------------------------------------------------------------------
// Lightbox

interface LightboxOptions {
  backdrop?: string;
  maxWidth?: number;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  transition?: any;
  zIndex?: number;
}

interface OpenState {
  borderRadius: string;
  aspectRatio: number;
  filter: string;
  imageRendering: string;
  border?: Record<string, string>;
}

function LightboxImage({ lightbox, lightboxClassName, forwardedRef, ...props }: any) {
  const options: LightboxOptions = lightbox;
  const config = useContext(MotionConfigContext);
  const [ownRef, setRef] = useMergedRef<HTMLElement>(forwardedRef);
  const [open, setOpen] = useState(false);
  const [openState, setOpenState] = useState<OpenState>();
  const fallbackLayoutId = useId();
  const layoutId = props.layoutId ?? fallbackLayoutId;
  const transition = (open && options.transition) || props.transition || config.transition;

  const onClick = useCallback(
    (event: MouseEvent) => {
      props.onClick?.(event);
      const node = ownRef.current;
      if (open || !node) return;
      const computed = getComputedStyle(node);
      const hasBorder = node.getAttribute("data-border") === "true";
      const after = hasBorder ? getComputedStyle(node, "::after") : undefined;
      setOpenState({
        borderRadius: computed.borderRadius,
        aspectRatio: node.offsetWidth / (node.offsetHeight || 1),
        filter: computed.filter,
        imageRendering: computed.imageRendering,
        border: after && {
          "--border-top-width": after.borderTopWidth,
          "--border-right-width": after.borderRightWidth,
          "--border-bottom-width": after.borderBottomWidth,
          "--border-left-width": after.borderLeftWidth,
          "--border-style": after.borderStyle,
          "--border-color": after.borderColor,
        },
      });
      setOpen(true);
    },
    [open, ownRef, props.onClick],
  );

  const close = useCallback((event?: { stopPropagation(): void }) => {
    event?.stopPropagation();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const side = (value: number | undefined) => value ?? options.padding ?? 0;
  const inset = `${side(options.paddingTop)}px ${side(options.paddingRight)}px ${side(options.paddingBottom)}px ${side(options.paddingLeft)}px`;
  const style = openState?.borderRadius ? { ...props.style, borderRadius: openState.borderRadius } : props.style;
  const layoutDependency = open ? (props.layoutDependency ? `${props.layoutDependency}-open` : "open") : props.layoutDependency;
  const aspectRatio = openState?.aspectRatio ?? 1;
  const enlarged = props.background && { ...props.background, loading: undefined, sizes: options.maxWidth ? `min(100vw, ${options.maxWidth}px)` : "100vw" };

  return (
    <>
      <ImageElement {...props} style={style} onClick={onClick} layoutId={layoutId} ref={setRef} layoutDependency={layoutDependency} transition={transition} />
      {(open || openState) &&
        createPortal(
          <AnimatePresence onExitComplete={() => setOpenState(undefined)}>
            {open && (
              <motion.div key="df-lightbox" style={{ display: "contents" }}>
                <motion.div
                  className={lightboxClassName}
                  onClick={close}
                  style={{ position: "fixed", inset: 0, zIndex: options.zIndex, backgroundColor: options.backdrop ?? "transparent" }}
                  transition={transition}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className={lightboxClassName}
                  style={{ alignItems: "center", display: "flex", inset, justifyContent: "center", pointerEvents: "none", position: "fixed", zIndex: options.zIndex }}
                >
                  <div style={{ alignItems: "center", aspectRatio, display: "flex", justifyContent: "center", maxHeight: "100%", position: "relative", width: "100%", maxWidth: options.maxWidth }}>
                    <motion.div
                      layoutId={layoutId}
                      transition={transition}
                      className="df-lightbox-container"
                      data-border={!!openState?.border}
                      style={{
                        aspectRatio,
                        borderRadius: openState?.borderRadius,
                        bottom: 0,
                        position: "absolute",
                        top: 0,
                        userSelect: "none",
                        imageRendering: openState?.imageRendering as any,
                        filter: openState?.filter,
                        ...openState?.border,
                      }}
                    >
                      {enlarged && <BackgroundImage image={enlarged} alt={enlarged.alt} draggable={props.draggable} />}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
