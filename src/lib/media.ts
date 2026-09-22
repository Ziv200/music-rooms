import fs from "fs";
import path from "path";

export interface MediaFile {
  filename: string;
  src: string;
  date: string;
  time: string;
  type: "image" | "video";
  extension: string;
  sequence: number;
}

export interface PhaseMedia {
  phase: string;
  dateRange: string;
  files: MediaFile[];
}

const MEDIA_DIR = "project-media";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Planning stage (01): visualizations / plans only — gallery items 1–4 */
const PLANNING_FILES = new Set([
  "2026-04-10_100000_1.jpeg",
  "2026-04-10_100001_1.png",
  "2026-04-10_100002_1.jpg",
  "2026-04-10_100003_1.mp4",
]);

function parseFilename(filename: string): MediaFile | null {
  const match = filename.match(
    /^(\d{4}-\d{2}-\d{2})_(\d{6})_(\d+)\.(jpg|jpeg|png|webp|mp4|mov|MOV)$/i
  );
  if (!match) return null;

  const [, date, time, seq, ext] = match;
  const extension = ext.toLowerCase();
  const type: "image" | "video" =
    extension === "mp4" || extension === "mov" ? "video" : "image";

  return {
    filename,
    src: `${BASE_PATH}/${MEDIA_DIR}/${filename}`,
    date,
    time,
    type,
    extension,
    sequence: parseInt(seq, 10),
  };
}

/** Chronological: date → time → sequence → filename */
export function compareMediaChronological(a: MediaFile, b: MediaFile): number {
  const dateComp = a.date.localeCompare(b.date);
  if (dateComp !== 0) return dateComp;
  const timeComp = a.time.localeCompare(b.time);
  if (timeComp !== 0) return timeComp;
  if (a.sequence !== b.sequence) return a.sequence - b.sequence;
  return a.filename.localeCompare(b.filename);
}

export function getProjectMedia(): MediaFile[] {
  const mediaPath = path.join(process.cwd(), "public", MEDIA_DIR);

  if (!fs.existsSync(mediaPath)) return [];

  return fs
    .readdirSync(mediaPath)
    .filter((f) => !f.startsWith(".") && !f.startsWith("_"))
    .map(parseFilename)
    .filter((f): f is MediaFile => f !== null)
    .sort(compareMediaChronological);
}

const PHASE_RANGES = [
  { phase: "phase-1", startDate: "2026-04-01", endDate: "2026-04-30" },
  { phase: "phase-2", startDate: "2026-05-01", endDate: "2026-05-31" },
  { phase: "phase-3", startDate: "2026-06-01", endDate: "2026-06-30" },
  { phase: "phase-4", startDate: "2026-07-01", endDate: "2026-07-31" },
];

export function getMediaByPhase(): Record<string, MediaFile[]> {
  const allMedia = getProjectMedia();
  const phaseMedia: Record<string, MediaFile[]> = {
    "phase-0": [],
    "phase-1": [],
    "phase-2": [],
    "phase-3": [],
    "phase-4": [],
  };

  for (const m of allMedia) {
    if (PLANNING_FILES.has(m.filename)) {
      phaseMedia["phase-0"].push(m);
      continue;
    }
    for (const { phase, startDate, endDate } of PHASE_RANGES) {
      if (m.date >= startDate && m.date <= endDate) {
        phaseMedia[phase].push(m);
        break;
      }
    }
  }

  for (const key of Object.keys(phaseMedia)) {
    phaseMedia[key].sort(compareMediaChronological);
  }

  return phaseMedia;
}
