export type Lang = "en" | "he";

export const translations = {
  en: {
    dir: "ltr" as const,
    brand: "Ilan Ziv",
    brandFull: "Ilan Ziv Music & Sound Services",
    nav: {
      offer: "Offer",
      tour: "The room",
      work: "Work",
      contact: "Contact",
      langSwitch: "עברית",
    },
    hero: {
      eyebrow: "High-end music rooms — designed, built, and controlled",
      title: "Ilan Ziv",
      titleAccent: "Music & Sound Services",
      subtitle:
        "I design and deliver modular, computer-controlled music rooms for organizations that want a serious space — not a converted office with speakers. From acoustic planning through commissioning.",
      cta1: "See a completed room",
      cta2: "Who this is for",
      photoCaption: "Completed room — integration & calibration",
    },
    offer: {
      sectionLabel: "Offer",
      title: "Rooms that run as systems",
      subtitle:
        "Each project is a full environment: acoustics, infrastructure, instruments, and software control in one coherent room. Built for institutions with a real budget and a clear use case.",
      audiencesLabel: "Who I work with",
      audiences: [
        {
          title: "Hospitals & clinical settings",
          description:
            "Therapy and rehabilitation spaces where sound must be controlled, repeatable, and easy for staff to operate.",
        },
        {
          title: "Music schools & conservatories",
          description:
            "Teaching and ensemble rooms that need reliable acoustics, flexible layouts, and clean recording paths.",
        },
        {
          title: "Tech & corporate campuses",
          description:
            "Music and creative rooms for employees — wellness, culture, and brand — at the same finish level as the rest of the campus.",
        },
        {
          title: "Clinics & private care",
          description:
            "Smaller clinical practices that want a purpose-built room without assembling vendors themselves.",
        },
        {
          title: "Cultural & community spaces",
          description:
            "Museums, community centers, and foundations commissioning a dedicated high-quality music room.",
        },
        {
          title: "Institutional private studios",
          description:
            "Foundations, universities, and residency programs that need a durable, operated space — not a hobby build.",
        },
      ],
      pillarsLabel: "How the rooms work",
      pillars: [
        {
          tag: "Everyday use",
          title: "One system the team can actually run",
          description:
            "The room is driven from a computer — scenes and presets for how you work that day. Staff turn it on and get the setup they need, without calling an engineer for every session.",
          points: [
            "Simple on/off and saved room setups",
            "Grows in modules as the program grows",
            "Built for therapists, teachers, and staff",
            "Lighting and room modes from a tablet",
          ],
        },
        {
          tag: "Full delivery",
          title: "From first visit to a finished room",
          description:
            "I stay with the project end to end: measuring the space, planning the acoustics, building, wiring, placing instruments, and handing over a room that matches what we agreed — not a stack of separate contractors.",
          points: [
            "Site survey and measurements",
            "Clear plan before anyone drills a wall",
            "Build, wiring, and finish in one thread",
            "Handoff with the room ready to use",
          ],
        },
        {
          tag: "When it fits",
          title: "Immersive listening as an upgrade",
          description:
            "When the brief calls for it, the room can include a precise surround / Atmos listening seat. I built what is, to my knowledge, the first therapeutic Atmos room of its kind in the Middle East — and possibly the world. It is the cherry on top of a strong music room, not the whole story.",
          points: [
            "Optional, only when it serves the program",
            "Calibrated seat — not the whole room as Atmos",
            "Therapy, teaching, and play stay at the center",
            "Proven on a real clinical project",
          ],
        },
      ],
    },
    tour: {
      sectionLabel: "The room",
      title: "A short walk through",
      subtitle:
        "Muted walkthrough with brief labels — lighting, acoustics, instruments, control, and the Atmos seat.",
      videoCaption: "Silent tour · ~4 min · tap a label to jump",
    },
    work: {
      sectionLabel: "Work",
      title: "One room, fully documented",
      subtitle:
        "A recent high-spec music room — from first measurements through integration. Use it as a reference for craft, finish, and process. The immersive listening seat here is an example of what the system can do; the room itself is the product.",
      phases: [
        {
          id: "phase-1",
          tag: "01",
          title: "The space we received",
          dateRange: "April 2026",
          description:
            "The existing room as handed over — the starting point before design and build.",
        },
        {
          id: "phase-0",
          tag: "02",
          title: "Planning & measurements",
          dateRange: "Early 2026",
          description:
            "Site survey, measurements, drawings, and 3D visualizations before build.",
        },
        {
          id: "phase-2",
          tag: "03",
          title: "Cabling & infrastructure",
          dateRange: "May 2026",
          description:
            "Signal paths, power, speaker runs, and network backbone.",
        },
        {
          id: "phase-3",
          tag: "04",
          title: "Treatment & speakers",
          dateRange: "June 2026",
          description:
            "Acoustic treatment and speaker placement.",
        },
        {
          id: "phase-4",
          tag: "05",
          title: "Integration & calibration",
          dateRange: "July 2026",
          description:
            "Control software, instruments, listening position, and verification.",
        },
      ],
    },
    contact: {
      sectionLabel: "Contact",
      title: "Start a conversation",
      subtitle:
        "If you are planning a serious music room for an institution — send a short brief. I reply personally.",
      form: {
        facilityType: "Organization type",
        facilityOptions: [
          "Select…",
          "Hospital / medical center",
          "Music school / conservatory",
          "Tech / corporate campus",
          "Clinic / private care",
          "Cultural / community",
          "University / foundation",
          "Other",
        ],
        dimensions: "Room size (approx.)",
        dimensionsPlaceholder: "e.g. 6m × 5m × 3m",
        scope: "Brief",
        scopePlaceholder: "Goals, users, timeline, constraints…",
        name: "Name",
        namePlaceholder: "Full name",
        email: "Email",
        emailPlaceholder: "name@organization.com",
        submit: "Send",
        download: "Request a capability outline (PDF)",
        sent: "Sent",
      },
      sidebarTitle: "What helps",
      sidebarBody:
        "Organization type, rough room size, primary use (therapy, teaching, employee space…), and whether you already have a site or architect.",
      directTitle: "Direct",
      emailLabel: "Email",
      locationLabel: "Based in",
      locationValue: "Israel — projects nationwide",
    },
    footer: {
      tagline: "Modular, computer-controlled music rooms",
      copyright: "© 2026 Ilan Ziv Music & Sound Services",
      links: ["Privacy", "Terms"],
    },
  },
  he: {
    dir: "rtl" as const,
    brand: "אילן זיו",
    brandFull: "אילן זיו שירותי מוסיקה וסאונד",
    nav: {
      offer: "ההצעה",
      tour: "החדר",
      work: "עבודה",
      contact: "יצירת קשר",
      langSwitch: "English",
    },
    hero: {
      eyebrow: "חדרי מוסיקה ברמה גבוהה — תכנון, בנייה ובקרה",
      title: "אילן זיו",
      titleAccent: "שירותי מוסיקה וסאונד",
      subtitle:
        "אני מתכנן ומספק חדרי מוסיקה מודולריים ומבוקרי־מחשב לארגונים שרוצים חלל רציני — לא משרד שהוסבו לרמקולים. מתכנון אקוסטי ועד מסירה מכוילת.",
      cta1: "חדר מוגמר",
      cta2: "למי זה מתאים",
      photoCaption: "חדר מוגמר — אינטגרציה וכיול",
    },
    offer: {
      sectionLabel: "ההצעה",
      title: "חדרים שעובדים כמערכת",
      subtitle:
        "כל פרויקט הוא סביבה שלמה: אקוסטיקה, תשתיות, כלים ובקרת תוכנה בחדר אחד קוהרנטי. לארגונים עם תקציב אמיתי ושימוש ברור.",
      audiencesLabel: "עם מי אני עובד",
      audiences: [
        {
          title: "בתי חולים ומסגרות קליניות",
          description:
            "חדרי טיפול ושיקום שבהם השמע חייב להיות מבוקר, חוזר על עצמו ופשוט להפעלה לצוות.",
        },
        {
          title: "בתי ספר למוסיקה וקונסרבטוריונים",
          description:
            "חדרי הוראה והרכבים שדורשים אקוסטיקה אמינה, גמישות בפריסה ומסלולי הקלטה נקיים.",
        },
        {
          title: "קמפוסים של הייטק וחברות",
          description:
            "חדרי מוסיקה ויצירה לעובדים — wellness ותרבות ארגונית — באותה רמת גימור כמו שאר הקמפוס.",
        },
        {
          title: "מרפאות וטיפול פרטי",
          description:
            "קליניקות שרוצות חדר ייעודי בלי לרכז בעצמן ספקים נפרדים.",
        },
        {
          title: "חללים תרבותיים וקהילתיים",
          description:
            "מוזיאונים, מרכזים קהילתיים וקרנות שמזמינים חדר מוסיקה ייעודי ברמה גבוהה.",
        },
        {
          title: "אולפנים מוסדיים",
          description:
            "אוניברסיטאות, קרנות ותוכניות שהייה שצריכות חלל עמיד ומופעל — לא פרויקט חובבני.",
        },
      ],
      pillarsLabel: "איך החדרים עובדים",
      pillars: [
        {
          tag: "שימוש יומיומי",
          title: "מערכת אחת שהצוות באמת מפעיל",
          description:
            "החדר מנוהל מהמחשב — סצנות ותבניות לפי איך עובדים באותו יום. הצוות מדליק ומקבל את המצב שצריך, בלי לקרוא למהנדס על כל סשן.",
          points: [
            "הפעלה פשוטה ותבניות חדר שמורות",
            "גדל במודולים כשהתוכנית גדלה",
            "מיועד למטפלים, מורים וצוות",
            "תאורה ומצבי חדר מהטאבלט",
          ],
        },
        {
          tag: "מסירה מלאה",
          title: "מהביקור הראשון עד חדר מוכן",
          description:
            "אני נשאר עם הפרויקט מקצה לקצה: מדידת החלל, תכנון אקוסטי, בנייה, חיווט, הצבת כלים ומסירה של חדר שתואם למה שסיכמנו — לא אוסף קבלנים נפרדים.",
          points: [
            "סיור באתר ומדידות",
            "תוכנית ברורה לפני שקודחים בקיר",
            "בנייה, חיווט וגימור בחוט אחד",
            "מסירה עם חדר מוכן לשימוש",
          ],
        },
        {
          tag: "כשזה מתאים",
          title: "האזנה עוטפת כשדרוג",
          description:
            "כשהבריף דורש, אפשר לכלול מושב האזנה מדויק בפריסה עוטפת / Atmos. הקמתי את מה שלמיטב ידיעתי הוא חדר ה־Atmos הטיפולי הראשון מסוגו במזרח התיכון — ואולי בעולם. זה הדובדבן שעל הקצפת של חדר מוסיקה חזק, לא כל הסיפור.",
          points: [
            "אופציונלי — רק כשזה משרת את התוכנית",
            "מושב מכויל — לא כל החדר כ־Atmos",
            "טיפול, הוראה ונגינה נשארים במרכז",
            "מוכח בפרויקט קליני אמיתי",
          ],
        },
      ],
    },
    tour: {
      sectionLabel: "החדר",
      title: "סיור קצר בחדר",
      subtitle:
        "סיור ללא קול עם כתוביות קצרות — תאורה, אקוסטיקה, כלים, בקרה ועמדת Atmos.",
      videoCaption: "סיור שקט · כ־4 דק׳ · לחצו על תווית כדי לקפוץ",
    },
    work: {
      sectionLabel: "עבודה",
      title: "חדר אחד, מתועד במלואו",
      subtitle:
        "חדר מוסיקה ברמה גבוהה מהזמן האחרון — מהמדידות הראשונות ועד אינטגרציה. אפשר להשתמש בו כהפניה לאיכות ולתהליך. עמדת ההאזנה המרחבית כאן היא דוגמה ליכולת המערכת; המוצר הוא החדר עצמו.",
      phases: [
        {
          id: "phase-1",
          tag: "01",
          title: "החלל שקיבלנו",
          dateRange: "אפריל 2026",
          description: "החדר הקיים כפי שנמסר — נקודת הפתיחה לפני תכנון ובנייה.",
        },
        {
          id: "phase-0",
          tag: "02",
          title: "תכנון מקדים ומדידות",
          dateRange: "תחילת 2026",
          description:
            "סיור באתר, מדידות, שרטוטים והדמיות תלת־ממד לפני הבנייה.",
        },
        {
          id: "phase-2",
          tag: "03",
          title: "כבלים ותשתיות",
          dateRange: "מאי 2026",
          description: "מסלולי אות, חשמל, חיווט רמקולים ושדרת רשת.",
        },
        {
          id: "phase-3",
          tag: "04",
          title: "טיפול אקוסטי ורמקולים",
          dateRange: "יוני 2026",
          description: "טיפול אקוסטי ומיקום רמקולים.",
        },
        {
          id: "phase-4",
          tag: "05",
          title: "אינטגרציה וכיול",
          dateRange: "יולי 2026",
          description: "תוכנת בקרה, כלים, עמדת האזנה ואימות.",
        },
      ],
    },
    contact: {
      sectionLabel: "יצירת קשר",
      title: "בואו נדבר",
      subtitle:
        "אם אתם מתכננים חדר מוסיקה רציני למוסד — שלחו תיאור קצר. אני עונה אישית.",
      form: {
        facilityType: "סוג ארגון",
        facilityOptions: [
          "בחרו…",
          "בית חולים / מרכז רפואי",
          "בית ספר למוסיקה / קונסרבטוריון",
          "הייטק / קמפוס חברה",
          "מרפאה / טיפול פרטי",
          "תרבות / קהילה",
          "אוניברסיטה / קרן",
          "אחר",
        ],
        dimensions: "גודל חדר (בקירוב)",
        dimensionsPlaceholder: "לדוגמה 6 מ' × 5 מ' × 3 מ'",
        scope: "תיאור קצר",
        scopePlaceholder: "מטרות, משתמשים, לוח זמנים, אילוצים…",
        name: "שם",
        namePlaceholder: "שם מלא",
        email: "דוא״ל",
        emailPlaceholder: "name@organization.com",
        submit: "שליחה",
        download: "בקשת מסמך יכולות (PDF)",
        sent: "נשלח",
      },
      sidebarTitle: "מה עוזר",
      sidebarBody:
        "סוג ארגון, גודל חדר משוער, שימוש עיקרי (טיפול, הוראה, חלל לעובדים…), והאם יש כבר אתר או אדריכל.",
      directTitle: "ישיר",
      emailLabel: "דוא״ל",
      locationLabel: "מבוסס ב־",
      locationValue: "ישראל — פרויקטים בכל הארץ",
    },
    footer: {
      tagline: "חדרי מוסיקה מודולריים ומבוקרי־מחשב",
      copyright: "© 2026 אילן זיו שירותי מוסיקה וסאונד",
      links: ["פרטיות", "תנאים"],
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
