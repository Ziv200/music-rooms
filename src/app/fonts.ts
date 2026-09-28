import { Inter, Libre_Bodoni, Rubik } from "next/font/google";

// Fonts are self-hosted by next/font at build time (no requests to Google at runtime).
export const rubik = Rubik({ variable: "--font-rubik", subsets: ["hebrew", "latin"], display: "swap" });
export const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
// Headings only (and only Latin glyphs on Hebrew pages): not preloaded, so it never competes with body text.
export const display = Libre_Bodoni({ variable: "--font-display", subsets: ["latin"], display: "swap", weight: ["400", "500"], preload: false });
