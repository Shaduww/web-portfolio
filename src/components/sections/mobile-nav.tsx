"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navLinks } from "@/data/content";

export function MobileNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProject = pathname.startsWith("/projects/");
  const links = useMemo(
    () => [{ label: "Home", href: "#top" }, ...navLinks],
    []
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [activeHref, setActiveHref] = useState<string>("#top");
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const manualOverrideUntil = useRef<number | null>(null);
  const manualOverrideTimer = useRef<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  useEffect(() => {
    setTransitionEnabled(false);
    if (isHome) {
      setActiveHref("#top");
      return;
    }
    if (isProject) {
      setActiveHref("#projects");
      return;
    }
    setActiveHref("#top");
  }, [isHome, isProject]);

  useEffect(() => {
    if (!isHome) return;
    const sectionTargets = links
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
      let current = "#top";

      sectionTargets.forEach((section) => {
        if (section.getBoundingClientRect().top <= offset) {
          current = `#${section.id}`;
        }
      });

      setTransitionEnabled(true);
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
  }, [isHome, links]);

  useEffect(() => {
    return () => {
      if (manualOverrideTimer.current) {
        window.clearTimeout(manualOverrideTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const container = containerRef.current;
      const activeLink = linkRefs.current[activeHref];
      if (!container || !activeLink) {
        setIndicatorStyle({ opacity: 0 });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        width: linkRect.width,
        transform: `translateX(${linkRect.left - containerRect.left}px)`,
        opacity: 1,
        transition: transitionEnabled ? undefined : "none",
      });
    };

    const frame = window.requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeHref, transitionEnabled, links.length]);

  return (
    <nav
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:hidden"
      aria-label="Section navigation"
    >
      <div
        ref={containerRef}
        className="relative flex items-center gap-4 rounded-full border border-border/30 bg-background/30 px-5 py-2 text-xs font-medium text-foreground shadow-xl backdrop-blur-xs"
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 h-7 -translate-y-1/2 rounded-full bg-primary/10 transition-[transform,width,opacity] duration-300 ease-out"
          style={indicatorStyle}
        />
        {links.map((link) => (
          <a
            key={link.href}
            href={isHome ? link.href : `/${link.href}`}
            className={cn(
              "relative z-10 transition-colors",
              activeHref === link.href ? "text-primary" : "hover:text-primary"
            )}
            aria-current={activeHref === link.href ? "page" : undefined}
            onPointerDown={() => {
              setTransitionEnabled(true);
              manualOverrideUntil.current = Date.now() + 700;
              if (manualOverrideTimer.current) {
                window.clearTimeout(manualOverrideTimer.current);
              }
              manualOverrideTimer.current = window.setTimeout(() => {
                manualOverrideUntil.current = null;
              }, 700);
              setActiveHref(link.href);
            }}
            ref={(node) => {
              linkRefs.current[link.href] = node;
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
