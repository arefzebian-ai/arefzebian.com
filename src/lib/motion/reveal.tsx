"use client";

import * as React from "react";
import { cx } from "@/deframer";

type RevealProps = {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  /** Stagger delay in ms; group total should stay ≤ 250ms. */
  delay?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Shared once-per-visit in-view reveal: opacity + 8px rise over 350ms.
 * Respects prefers-reduced-motion via CSS; content stays visible if JS fails.
 */
export function Reveal({ as = "div", className, delay = 0, children, style, ...rest }: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cx("ds-reveal", visible && "is-visible", className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Caps total stagger across a group to 250ms. */
export function revealStagger(index: number, count: number, maxMs = 250) {
  if (count <= 1) return 0;
  return Math.round((index / (count - 1)) * maxMs);
}
