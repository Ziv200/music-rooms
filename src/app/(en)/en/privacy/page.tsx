import { ProsePage, H, P, A } from "@/components/pages/Prose";
import { pageMeta } from "@/lib/seo";
import { PENDING, SITE } from "@/lib/site-config";

export const metadata = pageMeta({
  lang: "en",
  path: "/en/privacy/",
  altPath: "/privacy/",
  title: "Privacy Policy | Music Rooms – Ilan Ziv",
  description: "What information this site and its contact form collect, why, who processes it, and how to request access, correction or deletion.",
});

// SCP ה.3, verbatim. Clauses that depend on PENDING values are omitted until Ilan fills them.
export default function Page() {
  const biz = PENDING.businessNumber ? `, Israeli business no. ${PENDING.businessNumber}` : "";
  const mail = <A href={`mailto:${SITE.email}`}>{SITE.email}</A>;
  return (
    <ProsePage lang="en" altHref="/privacy/" title="Privacy Policy" updated={PENDING.legalLastUpdated ? `Last updated: ${PENDING.legalLastUpdated}` : null}>
      <H>1. Who we are</H>
      <P>
        The website ziv200.github.io/music-rooms (the &quot;Site&quot;) is operated by Music Rooms – Ilan Ziv{biz} (&quot;I&quot; or the &quot;Business&quot;). This policy explains what information
        the Site collects, why, how it is used, and your rights. It is written in line with the Israeli Protection of Privacy Law, 5741-1981, as amended, including Amendment No. 13. Privacy contact:{" "}
        {mail} · {SITE.phone.intl}.
      </P>
      <H>2. What I collect</H>
      <P>
        (a) <em>Information you provide in the contact form:</em> full name, role, organization, email, phone (optional), and project details: organization type, space status, music therapy program,
        funding source, timeline, region, approximate room size, requests for a visit or materials, and your message. (b) <em>Information attached automatically to the form:</em> the page you submitted
        from, page language, and campaign parameters in the URL (UTM). (c) <em>Aggregated usage statistics:</em> the Site uses GoatCounter, which <strong className="font-medium">does not use cookies</strong>{" "}
        and does not store IP addresses. It records aggregated data only, such as pages viewed, referring sites, browser and device type, country, and clicks on key buttons, and cannot be used to
        identify you. (d) <em>Direct contact:</em> if you email, call or message me on WhatsApp, I receive what you choose to share.
      </P>
      <H>3. Is it mandatory?</H>
      <P>There is no legal obligation to provide information. Required form fields are needed so I can respond; without them I cannot handle your inquiry. Other fields are optional.</P>
      <H>4. How I use it</H>
      <P>
        To respond to your inquiry; to arrange a needs assessment, meeting or visit; to send materials you asked for; to prepare a proposal and manage our business relationship; to understand, in
        aggregate, how the Site is used; and to meet legal obligations. I will not send you marketing messages without your explicit consent.
      </P>
      <H>5. Who receives it</H>
      <P>
        <strong className="font-medium">I do not sell, rent or trade personal information.</strong> It is shared only with service providers that help run the Site, and only as needed: FormSubmit
        (delivers form submissions to my email); Google (Gmail, where inquiries are received and stored); GitHub (GitHub Pages hosting, which may log visitor IP addresses for security); GoatCounter
        (aggregated statistics); and WhatsApp (Meta), if you choose to contact me there. Some providers operate outside Israel, for example in the US or EU, so information may be stored or processed
        abroad, in accordance with the law. Information may also be disclosed where required by law or to protect my legal rights.
      </P>
      <H>6. Cookies and browser storage</H>
      <P>
        The Site does not use advertising or tracking cookies, and its analytics tool works without cookies. The accessibility toolbar stores your chosen settings (such as text size) only in your own
        browser&apos;s local storage; they are not sent to me or anyone else.
      </P>
      <H>7. Security</H>
      <P>
        I take reasonable measures to protect information, including restricted access to my mailbox, strong passwords and two-factor authentication. No online transmission or storage method is
        completely secure.
      </P>
      <H>8. Retention</H>
      <P>
        {PENDING.dataRetention ? `Inquiries that do not lead to an engagement are kept for up to ${PENDING.dataRetention.en} and then deleted. ` : null}
        Client information is kept as long as needed for the business relationship and as required by law, such as tax law.
      </P>
      <H>9. Your rights</H>
      <P>
        Under Israeli law, you may request access to information held about you, and ask to correct or delete information that is inaccurate, incomplete, unclear or out of date. You may also ask not
        to receive marketing messages, and ask me to delete your inquiry unless I am required by law to keep it. To exercise these rights, email {mail}. I will respond within the time required by law.
      </P>
      <H>10. Minors</H>
      <P>The Site is intended for organizations and professionals, not for anyone under 18.</P>
      <H>11. Changes</H>
      <P>I may update this policy from time to time. The date of the latest update appears at the top.</P>
      <H>12. Contact</H>
      <P>
        Music Rooms – Ilan Ziv · {mail} · <A href={SITE.phone.tel}>{SITE.phone.intl}</A>. If there is any discrepancy between this English version and the Hebrew version, the Hebrew version prevails.
      </P>
    </ProsePage>
  );
}
