"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border border-primary/10 bg-primary text-primary-foreground shadow-lg md:rounded-[28px]"
    >


      <div className="relative z-10 flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-12 lg:p-14 xl:p-16">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-primary-foreground/80">
            Contact
          </p>
          <h3 className="font-serif text-3xl md:text-4xl">
            Let&apos;s build something intentional.
          </h3>
          <p className="text-base text-primary-foreground/85">
            Whether it&apos;s a shader-driven hero, a refined design system, or a responsive
            launch, I bring calm craft and quick iteration to the table.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-[320px]">
          <Button
            asChild
            size="lg"
            className="w-full bg-white text-primary shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <a
              href="mailto:hello@youssefabdelhamid.com"
              className="flex items-center justify-between"
            >
              Email me
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  variant="ghost"
                  className="border border-white/25 bg-white/5 text-primary-foreground hover:bg-white/10"
                >
                  <a
                    href="https://www.linkedin.com/in/youssef-abdelhamidd/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between"
                  >
                    LinkedIn
                    <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="border border-white/25 bg-white/5 text-primary-foreground hover:bg-white/10"
                >
                  <a
                    href="https://github.com/shaduww"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between"
                  >
                    GitHub
                    <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
      </div>
    </section>
  );
}
