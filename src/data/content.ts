export type Project = {
  title: string
  slug: string
  description: string
  image: string
  gallery?: string[]
  github?: string
  tags: string[]
  caseStudy?: {
    overview?: string
    challenge?: string
    solution?: string
    outcome?: string
    role?: string
    sections?: Array<{
      title: string
      body: string
    }>
  }
}

export type Experience = {
  role: string
  company: string
  timeframe: string
  summary: string
  highlights: string[]
}

export type NavLink = {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  /*{ label: "Experience", href: "#experience" },*/
  { label: "Contact", href: "#contact" },
]

export const projects: Project[] = [
  {
    title: "Momentum",
    slug: "momentum",
    description:
      "Momentum is a iOS app for building consistent study habits through focused work sessions and insights.",
    image:
      "/project-assets/momentum-logo.png",
    github: "https://github.com/imankamrann/Momentum",
    gallery: [
      "/project-assets/momentum-assets/chatbot1.png",
      "/project-assets/momentum-assets/chatbot.png",
      "/project-assets/momentum-assets/timer.png",
      "/project-assets/momentum-assets/timerrunning.png",
      "/project-assets/momentum-assets/analyticsmonth.png",
      "/project-assets/momentum-assets/analyticsall.png",
      "/project-assets/momentum-assets/profile.png",
      "/project-assets/momentum-assets/Tasks.png",
      
    ],
    tags: ["iOS", "Swift", "Productivity", "Capstone","WIP"],
    caseStudy: {
      
      sections: [
        {
          title: "Overview",
          body: "Momentum is a native iOS study habit and productivity app designed to help students build consistency and structure in their academic routines. The project addresses common challenges such as procrastination, lack of motivation, and ineffective time management by combining productivity tools, analytics, and intelligent support into a single experience. Rather than focusing on a single feature, Momentum is designed as a system that encourages habit formation through focused work sessions, task organization, performance insights, and motivational elements such as gamification and personalization.",
        },
      ],
    },
  },
  /*{
    title: "Ink & Orbit",
    slug: "ink-and-orbit",
    description:
      "Storytelling microsite pairing serif-heavy headlines with playful orbital animations.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80",
    tags: ["Storytelling", "Animation", "Editorial"],
    caseStudy: {
      role: "Role, team, timeline.",
      sections: [
        {
          title: "Overview",
          body: "Add a concise overview for Ink & Orbit.",
        },
        {
          title: "Challenge",
          body: "Describe the main challenge and constraints.",
        },
        {
          title: "Solution",
          body: "Explain the system and interaction decisions.",
        },
        {
          title: "Outcome",
          body: "Summarize results, impact, or next steps.",
        },
      ],
    },
  },
  {
    title: "Canvas Relay",
    slug: "canvas-relay",
    description:
      "High-touch portfolio relay with tactile cards, layered textures, and precise motion states.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    tags: ["Portfolio", "Interaction Design", "System Thinking"],
    caseStudy: {
      role: "Role, team, timeline.",
      sections: [
        {
          title: "Overview",
          body: "Add a concise overview for Canvas Relay.",
        },
        {
          title: "Challenge",
          body: "Describe the main challenge and constraints.",
        },
        {
          title: "Solution",
          body: "Explain the system and interaction decisions.",
        },
        {
          title: "Outcome",
          body: "Summarize results, impact, or next steps.",
        },
      ],
    },
  },*/
]

export const experiences: Experience[] = [
  {
    role: "Senior Creative Engineer",
    company: "Analog Digital Lab",
    timeframe: "2021 — Present",
    summary:
      "Bridging design systems and motion-led engineering for editorial, e-commerce, and experiential teams.",
    highlights: [
      "Built modular UI kits with shadcn/ui for faster product experiments.",
      "Designed shader-driven hero canvases that stay performant on mobile.",
      "Mentored designers on prototyping with Three.js and Framer Motion.",
    ],
  },
  {
    role: "Lead Frontend Designer",
    company: "Paperfold Studio",
    timeframe: "2018 — 2021",
    summary:
      "Shaped the Paper & Ink aesthetic across web properties with tactile grids and high-contrast call-to-actions.",
    highlights: [
      "Replatformed marketing sites to Next.js with shared typography tokens.",
      "Crafted accessibility-first interactions without relying on scroll-snaps.",
      "Partnered with strategy to deliver responsive case-study layouts.",
    ],
  },
  {
    role: "Product Prototyper",
    company: "Vertex Labs",
    timeframe: "2015 — 2018",
    summary:
      "Delivered rapid prototypes for emerging products—pairing playful serif headlines with disciplined systems.",
    highlights: [
      "Led motion specs for hero narratives and micro-feedback loops.",
      "Optimized rendering pipelines for Retina devices and GPU-light scenes.",
      "Documented component patterns to hand off smoothly to feature teams.",
    ],
  },
]
