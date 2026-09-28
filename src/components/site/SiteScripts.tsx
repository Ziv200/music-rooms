"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BASE_PATH, SITE } from "@/lib/site-config";
import { countPageview, track } from "@/lib/analytics";

declare global {
  interface Window {
    OpenNagishConfig?: Record<string, unknown>;
    OpenNagishFontBase?: string;
  }
}

const NAGISH_DIR = `${BASE_PATH}/vendor/open-nagish-1.1.5/`;

/** Module-level (not a ref): SiteScripts remounts on every client-side page change, because each page
 *  renders its own SiteChrome. Only the very first page view of the session is skipped (count.js counts it). */
let initialViewSeen = false;

/**
 * - GoatCounter: loaded only on the production host. The script counts the first page view
 *   itself; later client-side route changes are counted here (first run skipped, so no double count).
 * - Delegated click tracking: [data-track], tel:, wa.me, mailto:, PDF links.
 * - [data-prefill] CTAs pre-tick the matching checkbox in the contact form.
 * - OpenNagish accessibility widget (self-hosted, pinned 1.1.5), loaded after the page is idle.
 */
export function SiteScripts({ lang }: { lang: "he" | "en" }) {
  const pathname = usePathname();

  // Analytics loader
  useEffect(() => {
    if (window.location.hostname !== SITE.productionHost) return;
    if (document.querySelector("script[data-goatcounter]")) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = SITE.goatcounter.script;
    s.dataset.goatcounter = SITE.goatcounter.endpoint;
    document.body.appendChild(s);
  }, []);

  // SPA page views (skip the initial load: count.js already counted it)
  useEffect(() => {
    if (!initialViewSeen) {
      initialViewSeen = true;
      return;
    }
    countPageview();
  }, [pathname]);

  // Delegated clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a,button,[data-track]") as HTMLElement | null;
      if (!el) return;
      const explicit = el.getAttribute("data-track");
      const href = el.getAttribute("href") || "";
      if (explicit) track(explicit);
      if (href.startsWith("tel:")) track("click-phone");
      else if (href.includes("wa.me/")) track("click-whatsapp");
      else if (href.startsWith("mailto:")) track("click-email");

      const prefill = el.getAttribute("data-prefill");
      if (prefill) {
        const box = document.getElementById(`req-${prefill}`) as HTMLInputElement | null;
        if (box) box.checked = true;
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Accessibility widget
  useEffect(() => {
    if (document.getElementById("opennagish-script")) return;
    window.OpenNagishFontBase = `${NAGISH_DIR}fonts/`;
    window.OpenNagishConfig = {
      lang,
      position: "bottom-left",
      mobileBottomOffset: 64,
      bottomOffset: 0,
      statementUrl: `${BASE_PATH}${lang === "he" ? "/accessibility/" : "/en/accessibility/"}`,
    };
    const load = () => {
      const s = document.createElement("script");
      s.id = "opennagish-script";
      s.src = `${NAGISH_DIR}open-nagish.min.js`;
      s.defer = true;
      document.body.appendChild(s);
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(load, { timeout: 3000 });
    else window.setTimeout(load, 1500);
  }, [lang]);

  return null;
}
