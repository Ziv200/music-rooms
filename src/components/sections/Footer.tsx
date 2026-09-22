"use client";

import { useLang } from "@/hooks/useLang";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-neutral-900/8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-display text-sm text-neutral-900">{t.brandFull}</span>
            <p className="text-[12px] text-neutral-400 mt-1">{t.footer.tagline}</p>
          </div>
          <div className="flex items-center gap-6">
            {t.footer.links.map((link, i) => (
              <a
                key={i}
                href="#"
                className="text-[12px] text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-neutral-900/8">
          <p className="text-[11px] text-neutral-400">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
