"use client";

import styles from "./sticky-back-to-project.module.css";
import CTAButton from "@/components/cta-button";
import { matchVariant } from "@/deframer";
import * as React from "react";
import { createPortal } from "react-dom";

type Props = {
  href: string;
  label?: string;
};

/**
 * Viewport-fixed back control. Portaled out of transformed page ancestors so
 * `position: fixed` stays glued to the screen while scrolling.
 */
export default function StickyBackToProject({ href, label = "Back to Project" }: Props) {
  const [host, setHost] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setHost(document.getElementById("template-overlay") ?? document.body);
  }, []);

  if (!host) return null;

  return createPortal(
    <div className={styles.sticky} data-name="Back to Project">
      <CTAButton
        height="100%"
        label={label}
        link={href}
        variant={matchVariant("Appear")}
        width="100%"
      />
    </div>,
    host,
  );
}
