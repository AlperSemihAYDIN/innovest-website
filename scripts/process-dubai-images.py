#!/usr/bin/env python
"""
Dubai görsellerini downloads/dubai-drive/<klasör>/ -> public/images/properties/dubai/<slug>/ kopyalar.
Boyutu MAX_KB üstündeki JPEG'leri 2560px max kenara resize eder ve quality=85'te kaydeder.
"""
import os
import re
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_ROOT = ROOT / "downloads" / "dubai-drive"
DEST_ROOT = ROOT / "public" / "images" / "properties" / "dubai"

MAPPING = {
    "binghatti-flare":       "binghatti-flare-project-images",
    "the-alba":              "The Alba",
    "binghatti-aquarise":    "Project Images",
    "mercedes-benz-places":  "Binghatti Mercedes Benz",
    "belgrove-residences":   "Belgravia Gardens - Ellington",
    "solaya":                "Solaya, Meraas",
    "one-river-point":       "One River Point",
    "cala-del-mar":          "Cala Del Mar, Ellington",
}

MAX_KB = 4096           # 4 MB target
RESIZE_THRESHOLD = 2_500_000  # >2.5MB → resize+recompress
MAX_DIM = 2560


def sanitize(name: str) -> str:
    name = name.replace(" ", "-").replace("_", "-")
    name = re.sub(r"[^A-Za-z0-9.\-]", "", name)
    name = re.sub(r"-+", "-", name).lower()
    if name.endswith(".jpeg"):
        name = name[:-5] + ".jpg"
    return name


def process(src: Path, dest: Path):
    size = src.stat().st_size
    if size <= RESIZE_THRESHOLD:
        shutil.copy2(src, dest)
        return size, size
    # resize+recompress
    with Image.open(src) as im:
        im = im.convert("RGB")
        w, h = im.size
        scale = min(MAX_DIM / max(w, h), 1.0)
        if scale < 1.0:
            im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
        # save as JPEG
        dest = dest.with_suffix(".jpg")
        q = 85
        while True:
            im.save(dest, "JPEG", quality=q, optimize=True, progressive=True)
            if dest.stat().st_size <= MAX_KB * 1024 or q <= 60:
                break
            q -= 5
    return size, dest.stat().st_size


for slug, folder in MAPPING.items():
    src_dir = SRC_ROOT / folder
    dest_dir = DEST_ROOT / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    # clear existing
    for f in dest_dir.iterdir():
        if f.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
            f.unlink()
    print(f"=== {slug} ===")
    if not src_dir.exists():
        print(f"  MISSING: {src_dir}")
        continue
    files = sorted({p for p in src_dir.rglob("*") if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}})
    seen = set()
    count = 0
    total_in = 0
    total_out = 0
    for src in files:
        safe = sanitize(src.name)
        if safe in seen:
            parent = sanitize(src.parent.name)
            safe = f"{parent}-{safe}"
        seen.add(safe)
        dest = dest_dir / safe
        try:
            sin, sout = process(src, dest)
            total_in += sin
            total_out += sout
            count += 1
        except Exception as e:
            print(f"  ERR {src.name}: {e}")
    print(f"  {count} files | {total_in/1024/1024:.0f}MB -> {total_out/1024/1024:.0f}MB")
