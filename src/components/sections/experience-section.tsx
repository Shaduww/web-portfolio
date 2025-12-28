"use client";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { experiences } from "@/data/content";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Experience</p>
        <h2 className="font-serif text-3xl text-primary md:text-4xl">
          Craft refined with practice
        </h2>
      </div>

      <div className="space-y-4">
        {experiences.map((item) => (
          <Card
            key={item.role}
            className="border-stone-200/90 bg-white/90 shadow-sm"
          >
            <CardHeader className="gap-2">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="font-serif text-2xl text-primary">
                    {item.role}
                  </CardTitle>
                  <CardDescription className="text-base text-stone-700">
                    {item.company}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {item.timeframe}
                </Badge>
              </div>
              <CardDescription className="text-stone-700">
                {item.summary}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 text-sm text-stone-700 md:grid-cols-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
