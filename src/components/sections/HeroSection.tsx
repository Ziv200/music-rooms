"use client";

import { motion } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/project-media/2026-07-06_200059_2.jpg`;

export function HeroSection() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[70vh]">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-6"
            >
              {t.hero.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tight leading-[1.12] text-neutral-900 mb-3"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-lg text-neutral-600 mb-6"
            >
              {t.hero.titleAccent}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-12 h-px bg-neutral-900 mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="text-[15px] text-neutral-500 max-w-md leading-relaxed mb-10"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#work"
                className="inline-flex items-center px-5 py-2.5 bg-neutral-900 text-white text-[13px] tracking-wide hover:bg-neutral-800 transition-colors"
              >
                {t.hero.cta1}
              </a>
              <a
                href="#offer"
                className="inline-flex items-center px-5 py-2.5 border border-neutral-900/20 text-neutral-800 text-[13px] tracking-wide hover:border-neutral-900/40 transition-colors"
              >
                {t.hero.cta2}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <figure className="relative">
              <div className="overflow-hidden bg-neutral-200 aspect-[4/3] lg:aspect-[5/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HERO_IMAGE}
                  alt={t.hero.photoCaption}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[11px] tracking-wide text-neutral-400 font-mono">
                {t.hero.photoCaption}
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
