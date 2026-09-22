"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, forwardRef } from "react";

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ children, className = "", id, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        id={id}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        <div className="mx-auto max-w-6xl">{children}</div>
      </motion.section>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mb-3"
    >
      <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-neutral-500">
        {children}
      </span>
    </motion.div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.05 }}
      className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-neutral-900 mb-4"
    >
      {children}
    </motion.h2>
  );
}

export function SectionSubtitle({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="text-base sm:text-lg text-neutral-500 max-w-2xl leading-relaxed"
    >
      {children}
    </motion.p>
  );
}
