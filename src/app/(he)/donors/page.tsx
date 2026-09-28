import { SiteChrome } from "@/components/site/SiteChrome";
import { PageHeader, Visit, pdfHref } from "@/components/sections2/Blocks";
import { Section, H2 } from "@/components/ui/Section";
import { PrimaryButton, SecondaryButton, TextLink } from "@/components/ui/Buttons";
import { FormBlock } from "@/components/pages/FormBlock";
import { heDonors } from "@/content/he-pages";
import { heVisit } from "@/content/he";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "he",
  path: "/donors/",
  altPath: "/en/donors/",
  title: "חדר מוסיקה טיפולי כפרויקט תרומה והנצחה | אילן זיו",
  description: "איך מממנים חדר לטיפול במוזיקה בתרומה ייעודית, ומה אני מכין לגיוס המשאבים: עמוד פרויקט לתורם, הדמיה, תכולה ולוח זמנים.",
});

const d = heDonors;

export default function Page() {
  return (
    <SiteChrome lang="he" altHref="/en/donors/">
      <PageHeader h1={d.h1} subtitle={d.subtitle}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PrimaryButton href="#contact" track="donor-brief-request" prefill="donor">
            {d.primary}
          </PrimaryButton>
          <TextLink href={pdfHref("he")} external download track="pdf-download-he">
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
      </Section>

      <Section labelledBy="donor-get-title">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
          <div>
            <H2 id="donor-get-title">{d.getTitle}</H2>
            <ul className="space-y-2 list-disc ps-5 marker:text-neutral-500">
              {d.get.map((g) => (
                <li key={g} className="text-[16px] text-neutral-800">
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{d.dedicationTitle}</h3>
              <p className="text-[16px] text-neutral-800 leading-relaxed">{d.dedication}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{d.companiesTitle}</h3>
              <p className="text-[16px] text-neutral-800 leading-relaxed">{d.companies}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">{d.startSmallTitle}</h3>
              <p className="text-[16px] text-neutral-800 leading-relaxed">
                {d.startSmall}{" "}
                <TextLink href="/services/">{d.startSmallLink}</TextLink>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <PrimaryButton href="#contact" track="donor-brief-request" prefill="donor">
            {d.primary}
          </PrimaryButton>
          <SecondaryButton href={pdfHref("he")} external download track="pdf-download-he">
            {d.secondary}
          </SecondaryButton>
        </div>
      </Section>

      <Visit {...heVisit} />
      <FormBlock lang="he" page="/donors/" />
    </SiteChrome>
  );
}
