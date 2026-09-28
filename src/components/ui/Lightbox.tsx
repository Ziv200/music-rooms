"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaFile } from "@/lib/media";

export type LightboxItem = {
  file: MediaFile;
  phaseTag: string;
  phaseTitle: string;
  alt: string;
};

/** Accessible media dialog: focus moves in and is restored, Esc closes, arrows navigate (RTL-aware). */
export function Lightbox({
  items,
  initialIndex,
  onClose,
  dir = "ltr",
  labels,
}: {
  items: LightboxItem[];
  initialIndex: number;
  onClose: () => void;
  dir?: "ltr" | "rtl";
  labels: { close: string; next: string; prev: string; dialog: string };
}) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const item = items[index];
  const isRtl = dir === "rtl";

  const goNext = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);
  // In RTL the sequence runs right-to-left: physical left = next
  const goLeft = isRtl ? goNext : goPrev;
  const goRight = isRtl ? goPrev : goNext;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goLeft();
      else if (e.key === "ArrowRight") goRight();
      else if (e.key === "Tab") {
        // simple focus trap
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("button, video, [href], [tabindex]:not([tabindex='-1'])");
        if (!nodes || !nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goLeft, goRight]);

  const phaseBounds = useMemo(() => {
    if (!item) return { local: 0, count: 0 };
    let start = index;
    while (start > 0 && items[start - 1].phaseTag === item.phaseTag) start -= 1;
    let end = index;
    while (end < items.length - 1 && items[end + 1].phaseTag === item.phaseTag) end += 1;
    return { local: index - start + 1, count: end - start + 1 };
  }, [index, item, items]);

  if (!item) return null;
  const file = item.file;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
      dir={dir}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      onTouchStart={(e) => (touchStartX.current = e.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) < 48) return;
        if (dx < 0) goLeft();
        else goRight();
      }}
    >
      <button ref={closeRef} type="button" onClick={onClose} className="absolute top-4 end-4 z-20 rounded-full bg-white/15 p-3 text-white hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white" aria-label={labels.close}>
        <X className="w-5 h-5" aria-hidden />
      </button>

      <div className="absolute top-4 inset-x-16 sm:inset-x-24 z-10 flex flex-col items-center gap-1 pointer-events-none text-center">
        <p className="text-sm text-white">
          {item.phaseTag} · {item.phaseTitle}
        </p>
        <p className="text-sm text-white/80 tabular-nums" aria-live="polite">
          {phaseBounds.local} / {phaseBounds.count}
        </p>
      </div>

      {items.length > 1 && (
        <button type="button" onClick={goLeft} className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white" aria-label={isRtl ? labels.next : labels.prev}>
          <ChevronLeft className="w-6 h-6" aria-hidden />
        </button>
      )}

      <figure className="max-w-[92vw] max-h-[78vh] sm:max-h-[84vh] flex flex-col items-center justify-center mt-10">
        {file.type === "video" ? (
          <video key={file.stem} src={file.video} poster={file.large} controls autoPlay muted playsInline preload="metadata" aria-label={item.alt} className="max-w-full max-h-[72vh] sm:max-h-[80vh]" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={file.stem} src={file.large} alt={item.alt} className="max-w-full max-h-[72vh] sm:max-h-[80vh] object-contain" />
        )}
        <figcaption className="mt-3 text-sm text-white/85 max-w-2xl text-center px-10">{item.alt}</figcaption>
      </figure>

      {items.length > 1 && (
        <button type="button" onClick={goRight} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white" aria-label={isRtl ? labels.prev : labels.next}>
          <ChevronRight className="w-6 h-6" aria-hidden />
        </button>
      )}
    </div>
  );
}
