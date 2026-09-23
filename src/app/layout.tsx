import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://ziv200.github.io/music-rooms";
const SITE_NAME = "Ilan Ziv Music & Sound Services";
const TITLE = "Ilan Ziv | Modular Music Rooms for Institutions";
const TITLE_HE = "אילן זיו | חדרי מוסיקה מודולריים למוסדות";
const DESCRIPTION =
  "High-end modular, computer-controlled music rooms for hospitals, music schools, tech campuses, and institutions. Acoustic design through commissioning — Ilan Ziv.";
const DESCRIPTION_HE =
  "חדרי מוסיקה מודולריים בשליטה ממוחשבת לבתי חולים, בתי ספר למוסיקה, קמפוסים ומוסדות. מתכנון אקוסטי ועד אינטגרציה — אילן זיו.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Ilan Ziv",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Ilan Ziv", url: SITE_URL }],
  creator: "Ilan Ziv",
  publisher: "Ilan Ziv",
  keywords: [
    "Ilan Ziv",
    "אילן זיו",
    "music rooms",
    "חדרי מוסיקה",
    "acoustic design",
    "תכנון אקוסטי",
    "modular studio",
    "computer-controlled room",
    "sound services",
    "שירותי סאונד",
    "hospital music room",
    "music school studio",
  ],
  category: "business",
  alternates: {
    canonical: "/",
    languages: {
      he: "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "he_IL",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ilan Ziv Music & Sound Services — modular music rooms",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  other: {
    "og:locale:alternate": "en_US",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  alternateName: ["אילן זיו שירותי מוסיקה וסאונד", "Ilan Ziv"],
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  logo: `${SITE_URL}/icon-512.png`,
  description: DESCRIPTION,
  email: "ziv200@gmail.com",
  areaServed: {
    "@type": "Country",
    name: "Israel",
  },
  serviceType: [
    "Modular music room design",
    "Acoustic design",
    "Audio system integration",
    "Computer-controlled room commissioning",
  ],
  knowsLanguage: ["he", "en"],
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
      <head>
        <link rel="manifest" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/site.webmanifest`} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-title" content="Ilan Ziv" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#f7f6f3] text-[#111111] font-sans antialiased selection:bg-neutral-900/10 selection:text-neutral-900 overflow-x-hidden">
        {/* Invisible bilingual hook for crawlers that skim body text */}
        <h1 className="sr-only">
          {TITLE_HE} — {TITLE}
        </h1>
        <p className="sr-only">{DESCRIPTION_HE}</p>
        {children}
      </body>
    </html>
  );
}
