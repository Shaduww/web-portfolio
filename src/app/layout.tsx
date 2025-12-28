import type { Metadata } from "next";
import {
  Geist_Mono,
  Playfair_Display,
  Work_Sans,
} from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
