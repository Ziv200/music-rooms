import { getMediaByPhase } from "@/lib/media";
import { PageClient } from "@/components/PageClient";

export default function Home() {
  const phaseMedia = getMediaByPhase();

  return <PageClient phaseMedia={phaseMedia} />;
}
