"use client";

import "@/styles/fonts/favorit-light.css";
import styles from "./process-slider.module.css";
import * as React from "react";

/** Same three ratios as PlaygroundItem (`4x5` / `4x3` / `1x1`). */
export type ProcessSliderRatio = "4x5" | "4x3" | "1x1";

export type ProcessSliderItem = {
  id: string;
  alt: string;
  src?: string;
  ratio?: ProcessSliderRatio;
  width?: number;
  height?: number;
};

type ProcessSliderProps = {
  title?: string;
  items: ProcessSliderItem[];
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * SSR + first client paint always assume phone 3-up so the counter text
 * matches (`3/11`). useEffect remeasures for tablet/desktop right after mount.
 */
function initialEndIndex(total: number) {
  if (total <= 0) return 0;
  return Math.min(3, total) - 1;
}

const ratioClassNames: Record<ProcessSliderRatio, string> = {
  "4x5": styles.ratio4x5,
  "4x3": styles.ratio4x3,
  "1x1": styles.ratio1x1,
};

type VisibleRange = { start: number; end: number };

function trackPads(track: HTMLElement) {
  const style = getComputedStyle(track);
  return {
    left: parseFloat(style.paddingInlineStart || style.paddingLeft) || 0,
    right: parseFloat(style.paddingInlineEnd || style.paddingRight) || 0,
  };
}

function measureVisibleRange(track: HTMLDivElement): VisibleRange | null {
  const slides = track.querySelectorAll<HTMLElement>(`[data-slide]`);
  if (!slides.length) return null;

  const trackRect = track.getBoundingClientRect();
  const pad = trackPads(track);
  const viewLeft = trackRect.left + pad.left;
  const viewRight = trackRect.right - pad.right;

  let start = -1;
  let end = -1;

  slides.forEach((slide, i) => {
    const rect = slide.getBoundingClientRect();
    const overlap = Math.min(rect.right, viewRight) - Math.max(rect.left, viewLeft);
    // Majority of the slide inside the content gutter.
    if (overlap > rect.width * 0.5) {
      if (start < 0) start = i;
      end = i;
    }
  });

  if (start < 0 || end < 0) {
    let closest = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.getBoundingClientRect().left - viewLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    return { start: closest, end: closest };
  }

  return { start, end };
}

export default function ProcessSlider({
  title = "Process",
  items,
  className,
}: ProcessSliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const total = items.length;
  const [range, setRange] = React.useState<VisibleRange>(() => ({
    start: 0,
    end: initialEndIndex(total),
  }));

  const canPrev = range.start > 0;
  const canNext = range.end < Math.max(total - 1, 0);
  const counterLabel = `${range.end + 1}/${total}`;

  const updateFromScroll = React.useCallback(() => {
    const track = trackRef.current;
    if (!track || total === 0) return;
    const next = measureVisibleRange(track);
    if (!next) return;
    setRange((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }, [total]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateFromScroll();

    const onScroll = () => updateFromScroll();
    track.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => updateFromScroll());
    resizeObserver.observe(track);
    window.addEventListener("resize", updateFromScroll);

    const raf = window.requestAnimationFrame(() => updateFromScroll());
    const t = window.setTimeout(updateFromScroll, 100);

    return () => {
      track.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateFromScroll);
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [updateFromScroll]);

  const scrollToIndex = React.useCallback(
    (nextIndex: number) => {
      const track = trackRef.current;
      if (!track) return;

      const slides = track.querySelectorAll<HTMLElement>(`[data-slide]`);
      const target = slides[clamp(nextIndex, 0, slides.length - 1)];
      if (!target) return;

      const pad = trackPads(track);
      const trackRect = track.getBoundingClientRect();
      const delta = target.getBoundingClientRect().left - (trackRect.left + pad.left);
      track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });

      // Optimistic update; scroll handler confirms once motion settles.
      const columns = Math.max(1, range.end - range.start + 1);
      const start = clamp(nextIndex, 0, Math.max(total - 1, 0));
      const end = clamp(start + columns - 1, 0, Math.max(total - 1, 0));
      setRange({ start, end });
    },
    [range.end, range.start, total],
  );

  const goPrev = () => scrollToIndex(range.start - 1);
  const goNext = () => scrollToIndex(range.start + 1);

  if (total === 0) return null;

  return (
    <section className={[styles.root, className].filter(Boolean).join(" ")} aria-label={title}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.counter} aria-live="polite">
          {counterLabel}
        </p>
      </div>

      <div className={styles.stage}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          aria-label="Previous"
          disabled={!canPrev}
          onClick={goPrev}
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10.5 3.5L6 8l4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.track} ref={trackRef} role="list">
          {items.map((item) => {
            const ratio = item.ratio ?? "1x1";
            return (
              <div key={item.id} className={styles.slide} data-slide data-ratio={ratio} role="listitem">
                {item.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={`${styles.media} ${ratioClassNames[ratio]}`}
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className={`${styles.placeholder} ${ratioClassNames[ratio]}`}
                    aria-label={item.alt}
                    role="img"
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          aria-label="Next"
          disabled={!canNext}
          onClick={goNext}
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M5.5 3.5L10 8l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
