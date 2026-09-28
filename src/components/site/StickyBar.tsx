import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site-config";

/**
 * Mobile-only bottom bar (SCP B.1): needs-assessment CTA + WhatsApp. There is no separate Call
 * button: every phone link on the site opens WhatsApp (Ilan, Sep 2026).
 * A spacer of the same height keeps it from covering content.
 */
export function StickyBar({
  ctaHref,
  copy,
}: {
  ctaHref: string;
  copy: { cta: string; whatsapp: string; ctaAria: string; whatsappAria: string };
}) {
  return (
    <>
      <div aria-hidden className="h-16 md:hidden" />
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-neutral-900/15 bg-[#f7f6f3]/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-[1.6fr_1fr] h-16">
          <li className="flex">
            <a
              href={ctaHref}
              aria-label={copy.ctaAria}
              data-track="cta-sticky-bar"
              className="flex-1 flex items-center justify-center bg-neutral-900 text-white text-[15px] font-medium"
            >
              {copy.cta}
            </a>
          </li>
          <li className="flex">
            <a
              href={SITE.phone.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.whatsappAria}
              className="flex-1 flex items-center justify-center gap-2 text-neutral-900 text-[15px] font-medium"
            >
              <MessageCircle className="w-5 h-5" aria-hidden />
              <span aria-hidden>{copy.whatsapp}</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
