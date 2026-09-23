"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaFile } from "@/lib/media";

export type LightboxItem = {
  file: MediaFile;
  phaseTag: string;
  phaseTitle: string;
};

interface LightboxProps {
  items: LightboxItem[];
  initialIndex: number;
  onClose: () => void;
  /** Page writing direction — drives keyboard, swipe, and side buttons */
  dir?: "ltr" | "rtl";
}

export function Lightbox({
  items,
  initialIndex,
  onClose,
  dir = "ltr",
}: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const item = items[index];
  const file = item?.file;
  const isRtl = dir === "rtl";

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  // In RTL the gallery starts on the right, so Left = next, Right = previous
  const goTowardStart = isRtl ? goNext : goPrev; // physical left / swipe left
  const goTowardEnd = isRtl ? goPrev : goNext; // physical right / swipe right

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTowardStart();
      if (e.key === "ArrowRight") goTowardEnd();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goTowardStart, goTowardEnd]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 48) return;
    // Finger moved left (dx < 0) → toward the left side of the screen
    if (dx < 0) goTowardStart();
    else goTowardEnd();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const phaseBounds = useMemo(() => {
    if (!item) return { local: 0, count: 0 };
    let start = index;
    while (start > 0 && items[start - 1].phaseTag === item.phaseTag) start -= 1;
    let end = index;
    while (end < items.length - 1 && items[end + 1].phaseTag === item.phaseTag) {
      end += 1;
    }
    return { local: index - start + 1, count: end - start + 1 };
  }, [index, item, items]);

  if (!file || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        dir={dir}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === containerRef.current) onClose();
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 z-20 rounded-full bg-white/10 p-3 sm:p-2.5 text-white hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute top-4 inset-x-14 sm:inset-x-20 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.phaseTag}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="px-3.5 py-1.5 rounded-full bg-white/12 border border-white/15 text-center max-w-[min(90vw,22rem)]"
            >
              <div className="text-[10px] font-mono tracking-wide text-white/55">
                {item.phaseTag}
              </div>
              <div className="text-[13px] sm:text-sm text-white leading-snug truncate">
                {item.phaseTitle}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="text-[11px] sm:text-sm text-white/55 font-mono">
            {phaseBounds.local} / {phaseBounds.count}
          </div>
        </div>

        {/* Physical left control — next in RTL, previous in LTR */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={goTowardStart}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition-colors"
            aria-label={isRtl ? "Next" : "Previous"}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={file.filename}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="max-w-[90vw] max-h-[78vh] sm:max-h-[85vh] flex items-center justify-center mt-12"
          >
            {file.type === "video" ? (
              <video
                src={file.src}
                controls
                autoPlay
                className="max-w-full max-h-[78vh] sm:max-h-[85vh] rounded-lg"
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={file.src}
                alt={file.filename}
                className="max-w-full max-h-[78vh] sm:max-h-[85vh] rounded-lg object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Physical right control — previous in RTL, next in LTR */}
        {items.length > 1 && (
          <button
            type="button"
            onClick={goTowardEnd}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition-colors"
            aria-label={isRtl ? "Previous" : "Next"}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40 font-mono">
          {file.date} · {file.time.slice(0, 2)}:{file.time.slice(2, 4)}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
