"use client";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
          About
        </p>
        <h2 className="font-serif text-3xl text-primary md:text-4xl">
          About me
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:items-center">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 shadow-sm">
          <div className="absolute inset-0 flex items-center justify-center text-sm text-stone-500">
            Photo placeholder
          </div>
        </div>
        <div className="space-y-4 text-stone-700">
          <p className="text-lg leading-8">
            Write a short intro here. Summarize your background, focus areas, and
            how you approach your work.
          </p>
          <p className="text-base leading-7">
            Add a second paragraph with your specialties, tools, or the kind of
            projects you&apos;re excited to collaborate on.
          </p>
        </div>
      </div>
    </section>
  );
}
