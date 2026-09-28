import type { Metadata } from "next";
import { BASE_PATH, PENDING, SITE } from "./site-config";

export type Lang = "he" | "en";

type PageMetaInput = {
  lang: Lang;
  /** Route path with trailing slash, e.g. "/adi-negev/" or "/en/donors/" */
  path: string;
  title: string;
  description: string;
  /** Matching page in the other language (hreflang pair), if any */
  altPath?: string;
  /** OG image file name in /public/og/, defaults per language */
  og?: string;
  /** Only the home page carries the Search Console tag */
  isHome?: boolean;
  noindex?: boolean;
};

export function pageMeta({ lang, path, title, description, altPath, og, isHome, noindex }: PageMetaInput): Metadata {
  const heb = lang === "he";
  const languages: Record<string, string> = {};
  if (heb) {
    languages.he = path;
    if (altPath) languages.en = altPath;
    languages["x-default"] = heb ? path : altPath || "/";
  } else {
    languages.en = path;
    if (altPath) languages.he = altPath;
    languages["x-default"] = altPath || "/";
  }
  const ogImage = `/og/${og || (heb ? "og-he-home.jpg" : "og-en-home.jpg")}`;
  const other: Record<string, string> = {};
  if (isHome && PENDING.googleSiteVerification) {
    other["google-site-verification"] = PENDING.googleSiteVerification;
  }
  return {
    metadataBase: new URL(SITE.url),
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: noindex ? undefined : languages },
    openGraph: {
      type: "website",
      url: path,
      siteName: heb ? "Music Rooms – אילן זיו" : "Music Rooms – Ilan Ziv",
      title,
      description,
      locale: heb ? "he_IL" : "en_US",
      alternateLocale: heb ? ["en_US"] : ["he_IL"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    icons: {
      icon: [
        { url: `${BASE_PATH}/favicon.ico`, sizes: "any" },
        { url: `${BASE_PATH}/icon.svg`, type: "image/svg+xml" },
        { url: `${BASE_PATH}/icon-192.png`, sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: `${BASE_PATH}/apple-touch-icon.png`, sizes: "180x180" }],
    },
    manifest: `${BASE_PATH}/site.webmanifest`,
    formatDetection: { telephone: false },
    other,
  };
}
