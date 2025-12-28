"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/content";

export function WorkGridSection() {
  return (
    <section id="projects" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col gap-3 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
            Projects
          </p>
          <h2 className="font-serif text-3xl text-primary md:text-4xl">
            Selected projects
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {projects.map((project, index) => (
          <Card
            key={project.title}
            className="group border-stone-200/90 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-stone-200/80">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
                priority={index < 2}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <CardHeader className="gap-3">
              <CardTitle className="flex items-center justify-between font-serif text-xl text-primary">
                {project.title}
                <ArrowUpRight className="h-4 w-4 text-primary/70 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </CardTitle>
              <CardDescription className="text-base text-stone-700">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-white/70">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
