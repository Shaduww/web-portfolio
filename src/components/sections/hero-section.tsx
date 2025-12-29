"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { Button } from "@/components/ui/button";
import { ShaderAnimation } from "@/components/ui/shader-animation";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section id="top" className="relative w-full min-h-[75vh] md:min-h-[82vh] lg:min-h-[88vh] bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="relative h-full w-full">
          <ShaderAnimation intensity={0.80} speed={0.50} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 pt-[clamp(6rem,_12vw,_8.5rem)] pb-[clamp(2rem,_5vw,_5.5rem)] md:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <motion.div
            className="md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 max-w-4xl space-y-6 text-center xl:max-w-none"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.08 }}
          >
            <motion.div
              variants={fadeUp}
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur dark:text-foreground"
            >
              <MapPin className="h-4 w-4 text-outline" />
              Toronto, Ontario
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-5 font-serif text-balance text-[clamp(2.6rem,_4.5vw,_4.25rem)] leading-[1.05] text-primary drop-shadow-sm md:text-[clamp(3.1rem,_4vw,_4.5rem)]"
            >
              Mobile Applications<br/> built for Impact.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-balance text-lg leading-8 text-muted-foreground drop-shadow-sm dark:text-foreground md:text-xl xl:max-w-3xl xl:text-[1.3rem] xl:leading-9"
            >
              Hello! I'm Youssef, a Computer Science student specializing in iOS development. I enjoy building 
              reliable mobile applications that feel clean and responsive.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <Button asChild size="lg" className="shadow-md">
                <a href="#projects" className="flex items-center gap-2">
                  View my projects <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="border border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
              >
                <a href="#about" className="flex items-center gap-2">
                  About me 
                </a>
              </Button>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Button
                asChild
                variant="ghost"
                className="border border-primary/20 bg-card/70 text-primary hover:bg-primary/10 hover:text-primary"
              >
                <a
                  href="https://www.linkedin.com/in/youssef-abdelhamidd/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="border border-primary/20 bg-card/70 text-primary hover:bg-primary/10 hover:text-primary"
              >
                <a
                  href="https://github.com/shaduww"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
