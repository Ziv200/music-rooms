import Link from "next/link";
import { SITE } from "@/lib/site-config";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Footer({
  lang,
  copy,
  langSwitch,
}: {
  lang: "he" | "en";
  copy: {
    brand: string;
    tagline: string;
    phoneLabel: string;
    area: string;
    links: { label: string; href: string }[];
    copyright: string;
  };
  langSwitch: { label: string; href: string; hrefLang: string };
}) {
  return (
    <footer className="border-t border-neutral-900/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-5 text-[15px] text-neutral-700">
        <p>
          <span className="font-display text-lg font-medium text-neutral-900">{copy.brand}</span>
          <span aria-hidden> · </span>
          <span>{copy.tagline}</span>
        </p>
        <p className="leading-relaxed">
          {copy.phoneLabel}{" "}
          <WhatsAppLink lang={lang} className="underline underline-offset-4 whitespace-nowrap" />
          <span aria-hidden> · </span>
          <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
            {SITE.email}
          </a>
          {copy.area ? (
            <>
              <span aria-hidden> · </span>
              {copy.area}
            </>
          ) : null}
        </p>
        <nav aria-label={lang === "he" ? "קישורים משפטיים" : "Legal"}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {copy.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline underline-offset-4 hover:text-neutral-900">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={langSwitch.href}
                hrefLang={langSwitch.hrefLang}
                lang={langSwitch.hrefLang}
                data-track={`lang-switch-${langSwitch.hrefLang}`}
                className="underline underline-offset-4 hover:text-neutral-900"
              >
                {langSwitch.label}
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-neutral-600">{copy.copyright}</p>
      </div>
    </footer>
  );
}
