import { SiteChrome } from "@/components/site/SiteChrome";
import { Hero } from "@/components/sections2/Hero";
import { About, Audiences, CaseTeaser, DonorTeaser, Faq, JsonLd, Pillars, Process, Visit, faqJsonLd } from "@/components/sections2/Blocks";
import { RoomTour } from "@/components/sections2/RoomTour";
import { ContactForm } from "@/components/sections2/ContactForm";
import { Testimonial } from "@/components/Testimonial";
import { heAbout, heAudiences, heCaseTeaser, heDonorTeaser, heFaq, heFaqTitle, heForm, heHero, hePillars, heProcess, heTour, heVisit } from "@/content/he";
import { pageMeta } from "@/lib/seo";
import { SITE, pendingWarnings } from "@/lib/site-config";

export const metadata = pageMeta({
  lang: "he",
  path: "/",
  altPath: "/en/",
  isHome: true,
  title: "חדרי מוסיקה טיפוליים למוסדות: תכנון והקמה | אילן זיו",
  description: "תכנון והקמה של חדרי מוסיקה טיפוליים למוסדות שיקום, לבתי חולים ולארגונים: סקר אקוסטי, תשתיות, אקוסטיקה ובקרה מטאבלט. פרויקטים בכל הארץ.",
  og: "og-he-home.jpg",
});

const homeFaq = heFaq.filter((f) => f.id !== 10);

if (process.env.NODE_ENV === "production") {
  const w = pendingWarnings();
  if (w.length) console.warn(`[site-config] pending values from Ilan: ${w.join("; ")}`);
}

export default function HomePage() {
  return (
    <SiteChrome lang="he" altHref="/en/">
      <Hero
        lang="he"
        eyebrow={heHero.eyebrow}
        h1={heHero.h1}
        body={heHero.body}
        proof={heHero.proof}
        primary={heHero.primary}
        secondary={heHero.secondary}
        secondaryHref="/adi-negev/"
        textLink={{ label: heHero.textLink, href: "/donors/" }}
        smallLine={heHero.smallLine}
        imageAlt={heHero.imageAlt}
        selectorTitle={heHero.selectorTitle}
        selector={heHero.selector}
      />
      <CaseTeaser lang="he" {...heCaseTeaser} buttonHref="/adi-negev/" />
      <DonorTeaser {...heDonorTeaser} href="/donors/" />
      <Audiences {...heAudiences} />
      <Pillars {...hePillars} />
      <RoomTour lang="he" copy={heTour} />
      <Process {...heProcess} />
      <Visit {...heVisit} />
      <Testimonial />
      <About {...heAbout} />
      <Faq lang="he" title={heFaqTitle} items={homeFaq} />
      <ContactForm
        lang="he"
        page="/"
        copy={heForm}
        title={heForm.title}
        intro={heForm.intro}
        privacyHref="/privacy/"
        thanksUrl={`${SITE.url}/thanks/`}
        caseStudyHref="/adi-negev/"
      />
      <JsonLd data={faqJsonLd(homeFaq, "he")} />
    </SiteChrome>
  );
}
