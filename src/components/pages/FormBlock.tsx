import { ContactForm } from "@/components/sections2/ContactForm";
import { heForm } from "@/content/he";
import { enForm } from "@/content/en";
import { SITE } from "@/lib/site-config";

/** The contact form wired for a given page (sets the hidden `page` field). */
export function FormBlock({ lang, page }: { lang: "he" | "en"; page: string }) {
  const he = lang === "he";
  const copy = he ? heForm : enForm;
  return (
    <ContactForm
      lang={lang}
      page={page}
      copy={copy}
      title={copy.title}
      intro={copy.intro}
      privacyHref={he ? "/privacy/" : "/en/privacy/"}
      thanksUrl={`${SITE.url}${he ? "/thanks/" : "/en/thanks/"}`}
      caseStudyHref={he ? "/adi-negev/" : "/en/adi-negev/"}
    />
  );
}
