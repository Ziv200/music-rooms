"use client";

import { useCallback, useMemo, useState } from "react";
import { Play } from "lucide-react";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import type { MediaFile } from "@/lib/media";
import { galleryAlt } from "@/content/gallery-alt";

type Phase = { id: string; tag: string; title: string; date: string; body: string };

/**
 * Five-stage project gallery. All thumbnails are real links to the full image, so the
 * gallery works without JavaScript; with JS they open an accessible lightbox.
 */
export function Gallery({
  lang,
  title,
  label,
  phases,
  phaseMedia,
}: {
  lang: "he" | "en";
  title: string;
  label: string;
  phases: Phase[];
  phaseMedia: Record<string, MediaFile[]>;
}) {
  const he = lang === "he";
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stageWord = he ? "שלב" : "Stage";

  const items: LightboxItem[] = useMemo(() => {
    const out: LightboxItem[] = [];
    for (const p of phases) {
      for (const file of phaseMedia[p.id] || []) {
        out.push({ file, phaseTag: p.tag, phaseTitle: p.title, alt: `${stageWord} ${p.tag}, ${p.title}: ${galleryAlt(file.stem, lang)}` });
      }
    }
    return out;
  }, [phases, phaseMedia, lang, stageWord]);

  const startIndex = useMemo(() => {
    const s: Record<string, number> = {};
    let n = 0;
    for (const p of phases) {
      s[p.id] = n;
      n += (phaseMedia[p.id] || []).length;
    }
    return s;
  }, [phases, phaseMedia]);

  const open = useCallback((e: React.MouseEvent, idx: number) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setLightboxIndex(idx);
  }, []);

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900/10">
      <div className="mx-auto max-w-6xl">
        <h2 id="work-title" className="font-display text-3xl sm:text-4xl font-medium text-neutral-900 mb-6">
          {title}
        </h2>

        <nav aria-label={label} className="sticky top-16 z-30 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 border-y border-neutral-900/10 bg-[#f7f6f3]/95 backdrop-blur-md">
          <ul className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto py-2 scrollbar-none">
            {phases.map((p) => (
              <li key={p.id} className="shrink-0">
                <a href={`#work-${p.id}`} className="block px-3 py-2 text-[14px] text-neutral-800 hover:bg-white border border-transparent hover:border-neutral-900/15">
                  <span className="tabular-nums text-neutral-600 me-1.5">{p.tag}</span>
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          {phases.map((p) => {
            const files = phaseMedia[p.id] || [];
            return (
              <section key={p.id} id={`work-${p.id}`} aria-labelledby={`work-${p.id}-title`} className="scroll-mt-36">
                <div className="mb-5 max-w-3xl">
                  <p className="text-sm text-neutral-600 tabular-nums mb-1">
                    {p.tag} · {p.date}
                  </p>
                  <h3 id={`work-${p.id}-title`} className="font-display text-xl sm:text-2xl font-medium text-neutral-900 mb-1.5">
                    {p.title}
                  </h3>
                  {p.body ? <p className="text-[16px] text-neutral-700 leading-relaxed">{p.body}</p> : null}
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {files.map((m, i) => {
                    const idx = (startIndex[p.id] ?? 0) + i;
                    const alt = items[idx]?.alt ?? "";
                    const isVideo = m.type === "video";
                    return (
                      <li key={m.stem}>
                        <a
                          href={isVideo ? m.video : m.large}
                          onClick={(e) => open(e, idx)}
                          aria-label={isVideo ? `${alt} (${he ? "סרטון" : "video"})` : undefined}
                          className="relative group block aspect-square overflow-hidden bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={m.thumb} alt={isVideo ? "" : alt} loading="lazy" decoding="async" width={280} height={280} className="absolute inset-0 w-full h-full object-cover motion-safe:group-hover:scale-[1.02] motion-safe:transition-transform" />
                          {isVideo ? (
                            <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <Play className="w-4 h-4 text-neutral-900 ms-0.5" aria-hidden />
                              </span>
                            </span>
                          ) : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          dir={he ? "rtl" : "ltr"}
          labels={he ? { close: "סגירה", next: "הבא", prev: "הקודם", dialog: "גלריית תמונות" } : { close: "Close", next: "Next", prev: "Previous", dialog: "Photo gallery" }}
        />
      )}
    </section>
  );
}
