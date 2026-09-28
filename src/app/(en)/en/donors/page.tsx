import { SiteChrome } from "@/components/site/SiteChrome";
import { PageHeader, pdfHref } from "@/components/sections2/Blocks";
import { Section, H2, Lead } from "@/components/ui/Section";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/Buttons";
import { FormBlock } from "@/components/pages/FormBlock";
import { enCommon, enDonors } from "@/content/en";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "en",
  path: "/en/donors/",
  altPath: "/donors/",
  title: "Fund a Music Therapy Room in Israel | Ilan Ziv",
  description: "How a dedicated gift can fund a named music therapy room at an Israeli institution, and the one-page project brief I prepare for your development office.",
});

const d = enDonors;

export default function Page() {
  return (
    <SiteChrome lang="en" altHref="/donors/">
      <PageHeader h1={d.h1} subtitle={d.subtitle}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PrimaryButton href="#contact" track="donor-brief-request" prefill="donor">
            {d.primary}
          </PrimaryButton>
          <TextLink href={pdfHref("en")} external download track="pdf-download-en">
            {d.secondary}
          </TextLink>
        </div>
      </PageHeader>

      <Section labelledBy="donor-steps-title" tone="surface">
        <p className="max-w-3xl text-[17px] text-neutral-800 leading-relaxed mb-10">{d.intro}</p>
        <H2 id="donor-steps-title">{d.stepsTitle}</H2>
        <ol className="mt-6 space-y-5 max-w-3xl">
          {d.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span aria-hidden className="shrink-0 w-9 h-9 flex items-center justify-center bg-neutral-900 text-white text-[15px] tabular-nums">
                {i + 1}
              </span>
              <p className="text-[16px] text-neutral-800 leading-relaxed pt-1">
                <strong className="font-medium text-neutral-900">{s.title}</strong> {s.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10 max-w-3xl">
          <h3 className="text-lg font-medium text-neutral-900 mb-2">{d.dedicationTitle}</h3>
          <p className="text-[16px] text-neutral-800 leading-relaxed">{d.dedication}</p>
        </div>
      </Section>

      <Section id="visit" labelledBy="visit-title">
        <div className="quiet-card p-7 sm:p-10 max-w-4xl">
          <H2 id="visit-title">{d.visitTitle}</H2>
          <Lead>{d.visit}</Lead>
          <div className="mt-7 flex flex-wrap gap-4">
            <PrimaryButton href="#contact" track="visit-request" prefill="visit">
              {enCommon.ctaVisit}
            </PrimaryButton>
            <SecondaryButton href={pdfHref("en")} external download track="pdf-download-en">
              {d.secondary}
            </SecondaryButton>
          </div>
        </div>
      </Section>

      <FormBlock lang="en" page="/en/donors/" />
    </SiteChrome>
  );
}
