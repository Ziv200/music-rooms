// Writes public/sitemap.xml with hreflang alternates. Run: node scripts/generate-sitemap.mjs
import { writeFileSync } from "node:fs";

const SITE = "https://ziv200.github.io/music-rooms";
const LASTMOD = process.env.LASTMOD || new Date().toISOString().slice(0, 10);

// [hebrew path, english path | null]
const PAGES = [
  ["/", "/en/"],
  ["/adi-negev/", "/en/adi-negev/"],
  ["/donors/", "/en/donors/"],
  ["/rehab/", null],
  ["/beit-halochem/", null],
  ["/workplace/", null],
  ["/architects/", null],
  ["/services/", null],
  ["/accessibility/", "/en/accessibility/"],
  ["/privacy/", "/en/privacy/"],
  ["/terms/", "/en/terms/"],
];

const alt = (he, en) =>
  [
    `    <xhtml:link rel="alternate" hreflang="he" href="${SITE}${he}"/>`,
    en ? `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${en}"/>` : null,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${he}"/>`,
  ]
    .filter(Boolean)
    .join("\n");

const entry = (loc, he, en) => `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n${alt(he, en)}\n  </url>`;

const urls = [];
for (const [he, en] of PAGES) {
  urls.push(entry(he, he, en));
  if (en) urls.push(entry(en, he, en));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml: ${urls.length} URLs, lastmod ${LASTMOD}`);
