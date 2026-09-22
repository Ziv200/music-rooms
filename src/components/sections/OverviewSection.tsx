"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import {
  SectionWrapper,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/SectionWrapper";

export function OverviewSection() {
  const { t } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const pillar = t.offer.pillars[activeIdx];

  return (
    <SectionWrapper id="offer" className="border-t border-neutral-900/8">
      <div className="mb-14 max-w-2xl">
        <SectionLabel>{t.offer.sectionLabel}</SectionLabel>
        <SectionTitle>{t.offer.title}</SectionTitle>
        <SectionSubtitle>{t.offer.subtitle}</SectionSubtitle>
      </div>

      <div className="mb-16">
        <h3 className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 mb-6">
          {t.offer.audiencesLabel}
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900/8 border border-neutral-900/8">
          {t.offer.audiences.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.24), duration: 0.35 }}
              className="bg-[#f7f6f3] p-5 sm:p-6"
            >
              <h4 className="text-sm font-medium text-neutral-900 mb-2">
                {a.title}
              </h4>
              <p className="text-[13px] text-neutral-500 leading-relaxed">
                {a.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 mb-6">
          {t.offer.pillarsLabel}
        </h3>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 flex flex-col gap-1">
            {t.offer.pillars.map((p, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`text-start px-4 py-3.5 border-s-2 transition-colors ${
                    isActive
                      ? "border-neutral-900 bg-white"
                      : "border-transparent hover:bg-white/60"
                  }`}
                >
                  <div className="text-[10px] tracking-[0.16em] uppercase text-neutral-400 mb-1">
                    {p.tag}
                  </div>
                  <div
                    className={`text-sm ${
                      isActive ? "text-neutral-900" : "text-neutral-500"
                    }`}
                  >
                    {p.title}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-8 quiet-card p-8 sm:p-10"
            >
              <div className="text-[10px] tracking-[0.16em] uppercase text-neutral-400 mb-3">
                {pillar.tag}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-neutral-900 mb-4">
                {pillar.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed mb-8 max-w-xl">
                {pillar.description}
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {pillar.points.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm text-neutral-700 border-b border-neutral-900/8 pb-2"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
