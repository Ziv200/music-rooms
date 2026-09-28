#!/usr/bin/env python3
"""Generate web-ready media from the original project media.

Originals are NOT kept in the repo. They live in
/Users/ilanziv/Code/adinegev-media-archives/project-media-originals/ (never delete them).

Outputs (committed):
  public/media/thumb/<stem>.webp   ~560px wide gallery thumbnails
  public/media/large/<stem>.webp   ~1600px long side, for the lightbox
  public/media/video/<stem>.mp4    H.264 (yuv420p, faststart, no audio)
  public/media/poster/<stem>.webp  poster frame for each video
  public/media/hero-{800,1400}.webp
  src/lib/media-manifest.json      list consumed by src/lib/media.ts

Usage: python3 scripts/optimize-media.py [SOURCE_DIR]
"""
import json, re, subprocess, sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("/Users/ilanziv/Code/adinegev-media-archives/project-media-originals")
OUT = ROOT / "public" / "media"
MANIFEST = ROOT / "src" / "lib" / "media-manifest.json"
HERO = "2026-07-06_200059_2.jpg"
TOUR = "2026-07-06_200751_4.mp4"
PAT = re.compile(r"^(\d{4}-\d{2}-\d{2})_(\d{6})_(\d+)\.(jpg|jpeg|png|mp4|mov)$", re.I)

for sub in ("thumb", "large", "video", "poster"):
    (OUT / sub).mkdir(parents=True, exist_ok=True)

def save_webp(im, path, max_w=None, max_side=None, q=76):
    im = im.copy()
    if max_w and im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    if max_side and max(im.size) > max_side:
        s = max_side / max(im.size)
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    im.save(path, "WEBP", quality=q, method=6)
    return im.size

def load(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")
    return im

items = []
for f in sorted(SRC.iterdir()):
    m = PAT.match(f.name)
    if not m:
        continue
    date, time, seq, ext = m.groups()
    ext = ext.lower()
    stem = f.stem
    entry = {"filename": f.name, "stem": stem, "date": date, "time": time, "sequence": int(seq)}
    if ext in ("mp4", "mov"):
        entry["type"] = "video"
        vid = OUT / "video" / f"{stem}.mp4"
        poster_png = OUT / "poster" / f"{stem}.png"
        is_tour = f.name == TOUR
        # 720p cap on the long side for clips; tour is portrait 1080x1920 -> 720x1280
        scale = "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'"
        if not vid.exists():
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(f), "-an",
                            "-vf", scale + ",format=yuv420p",
                            "-c:v", "libx264", "-preset", "slow", "-crf", "28" if is_tour else "26",
                            "-profile:v", "high", "-movflags", "+faststart", str(vid)], check=True)
        t = "50" if is_tour else "0.5"
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", t, "-i", str(vid), "-frames:v", "1", str(poster_png)], check=True)
        im = load(poster_png)
        entry["width"], entry["height"] = im.size
        save_webp(im, OUT / "poster" / f"{stem}.webp", max_side=1280, q=72)
        save_webp(im, OUT / "thumb" / f"{stem}.webp", max_w=560, q=70)
        poster_png.unlink()
    else:
        entry["type"] = "image"
        im = load(f)
        entry["width"], entry["height"] = im.size
        lw, lh = save_webp(im, OUT / "large" / f"{stem}.webp", max_side=1600, q=76)
        entry["largeWidth"], entry["largeHeight"] = lw, lh
        save_webp(im, OUT / "thumb" / f"{stem}.webp", max_w=560, q=70)
        if f.name == HERO:
            save_webp(im, OUT / "hero-800.webp", max_w=800, q=72)
            save_webp(im, OUT / "hero-1400.webp", max_w=1400, q=70)
    items.append(entry)

MANIFEST.write_text(json.dumps(items, indent=1, ensure_ascii=False) + "\n")
print(f"{len(items)} items -> {MANIFEST}")
