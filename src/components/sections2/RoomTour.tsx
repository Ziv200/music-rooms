"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { TOUR_CAPTIONS, captionAt, buildTourVtt, type TourCaption } from "@/lib/tourCaptions";
import { TOUR_VIDEO } from "@/lib/media";
import { track } from "@/lib/analytics";

type TourCopy = { title: string; subtitle: string; caption: string; chaptersLabel: string; fullscreen: string; exitFullscreen: string };

/**
 * Narrated walkthrough video (with sound) with a chapter overlay + WebVTT captions. Poster + preload="none",
 * no autoplay, so it plays with sound when the visitor presses play.
 *
 * Exactly one caption layer at a time:
 * - Inline (and in our own shell fullscreen): the custom overlay shows; the native <track> is kept at mode
 *   "hidden". WebKit (iOS Safari) re-runs its automatic caption selection when the media starts loading and
 *   turns a `default` track back to "showing" (the iPhone double-caption bug), so the `default` attribute is
 *   removed on hydration and the mode is re-asserted on every load / play / track change event.
 * - Native video fullscreen (iOS webkitbeginfullscreen, or fullscreenchange on the <video>): the overlay
 *   can't render there, so the native track is set to "showing", and back to "hidden" on exit.
 * - Without JS: the `default` track stays in the static HTML, so native captions still show.
 */
export function RoomTour({ lang, copy }: { lang: "he" | "en"; copy: TourCopy }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);
  const nativeFsRef = useRef(false);
  const [active, setActive] = useState<TourCaption>(TOUR_CAPTIONS[0]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [shellFs, setShellFs] = useState(false);
  const [nativeVideoFs, setNativeVideoFs] = useState(false);
  const milestones = useRef({ play: false, half: false, done: false });

  const syncFromTime = useCallback((time: number) => {
    const c = captionAt(time);
    if (!c) return;
    setActive(c);
    setActiveIdx(TOUR_CAPTIONS.indexOf(c));
  }, []);

  // Captions as a data: URL, so the <track> is present in the static HTML (works without JS too).
  const vttUrl = useMemo(() => `data:text/vtt;charset=utf-8,${encodeURIComponent(buildTourVtt(lang))}`, [lang]);

  /** Native captions only in native video fullscreen; otherwise hidden (the overlay is driven from TOUR_CAPTIONS). */
  const applyTrackMode = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const mode: TextTrackMode = nativeFsRef.current ? "showing" : "hidden";
    for (let i = 0; i < v.textTracks.length; i++) if (v.textTracks[i].mode !== mode) v.textTracks[i].mode = mode;
  }, []);

  useEffect(() => {
    nativeFsRef.current = nativeVideoFs;
    applyTrackMode();
  }, [nativeVideoFs, applyTrackMode]);

  // With JS the overlay replaces the default-on native captions: drop `default` so WebKit's automatic
  // selection doesn't switch the track back on, and re-assert the mode whenever the browser changes it.
  useEffect(() => {
    const v = videoRef.current;
    const t = trackRef.current;
    if (!v) return;
    if (t) {
      t.removeAttribute("default");
      t.default = false;
    }
    applyTrackMode();
    const events = ["loadstart", "loadedmetadata", "loadeddata", "play", "playing"] as const;
    events.forEach((e) => v.addEventListener(e, applyTrackMode));
    v.textTracks.addEventListener("change", applyTrackMode);
    v.textTracks.addEventListener("addtrack", applyTrackMode);
    return () => {
      events.forEach((e) => v.removeEventListener(e, applyTrackMode));
      v.textTracks.removeEventListener("change", applyTrackMode);
      v.textTracks.removeEventListener("addtrack", applyTrackMode);
    };
  }, [vttUrl, applyTrackMode]);

  useEffect(() => {
    const onFs = () => {
      const fs = document.fullscreenElement;
      setShellFs(fs === shellRef.current);
      setNativeVideoFs(fs === videoRef.current);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

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
    if (v.duration && !milestones.current.half && v.currentTime / v.duration >= 0.5) {
      milestones.current.half = true;
      track("video-50");
    }
  };

  const onPlay = () => {
    setStarted(true);
    if (!milestones.current.play) {
      milestones.current.play = true;
      track("video-play");
    }
  };

  const onEnded = () => {
    if (!milestones.current.done) {
      milestones.current.done = true;
      track("video-complete");
    }
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
    // iPhone Safari has no element fullscreen: use the video's native fullscreen (native captions show there).
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!shell.requestFullscreen && v?.webkitEnterFullscreen) {
      v.webkitEnterFullscreen();
      return;
    }
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      if (document.fullscreenElement !== shell && !shellFs) await shell.requestFullscreen();
    } catch {
      /* unsupported: native controls + VTT remain */
    }
  };

  const title = lang === "he" ? active.he : active.en;
  const points = lang === "he" ? active.hePoints : active.enPoints;

  return (
    <section id="tour" aria-labelledby="tour-title" className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900/10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <h2 id="tour-title" className="font-display text-3xl sm:text-4xl font-medium text-neutral-900 mb-3">
            {copy.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">{copy.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div ref={shellRef} className={`relative overflow-hidden bg-neutral-900 ${shellFs ? "flex items-center justify-center w-screen h-screen" : ""}`}>
            <video
              ref={videoRef}
              src={TOUR_VIDEO.src}
              poster={TOUR_VIDEO.poster}
              className={shellFs ? "w-full h-full object-contain" : "w-full aspect-[9/16] sm:aspect-video object-contain sm:object-cover max-h-[78vh] mx-auto bg-neutral-900"}
              controls
              playsInline
              preload="none"
              controlsList="nofullscreen"
              onPlay={onPlay}
              onEnded={onEnded}
              onTimeUpdate={onTimeUpdate}
              onSeeked={onTimeUpdate}
              aria-describedby="tour-caption"
            >
              {vttUrl ? <track ref={trackRef} key={lang} kind="captions" srcLang={lang} label={lang === "he" ? "עברית" : "English"} src={vttUrl} default /> : null}
            </video>

            {started && !nativeVideoFs ? (
              <div key={active.start} className="pointer-events-none absolute inset-x-0 bottom-14 sm:bottom-16 flex justify-center px-3 sm:px-5 z-10" aria-live="polite">
                <div className="w-full max-w-md sm:max-w-lg px-4 py-3 bg-black/70 text-white">
                  <p className="text-center text-sm font-medium mb-2">{title}</p>
                  <ul className="space-y-1.5">
                    {points.map((pt) => (
                      <li key={pt} className="text-[13px] leading-snug text-white flex gap-2">
                        <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-white/80" aria-hidden />
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
              className="absolute top-3 end-3 z-20 p-2.5 bg-black/60 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
              aria-label={shellFs ? copy.exitFullscreen : copy.fullscreen}
            >
              {shellFs ? <Minimize2 className="w-4 h-4" aria-hidden /> : <Maximize2 className="w-4 h-4" aria-hidden />}
            </button>
          </div>
          <p id="tour-caption" className="mt-3 text-sm text-neutral-700 text-center">
            {copy.caption}
          </p>

          <ul aria-label={copy.chaptersLabel} className="mt-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto scrollbar-none sm:flex-wrap sm:justify-center sm:overflow-visible">
            {TOUR_CAPTIONS.map((c, i) => {
              const isActive = started && i === activeIdx;
              return (
                <li key={c.start} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => seekTo(c.start)}
                    aria-current={isActive ? "true" : undefined}
                    className={`px-3.5 py-2.5 sm:py-2 text-[14px] border ${isActive ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-900/25 text-neutral-800 hover:border-neutral-900"}`}
                  >
                    {lang === "he" ? c.he : c.en}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
