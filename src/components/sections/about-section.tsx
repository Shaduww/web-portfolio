"use client";

import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-primary md:text-4xl">
          About me
        </h2>
      </div>

      {/* OUTER CARD */}
      <div className="rounded-3xl border border-stone-200/80 bg-white/70 shadow-[0_18px_55px_rgba(0,0,0,0.1)]">
        <div className="grid gap-8 md:gap-3 md:grid-cols-[minmax(0,500px)_minmax(0,1fr)] md:items-center">


          {/* IMAGE COLUMN */}
          <div className="p-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/project-assets/aboutmephoto2.jpg"
                alt="Youssef Abdelhamid"
                fill
                className="object-cover"
                quality={100}
                priority
              />
            </div>
          </div>

          {/* TEXT COLUMN */}
          <div className="p-6 md:p-10 text-stone-800">
            <div className="space-y-5">
              <p className="text-lg leading-8">
                I’m a Computer Science student who builds mobile apps and genuinely enjoys the process of seeing things come together.
                I’m especially drawn to UI work and product polish, where small details turn an idea into something that feels complete and satisfying to use.
              </p>

              <p className="text-lg leading-8">
                I care deeply about quality. Whether it’s an app, a project, or a personal goal, I put real time and effort into doing things properly.
                I take pride in my progression over time and in the work I ship, not just because it functions, but because I’m happy with how it turned out.
              </p>

              <p className="text-lg leading-8">
                I believe the most impactful products come from real needs, which is why I’m inspired by apps like FitNotes.
                It’s a tool I rely on daily to track progress and extract meaningful insights from my workouts. That’s the kind of usefulness I strive to create in this world.
              </p>

              <p className="text-lg leading-8">
                Outside of development, I’m a gym enthusiast and soccer player.
                The gym fuels my discipline and focus on personal growth, while soccer feeds my competitive nature and appreciation for teamwork.
                Both shape how I approach software, with consistency, intention, and respect for the process.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
