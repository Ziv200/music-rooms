import { SiteChrome } from "@/components/site/SiteChrome";
import { PrimaryButton } from "@/components/ui/Buttons";
import { enThanks } from "@/content/en";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "en",
  path: "/en/thanks/",
  altPath: "/thanks/",
  title: "Thank you | Music Rooms – Ilan Ziv",
  description: "Your inquiry was received.",
  noindex: true,
});

export default function Page() {
  return (
    <SiteChrome lang="en" altHref="/thanks/" hasForm={false}>
      <section aria-labelledby="page-title" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h1 id="page-title" className="font-display text-4xl sm:text-5xl font-medium text-neutral-900 mb-5">
            {enThanks.h1}
          </h1>
          <p className="text-lg text-neutral-800 leading-relaxed mb-8">{enThanks.body}</p>
          <PrimaryButton href="/en/adi-negev/" track="cta-case-study">
            {enThanks.link}
          </PrimaryButton>
        </div>
      </section>
    </SiteChrome>
  );
}
