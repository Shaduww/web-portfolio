import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/sections/header";
import { ImageGallery } from "@/components/ui/image-gallery";
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
] as const;

type SectionKey = (typeof sections)[number]["key"];

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

  const gallery = project.gallery?.length
    ? project.gallery
    : project.image
      ? [project.image]
      : [];

  const caseStudySections = project.caseStudy?.sections?.length
    ? project.caseStudy.sections.map((section) => ({
        title: section.title,
        body: section.body,
      }))
    : sections.map((section) => ({
        title: section.title,
        body: project.caseStudy?.[section.key as SectionKey] || section.fallback,
      }));

  const isSingleSection = caseStudySections.length === 1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto w-full max-w-screen-2xl px-4 pb-16 pt-24 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
          {project.github ? (
            <Button asChild size="sm">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          ) : null}
        </div>

        <div className="mt-8 space-y-5 text-center">
          <h1 className="font-serif text-4xl text-primary md:text-5xl">
            {project.title}
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
            {project.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-card/70">
                {tag}
              </Badge>
            ))}
          </div>
          {project.caseStudy?.role ? (
            <div className="mx-auto max-w-md rounded-2xl border border-border/70 bg-card/80 p-5 text-sm text-muted-foreground">
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Role
              </span>
              <p className="mt-2">{project.caseStudy.role}</p>
            </div>
          ) : null}
        </div>

        <ImageGallery images={gallery} />

        <div
          className={`mx-auto mt-12 grid w-full gap-8 ${
            isSingleSection ? "max-w-3xl" : "max-w-5xl lg:grid-cols-2"
          }`}
        >
          {caseStudySections.map((section) => (
            <div
              key={section.title}
              className="w-full rounded-2xl border border-border/70 bg-card/80 p-6"
            >
              <h2 className="font-serif text-2xl text-primary">{section.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
