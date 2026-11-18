"use client";

import "@/styles/fonts/favorit-light.css";
import styles from "./process-slider.module.css";
import * as React from "react";

export type ProcessSliderItem = {
  id: string;
  alt: string;
  src?: string;
};

type ProcessSliderProps = {
  title?: string;
  items: ProcessSliderItem[];
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ProcessSlider({
  title = "Process",
  items,
  className,
}: ProcessSliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const total = items.length;
  const canPrev = index > 0;
  const canNext = index < Math.max(total - 1, 0);

  const updateIndexFromScroll = React.useCallback(() => {
    const track = trackRef.current;
    if (!track || total === 0) return;

    const slides = track.querySelectorAll<HTMLElement>(`[data-slide]`);
    if (!slides.length) return;

    const trackLeft = track.scrollLeft;
    let closest = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - trackLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });

    setIndex(closest);
  }, [total]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateIndexFromScroll();

    const onScroll = () => updateIndexFromScroll();
    track.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => updateIndexFromScroll());
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, [updateIndexFromScroll]);

  const scrollToIndex = React.useCallback((nextIndex: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.querySelectorAll<HTMLElement>(`[data-slide]`);
    const target = slides[clamp(nextIndex, 0, slides.length - 1)];
    if (!target) return;

    track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    setIndex(clamp(nextIndex, 0, slides.length - 1));
  }, []);

  const goPrev = () => scrollToIndex(index - 1);
  const goNext = () => scrollToIndex(index + 1);

  if (total === 0) return null;

  return (
    <section className={[styles.root, className].filter(Boolean).join(" ")} aria-label={title}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.counter} aria-live="polite">
          {index + 1}/{total}
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
          {items.map((item) => (
            <div key={item.id} className={styles.slide} data-slide role="listitem">
            {item.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles.media}
                src={item.src}
                alt={item.alt}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className={styles.placeholder} aria-label={item.alt} role="img" />
            )}
            </div>
          ))}
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
