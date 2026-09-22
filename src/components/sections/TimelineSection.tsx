"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import {
  SectionWrapper,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/SectionWrapper";
import { Lightbox } from "@/components/ui/Lightbox";
import { Play } from "lucide-react";
import type { MediaFile } from "@/lib/media";

interface TimelineSectionProps {
  phaseMedia: Record<string, MediaFile[]>;
}

export function TimelineSection({ phaseMedia }: TimelineSectionProps) {
  const { t } = useLang();
  const [activePhase, setActivePhase] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const phases = t.work.phases;
  const currentPhase = phases[activePhase];
  const currentMedia = useMemo(() => {
    const files = [...(phaseMedia[currentPhase.id] || [])];
    files.sort((a, b) => {
      const d = a.date.localeCompare(b.date);
      if (d !== 0) return d;
      const tm = a.time.localeCompare(b.time);
      if (tm !== 0) return tm;
      if (a.sequence !== b.sequence) return a.sequence - b.sequence;
      return a.filename.localeCompare(b.filename);
    });
    return files;
  }, [phaseMedia, currentPhase.id]);

  const mediaStats = useMemo(() => {
    const images = currentMedia.filter((m) => m.type === "image").length;
    const videos = currentMedia.filter((m) => m.type === "video").length;
    return { images, videos, total: images + videos };
  }, [currentMedia]);

  return (
    <SectionWrapper id="work" className="border-t border-neutral-900/8">
      <div className="mb-12 max-w-2xl">
        <SectionLabel>{t.work.sectionLabel}</SectionLabel>
        <SectionTitle>{t.work.title}</SectionTitle>
        <SectionSubtitle>{t.work.subtitle}</SectionSubtitle>
      </div>

      <div className="mb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-neutral-900/8 border border-neutral-900/8">
        {phases.map((phase, idx) => {
          const isActive = activePhase === idx;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(idx)}
              className={`px-4 py-5 text-start transition-colors ${
                isActive ? "bg-white" : "bg-[#f7f6f3] hover:bg-white/70"
              }`}
            >
              <div
                className={`text-[11px] font-mono mb-2 ${
                  isActive ? "text-neutral-900" : "text-neutral-400"
                }`}
              >
                {phase.tag}
              </div>
              <div
                className={`text-sm leading-snug mb-1 ${
                  isActive ? "text-neutral-900" : "text-neutral-500"
                }`}
              >
                {phase.title}
              </div>
              <div className="text-[11px] font-mono text-neutral-400">
                {phase.dateRange}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="quiet-card p-6 sm:p-8 mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-[11px] font-mono text-neutral-400 mb-2">
                  {currentPhase.tag} · {currentPhase.dateRange}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-neutral-900 mb-3">
                  {currentPhase.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  {currentPhase.description}
                </p>
              </div>
              <p className="text-[11px] font-mono text-neutral-400">
                {mediaStats.images} img · {mediaStats.videos} vid
              </p>
            </div>
          </div>

          {currentMedia.length > 0 ? (
            <div
              dir="ltr"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
            >
              {currentMedia.map((media, idx) => (
                <motion.button
                  key={media.filename}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(idx * 0.015, 0.3), duration: 0.25 }}
                  onClick={() => setLightboxIdx(idx)}
                  className="relative group aspect-square overflow-hidden bg-neutral-200 border border-neutral-900/5 hover:border-neutral-900/25 transition-colors"
                >
                  {media.type === "video" ? (
                    <>
                      <video
                        src={media.src}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/25 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 text-neutral-900 ms-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={media.src}
                      alt={`${media.date}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/50 to-transparent">
                    <span className="text-[10px] font-mono text-white/80">
                      {media.date}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 border border-dashed border-neutral-900/15">
              <p className="text-sm text-neutral-400">—</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {lightboxIdx !== null && (
        <Lightbox
          files={currentMedia}
          initialIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </SectionWrapper>
  );
}
