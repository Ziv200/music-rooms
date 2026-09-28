/**
 * ONE place for site-wide settings and every value that is still pending from Ilan.
 *
 * Rules (see docs/content-rules.md):
 * - Never put an invented value here. Leave `null` until Ilan supplies it.
 * - While a value is `null`, the sentence / table row that needs it is NOT rendered
 *   (no raw "[להשלים]" brackets on public pages). Legal pages must not be published
 *   until businessNumber, courtDistrict, dataRetention and legalLastUpdated are filled.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const SITE = {
  url: "https://ziv200.github.io/music-rooms",
  /** Analytics only loads on this host (never on localhost / previews). */
  productionHost: "ziv200.github.io",
  email: "ziv200@gmail.com",
  phone: {
    display: "054-4500529",
    intl: "+972-54-450-0529",
    tel: "tel:+972544500529",
    whatsapp: "https://wa.me/972544500529",
  },
  formsubmit: {
    /** AJAX endpoint (JS enabled). Hashed address, keep as is. */
    ajax: "https://formsubmit.co/ajax/1dd8e8986b87aa29f7acd0533941d73b",
    /** Plain endpoint for the no-JS fallback (redirects to `_next`). */
    plain: "https://formsubmit.co/1dd8e8986b87aa29f7acd0533941d73b",
  },
  goatcounter: {
    /** GoatCounter account code (supplied by Ilan, Sept 2026). */
    code: "musicrooms",
    endpoint: "https://musicrooms.goatcounter.com/count",
    script: "https://gc.zgo.at/count.js",
  },
} as const;

type Bilingual = { he: string; en: string } | null;

export const PENDING = {
  /** TODO(Ilan): Google Search Console verification token, i.e. the `content` value of
   *  <meta name="google-site-verification" content="..."> (SCP ג.3). Rendered on the home page only. */
  googleSiteVerification: null as string | null,

  /** TODO(Ilan): photo for the "מי אני" section. Put the file in public/media/ and set e.g.
   *  { src: "ilan.webp", width: 800, height: 1000 }. While null, the about section renders without an image. */
  aboutPhoto: null as { src: string; width: number; height: number } | null,

  /** TODO(Ilan): business number (מספר עוסק) for privacy + terms. While null, the "עוסק מס'" clause is omitted. */
  businessNumber: null as string | null,

  /** TODO(Ilan): court district for the terms, e.g. { he: "באר שבע", en: "Be'er Sheva" }.
   *  While null, the jurisdiction sentence is omitted (governing-law sentence stays). */
  courtDistrict: null as Bilingual,

  /** TODO(Ilan): retention period for inquiries that did not lead to an engagement,
   *  e.g. { he: "24 חודשים", en: "24 months" }. While null, that sentence is omitted. */
  dataRetention: null as Bilingual,

  /** TODO(Ilan): "last updated" date for privacy + terms (set on publication), e.g. "1.10.2026".
   *  While null, the line is omitted. */
  legalLastUpdated: null as string | null,

  /** TODO(Ilan, optional): ADI Negev room size, e.g. { he: "כ־60 מ\"ר", en: "about 60 m²" }.
   *  While null, the fact-box row is removed (SCP B.3 allows this). Also used in the PDFs. */
  adiRoomSize: null as Bilingual,

  /** TODO(Ilan, optional): warranty / service framework sentence for FAQ Q7,
   *  e.g. { he: "...", en: "..." }. While null, nothing is appended (SCP B.10 allows this). */
  warranty: null as Bilingual,
};

/** Date of the accessibility review actually carried out for this release (SCP ד.2). */
export const ACCESSIBILITY_REVIEW_DATE = { he: "28 בספטמבר 2026", en: "28 September 2026" };

/** Pages that still depend on pending values (printed as a build-time warning). */
export function pendingWarnings(): string[] {
  const w: string[] = [];
  if (!PENDING.googleSiteVerification) w.push("googleSiteVerification (Search Console tag)");
  if (!PENDING.aboutPhoto) w.push("aboutPhoto (about section shows no photo)");
  if (!PENDING.businessNumber) w.push("businessNumber (privacy/terms)");
  if (!PENDING.courtDistrict) w.push("courtDistrict (terms)");
  if (!PENDING.dataRetention) w.push("dataRetention (privacy)");
  if (!PENDING.legalLastUpdated) w.push("legalLastUpdated (privacy/terms)");
  if (!PENDING.adiRoomSize) w.push("adiRoomSize (optional, row hidden)");
  if (!PENDING.warranty) w.push("warranty (optional, FAQ Q7 sentence hidden)");
  return w;
}

export const withBase = (p: string) => `${BASE_PATH}${p}`;
