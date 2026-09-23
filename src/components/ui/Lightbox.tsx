"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaFile } from "@/lib/media";

interface LightboxProps {
  files: MediaFile[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ files, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const file = files[index];

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % files.length);
  }, [files.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + files.length) % files.length);
  }, [files.length]);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
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
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 sm:p-2.5 text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white/60 font-mono">
          {index + 1} / {files.length}
        </div>

        {/* Prev */}
        {files.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={file.filename}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
          >
            {file.type === "video" ? (
              <video
                src={file.src}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] rounded-lg"
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={file.src}
                alt={file.filename}
                className="max-w-full max-h-[85vh] rounded-lg object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next */}
        {files.length > 1 && (
          <button
            onClick={goNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Date */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40 font-mono">
          {file.date} · {file.time.slice(0, 2)}:{file.time.slice(2, 4)}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
