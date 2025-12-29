"use client";

import { Moon, Sparkles, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/content";

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const manualOverrideUntil = useRef<number | null>(null);
  const manualOverrideTimer = useRef<number | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProject = pathname.startsWith("/projects/");

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "dark") {
      root.classList.add("dark");
      setIsDark(true);
      return;
    }
    if (storedTheme === "light") {
      root.classList.remove("dark");
      setIsDark(false);
      return;
    }
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", Boolean(prefersDark));
    setIsDark(Boolean(prefersDark));
  }, []);

  useEffect(() => {
    if (isProject) {
      setActiveHref("#projects");
      return;
    }

    if (!isHome) {
      setActiveHref(null);
    }
  }, [isHome, isProject]);

  useEffect(() => {
    if (!isHome) return;
    const sectionTargets = navLinks
      .map((link) => link.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sectionTargets.length) return;

    const updateActive = () => {
      if (
        manualOverrideUntil.current &&
        Date.now() < manualOverrideUntil.current
      ) {
        return;
      }

      const offset = window.innerHeight * 0.3;
      let current: string | null = null;

      sectionTargets.forEach((section) => {
        if (section.getBoundingClientRect().top <= offset) {
          current = `#${section.id}`;
        }
      });

      setActiveHref(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
    };
  }, [isHome]);

  useEffect(() => {
    return () => {
      if (manualOverrideTimer.current) {
        window.clearTimeout(manualOverrideTimer.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");
    root.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/20 bg-background/20 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xs">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center gap-3">
          <a
            href={pathname === "/" ? "#top" : "/#top"}
            onClick={handleBrandClick}
            className="group"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground transition group-hover:text-primary">
              Developer
            </p>
            <p className="font-serif text-lg text-primary">Youssef Abdelhamid</p>
          </a>
        </div>

        <nav className="hidden items-center justify-center gap-6 text-sm font-medium text-muted-foreground dark:text-foreground md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={pathname === "/" ? link.href : `/${link.href}`}
              className={`group relative pb-1 transition ${
                activeHref === link.href ? "text-primary" : "hover:text-primary"
              }`}
              onPointerDown={() => {
                manualOverrideUntil.current = Date.now() + 700;
                if (manualOverrideTimer.current) {
                  window.clearTimeout(manualOverrideTimer.current);
                }
                manualOverrideTimer.current = window.setTimeout(() => {
                  manualOverrideUntil.current = null;
                }, 700);
                setActiveHref(link.href);
              }}
              >
              {link.label}
              <span
                className={`absolute inset-x-0 -bottom-1 h-px bg-primary transition-transform duration-200 ${
                  activeHref === link.href
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="border-primary/20 bg-card/10 text-primary hover:bg-primary/10 hover:text-primary dark:border-border/60 dark:bg-transparent dark:text-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
