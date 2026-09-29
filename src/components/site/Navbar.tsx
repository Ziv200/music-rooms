"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };

/**
 * Fixed site header with a mobile menu.
 *
 * The mobile menu is a native <details> (so it still opens and closes without JS). Its panel is
 * `position: fixed` to the viewport. Important: the header itself must never get a transform, filter
 * or backdrop-filter, because that makes it the containing block of fixed descendants and the panel
 * collapses into the 64px header (the Sept 2026 "menu stuck at the top" bug). The frosted-glass
 * background therefore lives on a separate absolutely positioned layer behind the nav.
 *
 * With JS: body scroll is locked while open (scroll position restored on close), and the menu closes
 * on link tap, Esc, backdrop tap and route change; Tab is kept inside the menu while it is open.
 */
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
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lockedY = useRef<number | null>(null);
  const pathname = usePathname();

  const lockScroll = useCallback(() => {
    if (lockedY.current !== null) return;
    const y = window.scrollY;
    lockedY.current = y;
    const b = document.body.style;
    // position:fixed is the lock that also holds on iOS Safari (overflow:hidden alone does not).
    b.position = "fixed";
    b.top = `-${y}px`;
    b.insetInline = "0";
    b.width = "100%";
    b.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    const y = lockedY.current;
    if (y === null) return;
    lockedY.current = null;
    const b = document.body.style;
    b.position = b.top = b.insetInline = b.width = b.overflow = "";
    window.scrollTo({ top: y, left: 0, behavior: "instant" });
  }, []);

  /** Close synchronously (the native `toggle` event is async, and a link tap must unlock before navigating). */
  const closeMenu = useCallback(
    (returnFocus = false) => {
      if (detailsRef.current) detailsRef.current.open = false; // React `open` state follows via the toggle event
      unlockScroll();
      if (returnFocus) summaryRef.current?.focus();
    },
    [unlockScroll],
  );

  useEffect(() => {
    const onScroll = () => {
      if (lockedY.current !== null) return; // body is position:fixed while the menu is open
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep React state + scroll lock in sync with the native <details> state
  useEffect(() => {
    const d = detailsRef.current;
    if (!d) return;
    const onToggle = () => {
      setOpen(d.open);
      if (d.open) lockScroll();
      else unlockScroll();
    };
    d.addEventListener("toggle", onToggle);
    return () => {
      d.removeEventListener("toggle", onToggle);
      unlockScroll();
    };
  }, [lockScroll, unlockScroll]);

  // Close on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close when the viewport grows to the desktop layout (menu hidden at lg)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && closeMenu();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  // Esc closes and returns focus to the toggle; Tab stays inside toggle + panel while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu(true);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = [summaryRef.current, ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [])].filter(Boolean) as HTMLElement[];
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !focusables.includes(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

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

  const solid = scrolled || open;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${solid ? "border-neutral-900/10" : "border-transparent"}`}>
      {/* Background layer: carries the blur so the header itself never becomes a containing block for the fixed menu panel */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 transition-colors duration-300 ${open ? "bg-[#f7f6f3]" : scrolled ? "bg-[#f7f6f3]/95 backdrop-blur-md" : "bg-[#f7f6f3]/80"}`}
      />
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
              className="list-none [&::-webkit-details-marker]:hidden cursor-pointer p-2.5 -m-0.5 text-neutral-800"
            >
              <Menu className="w-6 h-6 group-open:hidden" aria-hidden />
              <X className="w-6 h-6 hidden group-open:block" aria-hidden />
              <span className="sr-only group-open:hidden">{menuOpen}</span>
              <span className="sr-only hidden group-open:inline">{menuClose}</span>
            </summary>
            {/* Viewport-fixed overlay below the 64px header; covers the sticky bar (header is z-50, bar z-40). */}
            <div className="fixed inset-x-0 top-16 bottom-0 flex flex-col">
              <div
                ref={panelRef}
                className="bg-[#f7f6f3] border-t border-neutral-900/10 shadow-lg max-h-full overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]"
              >
                <ul className="flex flex-col px-6 py-5 gap-1">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => closeMenu()} className="block text-xl text-neutral-900 py-3">
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
                      onClick={() => closeMenu()}
                      className="block text-xl text-neutral-900 py-3"
                    >
                      {langSwitch.label}
                    </a>
                  </li>
                  <li className="pt-4 pb-2">
                    <a
                      href={ctaHref}
                      onClick={() => closeMenu()}
                      data-track="cta-menu"
                      className="inline-flex items-center px-5 py-3 bg-neutral-900 text-white text-base font-medium"
                    >
                      {cta}
                    </a>
                  </li>
                </ul>
              </div>
              {/* Backdrop: tap to close (pointer only; keyboard users have Esc and the toggle) */}
              <div aria-hidden onClick={() => closeMenu()} className="flex-1 min-h-0 bg-neutral-900/40 cursor-pointer" />
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
