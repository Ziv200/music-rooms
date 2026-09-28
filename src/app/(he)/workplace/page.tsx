import { PersonaTemplate } from "@/components/pages/PersonaTemplate";
import { heWorkplace } from "@/content/he-pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  lang: "he",
  path: "/workplace/",
  title: "חדר מוזיקה למשרד הייטק, מבודד ומתוכנן | אילן זיו",
  description: "חדר מוסיקה למשרד ברמת הגימור של הקמפוס: תכנון אקוסטי ובידוד שלא מפריע לקומה, וסצנות לג'אם, לפודקאסט ולאירועים.",
});

export default function Page() {
  return <PersonaTemplate p={heWorkplace} />;
}
