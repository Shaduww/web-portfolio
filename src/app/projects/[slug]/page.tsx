import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/content";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const sections = [
  {
    key: "overview",
    title: "Overview",
    fallback:
      "Add a concise summary of the project goals, audience, and the problem you set out to solve.",
  },
  {
    key: "challenge",
    title: "Challenge",
    fallback:
      "Describe the core constraints, technical hurdles, or product risks that shaped the work.",
  },
  {
    key: "solution",
    title: "Solution",
    fallback:
      "Explain the approach, system decisions, and the rationale behind the final experience.",
  },
  {
    key: "outcome",
    title: "Outcome",
    fallback:
      "Share outcomes, impact, or next steps. This is a good place for metrics or results.",
  },
];

const findProject = (slug: string) => projects.find((project) => project.slug === slug);

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pb-16 pt-10 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
          <Button asChild variant="ghost" className="text-primary">
            <Link href="/#contact" className="flex items-center gap-2">
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Case study
            </p>
            <h1 className="font-serif text-4xl text-primary md:text-5xl">
              {project.title}
            </h1>
            <p className="text-lg leading-8 text-stone-700">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-white/70">
                  {tag}
                </Badge>
              ))}
            </div>
            {project.caseStudy?.role ? (
              <div className="rounded-2xl border border-stone-200/80 bg-white/80 p-5 text-sm text-stone-700">
                <span className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Role
                </span>
                <p className="mt-2">{project.caseStudy.role}</p>
              </div>
            ) : null}
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200/80 bg-white/80 shadow-lg">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 480px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {sections.map((section) => {
            const content = project.caseStudy?.[section.key as keyof NonNullable<
              typeof project.caseStudy
            >];
            return (
              <div
                key={section.key}
                className="rounded-2xl border border-stone-200/80 bg-white/80 p-6"
              >
                <h2 className="font-serif text-2xl text-primary">{section.title}</h2>
                <p className="mt-3 text-base leading-7 text-stone-700">
                  {content || section.fallback}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
