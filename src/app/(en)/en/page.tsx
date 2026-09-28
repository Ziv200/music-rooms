import { SiteChrome } from "@/components/site/SiteChrome";
import { Hero } from "@/components/sections2/Hero";
import { About, CaseTeaser, DonorTeaser, Faq, JsonLd, Process, Visit, faqJsonLd } from "@/components/sections2/Blocks";
import { Testimonial } from "@/components/Testimonial";
import { FormBlock } from "@/components/pages/FormBlock";
import { enAbout, enCaseTeaser, enDonorTeaser, enFaq, enFaqTitle, enHero, enProcess, enVisit } from "@/content/en";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "en",
  path: "/en/",
  altPath: "/",
  isHome: true,
  title: "Music Therapy Room Design & Build in Israel | Ilan Ziv",
  description: "End-to-end design and build of music therapy rooms for Israeli institutions. Staff run the room from a tablet. Latest project: ADI Negev–Nahalat Eran.",
  og: "og-en-home.jpg",
});

export default function Page() {
  return (
    <SiteChrome lang="en" altHref="/">
      <Hero lang="en" {...enHero} secondaryHref="/en/adi-negev/" />
      <CaseTeaser lang="en" {...enCaseTeaser} buttonHref="/en/adi-negev/" />
      <DonorTeaser {...enDonorTeaser} href="/en/donors/" />
      <Process {...enProcess} />
      <Visit {...enVisit} />
      <Testimonial />
      <About {...enAbout} />
      <Faq lang="en" title={enFaqTitle} items={enFaq} />
      <FormBlock lang="en" page="/en/" />
      <JsonLd data={faqJsonLd(enFaq, "en")} />
    </SiteChrome>
  );
}
