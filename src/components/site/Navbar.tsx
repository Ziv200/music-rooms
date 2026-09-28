"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };

export function Navbar({
  lang,
  brand,
  brandSuffix,
  homeHref,
  items,
  cta,
  ctaHref,
  langSwitch,
  menuOpen,
  menuClose,
}: {
  lang: "he" | "en";
  brand: string;
  brandSuffix: string;
  homeHref: string;
  items: NavItem[];
  cta: string;
  ctaHref: string;
  langSwitch: { label: string; href: string; hrefLang: string };
  menuOpen: string;
  menuClose: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc closes the mobile menu and returns focus to the toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = detailsRef.current;
      if (e.key === "Escape" && d?.open) {
        d.open = false;
        summaryRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  const langLink = (
    <a
      href={langSwitch.href}
      hrefLang={langSwitch.hrefLang}
      lang={langSwitch.hrefLang}
      data-track={`lang-switch-${langSwitch.hrefLang}`}
      className="px-2.5 py-2 text-[14px] text-neutral-700 hover:text-neutral-900 underline-offset-4 hover:underline"
    >
      {langSwitch.label}
    </a>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#f7f6f3]/95 backdrop-blur-md border-b border-neutral-900/10" : "bg-[#f7f6f3]/80 border-b border-transparent"
      }`}
    >
      <nav aria-label={lang === "he" ? "ניווט ראשי" : "Main"} className="mx-auto max-w-6xl flex items-center justify-between gap-3 h-16 px-4 sm:px-6 lg:px-8">
        <Link href={homeHref} className="flex items-baseline gap-1.5 min-w-0 text-neutral-900">
          <span className="font-display text-[17px] font-medium shrink-0">{brand}</span>
          <span aria-hidden className="text-neutral-400">|</span>
          <span className="font-display text-[15px] text-neutral-700 shrink-0" lang="en">
            {brandSuffix}
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="px-3 py-2 text-[14px] text-neutral-700 hover:text-neutral-900">
                {item.label}
              </Link>
            </li>
          ))}
          <li>{langLink}</li>
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={ctaHref}
            data-track="cta-navbar"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-neutral-900 text-white text-[14px] font-medium hover:bg-neutral-700"
          >
            {cta}
          </a>

          <details ref={detailsRef} className="lg:hidden group">
            <summary
              ref={summaryRef}
              className="list-none [&::-webkit-details-marker]:hidden cursor-pointer p-2 text-neutral-800"
              aria-label={menuOpen}
            >
              <Menu className="w-6 h-6 group-open:hidden" aria-hidden />
              <X className="w-6 h-6 hidden group-open:block" aria-hidden />
              <span className="sr-only group-open:hidden">{menuOpen}</span>
              <span className="sr-only hidden group-open:inline">{menuClose}</span>
            </summary>
            <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-[#f7f6f3] border-t border-neutral-900/10 overflow-y-auto">
              <ul className="flex flex-col px-6 py-6 gap-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeMenu} className="block text-xl text-neutral-900 py-3">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href={langSwitch.href}
                    hrefLang={langSwitch.hrefLang}
                    lang={langSwitch.hrefLang}
                    data-track={`lang-switch-${langSwitch.hrefLang}`}
                    className="block text-xl text-neutral-900 py-3"
                  >
                    {langSwitch.label}
                  </a>
                </li>
                <li className="pt-4">
                  <a
                    href={ctaHref}
                    onClick={closeMenu}
                    data-track="cta-menu"
                    className="inline-flex items-center px-5 py-3 bg-neutral-900 text-white text-base font-medium"
                  >
                    {cta}
                  </a>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
