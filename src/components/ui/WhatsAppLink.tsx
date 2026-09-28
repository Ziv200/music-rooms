import type { ReactNode } from "react";
import { SITE } from "@/lib/site-config";

/**
 * The phone number as a link. Every phone link on the site opens a WhatsApp chat (Ilan, Sep 2026),
 * never a phone-call link. The visible number stays; the accessible name says it is WhatsApp.
 */
export function WhatsAppLink({ lang, className = "underline underline-offset-4", children }: { lang: "he" | "en"; className?: string; children?: ReactNode }) {
  return (
    <a href={SITE.phone.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={SITE.phone.whatsappAria[lang]} className={className} dir="ltr">
      {children ?? (lang === "he" ? SITE.phone.display : SITE.phone.intl)}
    </a>
  );
}
