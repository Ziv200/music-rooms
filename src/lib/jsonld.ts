import { SITE } from "./site-config";

export function professionalService(lang: "he" | "en") {
  const he = lang === "he";
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#business`,
    name: he ? "Music Rooms – אילן זיו" : "Music Rooms – Ilan Ziv",
    alternateName: ["Ilan Ziv", "אילן זיו", "Music Rooms"],
    url: `${SITE.url}/`,
    image: `${SITE.url}/og/og-he-home.jpg`,
    logo: `${SITE.url}/icon-512.png`,
    description: he
      ? "תכנון והקמה של חדרי מוסיקה טיפוליים למוסדות שיקום, לבתי חולים ולארגונים: סקר אקוסטי, תשתיות, אקוסטיקה ובקרה מטאבלט. הפרויקט האחרון: עדי נגב – נחלת ערן."
      : "End-to-end design and build of music therapy rooms for Israeli institutions. Staff run the room from a tablet. Latest project: ADI Negev–Nahalat Eran.",
    email: SITE.email,
    telephone: SITE.phone.intl,
    areaServed: { "@type": "Country", name: "Israel" },
    knowsLanguage: ["he", "en"],
    founder: { "@type": "Person", name: he ? "אילן זיו" : "Ilan Ziv" },
  };
}
