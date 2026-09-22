import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Rubik, Libre_Bodoni } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "hebrew"],
  display: "swap",
});

const display = Libre_Bodoni({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ilan Ziv Music & Sound Services | Modular Music Rooms",
  description:
    "High-end modular, computer-controlled music rooms for hospitals, music schools, tech campuses, and institutions. Design through commissioning — Ilan Ziv.",
  keywords: [
    "Ilan Ziv",
    "Music rooms",
    "Acoustic design",
    "Modular studio",
    "Computer-controlled room",
    "Sound Services",
  ],
  openGraph: {
    title: "Ilan Ziv Music & Sound Services | Modular Music Rooms",
    description:
      "Modular, computer-controlled music rooms for institutions — from acoustic design to commissioning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable} ${rubik.variable} ${display.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#f7f6f3] text-[#111111] font-sans antialiased selection:bg-neutral-900/10 selection:text-neutral-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
