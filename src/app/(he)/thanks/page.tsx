import { SiteChrome } from "@/components/site/SiteChrome";
import { PrimaryButton } from "@/components/ui/Buttons";
import { heThanks } from "@/content/he-pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "he",
  path: "/thanks/",
  altPath: "/en/thanks/",
  title: "תודה | Music Rooms – אילן זיו",
  description: "הפנייה התקבלה.",
  noindex: true,
});

export default function Page() {
  return (
    <SiteChrome lang="he" altHref="/en/thanks/" hasForm={false}>
      <section aria-labelledby="page-title" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h1 id="page-title" className="font-display text-4xl sm:text-5xl font-medium text-neutral-900 mb-5">
            {heThanks.h1}
          </h1>
          <p className="text-lg text-neutral-800 leading-relaxed mb-8">{heThanks.body}</p>
          <PrimaryButton href="/adi-negev/" track="cta-case-study">
            {heThanks.link}
          </PrimaryButton>
        </div>
      </section>
    </SiteChrome>
  );
}
