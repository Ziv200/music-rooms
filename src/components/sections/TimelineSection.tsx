"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/hooks/useLang";
import {
  SectionWrapper,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/SectionWrapper";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { Play } from "lucide-react";
import type { MediaFile } from "@/lib/media";

interface TimelineSectionProps {
  phaseMedia: Record<string, MediaFile[]>;
}

function sortMedia(files: MediaFile[]): MediaFile[] {
  return [...files].sort((a, b) => {
    const d = a.date.localeCompare(b.date);
    if (d !== 0) return d;
    const tm = a.time.localeCompare(b.time);
    if (tm !== 0) return tm;
    if (a.sequence !== b.sequence) return a.sequence - b.sequence;
    return a.filename.localeCompare(b.filename);
  });
}

export function TimelineSection({ phaseMedia }: TimelineSectionProps) {
  const { t, lang, dir } = useLang();
  const phases = t.work.phases;
  const [activePhase, setActivePhase] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollingToRef = useRef<number | null>(null);

  const mediaByPhase = useMemo(() => {
    return phases.map((phase) => sortMedia(phaseMedia[phase.id] || []));
  }, [phases, phaseMedia]);

  // One continuous list so lightbox can cross stage boundaries
  const lightboxItems: LightboxItem[] = useMemo(() => {
    const items: LightboxItem[] = [];
    phases.forEach((phase, phaseIdx) => {
      for (const file of mediaByPhase[phaseIdx] || []) {
        items.push({
          file,
          phaseTag: phase.tag,
          phaseTitle: phase.title,
        });
      }
    });
    return items;
  }, [phases, mediaByPhase]);

  const phaseStartIndex = useMemo(() => {
    const starts: number[] = [];
    let offset = 0;
    for (const files of mediaByPhase) {
      starts.push(offset);
      offset += files.length;
    }
    return starts;
  }, [mediaByPhase]);

  const openAt = useCallback(
    (phaseIdx: number, localIdx: number) => {
      setLightboxIndex((phaseStartIndex[phaseIdx] ?? 0) + localIdx);
    },
    [phaseStartIndex]
  );

  // Track which phase is in view while scrolling
  useEffect(() => {
    const nodes = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingToRef.current !== null) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
        if (!visible.length) return;
        const id = (visible[0].target as HTMLElement).dataset.phaseIdx;
        if (id == null) return;
        const idx = Number(id);
        setActivePhase((prev) => (prev === idx ? prev : idx));
      },
      {
        // Prefer the phase whose top is near the sticky bar
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [phases.length]);

  // Keep active pill visible in the horizontal strip
  useEffect(() => {
    const pill = pillRefs.current[activePhase];
    if (!pill) return;
    pill.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activePhase]);

  const jumpToPhase = useCallback((idx: number) => {
    const el = sectionRefs.current[idx];
    if (!el) return;
    scrollingToRef.current = idx;
    setActivePhase(idx);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      scrollingToRef.current = null;
    }, 700);
  }, []);

  return (
    <SectionWrapper id="work" className="border-t border-neutral-900/8">
      <div className="mb-8 sm:mb-10 max-w-2xl">
        <SectionLabel>{t.work.sectionLabel}</SectionLabel>
        <SectionTitle>{t.work.title}</SectionTitle>
        <SectionSubtitle>{t.work.subtitle}</SectionSubtitle>
      </div>

      {/* Sticky stage indicator — stays under the navbar while browsing the gallery */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 border-y border-neutral-900/8 bg-[#f7f6f3]/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex gap-1 overflow-x-auto py-2.5 scrollbar-none"
            style={{ WebkitOverflowScrolling: "touch" }}
            role="tablist"
            aria-label={lang === "he" ? "שלבי הבנייה" : "Build stages"}
          >
            {phases.map((phase, idx) => {
              const isActive = activePhase === idx;
              const count = mediaByPhase[idx]?.length ?? 0;
              return (
                <button
                  key={phase.id}
                  ref={(el) => {
                    pillRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => jumpToPhase(idx)}
                  className={`shrink-0 px-3.5 py-2 text-start border transition-colors ${
                    isActive
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-900/15"
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono tracking-wide ${
                      isActive ? "text-white/70" : "text-neutral-400"
                    }`}
                  >
                    {phase.tag}
                    {count > 0 ? ` · ${count}` : ""}
                  </div>
                  <div className="text-[12px] sm:text-[13px] leading-snug max-w-[9.5rem] sm:max-w-none truncate">
                    {phase.title}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="pb-2.5 pt-0.5 sm:hidden">
            <p className="text-[11px] text-neutral-500 leading-snug">
              <span className="font-mono text-neutral-400 me-1.5">
                {phases[activePhase]?.tag}
              </span>
              {phases[activePhase]?.title}
              <span className="text-neutral-400 mx-1.5">·</span>
              {phases[activePhase]?.dateRange}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-14 sm:space-y-16">
        {phases.map((phase, phaseIdx) => {
          const files = mediaByPhase[phaseIdx] || [];
          const images = files.filter((m) => m.type === "image").length;
          const videos = files.filter((m) => m.type === "video").length;

          return (
            <section
              key={phase.id}
              id={`work-${phase.id}`}
              data-phase-idx={phaseIdx}
              ref={(el) => {
                sectionRefs.current[phaseIdx] = el;
              }}
              className="scroll-mt-36 sm:scroll-mt-32"
            >
              <div className="quiet-card p-5 sm:p-7 mb-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-2xl">
                    <p className="text-[11px] font-mono text-neutral-400 mb-1.5">
                      {phase.tag} · {phase.dateRange}
                    </p>
                    <h3 className="font-display text-lg sm:text-2xl font-medium text-neutral-900 mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-[13px] sm:text-[15px] text-neutral-500 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400">
                    {images} img · {videos} vid
                  </p>
                </div>
              </div>

              {files.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {files.map((media, idx) => (
                    <button
                      key={media.filename}
                      type="button"
                      onClick={() => openAt(phaseIdx, idx)}
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
                          alt={media.date}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute bottom-0 inset-x-0 p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/50 to-transparent">
                        <span className="text-[10px] font-mono text-white/85">
                          {media.date}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-24 border border-dashed border-neutral-900/15">
                  <p className="text-sm text-neutral-400">—</p>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          dir={dir}
        />
      )}
    </SectionWrapper>
  );
}
