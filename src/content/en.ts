/** English copy. Source of truth: site-content-package.md (SCP) English blocks. Verbatim. */
import type { FaqItem } from "./he";

export const enCommon = {
  brand: "Ilan Ziv",
  brandSuffix: "Music Rooms",
  skipLink: "Skip to content",
  nav: [
    { label: "Case study", href: "/en/adi-negev/" },
    { label: "Donors", href: "/en/donors/" },
    { label: "How we work", href: "/en/#process" },
    { label: "FAQ", href: "/en/#faq" },
  ],
  menuOpen: "Open menu",
  menuClose: "Close menu",
  ctaPrimary: "Request a one-page project brief",
  ctaShort: "Request a project brief",
  ctaVisit: "Arrange a visit",
  ctaPdf: "Download the case study (PDF)",
  stickyBar: {
    cta: "Project brief",
    whatsapp: "WhatsApp",
    ctaAria: "Request a one-page project brief",
    whatsappAria: "Send Ilan Ziv a WhatsApp message",
  },
  footer: {
    brand: "Music Rooms – Ilan Ziv",
    tagline: "Music room design and build for institutions",
    phoneLabel: "Phone & WhatsApp:",
    area: "",
    links: [
      { label: "Accessibility statement", href: "/en/accessibility/" },
      { label: "Privacy policy", href: "/en/privacy/" },
      { label: "Terms of use", href: "/en/terms/" },
    ],
    copyright: "© 2026",
  },
  langSwitchLabel: "עברית",
};

export const enHero = {
  eyebrow: "Music therapy rooms for institutions in Israel",
  h1: "A music therapy room your donors can name, and your therapists can run on their own",
  body: "I design and build music therapy rooms for rehabilitation centers, hospitals and care institutions in Israel, end to end: acoustic survey and 3D planning, infrastructure and cabling, acoustic treatment and speakers, and control-software integration and calibration. Staff run the room from a tablet with saved scenes, with no sound engineer needed for each session.",
  proof: "Latest project: The Valerie and Michael Miller Music Therapy Studio at ADI Negev–Nahalat Eran, opened in August 2026.",
  primary: "Request a one-page project brief",
  secondary: "Tour a sample project",
  smallLine: "Visiting Israel? The studio can be visited by arrangement.",
  imageAlt: "The music therapy studio at ADI Negev–Nahalat Eran after completion: instruments, acoustic wall treatment and a control station",
};

export const enCaseTeaser = {
  eyebrow: "Case study",
  title: "The Valerie and Michael Miller Music Therapy Studio",
  body: "At a rehabilitation village with a rehabilitation hospital, a special education school and residences for people with disabilities, I built The Valerie and Michael Miller Music Therapy Studio: planning, infrastructure, acoustic treatment, audio systems, instruments, smart lighting and tablet control. The music therapists run the room on their own.",
  button: "Read the case study",
  pdf: "Download the case study (PDF)",
};

export const enDonorTeaser = {
  title: "Fund a music therapy room that carries a donor's name",
  body: "A music room is a natural fit for a dedicated gift: a defined project with a visible result, a name on the door, and full documentation from empty space to dedication.",
  button: "How donor funding works",
};

export const enProcess = {
  title: "How we work together",
  steps: [
    { title: "Free needs assessment:", body: "who will use the room, for which sessions, and in which space. In most projects it ends with an initial room program." },
    { title: "Acoustic survey and measurements", body: "on site." },
    { title: "3D design, specification and estimate,", body: "plus a donor brief if needed." },
    { title: "Infrastructure:", body: "signal, power, network and, where needed, construction work, coordinated with the institution's engineering team." },
    { title: "Acoustic treatment, speakers and instruments.", body: "" },
    { title: "Integration and calibration:", body: "control software, scenes for each group, and testing." },
    { title: "Handover and training:", body: "a calibrated room that staff run from a tablet, staff training, and ongoing support and scene updates after handover." },
  ],
  timeline: "In the sample project, the work from the space as received to a calibrated room took about four months (April–July 2026). Every project's timeline depends on its scope.",
};

export const enVisit = {
  title: "Visit",
  body: "The best way to understand the room is to sit in it. Visits to the music therapy studio I built in the sample project can be arranged at times when no therapy session is in progress. I coordinate each visit in advance and join to show how the room is built and how staff run it.",
  button: "Arrange a visit",
};

export const enAbout = {
  title: "About me",
  paragraphs: [
    "I'm Ilan Ziv, 32: a musician, sound engineer and software developer, and a graduate of the Jerusalem Academy of Music and Dance. For years I performed with leading Israeli artists, and later worked with them as a sound engineer. Today I design music rooms and develop audio software.",
    "That combination is rare: I understand a room as a player, as an acoustics and systems engineer, and as the developer of the software that runs it. So I can take a project from empty space to a calibrated room that staff run themselves.",
    "Music therapy is also personal for me: two of my siblings have special needs, and I know firsthand how much a place to play, listen and express yourself matters.",
  ],
  photoAlt: "Ilan Ziv",
};

export const enFaqTitle = "FAQ";
export const enFaq: FaqItem[] = [
  { id: 1, q: "Who runs the room day to day?", a: "The staff. The room is controlled from a tablet and a wall remote, with saved scenes for each type of session. No sound engineer is needed for each session." },
  { id: 2, q: "What does it cost?", a: "Every room is priced after a needs assessment and a site survey, based on the space, infrastructure and modules. There is a full project and a smaller Core Room in an existing space. The initial needs assessment is free of charge." },
  { id: 4, q: "Can we start small and expand?", a: "Yes. Rooms are modular: start with a Core Room and add instruments, smart lighting, recording or a Dolby Atmos listening station later." },
  { id: 5, q: "How are these rooms funded?", a: "Many institutions fund a music room through a dedicated gift, as in the sample project. I can prepare a one-page project brief for the development office to share with donors." },
  { id: 7, q: "What happens after handover?", a: "Staff receive structured training at handover, and I remain available for support, questions and scene updates. Service terms are set in each project agreement." },
  { id: 9, q: "Can we see a room like this?", a: "Yes. Visits to the studio I built in the sample project can be arranged when no therapy session is in progress, coordinated in advance through me." },
];

export const enForm = {
  title: "Request a one-page project brief",
  intro: "",
  sidebarLead: "Prefer to talk? Phone & WhatsApp:",
  sidebarTail: "",
  area: "",
  choose: "Select…",
  required: "(required)",
  fields: {
    name: "Full name",
    role: "Role",
    organization: "Organization",
    email: "Email",
    phone: "Phone",
    phoneHint: "",
    orgType: "Organization type",
    spaceStatus: "Space status",
    therapyProgram: "Music therapy program",
    funding: "Funding",
    timeline: "Timeline",
    region: "Region",
    roomSize: "Approx. room size",
    roomSizeHint: "",
    requests: "Anything else we can send you?",
    message: "What should the room make possible?",
    messageHint: "",
  },
  /** SCP B.8 gives field labels in English; option labels are faithful translations of the Hebrew options. */
  options: {
    role: ["Therapist (music, arts, occupational therapy)", "Clinical or department manager", "Institution management", "Development, Friends organization or foundation", "Engineering and construction", "Workplace, HR or wellbeing", "Architect or project manager", "Other"],
    orgType: ["Rehabilitation institution", "Institution or village for people with disabilities", "Hospital (general or children's)", "Mental health center", "Geriatric and long-term care", "Beit HaLochem or IDF veterans' rehabilitation", "Tech company", "Architecture or project management firm", "Music education", "Other"],
    spaceStatus: ["A room is available", "Space under renovation", "New building or new office", "No space yet"],
    therapyProgram: ["Music therapist on staff", "Planned", "Not relevant"],
    funding: ["Existing budget", "Approved donation", "Looking for a donor", "Not known yet"],
    timeline: ["Within six months", "Six months to a year", "More than a year", "Not known"],
    region: ["South", "Center", "Jerusalem area", "Sharon", "Haifa area", "North", "Other"],
    requests: ["I'd like to arrange a visit to the room", "I'd like a donor project brief", "I'd like to receive the case study (PDF)"],
  },
  consentBefore: "I have read the ",
  consentLink: "privacy policy",
  consentAfter: " and agree that my details will be used to respond to my inquiry.",
  note: "Your details are sent to my email via FormSubmit, a third-party service. I won't add you to any mailing list.",
  submit: "Request a needs assessment",
  sending: "Sending…",
  thanks: "Thank you! I've received your details and will get back to you shortly. Meanwhile, you're welcome to take a look at the sample project.",
  thanksLink: "→",
  error: "Something went wrong. Please try again, or write to me directly at ziv200@gmail.com or on WhatsApp: +972-54-450-0529.",
  validation: {
    name: "Please enter your full name",
    role: "Please choose a role",
    organization: "Please enter your organization",
    email: "Please enter a valid email address",
    orgType: "Please choose an organization type",
    consent: "To send, please agree to the privacy policy",
  },
  subject: "פנייה חדשה מהאתר – Music Rooms",
};

export const enCaseStudy = {
  h1: "The Valerie and Michael Miller Music Therapy Studio | ADI Negev–Nahalat Eran",
  subtitle: "From an existing space to a calibrated music therapy studio that therapists run on their own. April–July 2026.",
  facts: [
    { label: "Client (contracting party)", value: "ADI Negev–Nahalat Eran hospital, part of a rehabilitation village that includes a rehabilitation hospital, a special education school and residences for people with disabilities" },
    { label: "Funding", value: "A dedicated gift. The studio is named for Valerie and Michael Miller" },
    { label: "Who uses the room", value: "Music therapists, working with residents, special education students and rehabilitation patients" },
    { label: "Timeline", value: "About four months (April–July 2026). Opened in August 2026" },
    { label: "Scope", value: "Full project: infrastructure renovation (floors, ceilings, electrical and lighting), acoustic treatment, audio systems, instruments, smart lighting, tablet control and a Dolby Atmos listening station" },
  ],
  roomSizeLabel: "Room size",
  blocks: [
    { title: "The challenge", body: "Turn an existing space into a room that serves several populations, each needing a different room setup, and that staff can run without a technician." },
    { title: "The solution", body: "Acoustic design and infrastructure from scratch; instruments chosen for a hospital setting (for example, quieter electronic drums, since the room is close to the entrance); and a tablet interface with saved scenes. A wall remote at the door turns the room on and switches between modes: play and therapy, or listening." },
    { title: "Why it works", body: "Therapists switch the room to the setup each session needs, with no engineer on call. The room can grow in modules as the program grows." },
  ],
  atmos: "To the best of my knowledge, this is the first music therapy room in Israel and the Middle East with a full Dolby Atmos listening station.",
  galleryTitle: "Stages",
  galleryLabel: "Build stages",
  phases: [
    { id: "phase-1", tag: "01", title: "The space as received", date: "April 2026", body: "" },
    { id: "phase-0", tag: "02", title: "Planning and measurements", date: "April 2026", body: "" },
    { id: "phase-2", tag: "03", title: "Cabling and infrastructure", date: "May 2026", body: "" },
    { id: "phase-3", tag: "04", title: "Acoustic treatment and speakers", date: "June 2026", body: "" },
    { id: "phase-4", tag: "05", title: "Integration and calibration", date: "July 2026", body: "" },
  ],
  visitTitle: "Visit",
  visit: "The best way to understand the room is to sit in it. Visits to the studio can be arranged through me, at times when no therapy session is in progress.",
  visitButton: "Arrange a visit",
  closing: "Planning a room like this?",
  closingButton: "Request a one-page project brief",
  pdf: "Download the case study (PDF)",
};

export const enDonors = {
  h1: "Fund a music therapy room that carries a donor's name",
  subtitle: "A tangible, well-documented project, with a finished reference already in use.",
  intro: "Most of the new music rooms in Israeli rehabilitation centers and hospitals were funded by donors. In the sample project, the hospital contracted the work and a dedicated gift funded it; the studio now bears the name of Valerie and Michael Miller. I work with the clinical team and the development office, so you have something concrete to show a donor before work begins.",
  stepsTitle: "How it works:",
  steps: [
    { title: "The clinical team defines the need:", body: "who will use the room, for which groups, and in which space. The needs assessment is free of charge, and it usually ends with an initial room program." },
    { title: "I prepare a one-page project brief for the donor:", body: "renderings, scope and timeline, coordinated with the team. The cost estimate follows a site survey and goes directly to the institution." },
    { title: "The development office presents it to the donor.", body: "Once approved, I build and document every stage, so there is progress to share along the way and at the dedication." },
  ],
  dedicationTitle: "About dedications:",
  dedication: "Naming and dedication options are set by the institution and its policies. My part is to deliver a room that is easy to present, photograph and dedicate.",
  visitTitle: "Visiting Israel?",
  visit: "The studio I built can be visited by arrangement, when no therapy session is in progress.",
  primary: "Request a one-page project brief",
  secondary: "Download the case study (PDF)",
};

export const enThanks = {
  h1: "Thank you!",
  body: "I've received your details and will get back to you shortly. Meanwhile, you're welcome to take a look at the sample project.",
  link: "Tour a sample project",
};

/** Existing site copy for the room tour (English). */
export const enTour = {
  title: "A short walk through",
  subtitle: "Narrated walkthrough (in Hebrew) with brief English labels — lighting, acoustics, instruments, control, and the Atmos seat.",
  caption: "Tour with sound · ~4 min · tap a label to jump",
  chaptersLabel: "Tour chapters",
  fullscreen: "Fullscreen",
  exitFullscreen: "Exit fullscreen",
};
