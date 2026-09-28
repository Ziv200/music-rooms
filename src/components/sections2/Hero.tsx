import Link from "next/link";
import { HERO_IMAGE } from "@/lib/media";
import { SITE } from "@/lib/site-config";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/Buttons";

type SelectorItem = { label: string; href: string; persona: string; lang?: string };

export function Hero({
  lang,
  eyebrow,
  h1,
  body,
  proof,
  primary,
  secondary,
  secondaryHref,
  textLink,
  smallLine,
  imageAlt,
  selectorTitle,
  selector,
}: {
  lang: "he" | "en";
  eyebrow: string;
  h1: string;
  body: string;
  proof: string;
  primary: string;
  secondary: string;
  secondaryHref: string;
  textLink?: { label: string; href: string };
  smallLine: string;
  imageAlt: string;
  selectorTitle?: string;
  selector?: SelectorItem[];
}) {
  return (
    <section aria-labelledby="hero-title" className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14 sm:pb-20">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6">
          <p className="mb-4 text-[15px] font-medium text-neutral-700 ltr:uppercase ltr:tracking-[0.12em] ltr:text-xs">{eyebrow}</p>
          <h1
            id="hero-title"
            className="font-display text-[2.1rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] font-medium text-neutral-900 mb-5 text-balance ltr:tracking-tight"
          >
            {h1}
          </h1>
          <p className="text-[17px] text-neutral-700 leading-relaxed mb-5">{body}</p>
          <p className="text-[15px] text-neutral-900 leading-relaxed mb-7 border-s-2 border-neutral-900 ps-3">{proof}</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <PrimaryButton href="#contact" track="cta-hero">
              {primary}
            </PrimaryButton>
            <SecondaryButton href={secondaryHref} track="cta-hero-case-study">
              {secondary}
            </SecondaryButton>
          </div>
          {textLink ? (
            <p className="mb-3">
              <TextLink href={textLink.href} track="cta-hero-donors">
                {textLink.label}
              </TextLink>
            </p>
          ) : null}
          <p className="text-[15px] text-neutral-700">
            {lang === "he" ? (
              <>
                {smallLine.replace(SITE.phone.display, "")}
                <a href={SITE.phone.tel} className="underline underline-offset-4 font-medium whitespace-nowrap" dir="ltr">
                  {SITE.phone.display}
                </a>
              </>
            ) : (
              smallLine
            )}
          </p>
        </div>

        <figure className="lg:col-span-6">
          <div className="overflow-hidden bg-neutral-200 aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMAGE.src}
              srcSet={HERO_IMAGE.srcSet}
              sizes="(min-width: 1024px) 560px, 100vw"
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              alt={imageAlt}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </figure>
      </div>

      {selector && selector.length ? (
        <nav aria-labelledby="audience-title" className="mx-auto max-w-6xl mt-12">
          <h2 id="audience-title" className="text-lg font-medium text-neutral-900 mb-3">
            {selectorTitle}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {selector.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  lang={s.lang}
                  hrefLang={s.lang}
                  data-track={`audience-${s.persona}`}
                  className="inline-flex items-center px-4 py-2.5 border border-neutral-900/25 bg-white text-[15px] text-neutral-900 hover:border-neutral-900"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </section>
  );
}
