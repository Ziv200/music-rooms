import { PersonaTemplate } from "@/components/pages/PersonaTemplate";
import { heBeitHalochem } from "@/content/he-pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "he",
  path: "/beit-halochem/",
  title: "חדר מוסיקה לבית הלוחם ולשיקום נכי צה\"ל | אילן זיו",
  description: "תכנון והקמה של חדר מוסיקה לטיפול, להרכבים ולפעילות קהילתית בבתי הלוחם ובמרכזי שיקום, שהצוות מפעיל לבד מטאבלט.",
});

export default function Page() {
  return <PersonaTemplate p={heBeitHalochem} />;
}
