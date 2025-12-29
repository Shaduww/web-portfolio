import type { Metadata } from "next";
import {
  Geist_Mono,
  Playfair_Display,
  Work_Sans,
} from "next/font/google";
import "./globals.css";
import { MobileNav } from "@/components/sections/mobile-nav";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-variable",
  display: "swap",
});

const sans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans-variable",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Youssef Abdelhamid | Creative Engineer Portfolio",
  description:
    "A paper-and-ink inspired portfolio with a digital shader pulse showcasing work, experience, and ways to collaborate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(() => {
  try {
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = theme === "dark" || (theme !== "light" && prefersDark);
    document.documentElement.classList.toggle("dark", shouldDark);
  } catch (error) {
    // No-op: fall back to default theme.
  }
})();
`,
          }}
        />
      </head>
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
