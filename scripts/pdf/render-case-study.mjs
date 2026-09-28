// Renders the downloadable case-study PDFs (SCP B.7) as tagged PDFs:
//   public/files/adi-negev-case-study-he.pdf and -en.pdf
// Content: outreach playbook ch. 4, version A (named), with the SCP B.7 changes: phone, "opened August 2026",
// visit line, QR code + UTM link; no project cost, no user counts, no quote; room size only if set.
// Requires playwright-core, qrcode and Google Chrome (not project dependencies):
//   PLAYWRIGHT_CORE=/path/playwright-core/index.mjs QRCODE=/path/qrcode/lib/index.js node scripts/pdf/render-case-study.mjs
// Room size (optional, keep in sync with PENDING.adiRoomSize): ADI_ROOM_SIZE_HE="..." ADI_ROOM_SIZE_EN="..."
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { chromium } = await import(process.env.PLAYWRIGHT_CORE || "playwright-core");
const QR = (await import(process.env.QRCODE || "qrcode")).default;

const ROOM_SIZE =
  process.env.ADI_ROOM_SIZE_HE && process.env.ADI_ROOM_SIZE_EN ? { he: process.env.ADI_ROOM_SIZE_HE, en: process.env.ADI_ROOM_SIZE_EN } : null;

const img = (stem) => `data:image/webp;base64,${readFileSync(path.join(root, "public/media/large", `${stem}.webp`)).toString("base64")}`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const SITE = "https://ziv200.github.io/music-rooms";
const UTM = "utm_source=pdf&utm_medium=document&utm_campaign=pdf-case-study";

const COPY = {
  he: {
    docTitle: "מקרה בוחן: סטודיו הטיפול במוסיקה ע\"ש ולרי ומייקל מילר | עדי נגב – נחלת ערן",
    eyebrow: "מקרה בוחן · Music Rooms – אילן זיו",
    title: "סטודיו הטיפול במוסיקה ע\"ש ולרי ומייקל מילר | עדי נגב – נחלת ערן",
    opened: "נפתח באוגוסט 2026.",
    client: [
      ["הלקוח:", "הכפר השיקומי עדי נגב – נחלת ערן, שכולל בית חולים שיקומי, בית ספר לחינוך מיוחד ומגורים לאנשים עם מוגבלות."],
      ["מזמין:", "בית החולים."],
      ["מימון:", "תרומה ייעודית, והסטודיו קרוי על שם התורמים."],
    ],
    challengeTitle: "האתגר",
    challenge: "להפוך חלל קיים לחדר שמשמש מטפלים במוסיקה עם כמה אוכלוסיות (דיירים, תלמידי חינוך מיוחד, מטופלי שיקום), ושהצוות יכול להפעיל לבד.",
    stepsTitle: "מה נעשה, שלב אחרי שלב (אפריל–יולי 2026)",
    steps: [
      ["החלל שקיבלנו (אפריל 2026):", "תיעוד של החדר הקיים, נקודת הפתיחה."],
      ["תכנון מקדים ומדידות:", "סיור באתר, מדידות, שרטוטים והדמיות תלת־ממד לפני הבנייה."],
      ["כבלים ותשתיות (מאי 2026):", "מסלולי אות, חשמל, חיווט רמקולים ושדרת רשת. שיפוץ רצפות, תקרות, חשמל ותאורה."],
      ["טיפול אקוסטי ורמקולים (יוני 2026):", "טיפול אקוסטי ומיקום רמקולים."],
      ["אינטגרציה וכיול (יולי 2026):", "תוכנת בקרה, כלים, עמדת האזנה ואימות."],
    ],
    roomTitle: "מה יש בחדר",
    room: "תאורה חכמה, טיפול אקוסטי, מקלדת ותופים אלקטרוניים, פסנתר ומיקרופונים, ארון שמע ושולחן בקרה, עמדת האזנה Dolby Atmos, ושליטה מ־iPad עם סצנות ותבניות שמורות.",
    whyTitle: "בזכות מה זה עובד",
    why: "הצוות מדליק ומקבל את מצב החדר שצריך לאותו סשן, בלי לקרוא למהנדס. החדר יכול לגדול במודולים.",
    factsTitle: "בנתונים",
    facts: (size) => `משך הפרויקט: כ־4 חודשים (אפריל–יולי 2026).${size ? ` שטח החדר: ${size}.` : ""}`,
    visit: "אפשר לתאם ביקור בסטודיו, בשעות שבהן לא מתקיים טיפול.",
    images: [
      ["2026-04-15_162312_1", "לפני", "החלל הקיים לפני העבודות, כפי שנמסר לנו"],
      ["2026-05-13_111322_1", "במהלך", "קירות צבועים וכבלים פרוסים על הרצפה לפני סגירתה"],
      ["2026-07-06_200059_2", "אחרי", "הסטודיו המוגמר: כלים, טיפול אקוסטי בקירות ובתקרה ועמדת בקרה"],
    ],
    contactTitle: "להמשך",
    phone: "054-4500529",
    qrAlt: "קוד QR לדף מקרה הבוחן באתר",
    qrCaption: "לסיפור המלא, לתמונות ולסרטון:",
    path: "/adi-negev/",
  },
  en: {
    docTitle: "Case study: The Valerie and Michael Miller Music Therapy Studio | ADI Negev–Nahalat Eran",
    eyebrow: "Case study · Music Rooms – Ilan Ziv",
    title: "The Valerie and Michael Miller Music Therapy Studio | ADI Negev–Nahalat Eran",
    opened: "Opened in August 2026.",
    client: [
      ["Client:", "ADI Negev–Nahalat Eran rehabilitation village, home to a rehabilitation hospital, a special education school and residences for people with disabilities."],
      ["Contracted by:", "the hospital."],
      ["Funded by:", "a dedicated gift; the studio bears the donors' name."],
    ],
    challengeTitle: "The challenge",
    challenge: "Turn an existing space into a room that music therapists can use with several populations (residents, special education students, rehabilitation patients), and that staff can operate on their own.",
    stepsTitle: "What we did (April–July 2026)",
    steps: [
      ["The space as received (April 2026):", "the existing room documented as the starting point."],
      ["Planning and measurements:", "site survey, measurements, drawings and 3D renderings before construction."],
      ["Cabling and infrastructure (May 2026):", "signal paths, power, speaker wiring and network backbone."],
      ["Acoustic treatment and speakers (June 2026):", "acoustic treatment and speaker placement."],
      ["Integration and calibration (July 2026):", "control software, instruments, listening station and verification."],
    ],
    roomTitle: "In the room",
    room: "Smart lighting, acoustic treatment, keyboard and electronic drums, piano and microphones, an audio rack and control desk, a Dolby Atmos listening station, and iPad control with saved scenes and templates.",
    whyTitle: "Why it works",
    why: "Therapists switch the room to the setup each session needs, with no engineer on call. The room can grow in modules.",
    factsTitle: "Key facts",
    facts: (size) => `Duration: about 4 months.${size ? ` Room size: ${size}.` : ""}`,
    visit: "Visits to the studio can be arranged, at times when no therapy session is in progress.",
    images: [
      ["2026-04-15_162312_1", "Before", "The existing space before the work, as it was handed to us"],
      ["2026-05-13_111322_1", "During", "Painted walls and cables laid across the floor before it was closed"],
      ["2026-07-06_200059_2", "After", "The finished studio: instruments, acoustic wall and ceiling treatment, and a control station"],
    ],
    contactTitle: "Contact",
    phone: "+972-54-450-0529",
    qrAlt: "QR code linking to the case study page on the website",
    qrCaption: "The full story, photos and video:",
    path: "/en/adi-negev/",
  },
};

async function html(lang) {
  const c = COPY[lang];
  const he = lang === "he";
  const url = `${SITE}${c.path}?${UTM}`;
  const qrSvg = await QR.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#111111", light: "#ffffff" } });
  const qrImg = `data:image/svg+xml;base64,${Buffer.from(qrSvg).toString("base64")}`;
  const font = he ? "Rubik" : "Inter";
  return `<!doctype html><html lang="${lang}" dir="${he ? "rtl" : "ltr"}"><head><meta charset="utf-8"><title>${esc(c.docTitle)}</title>
<meta name="author" content="${he ? "אילן זיו" : "Ilan Ziv"}">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&family=Inter:wght@400;500&display=block" rel="stylesheet">
<style>
@page{size:A4;margin:14mm 15mm 12mm}
*{box-sizing:border-box}
body{margin:0;font-family:${font},sans-serif;color:#171717;font-size:10.3pt;line-height:1.45}
.eyebrow{font-size:9pt;color:#525252;margin:0 0 4pt;font-weight:500}
h1{font-size:${he ? 17.5 : 19}pt;line-height:1.2;font-weight:500;margin:0 0 4pt}
.opened{margin:0 0 9pt;color:#404040}
h2{font-size:11.5pt;font-weight:500;margin:9pt 0 3pt}
p{margin:0 0 5pt}
.client p{margin:0 0 2pt}
ol{margin:0;padding-${he ? "right" : "left"}:15pt}
li{margin:0 0 2pt}
strong{font-weight:500}
.imgs{display:flex;gap:6pt;margin:8pt 0 4pt}
figure{margin:0;flex:1}
figure img{width:100%;height:112pt;object-fit:cover;display:block}
figcaption{font-size:8.5pt;color:#525252;margin-top:2pt}
.footer{display:flex;gap:12pt;align-items:center;border-top:1px solid #d4d4d4;padding-top:8pt;margin-top:8pt}
.footer img{width:62pt;height:62pt}
.footer p{margin:0 0 2pt}
.ltr{direction:ltr;unicode-bidi:isolate}
a{color:#171717}
</style></head><body>
<main>
<p class="eyebrow">${esc(c.eyebrow)}</p>
<h1>${esc(c.title)}</h1>
<p class="opened">${esc(c.opened)}</p>
<section class="client">${c.client.map(([k, v]) => `<p><strong>${esc(k)}</strong> ${esc(v)}</p>`).join("")}</section>
<div class="imgs">${c.images.map(([stem, label, alt]) => `<figure><img src="${img(stem)}" alt="${esc(alt)}"><figcaption>${esc(label)}</figcaption></figure>`).join("")}</div>
<h2>${esc(c.challengeTitle)}</h2><p>${esc(c.challenge)}</p>
<h2>${esc(c.stepsTitle)}</h2><ol>${c.steps.map(([k, v]) => `<li><strong>${esc(k)}</strong> ${esc(v)}</li>`).join("")}</ol>
<h2>${esc(c.roomTitle)}</h2><p>${esc(c.room)}</p>
<h2>${esc(c.whyTitle)}</h2><p>${esc(c.why)}</p>
<h2>${esc(c.factsTitle)}</h2><p>${esc(c.facts(ROOM_SIZE?.[lang]))}</p>
<p>${esc(c.visit)}</p>
</main>
<footer class="footer">
<img src="${qrImg}" alt="${esc(c.qrAlt)}">
<div>
<p><strong>${esc(c.contactTitle)}</strong></p>
<p>${he ? "אילן זיו · " : "Ilan Ziv · "}<span class="ltr">${c.phone}</span> · <span class="ltr">ziv200@gmail.com</span></p>
<p>${esc(c.qrCaption)} <a class="ltr" href="${esc(url)}">ziv200.github.io/music-rooms${c.path}</a></p>
</div>
</footer>
</body></html>`;
}

mkdirSync(path.join(root, "public/files"), { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
for (const lang of ["he", "en"]) {
  await page.setContent(await html(lang), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Re-encode photos as ~900px JPEG so Chrome embeds them compactly (WebP would be stored losslessly).
  await page.evaluate(async () => {
    for (const im of document.querySelectorAll("figure img")) {
      await im.decode();
      const w = 900;
      const h = Math.round((im.naturalHeight / im.naturalWidth) * w);
      const cv = Object.assign(document.createElement("canvas"), { width: w, height: h });
      cv.getContext("2d").drawImage(im, 0, 0, w, h);
      im.src = cv.toDataURL("image/jpeg", 0.8);
      await im.decode();
    }
  });
  const out = path.join(root, "public/files", `adi-negev-case-study-${lang}.pdf`);
  await page.pdf({ path: out, format: "A4", printBackground: true, tagged: true, outline: true, preferCSSPageSize: true });
  console.log("wrote", path.relative(root, out));
}
await browser.close();
