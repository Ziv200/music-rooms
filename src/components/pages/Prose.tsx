import type { ReactNode } from "react";
import { SiteChrome } from "@/components/site/SiteChrome";

/** Simple text page (legal pages, accessibility statement). No form: CTAs go to the home page form. */
export function ProsePage({ lang, altHref, title, updated, children }: { lang: "he" | "en"; altHref: string; title: string; updated?: string | null; children: ReactNode }) {
  return (
    <SiteChrome lang={lang} altHref={altHref} hasForm={false}>
      <article className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20">
        <div className="mx-auto max-w-3xl prose-legal">
          <h1 className="font-display text-[2rem] sm:text-5xl font-medium text-neutral-900 mb-4">{title}</h1>
          {updated ? <p className="text-[15px] text-neutral-700 mb-8">{updated}</p> : null}
          {children}
        </div>
      </article>
    </SiteChrome>
  );
}

export const H = ({ children }: { children: ReactNode }) => <h2 className="text-xl font-medium text-neutral-900 mt-10 mb-3">{children}</h2>;
export const Sub = ({ children }: { children: ReactNode }) => <h3 className="text-[17px] font-medium text-neutral-900 mt-6 mb-2">{children}</h3>;
export const P = ({ children }: { children: ReactNode }) => <p className="text-[16px] text-neutral-800 leading-relaxed mb-4">{children}</p>;
export const UL = ({ children }: { children: ReactNode }) => <ul className="list-disc ps-5 space-y-2 mb-4 text-[16px] text-neutral-800 leading-relaxed marker:text-neutral-500">{children}</ul>;
export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="underline underline-offset-4">
    {children}
  </a>
);
