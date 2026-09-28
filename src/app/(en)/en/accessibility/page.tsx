import { ProsePage, H, P, A } from "@/components/pages/Prose";
import { pageMeta } from "@/lib/seo";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { ACCESSIBILITY_REVIEW_DATE, SITE } from "@/lib/site-config";

export const metadata = pageMeta({
  lang: "en",
  path: "/en/accessibility/",
  altPath: "/accessibility/",
  title: "Accessibility Statement | Music Rooms – Ilan Ziv",
  description: "Accessibility level, adjustments made, known limitations and contact details for the accessibility coordinator.",
});

const d = ACCESSIBILITY_REVIEW_DATE.en;

export default function Page() {
  return (
    <ProsePage lang="en" altHref="/accessibility/" title="Accessibility Statement" updated={`Last updated: ${d}`}>
      <P>
        Music Rooms – Ilan Ziv designs and builds music rooms for rehabilitation centers, hospitals and organizations. I want everyone, including people with disabilities, to be able to use this
        site comfortably. The site has been made accessible, as far as possible, in line with Israeli Standard SI 5568 (based on WCAG 2.0) at level AA, and the Israeli Equal Rights for Persons with
        Disabilities (Service Accessibility Adjustments) Regulations, 2013. The last review was carried out on {d}.
      </P>
      <H>What has been done</H>
      <P>
        Clear heading structure and reading order; full keyboard navigation with a visible focus indicator; descriptive alternative text for images; labeled form fields with announced error messages;
        checked color contrast and text size; content that stays visible with reduced motion or without JavaScript; captions for the silent room-tour video; a responsive layout; and an accessibility
        toolbar (the button in the corner of the screen) for text size, contrast, link highlighting, pausing animations and more. Your preferences are stored only in your browser.
      </P>
      <H>Known limitations</H>
      <P>
        Some parts may not yet be fully accessible. The latest review used automated testing tools and keyboard navigation; it has not yet included testing with screen readers such as NVDA or
        VoiceOver. Some descriptions of on-site documentation photos are general, and the case study PDF is a tagged document that has not yet been checked with a screen reader. Please let me know
        and I&apos;ll fix it.
      </P>
      <H>Contact the accessibility coordinator</H>
      <P>
        Ilan Ziv · Phone &amp; WhatsApp: <WhatsAppLink lang="en" /> · <A href={`mailto:${SITE.email}`}>{SITE.email}</A>. Please mention the page, what you were trying to do,
        and your browser and device.
      </P>
    </ProsePage>
  );
}
