import type { ReactNode } from "react";
import { Section, Eyebrow, H2, Lead } from "@/components/ui/Section";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/Buttons";
import { mediaUrl } from "@/lib/media";
import { galleryAlt } from "@/content/gallery-alt";
import { PENDING, withBase } from "@/lib/site-config";
import type { FaqItem } from "@/content/he";

export const pdfHref = (lang: "he" | "en") => withBase(`/files/adi-negev-case-study-${lang}.pdf`);

/* ---------- Case-study teaser (home) ---------- */
export function CaseTeaser({
  lang,
  eyebrow,
  title,
  body,
  facts,
  button,
  buttonHref,
  pdf,
}: {
  lang: "he" | "en";
  eyebrow: string;
  title: string;
  body: string;
  facts?: string[];
  button: string;
  buttonHref: string;
  pdf: string;
}) {
  // "Before": photo 8 of 8 in stage 01 ("החלל שקיבלנו"), portrait, fits the 3:4 slot (the panorama did not).
  const before = "2026-04-15_162456_1";
  const after = "2026-07-06_200059_2";
  const labels = lang === "he" ? ["לפני", "אחרי"] : ["Before", "After"];
  const beforeAlt = lang === "he" ? "החלל הריק לפני תחילת העבודות: מבט לאורך החלונות הרחבים" : "The empty space before work began: a view along its wide windows";
  return (
    <Section id="case-study" labelledBy="case-study-title" tone="surface">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <H2 id="case-study-title">{title}</H2>
          <Lead>{body}</Lead>
          {facts?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {facts.map((f) => (
                <li key={f} className="px-3 py-1.5 bg-[#f7f6f3] border border-neutral-900/10 text-[15px] text-neutral-900">
                  {f}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PrimaryButton href={buttonHref} track="cta-case-study">
              {button}
            </PrimaryButton>
            <TextLink href={pdfHref(lang)} external download track={`pdf-download-${lang}`}>
              {pdf}
            </TextLink>
          </div>
        </div>
        <div className="lg:col-span-6 grid grid-cols-2 gap-3">
          {[before, after].map((stem, i) => (
            <figure key={stem}>
              <div className="aspect-[3/4] overflow-hidden bg-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mediaUrl(`thumb/${stem}.webp`)} alt={i === 0 ? beforeAlt : galleryAlt(stem, lang)} loading="lazy" decoding="async" width={560} height={747} className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-2 text-[15px] text-neutral-700">{labels[i]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Donor teaser (home) ---------- */
export function DonorTeaser({ title, body, button, href }: { title: string; body: string; button: string; href: string }) {
  return (
    <Section id="donors" labelledBy="donors-title">
      <div className="max-w-3xl">
        <H2 id="donors-title">{title}</H2>
        <Lead>{body}</Lead>
        <div className="mt-7">
          <SecondaryButton href={href} track="cta-donor-teaser">
            {button}
          </SecondaryButton>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Audiences (home, SCP B.2) ---------- */
export function Audiences({
  title,
  intro,
  items,
  footnote,
}: {
  title: string;
  intro: string;
  items: { title: string; body: string; link?: { label: string; href: string } }[];
  footnote: string;
}) {
  return (
    <Section id="audiences" labelledBy="audiences-title" tone="surface">
      <H2 id="audiences-title">{title}</H2>
      <Lead>{intro}</Lead>
      <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900/10 border border-neutral-900/10">
        {items.map((a, i) => (
          // Let the last card fill the row so no empty grey cell is left in the grid.
          <li
            key={a.title}
            className={`bg-white p-6 ${i === items.length - 1 && items.length % 2 === 1 ? "sm:col-span-2" : ""} ${i === items.length - 1 && items.length % 3 === 2 ? "lg:col-span-2" : i === items.length - 1 && items.length % 3 === 1 ? "lg:col-span-3" : i === items.length - 1 ? "lg:col-span-1" : ""}`}
          >
            <p className="text-sm text-neutral-600 mb-1 tabular-nums" aria-hidden>
              {i + 1}
            </p>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">{a.title}</h3>
            <p className="text-[15px] text-neutral-700 leading-relaxed">{a.body}</p>
            {a.link ? (
              <p className="mt-3">
                <TextLink href={a.link.href}>{a.link.label} ←</TextLink>
              </p>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-6 text-[15px] text-neutral-700">{footnote}</p>
    </Section>
  );
}

/* ---------- Pillars: how the rooms work (all panels visible, no JS needed) ---------- */
export function Pillars({ title, items }: { title: string; items: { tag: string; title: string; body: string; points: string[] }[] }) {
  return (
    <Section id="offer" labelledBy="offer-title">
      <H2 id="offer-title">{title}</H2>
      <div className="mt-8 grid lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <article key={p.title} className="quiet-card p-6 sm:p-7 flex flex-col">
            <p className="text-sm font-medium text-neutral-700 mb-2">{p.tag}</p>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-neutral-900 mb-3">{p.title}</h3>
            <p className="text-[15px] text-neutral-700 leading-relaxed mb-5">{p.body}</p>
            <ul className="mt-auto space-y-2">
              {p.points.map((pt) => (
                <li key={pt} className="text-[15px] text-neutral-800 border-t border-neutral-900/10 pt-2">
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Process (SCP B.6) ---------- */
export function Process({ title, steps, timeline }: { title: string; steps: { title: string; body: string }[]; timeline: string }) {
  return (
    <Section id="process" labelledBy="process-title" tone="surface">
      <H2 id="process-title">{title}</H2>
      <ol className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-5 max-w-5xl">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="shrink-0 w-9 h-9 flex items-center justify-center bg-neutral-900 text-white text-[15px] tabular-nums" aria-hidden>
              {i + 1}
            </span>
            <p className="text-[16px] text-neutral-800 leading-relaxed pt-1">
              <strong className="font-medium text-neutral-900">{s.title}</strong>
              {s.body ? ` ${s.body}` : null}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-[15px] text-neutral-700 max-w-3xl">{timeline}</p>
    </Section>
  );
}

/* ---------- Visit invitation (SCP B.6) ---------- */
export function Visit({ title, body, button }: { title: string; body: string; button: string }) {
  return (
    <Section id="visit" labelledBy="visit-title">
      <div className="quiet-card p-7 sm:p-10 max-w-4xl">
        <H2 id="visit-title">{title}</H2>
        <Lead>{body}</Lead>
        <div className="mt-7">
          <PrimaryButton href="#contact" track="visit-request" prefill="visit">
            {button}
          </PrimaryButton>
        </div>
      </div>
    </Section>
  );
}

/* ---------- About (SCP B.6). Photo shows only once PENDING.aboutPhoto is set. ---------- */
export function About({ title, paragraphs, photoAlt }: { title: string; paragraphs: string[]; photoAlt: string }) {
  const photo = PENDING.aboutPhoto;
  return (
    <Section id="about" labelledBy="about-title" tone="surface">
      <div className={`grid gap-10 ${photo ? "md:grid-cols-12 items-start" : ""}`}>
        {photo ? (
          <div className="md:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaUrl(photo.src)} width={photo.width} height={photo.height} alt={photoAlt} loading="lazy" className="w-full h-auto" />
          </div>
        ) : null}
        <div className={photo ? "md:col-span-8" : "max-w-3xl"}>
          <H2 id="about-title">{title}</H2>
          <div className="space-y-4">
            {paragraphs.map((p) => (
              <p key={p} className="text-[17px] text-neutral-800 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ (SCP B.10): native <details>, works without JS ---------- */
export function Faq({ lang, title, items }: { lang: "he" | "en"; title: string; items: FaqItem[] }) {
  const warranty = PENDING.warranty?.[lang];
  return (
    <Section id="faq" labelledBy="faq-title">
      <H2 id="faq-title">{title}</H2>
      <div className="mt-8 max-w-4xl divide-y divide-neutral-900/10 border-y border-neutral-900/10">
        {items.map((f) => (
          <details key={f.id} className="group py-1">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[17px] font-medium text-neutral-900 [&::-webkit-details-marker]:hidden">
              <h3 className="font-medium">{f.q}</h3>
              <span aria-hidden className="shrink-0 text-xl leading-none text-neutral-700 group-open:rotate-45 motion-safe:transition-transform">
                +
              </span>
            </summary>
            <p className="pb-5 text-[16px] text-neutral-700 leading-relaxed max-w-3xl">
              {f.a}
              {f.id === 7 && warranty ? ` ${warranty}` : null}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function faqJsonLd(items: FaqItem[], lang: "he" | "en") {
  const warranty = PENDING.warranty?.[lang];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.id === 7 && warranty ? `${f.a} ${warranty}` : f.a },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/* ---------- Page header for inner pages ---------- */
export function PageHeader({ eyebrow, h1, subtitle, children }: { eyebrow?: string; h1: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section aria-labelledby="page-title" className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12">
      <div className="mx-auto max-w-6xl">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 id="page-title" className="font-display text-[2rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] font-medium text-neutral-900 mb-4 max-w-4xl text-balance ltr:tracking-tight">
          {h1}
        </h1>
        {subtitle ? <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl leading-relaxed">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}
