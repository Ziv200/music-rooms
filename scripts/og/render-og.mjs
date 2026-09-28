// Renders the social-share (Open Graph) images in public/og/ from HTML, so Hebrew is shaped correctly.
// Requires playwright-core and Google Chrome (not project dependencies):
//   npm i --no-save playwright-core   (or run with NODE_PATH pointing at an install)
//   node scripts/og/render-og.mjs
// or point PLAYWRIGHT_CORE at an existing install: PLAYWRIGHT_CORE=/path/to/node_modules/playwright-core/index.mjs
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const img = (p) => `data:image/webp;base64,${readFileSync(path.join(root, "public/media", p)).toString("base64")}`;

const CARDS = [
  { file: "og-he-home.jpg", lang: "he", eyebrow: "Music Rooms – אילן זיו", title: "חדרי מוסיקה טיפוליים למוסדות", sub: "תכנון והקמה מקצה לקצה. הצוות מפעיל את החדר לבד, מטאבלט.", img: "hero-1400.webp" },
  { file: "og-en-home.jpg", lang: "en", eyebrow: "Music Rooms – Ilan Ziv", title: "Music therapy rooms for institutions in Israel", sub: "End-to-end design and build. Staff run the room from a tablet.", img: "hero-1400.webp" },
  { file: "og-he-adi-negev.jpg", lang: "he", eyebrow: "מקרה בוחן · עדי נגב – נחלת ערן", title: "סטודיו הטיפול במוסיקה ע\"ש ולרי ומייקל מילר", sub: "מחלל קיים לחדר טיפול מכויל. אפריל–יולי 2026.", img: "large/2026-07-06_200059_2.webp" },
  { file: "og-en-adi-negev.jpg", lang: "en", eyebrow: "Case study · ADI Negev–Nahalat Eran", title: "The Valerie and Michael Miller Music Therapy Studio", sub: "From an existing space to a calibrated room. April–July 2026.", img: "large/2026-07-06_200059_2.webp" },
];

const html = (c) => `<!doctype html><html lang="${c.lang}" dir="${c.lang === "he" ? "rtl" : "ltr"}"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&family=Inter:wght@400;500&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;display:flex;background:#f7f6f3;color:#171717;font-family:${c.lang === "he" ? "Rubik" : "Inter"},sans-serif}
.text{width:640px;padding:64px 60px;display:flex;flex-direction:column;justify-content:center}
.eyebrow{font-size:24px;color:#525252;margin-bottom:22px;font-weight:500}
h1{font-size:${c.title.length > 34 ? 50 : 58}px;line-height:1.15;font-weight:500;margin-bottom:24px}
p{font-size:26px;line-height:1.45;color:#404040}
.bar{width:64px;height:4px;background:#171717;margin-bottom:26px}
.img{flex:1;background:url(${img(c.img)}) center/cover no-repeat}
.url{position:absolute;bottom:34px;${c.lang === "he" ? "right" : "left"}:60px;font-size:20px;color:#525252;font-family:Inter,sans-serif}
</style></head><body><div class="text"><div class="bar"></div><div class="eyebrow">${c.eyebrow}</div><h1>${c.title}</h1><p>${c.sub}</p></div><div class="img"></div><div class="url">ziv200.github.io/music-rooms</div></body></html>`;

const { chromium } = await import(process.env.PLAYWRIGHT_CORE || "playwright-core");
mkdirSync(path.join(root, "public/og"), { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of CARDS) {
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, "public/og", c.file), type: "jpeg", quality: 86 });
  console.log("wrote", c.file);
}
await browser.close();
