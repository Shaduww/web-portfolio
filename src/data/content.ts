export type Project = {
  title: string
  slug: string
  description: string
  image: string
  tags: string[]
  caseStudy?: {
    overview?: string
    challenge?: string
    solution?: string
    outcome?: string
    role?: string
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
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export const projects: Project[] = [
  {
    title: "Neon Blueprint",
    slug: "neon-blueprint",
    description:
      "Interactive design system that blends tactile layouts with live shader-driven atmospherics.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    tags: ["Design Systems", "Three.js", "WebGL"],
  },
  {
    title: "Analog Futures",
    slug: "analog-futures",
    description:
      "Micro-interactions for a global architecture studio, inspired by drafting tables and inked plans.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    tags: ["UX Motion", "Framer Motion", "Prototyping"],
  },
  {
    title: "Digital Atelier",
    slug: "digital-atelier",
    description:
      "A curated gallery for generative artists with responsive grids and editorial typography.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    tags: ["Responsive Grid", "Art Direction", "Performance"],
  },
  {
    title: "Pulse Desk",
    slug: "pulse-desk",
    description:
      "Shader-backed workspace dashboard with live signals, alerts, and real-time collaboration cues.",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
    tags: ["Dashboards", "Data Viz", "Accessibility"],
  },
  {
    title: "Ink & Orbit",
    slug: "ink-and-orbit",
    description:
      "Storytelling microsite pairing serif-heavy headlines with playful orbital animations.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80",
    tags: ["Storytelling", "Animation", "Editorial"],
  },
  {
    title: "Canvas Relay",
    slug: "canvas-relay",
    description:
      "High-touch portfolio relay with tactile cards, layered textures, and precise motion states.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    tags: ["Portfolio", "Interaction Design", "System Thinking"],
  },
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
