import type { ReactNode } from "react";
import { heCommon } from "@/content/he";
import { enCommon } from "@/content/en";
import { withBase } from "@/lib/site-config";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StickyBar } from "./StickyBar";
import { SiteScripts } from "./SiteScripts";

/**
 * Shared page frame: skip link, navbar, <main>, footer, mobile sticky bar, scripts.
 * `altHref` = matching page in the other language (not a same-URL text swap).
 * `hasForm` = the page has its own #contact form (all marketing pages). Legal pages link to the home form.
 */
export function SiteChrome({
  lang,
  altHref,
  hasForm = true,
  children,
}: {
  lang: "he" | "en";
  altHref: string;
  hasForm?: boolean;
  children: ReactNode;
}) {
  const c = lang === "he" ? heCommon : enCommon;
  const home = lang === "he" ? "/" : "/en/";
  const ctaHref = hasForm ? "#contact" : withBase(`${home}#contact`);
  const langSwitch = { label: c.langSwitchLabel, href: withBase(altHref), hrefLang: lang === "he" ? "en" : "he" };
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[100] focus:bg-neutral-900 focus:text-white focus:px-4 focus:py-2"
      >
        {c.skipLink}
      </a>
      <Navbar
        lang={lang}
        brand={c.brand}
        brandSuffix={c.brandSuffix}
        homeHref={home}
        items={c.nav}
        cta={c.ctaShort}
        ctaHref={ctaHref}
        langSwitch={langSwitch}
        menuOpen={c.menuOpen}
        menuClose={c.menuClose}
      />
      <main id="main" tabIndex={-1} className="pt-16 outline-none">
        {children}
      </main>
      <Footer lang={lang} copy={c.footer} langSwitch={langSwitch} />
      <StickyBar ctaHref={ctaHref} copy={c.stickyBar} />
      <SiteScripts lang={lang} />
    </>
  );
}
