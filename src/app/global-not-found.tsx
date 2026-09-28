import "./globals.css";
import { rubik, inter } from "./fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הדף לא נמצא | Page not found – Music Rooms",
  robots: { index: false },
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function GlobalNotFound() {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${inter.variable}`}>
      <body className="min-h-screen flex items-center justify-center p-6">
        <main className="max-w-lg text-center space-y-4">
          <h1 className="text-3xl font-medium">הדף לא נמצא</h1>
          <p>
            <a href={`${BASE}/`} className="underline underline-offset-4">
              לדף הבית
            </a>
          </p>
          <p lang="en" dir="ltr">
            Page not found.{" "}
            <a href={`${BASE}/en/`} className="underline underline-offset-4">
              English home page
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
