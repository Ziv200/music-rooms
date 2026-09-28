import { PersonaTemplate } from "@/components/pages/PersonaTemplate";
import { heRehab } from "@/content/he-pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "he",
  path: "/rehab/",
  title: "חדר טיפול במוסיקה למוסדות שיקום ובתי חולים | אילן זיו",
  description: "חדר מוזיקה טיפולי שהצוות מפעיל בלחיצה: סצנה לכל קבוצה, חלל שקט ומכויל, ופרויקט אחד מקצה לקצה בתיאום עם ההנדסה של המוסד.",
});

export default function Page() {
  return <PersonaTemplate p={heRehab} />;
}
