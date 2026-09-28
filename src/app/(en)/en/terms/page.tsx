import { ProsePage, H, P, A } from "@/components/pages/Prose";
import { pageMeta } from "@/lib/seo";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { PENDING, SITE, withBase } from "@/lib/site-config";

export const metadata = pageMeta({
  lang: "en",
  path: "/en/terms/",
  altPath: "/terms/",
  title: "Terms of Use | Music Rooms – Ilan Ziv",
  description: "Terms of use for the Music Rooms website: general information, intellectual property, limitation of liability and governing law.",
});

// SCP ה.4, verbatim. Clauses that depend on PENDING values are omitted until Ilan fills them.
export default function Page() {
  const biz = PENDING.businessNumber ? `, Israeli business no. ${PENDING.businessNumber}` : "";
  return (
    <ProsePage lang="en" altHref="/terms/" title="Terms of Use" updated={PENDING.legalLastUpdated ? `Last updated: ${PENDING.legalLastUpdated}` : null}>
      <H>1. General</H>
      <P>
        The website ziv200.github.io/music-rooms (the &quot;Site&quot;) is operated by Music Rooms – Ilan Ziv{biz} (the &quot;Business&quot;). Use of the Site is subject to these terms and to the
        Privacy Policy. If you do not agree, please do not use the Site.
      </P>
      <H>2. General information only</H>
      <P>
        Content on the Site, including project descriptions, service options, work processes and timelines, is for general information only. It is not a binding offer, not professional advice for
        any specific project, and does not promise any particular outcome, therapeutic or otherwise.
      </P>
      <H>3. Prices, offers and agreements</H>
      <P>
        The Site does not list prices. No price, offer, scope or timeline binds the Business until a written agreement is signed by the Business and the client. Scope, service and warranty terms are
        set only in that agreement.
      </P>
      <H>4. Intellectual property</H>
      <P>
        All rights in the Site&apos;s content, including text, photos, videos, renderings, plans, design and code, belong to the Business or to rights holders who have permitted their use. Do not
        copy, distribute, modify or use the content commercially without prior written permission. You may share links to the Site and forward the case study PDF unchanged for the purpose of
        evaluating a project. Names of institutions and third-party trademarks (such as Dolby Atmos and iPad) belong to their owners. The client is named with permission, and mention of a trademark
        does not imply endorsement.
      </P>
      <H>5. Acceptable use</H>
      <P>
        Do not use the Site in a way that harms it or other users, including submitting false or abusive information, attempting to access systems without authorization, or automated scraping.
      </P>
      <H>6. Limitation of liability</H>
      <P>
        The Site is provided &quot;as is&quot;. I try to keep information accurate and current, but errors, omissions or downtime may occur. To the fullest extent permitted by law, the Business is
        not liable for any direct or indirect damage arising from use of the Site or reliance on its content without a written agreement.
      </P>
      <H>7. External links</H>
      <P>The Site may link to third-party websites. I do not control their content or privacy practices, and a link does not imply endorsement.</P>
      <H>8. Privacy and accessibility</H>
      <P>
        See the <A href={withBase("/en/privacy/")}>Privacy Policy</A> and the <A href={withBase("/en/accessibility/")}>Accessibility Statement</A>.
      </P>
      <H>9. Changes</H>
      <P>I may update these terms from time to time. The version published on the Site at the time of use applies.</P>
      <H>10. Governing law and jurisdiction</H>
      <P>
        These terms and any use of the Site are governed solely by the laws of the State of Israel.
        {PENDING.courtDistrict ? ` The competent courts in the ${PENDING.courtDistrict.en} district have exclusive jurisdiction.` : null}
      </P>
      <H>11. Contact</H>
      <P>
        Music Rooms – Ilan Ziv · <A href={`mailto:${SITE.email}`}>{SITE.email}</A> · <WhatsAppLink lang="en" />. If there is any discrepancy between this English version and the
        Hebrew version, the Hebrew version prevails.
      </P>
    </ProsePage>
  );
}
