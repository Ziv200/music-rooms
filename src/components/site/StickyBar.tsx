import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site-config";

/** Mobile-only bottom bar (SCP B.1). A spacer of the same height keeps it from covering content. */
export function StickyBar({
  ctaHref,
  copy,
}: {
  ctaHref: string;
  copy: { cta: string; whatsapp: string; call: string; ctaAria: string; whatsappAria: string; callAria: string };
}) {
  return (
    <>
      <div aria-hidden className="h-16 md:hidden" />
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-neutral-900/15 bg-[#f7f6f3]/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-[1.4fr_1fr_1fr] h-16">
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
              aria-label={copy.whatsappAria}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 text-neutral-900 text-[13px]"
            >
              <MessageCircle className="w-5 h-5" aria-hidden />
              <span aria-hidden>{copy.whatsapp}</span>
            </a>
          </li>
          <li className="flex border-s border-neutral-900/10">
            <a
              href={SITE.phone.tel}
              aria-label={copy.callAria}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 text-neutral-900 text-[13px]"
            >
              <Phone className="w-5 h-5" aria-hidden />
              <span aria-hidden>{copy.call}</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
