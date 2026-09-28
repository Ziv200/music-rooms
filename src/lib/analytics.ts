/**
 * GoatCounter helpers (cookie-free analytics, SCP ג). The script is only loaded on
 * SITE.productionHost; everywhere else `track()` is a no-op.
 * Event names carry no personal data.
 */
type GoatCounter = {
  count?: (vars: { path: string; title?: string; event?: boolean }) => void;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

export function track(event: string) {
  if (typeof window === "undefined") return;
  const gc = window.goatcounter;
  if (!gc || typeof gc.count !== "function") return;
  try {
    gc.count({ path: event, title: event, event: true });
  } catch {
    /* never break the page for analytics */
  }
}

export function countPageview() {
  const gc = typeof window !== "undefined" ? window.goatcounter : undefined;
  if (!gc || typeof gc.count !== "function") return;
  try {
    gc.count({ path: window.location.pathname + window.location.search });
  } catch {
    /* ignore */
  }
}
