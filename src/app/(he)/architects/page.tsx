import { PersonaTemplate } from "@/components/pages/PersonaTemplate";
import { heArchitects } from "@/content/he-pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "he",
  path: "/architects/",
  title: "חדר מוסיקה בפרויקט שלכם: שותף אחד לכל המערכות | אילן זיו",
  description: "לאדריכלי פנים ולמנהלי פרויקטים: תכנון אקוסטי, נתונים לכתב הכמויות, תשתיות, מערכות וכיול, בתיאום עם התכנון והקבלן הראשי.",
});

export default function Page() {
  return <PersonaTemplate p={heArchitects} />;
}
