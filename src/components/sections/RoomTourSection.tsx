"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import {
  SectionWrapper,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/SectionWrapper";
import {
  TOUR_CAPTIONS,
  captionAt,
  buildTourVtt,
  type TourCaption,
} from "@/lib/tourCaptions";

export function RoomTourSection() {
  const { t, lang } = useLang();
  const tour = t.tour;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<TourCaption>(TOUR_CAPTIONS[0]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [vttUrl, setVttUrl] = useState<string | null>(null);
  const [shellFs, setShellFs] = useState(false);
  const [nativeVideoFs, setNativeVideoFs] = useState(false);

  const syncFromTime = useCallback((time: number) => {
    const c = captionAt(time);
    if (!c) return;
    setActive(c);
    setActiveIdx(TOUR_CAPTIONS.indexOf(c));
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    syncFromTime(v.currentTime || 0);
  }, [syncFromTime]);

  // WebVTT blob — survives native / iOS video fullscreen
  useEffect(() => {
    const url = URL.createObjectURL(
      new Blob([buildTourVtt(lang)], { type: "text/vtt" })
    );
    setVttUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [lang]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !vttUrl) return;
    const tracks = v.textTracks;
    // Show WebVTT only when native video fullscreen (no HTML overlay there)
    const mode = nativeVideoFs ? "showing" : "hidden";
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = mode;
    }
  }, [vttUrl, lang, nativeVideoFs]);

  useEffect(() => {
    const onFs = () => {
      const fs = document.fullscreenElement;
      setShellFs(fs === shellRef.current);
      setNativeVideoFs(fs === videoRef.current);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // iOS Safari: video-only fullscreen
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onBegin = () => setNativeVideoFs(true);
    const onEnd = () => setNativeVideoFs(false);
    v.addEventListener("webkitbeginfullscreen", onBegin);
    v.addEventListener("webkitendfullscreen", onEnd);
    return () => {
      v.removeEventListener("webkitbeginfullscreen", onBegin);
      v.removeEventListener("webkitendfullscreen", onEnd);
    };
  }, []);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    syncFromTime(v.currentTime);
  };

  const seekTo = (start: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = start + 0.05;
    syncFromTime(start + 0.05);
    void v.play();
  };

  const toggleShellFullscreen = async () => {
    const shell = shellRef.current;
    if (!shell) return;
    try {
      if (document.fullscreenElement === shell) {
        await document.exitFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
        await shell.requestFullscreen();
      } else {
        await shell.requestFullscreen();
      }
    } catch {
      // Browser blocked or unsupported — native controls / VTT remain as fallback
    }
  };

  const title = lang === "he" ? active.he : active.en;
  const points = lang === "he" ? active.hePoints : active.enPoints;
  // HTML overlay works in page + shell fullscreen; not in native video-only FS
  const showHtmlOverlay = !nativeVideoFs;

  return (
    <SectionWrapper id="tour" className="border-t border-neutral-900/8">
      <div className="mb-10 max-w-2xl">
        <SectionLabel>{tour.sectionLabel}</SectionLabel>
        <SectionTitle>{tour.title}</SectionTitle>
        <SectionSubtitle>{tour.subtitle}</SectionSubtitle>
      </div>

      <div className="max-w-4xl mx-auto">
        <div
          ref={shellRef}
          className={`relative overflow-hidden bg-neutral-900 quiet-card group ${
            shellFs ? "flex items-center justify-center w-screen h-screen max-w-none rounded-none" : ""
          }`}
        >
          <video
            ref={videoRef}
            src={`${base}/project-media/2026-07-06_200751_4.mp4`}
            className={
              shellFs
                ? "w-full h-full object-contain"
                : "w-full aspect-[9/16] sm:aspect-video object-cover max-h-[78vh] mx-auto"
            }
            controls
            muted
            playsInline
            preload="metadata"
            // Prefer our shell fullscreen so the HTML overlay stays visible
            controlsList="nofullscreen"
            onTimeUpdate={onTimeUpdate}
            onSeeked={onTimeUpdate}
            onLoadedMetadata={onTimeUpdate}
            crossOrigin="anonymous"
          >
            {vttUrl ? (
              <track
                key={vttUrl}
                kind="captions"
                srcLang={lang}
                label={lang === "he" ? "עברית" : "English"}
                src={vttUrl}
                default
              />
            ) : null}
          </video>

          {showHtmlOverlay ? (
            <div
              key={active.start}
              className="pointer-events-none absolute inset-x-0 bottom-14 sm:bottom-16 flex justify-center px-3 sm:px-5 z-10"
              aria-live="polite"
            >
              <div className="w-full max-w-md sm:max-w-lg px-3.5 py-3 sm:px-4 sm:py-3.5 bg-black/60 backdrop-blur-sm text-white">
                <div className="text-center text-[13px] sm:text-sm tracking-wide font-medium mb-2">
                  {title}
                </div>
                <ul className="space-y-1.5">
                  {points.map((pt) => (
                    <li
                      key={pt}
                      className="text-[11px] sm:text-[12px] leading-snug text-white/90 flex gap-2"
                    >
                      <span
                        className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-white/70"
                        aria-hidden
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => void toggleShellFullscreen()}
            className="absolute top-3 end-3 z-20 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label={shellFs ? "Exit fullscreen" : "Fullscreen"}
            title={shellFs ? (lang === "he" ? "יציאה ממסך מלא" : "Exit fullscreen") : (lang === "he" ? "מסך מלא" : "Fullscreen")}
          >
            {shellFs ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="mt-3 text-[11px] font-mono text-neutral-400 text-center">
          {tour.videoCaption}
        </p>

        {/* Horizontal scroll on narrow screens — no wrapping maze of tiny chips */}
        <div
          className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto scrollbar-none sm:flex-wrap sm:justify-center sm:overflow-visible"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {TOUR_CAPTIONS.map((c, i) => {
            const label = lang === "he" ? c.he : c.en;
            const isActive = i === activeIdx;
            return (
              <button
                key={c.start}
                type="button"
                onClick={() => seekTo(c.start)}
                className={`shrink-0 px-3.5 py-2.5 sm:py-1.5 text-[12px] sm:text-[12px] tracking-wide border transition-colors ${
                  isActive
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-900/15 text-neutral-500 hover:border-neutral-900/35 hover:text-neutral-800"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
