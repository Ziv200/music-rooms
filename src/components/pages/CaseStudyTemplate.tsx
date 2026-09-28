import { SiteChrome } from "@/components/site/SiteChrome";
import { JsonLd, PageHeader, pdfHref } from "@/components/sections2/Blocks";
import { Section, H2, Lead } from "@/components/ui/Section";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/Buttons";
import { RoomTour } from "@/components/sections2/RoomTour";
import { Gallery } from "@/components/sections2/Gallery";
import { Testimonial } from "@/components/Testimonial";
import { FormBlock } from "./FormBlock";
import { getMediaByPhase, TOUR_VIDEO } from "@/lib/media";
import { PENDING, SITE } from "@/lib/site-config";
import { heTour } from "@/content/he";
import { enTour } from "@/content/en";

type Phase = { id: string; tag: string; title: string; date: string; body: string };
export type CaseStudyCopy = {
  h1: string;
  subtitle: string;
  factsTitle?: string;
  facts: { label: string; value: string }[];
  roomSizeLabel: string;
  blocks: { title: string; body: string }[];
  roomContentsTitle?: string;
  roomContents?: string[];
  whyTitle?: string;
  why?: string;
  atmos: string;
  galleryTitle: string;
  galleryLabel: string;
  phases: Phase[];
  visitTitle: string;
  visit: string;
  visitButton: string;
  closing: string;
  closingButton: string;
  pdf: string;
};

export function CaseStudyTemplate({ lang, c, description }: { lang: "he" | "en"; c: CaseStudyCopy; description: string }) {
  const he = lang === "he";
  const path = he ? "/adi-negev/" : "/en/adi-negev/";
  const roomSize = PENDING.adiRoomSize?.[lang];
  const facts = roomSize ? [...c.facts.slice(0, 4), { label: c.roomSizeLabel, value: roomSize }, ...c.facts.slice(4)] : c.facts;
  const phaseMedia = getMediaByPhase();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      inLanguage: lang,
      headline: c.h1,
      description,
      image: [`${SITE.url}/og/og-${lang}-adi-negev.jpg`, `${SITE.url}/media/hero-1400.webp`],
      datePublished: "2026-08-01",
      dateModified: "2026-09-28",
      author: { "@type": "Person", name: he ? "אילן זיו" : "Ilan Ziv", url: SITE.url + (he ? "/" : "/en/") },
      publisher: { "@type": "Organization", name: "Music Rooms – Ilan Ziv", url: SITE.url + "/" },
      mainEntityOfPage: SITE.url + path,
      about: { "@type": "Hospital", name: he ? "עדי נגב – נחלת ערן" : "ADI Negev–Nahalat Eran" },
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      inLanguage: lang,
      name: he ? "סיור בסטודיו הטיפול במוסיקה בעדי נגב – נחלת ערן" : "Walkthrough of the music therapy studio at ADI Negev–Nahalat Eran",
      description: he ? heTour.subtitle : enTour.subtitle,
      thumbnailUrl: `${SITE.url}${TOUR_VIDEO.poster.replace(/^.*\/media\//, "/media/")}`,
      contentUrl: `${SITE.url}${TOUR_VIDEO.src.replace(/^.*\/media\//, "/media/")}`,
      uploadDate: "2026-08-01",
      duration: "PT4M2S",
    },
  ];

  return (
    <SiteChrome lang={lang} altHref={he ? "/en/adi-negev/" : "/adi-negev/"}>
      <PageHeader eyebrow={he ? "מקרה בוחן" : "Case study"} h1={c.h1} subtitle={c.subtitle}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PrimaryButton href="#contact" track="visit-request" prefill="visit">
            {c.visitButton}
          </PrimaryButton>
          <TextLink href={pdfHref(lang)} external download track={`pdf-download-${lang}`}>
            {c.pdf}
          </TextLink>
        </div>
      </PageHeader>

      <Section labelledBy="facts-title" tone="surface">
        <H2 id="facts-title" className={he ? "" : "sr-only"}>
          {c.factsTitle ?? "Key facts"}
        </H2>
        <dl className="grid md:grid-cols-2 gap-px bg-neutral-900/10 border border-neutral-900/10 max-w-5xl">
          {facts.map((f, i) => (
            <div key={f.label} className={`bg-white p-5 ${i === facts.length - 1 && facts.length % 2 === 1 ? "md:col-span-2" : ""}`}>
              <dt className="text-sm font-medium text-neutral-600 mb-1">{f.label}</dt>
              <dd className="text-[16px] text-neutral-900 leading-relaxed">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section labelledBy="story-title">
        <h2 id="story-title" className="sr-only">
          {he ? "האתגר והפתרון" : "Challenge and solution"}
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
          {c.blocks.map((b) => (
            <div key={b.title}>
              <h3 className="font-display text-2xl font-medium text-neutral-900 mb-3">{b.title}</h3>
              <p className="text-[17px] text-neutral-800 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
        {c.roomContents ? (
          <div className="mt-12 max-w-3xl">
            <h3 className="font-display text-2xl font-medium text-neutral-900 mb-4">{c.roomContentsTitle}</h3>
            <ul className="space-y-2 list-disc ps-5 marker:text-neutral-500">
              {c.roomContents.map((r) => (
                <li key={r} className="text-[16px] text-neutral-800 leading-relaxed">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {c.why ? (
          <div className="mt-12 max-w-3xl">
            <h3 className="font-display text-2xl font-medium text-neutral-900 mb-3">{c.whyTitle}</h3>
            <p className="text-[17px] text-neutral-800 leading-relaxed">{c.why}</p>
          </div>
        ) : null}
        <p className="mt-10 max-w-3xl text-[16px] text-neutral-700 leading-relaxed border-s-2 border-neutral-900/20 ps-4">{c.atmos}</p>
      </Section>

      <RoomTour lang={lang} copy={he ? heTour : enTour} />
      <Gallery lang={lang} title={c.galleryTitle} label={c.galleryLabel} phases={c.phases} phaseMedia={phaseMedia} />
      <Testimonial />

      <Section id="visit" labelledBy="visit-title">
        <div className="quiet-card p-7 sm:p-10 max-w-4xl">
          <H2 id="visit-title">{c.visitTitle}</H2>
          <Lead>{c.visit}</Lead>
          <div className="mt-7">
            <PrimaryButton href="#contact" track="visit-request" prefill="visit">
              {c.visitButton}
            </PrimaryButton>
          </div>
        </div>
      </Section>

      <Section labelledBy="closing-title" tone="surface">
        <div className="max-w-3xl">
          <H2 id="closing-title">{c.closing}</H2>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <PrimaryButton href="#contact" track="cta-needs-assessment">
              {c.closingButton}
            </PrimaryButton>
            <SecondaryButton href={pdfHref(lang)} external download track={`pdf-download-${lang}`}>
              {c.pdf}
            </SecondaryButton>
          </div>
        </div>
      </Section>

      <FormBlock lang={lang} page={path} />
      <JsonLd data={jsonLd} />
    </SiteChrome>
  );
}
