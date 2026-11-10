"use client";

import styles from "./sticky-back-to-project.module.css";
import CTAButton from "@/components/cta-button";
import { matchVariant } from "@/deframer";
import { backButtonReveal, backButtonTransition } from "@/lib/motion";
import { motion } from "motion/react";
import * as React from "react";
import { createPortal } from "react-dom";

type Props = {
  href: string;
  label?: string;
};

/**
 * Viewport-fixed back control. Portaled out of transformed page ancestors so
 * `position: fixed` stays glued to the screen while scrolling. Masks upward
 * with the same y-travel + ease as the homepage hero loader (no opacity fade).
 */
export default function StickyBackToProject({ href, label = "Back to Project" }: Props) {
  const [host, setHost] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setHost(document.getElementById("template-overlay") ?? document.body);
  }, []);

  if (!host) return null;

  return createPortal(
    <div className={styles.sticky} data-name="Back to Project">
      <div className={styles.mask}>
        <motion.div
          className={styles.reveal}
          initial={backButtonReveal.initial}
          animate={{
            ...backButtonReveal.animate,
            transition: backButtonTransition,
          }}
        >
          <CTAButton
            height="100%"
            label={label}
            link={href}
            variant={matchVariant("Button Hero")}
            width="100%"
          />
        </motion.div>
      </div>
    </div>,
    host,
  );
}
