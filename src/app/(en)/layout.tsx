import type { Viewport } from "next";
import "../globals.css";
import { display, inter } from "../fonts";
import { professionalService } from "@/lib/jsonld";

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/** Root layout for English pages (/en/...): lang="en" dir="ltr" in the served HTML. */
export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen antialiased overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService("en")) }} />
        {children}
      </body>
    </html>
  );
}
