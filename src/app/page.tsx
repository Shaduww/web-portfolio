"use client";

import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { WorkGridSection } from "@/components/sections/projectsection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <Header />
      <main className="flex w-full min-h-screen flex-col gap-40 pb-16 pt-0">
        <HeroSection />
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-16 px-4 md:px-8 lg:px-12 xl:px-16">
          <AboutSection />
          <WorkGridSection />
          <ExperienceSection />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
