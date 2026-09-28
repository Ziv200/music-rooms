import { CaseStudyTemplate } from "@/components/pages/CaseStudyTemplate";
import { heCaseStudy } from "@/content/he-pages";
import { pageMeta } from "@/lib/seo";

const description = "איך חלל קיים הפך לסטודיו לטיפול במוסיקה ע\"ש ולרי ומייקל מילר, שהצוות מפעיל לבד: תכנון, תשתיות, אקוסטיקה וכיול, אפריל–יולי 2026.";

export const metadata = pageMeta({
  lang: "he",
  path: "/adi-negev/",
  altPath: "/en/adi-negev/",
  title: "סטודיו לטיפול במוסיקה בעדי נגב – נחלת ערן | מקרה בוחן",
  description,
  og: "og-he-adi-negev.jpg",
});

export default function Page() {
  return <CaseStudyTemplate lang="he" c={heCaseStudy} description={description} />;
}
