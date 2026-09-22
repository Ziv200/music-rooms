export type TourCaption = {
  start: number;
  end: number;
  he: string;
  en: string;
  hePoints: string[];
  enPoints: string[];
};

/** Timed chapters + short bullets from the narrated walkthrough (~242s). */
export const TOUR_CAPTIONS: TourCaption[] = [
  {
    start: 0,
    end: 18,
    he: "החדר",
    en: "The room",
    hePoints: [
      "סיום הקמת חדר מוסיקה וטיפול ברמה גבוהה",
      "חלל מוכן לשימוש — סאונד, עיצוב ובקרה במקום אחד",
    ],
    enPoints: [
      "A finished high-end music and therapy room",
      "Sound, design, and control delivered as one space",
    ],
  },
  {
    start: 18,
    end: 42,
    he: "תאורה חכמה",
    en: "Smart lighting",
    hePoints: [
      "שלט מגנטי בכניסה — הדלקה, כיבוי ומצבים שמורים",
      "מצב האזנה עם דגש על עמדת Atmos",
      "מצב נגינה / טיפול בהיר יותר, ומצב רגיל",
    ],
    enPoints: [
      "Magnetic wall remote at the entrance — on/off and saved scenes",
      "Listening scene that spots the Atmos seat",
      "Brighter play / therapy scene, plus a normal everyday look",
    ],
  },
  {
    start: 42,
    end: 68,
    he: "טיפול אקוסטי",
    en: "Acoustic treatment",
    hePoints: [
      "פאנלים על הקירות ובתקרה ברמה גבוהה",
      "מלכודות בס בפינות",
      "וילונות אקוסטיים לספיגה ולהפחתת רעש למסדרון",
    ],
    enPoints: [
      "High-end panels on walls and ceiling",
      "Bass traps in the corners",
      "Acoustic curtains for absorption and less spill to the corridor",
    ],
  },
  {
    start: 68,
    end: 125,
    he: "כלי נגינה (מקלדת, תופים אלקטרוניים)",
    en: "Instruments (keyboard, electronic drums)",
    hePoints: [
      "מתלה גיטרות: אקוסטית, חשמלית ושתי קלאסיות + מגבר",
      "מקלדת Kawai עם כיסא",
      "תופים אלקטרוניים EFNOTE — שקטים יותר ליד כניסת בית החולים",
      "Roland HandSonic להקשה ידנית, ובס עם מגבר בס",
    ],
    enPoints: [
      "Guitar rack: acoustic, electric, two classical + amp",
      "Kawai keyboard with matching chair",
      "EFNOTE e-drums — quieter near the hospital entrance",
      "Roland HandSonic hand percussion, plus bass and bass amp",
    ],
  },
  {
    start: 125,
    end: 148,
    he: "פסנתר ומיקרופונים",
    en: "Piano & microphones",
    hePoints: [
      "פסנתר ימאהה אקוסטי עם ספסל",
      "שני מיקרופונים ווקאליים על סטנדים",
    ],
    enPoints: [
      "Yamaha acoustic upright with bench",
      "Two vocal mics on floor stands",
    ],
  },
  {
    start: 148,
    end: 175,
    he: "ארון שמע ושולחן בקרה",
    en: "AV rack & control desk",
    hePoints: [
      "ארון תקשורת עם ציוד השמע של החדר",
      "שולחן בקרה ראשי עם מחשב",
      "HandSonic נוסף ליד עמדת העבודה",
    ],
    enPoints: [
      "Comms / sound rack with the room’s audio gear",
      "Main control desk with the studio PC",
      "A second HandSonic at the workstation",
    ],
  },
  {
    start: 175,
    end: 215,
    he: "עמדת Atmos",
    en: "Atmos listening seat",
    hePoints: [
      "גולת הכותרת של העבודה — שמע מרחבי (Atmos)",
      "12 רמקולים: 4 בתקרה, 7 ברצפה, ועוד סאב",
      "כיסא מרכזי — חוויית האזנה חזקה (“וואו”)",
    ],
    enPoints: [
      "The crown of the build — immersive Atmos listening",
      "12 speakers: 4 ceiling, 7 floor-level, plus a sub",
      "Central armchair — described as a striking “wow” experience",
    ],
  },
  {
    start: 215,
    end: 250,
    he: "שליטה מ־iPad",
    en: "iPad room control",
    hePoints: [
      "ממשק ייעודי על iPad על שולחן הבקרה",
      "מאקרואים לחדר (כולל כפתור Atmos שמשנה גם תאורה)",
      "מיקסר דיגיטלי — מיקרופונים, גיטרות, פסנתר, תופים אלקטרוניים ובלוטות׳",
    ],
    enPoints: [
      "Custom room UI on an iPad at the control desk",
      "Room macros (including Atmos, which also shifts the lights)",
      "Digital mixer for mics, guitars, piano, e-drums, and Bluetooth",
    ],
  },
];

export function captionAt(time: number): TourCaption | null {
  for (const c of TOUR_CAPTIONS) {
    if (time >= c.start && time < c.end) return c;
  }
  return TOUR_CAPTIONS[TOUR_CAPTIONS.length - 1] ?? null;
}

function toVttTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const whole = Math.floor(s);
  const ms = Math.round((s - whole) * 1000);
  return (
    String(h).padStart(2, "0") +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(whole).padStart(2, "0") +
    "." +
    String(ms).padStart(3, "0")
  );
}

/** WebVTT for native fullscreen (HTML overlays are not shown there). */
export function buildTourVtt(lang: "he" | "en"): string {
  const lines: string[] = ["WEBVTT", ""];
  for (const c of TOUR_CAPTIONS) {
    const title = lang === "he" ? c.he : c.en;
    const points = lang === "he" ? c.hePoints : c.enPoints;
    const body = [title, ...points.map((p) => `• ${p}`)].join("\n");
    lines.push(
      `${toVttTimestamp(c.start)} --> ${toVttTimestamp(Math.min(c.end, 241.8))}`
    );
    lines.push(body);
    lines.push("");
  }
  return lines.join("\n");
}
