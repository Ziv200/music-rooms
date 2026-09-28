import { CaseStudyTemplate } from "@/components/pages/CaseStudyTemplate";
import { enCaseStudy } from "@/content/en";
import { pageMeta } from "@/lib/seo";

const description = "From an existing space to a calibrated music therapy studio at ADI Negev–Nahalat Eran that therapists run themselves. Built April–July 2026.";

export const metadata = pageMeta({
  lang: "en",
  path: "/en/adi-negev/",
  altPath: "/adi-negev/",
  title: "Case Study: The Valerie and Michael Miller Music Therapy Studio",
  description,
  og: "og-en-adi-negev.jpg",
});

export default function Page() {
  return <CaseStudyTemplate lang="en" c={enCaseStudy} description={description} />;
}
