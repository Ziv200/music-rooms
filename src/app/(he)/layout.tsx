import type { Viewport } from "next";
import "../globals.css";
import { display, rubik } from "../fonts";
import { professionalService } from "@/lib/jsonld";

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/** Root layout for Hebrew pages: lang/dir are in the served HTML (not set by JS). */
export default function HebrewRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${display.variable}`}>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService("he")) }} />
        {children}
      </body>
    </html>
  );
}
