"use client";

import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/20 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Software Engineer
            </p>
            <p className="font-serif text-lg text-primary">Youssef Abdelhamid</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-700 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative pb-1 transition hover:text-primary"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Button asChild variant="ghost" size="sm" className="text-primary">
            <a href="#projects" className="flex items-center gap-2">
              View projects <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="sm" className="shadow-sm">
            <a href="#contact" className="flex items-center gap-2">
              Let&apos;s talk <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
