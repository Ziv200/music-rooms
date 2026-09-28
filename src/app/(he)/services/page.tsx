import { SiteChrome } from "@/components/site/SiteChrome";
import { PageHeader } from "@/components/sections2/Blocks";
import { Section } from "@/components/ui/Section";
import { PrimaryButton } from "@/components/ui/Buttons";
import { FormBlock } from "@/components/pages/FormBlock";
import { heServices } from "@/content/he-pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "he",
  path: "/services/",
  title: "מסלולים: פרויקט מלא, חדר ליבה, שדרוג וסקר | אילן זיו",
  description: "ארבע דרכים להתחיל חדר מוסיקה מודולרי: פרויקט מלא, חדר ליבה בחלל קיים, שדרוג לחדר קיים, או סקר ותכנון. מתחילים באבחון ללא עלות.",
});

const s = heServices;

export default function Page() {
  return (
    <SiteChrome lang="he" altHref="/en/">
      <PageHeader eyebrow="מסלולים" h1={s.h1} subtitle={s.intro} />
      <Section labelledBy="options-title" tone="surface">
        <h2 id="options-title" className="sr-only">
          המסלולים
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {s.options.map((o) => (
            <article key={o.name} className="quiet-card p-6 sm:p-8 flex flex-col">
              <h3 className="font-display text-2xl font-medium text-neutral-900">{o.name}</h3>
              {o.tagline ? <p className="mt-1 text-[15px] font-medium text-neutral-700">{o.tagline}</p> : null}
              <p className="mt-4 text-[16px] text-neutral-800 leading-relaxed">{o.body}</p>
              <p className="mt-auto pt-5 text-[15px] text-neutral-700 border-t border-neutral-900/10 mt-5">
                <strong className="font-medium text-neutral-900">{s.fitLabel}</strong> {o.fit}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-[17px] text-neutral-800 leading-relaxed">{s.bottom}</p>
        <div className="mt-6">
          <PrimaryButton href="#contact" track="cta-needs-assessment">
            {s.button}
          </PrimaryButton>
        </div>
      </Section>
      <FormBlock lang="he" page="/services/" />
    </SiteChrome>
  );
}
