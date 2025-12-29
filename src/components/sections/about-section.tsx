"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function AboutSection() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    if (!isImageOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsImageOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isImageOpen]);

  return (
    <section id="about" className="scroll-mt-24 space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-primary md:text-4xl">
          About me
        </h2>
      </div>

      {/* OUTER CARD */}
      <div className="rounded-3xl border border-border/70 bg-card/70 shadow-[0_18px_55px_rgba(0,0,0,0.1)]">
        <div className="grid gap-8 md:gap-3 md:grid-cols-[minmax(0,500px)_minmax(0,1fr)] md:items-center">


          {/* IMAGE COLUMN */}
          <div className="p-0">
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              className="group relative block aspect-3/4 w-full overflow-hidden rounded-2xl"
              aria-label="View full image"
            >
              <Image
              src="/project-assets/aboutmephoto2.jpg"
              alt="Youssef Abdelhamid"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(min-width: 1280px) 640px, (min-width: 1024px) 560px, 500px"
              quality={100}
              priority
            />
            </button>
          </div>

          {/* TEXT COLUMN */}
          <div className="p-6 md:p-10 text-foreground">
            <div className="space-y-5">
              <p className="text-lg leading-8">
                I’m a Computer Science student who builds mobile apps and enjoys the process of seeing things come together.
                I’m especially drawn to UI work and product polish, where small details turn an idea into something that feels complete and satisfying to use.
              </p>

              <p className="text-lg leading-8">
                I care deeply about quality. Whether it’s an app, a project, or a personal goal, I put time and effort into doing things properly.
                I take pride in my progression over time and in the work I produce, not just because it functions, but because I’m happy with how it turned out.
              </p>

              <p className="text-lg leading-8">
                I believe the most impactful products come from those with real needs, which is why I’m inspired by apps like FitNotes.
                It’s a tool I rely on daily to track progress and extract meaningful insights of my workouts. That’s the kind of usefulness I strive to create in this world.
              </p>

              <p className="text-lg leading-8">
                Outside of development, I’m a fitness oriented person.
                The gym fuels my discipline and focus on personal growth, while soccer feeds my competitive nature and appreciation for teamwork.
                Both shape how I approach challenges, with consistency, intention, and respect for the process.
              </p>
            </div>
          </div>

        </div>
      </div>

      {isImageOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Full size photo"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative h-[min(90vh,900px)] w-[min(90vw,700px)]">
            <Image
              src="/project-assets/aboutmephoto2.jpg"
              alt="Youssef Abdelhamid"
              fill
              className="rounded-2xl object-cover shadow-2xl"
              sizes="(min-width: 1024px) 700px, 90vw"
              quality={100}
              priority
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
