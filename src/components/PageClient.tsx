"use client";

import { LangProvider } from "@/hooks/useLang";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { RoomTourSection } from "@/components/sections/RoomTourSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import type { MediaFile } from "@/lib/media";

interface PageClientProps {
  phaseMedia: Record<string, MediaFile[]>;
}

export function PageClient({ phaseMedia }: PageClientProps) {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <HeroSection />
        <OverviewSection />
        <RoomTourSection />
        <TimelineSection phaseMedia={phaseMedia} />
        <ContactSection />
      </main>
      <Footer />
    </LangProvider>
  );
}
