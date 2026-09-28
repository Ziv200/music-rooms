import { SiteChrome } from "@/components/site/SiteChrome";
import { Faq, JsonLd, PageHeader, faqJsonLd } from "@/components/sections2/Blocks";
import { Section, H2 } from "@/components/ui/Section";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/Buttons";
import { FormBlock } from "./FormBlock";
import { heFaq, heFaqTitle } from "@/content/he";
import type { PersonaPage } from "@/content/he-pages";
import { galleryAlt } from "@/content/gallery-alt";
import { mediaUrl } from "@/lib/media";
import manifest from "@/lib/media-manifest.json";

const BUTTON_MAP = {
  primary: { track: "cta-needs-assessment", prefill: undefined },
  visit: { track: "visit-request", prefill: "visit" as const },
  donor: { track: "donor-brief-request", prefill: "donor" as const },
  intro: { track: "cta-intro-call", prefill: undefined },
  hightech: { track: "cta-office-planning", prefill: undefined },
};

/** Hebrew persona landing page (SCP B.9): header, body, proof, FAQ subset, form. */
export function PersonaTemplate({ p }: { p: PersonaPage }) {
  const faq = heFaq.filter((f) => p.faq.includes(f.id));
  const img = manifest.find((m) => m.stem === p.image);
  const isPortrait = img ? img.height > img.width : false;
  return (
    <SiteChrome lang="he" altHref="/en/">
      <PageHeader eyebrow={p.eyebrow} h1={p.h1}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {p.buttons.map((b, i) => {
            const cfg = BUTTON_MAP[b.kind];
            const Btn = i === 0 ? PrimaryButton : SecondaryButton;
            return (
              <Btn key={b.label} href="#contact" track={cfg.track} prefill={cfg.prefill}>
                {b.label}
              </Btn>
            );
          })}
        </div>
      </PageHeader>

      <Section labelledBy="persona-body-title" tone="surface">
        <h2 id="persona-body-title" className="sr-only">
          איך זה עובד
        </h2>
        <div className={`grid gap-10 ${img ? "lg:grid-cols-12 items-start" : ""}`}>
          <div className={`${img ? "lg:col-span-7" : "max-w-3xl"} space-y-5`}>
            {p.paragraphs.map((t) => (
              <p key={t} className="text-[17px] text-neutral-800 leading-relaxed">
                {t}
              </p>
            ))}
            {p.deliverables ? (
              <div className="pt-2">
                <h3 className="text-lg font-medium text-neutral-900 mb-3">{p.deliverables.title}</h3>
                <ul className="space-y-2 list-disc ps-5 marker:text-neutral-500">
                  {p.deliverables.items.map((it) => (
                    <li key={it} className="text-[16px] text-neutral-800 leading-relaxed">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          {img ? (
            <figure className="lg:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaUrl(`large/${img.stem}.webp`)}
                alt={galleryAlt(img.stem, "he")}
                width={isPortrait ? 1200 : 1600}
                height={isPortrait ? 1600 : 1200}
                loading="lazy"
                decoding="async"
                className={`w-full h-auto object-cover ${isPortrait ? "aspect-[4/5]" : "aspect-[4/3]"}`}
              />
            </figure>
          ) : null}
        </div>
      </Section>

      {[p.management, p.timing, p.proof].filter(Boolean).map((blk, i) => (
        <Section key={i} id={blk === p.management ? "management" : undefined} labelledBy={`persona-block-${i}`} tone={i % 2 ? "surface" : undefined}>
          <div className="max-w-3xl">
            {blk!.title ? <H2 id={`persona-block-${i}`}>{blk!.title}</H2> : <h2 id={`persona-block-${i}`} className="sr-only">מהשטח</h2>}
            <p className="text-[17px] text-neutral-800 leading-relaxed">{blk!.body}</p>
            {blk === p.proof ? (
              <p className="mt-5">
                <TextLink href="/adi-negev/" track="cta-case-study">
                  למקרה הבוחן המלא ←
                </TextLink>
              </p>
            ) : null}
          </div>
        </Section>
      ))}

      <Faq lang="he" title={heFaqTitle} items={faq} />
      <FormBlock lang="he" page={p.page} />
      <JsonLd data={faqJsonLd(faq, "he")} />
    </SiteChrome>
  );
}
