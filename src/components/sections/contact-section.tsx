"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    setFormState("submitting");

    try {
      const formData = new FormData(formRef.current);
      const response = await fetch("https://formspree.io/f/mkonqkpq", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      formRef.current.reset();
      setFormState("success");
    } catch (error) {
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border border-primary/10 bg-primary text-primary-foreground shadow-lg md:rounded-[28px] dark:border-border/70 dark:bg-card dark:text-foreground"
    >


      <div className="relative z-10 flex flex-col gap-10 p-8 md:p-12 lg:p-14 xl:p-16">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-primary-foreground/80 dark:text-foreground">
            Contact
          </p>
          <h3 className="font-serif text-3xl md:text-4xl">
            Get in touch.
          </h3>
          <p className="text-base text-primary-foreground/85 dark:text-foreground">
            Feel free to reach out if you have a question, opportunity, or just want to connect!
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <label className="text-xs uppercase tracking-[0.22em] text-primary-foreground/80 dark:text-foreground">
              Your name
              <input
                type="text"
                name="name"
                required
                placeholder="Jane Doe"
                className="mt-2 w-full rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/70 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 focus:placeholder:opacity-0 dark:border-white/20 dark:bg-white/10 dark:text-foreground dark:placeholder:text-muted-foreground"
              />
            </label>
            <label className="text-xs uppercase tracking-[0.22em] text-primary-foreground/80 dark:text-foreground">
              Email
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/70 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 focus:placeholder:opacity-0 dark:border-white/20 dark:bg-white/10 dark:text-foreground dark:placeholder:text-muted-foreground"
              />
            </label>
            <label className="text-xs uppercase tracking-[0.22em] text-primary-foreground/80 dark:text-foreground">
              Message
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Would love to hear from you.."
                className="mt-2 w-full resize-none rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/70 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 focus:placeholder:opacity-0 dark:border-white/20 dark:bg-white/10 dark:text-foreground dark:placeholder:text-muted-foreground"
              />
            </label>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary-foreground text-primary shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl hover:bg-amber-200 hover:text-primary-black dark:bg-primary-foreground dark:text-primary dark:hover:bg-white dark:hover:text-black"
              disabled={formState === "submitting"}
            >
              {formState === "submitting" ? "Sending..." : "Send message"}
              <Mail className="h-5 w-5" />
            </Button>
            {formState === "success" ? (
              <p className="text-sm text-primary-foreground/90 dark:text-foreground">
                Message sent! I&apos;ll get back to you soon!
              </p>
            ) : null}
            {formState === "error" ? (
              <p className="text-sm text-primary-foreground/90 dark:text-foreground">
                Something went wrong. Please try again.
              </p>
            ) : null}
          </form>
          <div className="grid grid-cols-2 gap-3">
            <Button
              asChild
              variant="ghost"
              className="border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 dark:border-white/20 dark:bg-white/10 dark:text-foreground"
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
              className="border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 dark:border-white/20 dark:bg-white/10 dark:text-foreground"
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
