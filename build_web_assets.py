"""
Build web-optimised derivatives of the archive media used by index.html.

The originals in assets/images and assets/videos are untouched camera files
(6000px JPGs at ~10 MB each, 100 MB+ MOV clips). This script writes small,
EXIF-rotated, progressive JPGs and a compressed silent film loop into
assets/web/, which is what the page actually loads.

Usage:  python build_web_assets.py
Needs:  Pillow, and ffmpeg on PATH for the film loop.
"""

import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).parent
SRC = ROOT / "assets"
OUT = ROOT / "assets" / "web"

# (source path relative to assets/, output name, longest edge in px)
IMAGES = [
    ("images/artisan_craftsmanship/_DSC8134.JPG",                "artisan-portrait.jpg",      1400),
    ("images/artisan_craftsmanship/_DSC8148.JPG",                "plate-braiding-circle.jpg", 1100),
    ("images/artisan_craftsmanship/20231227_145234_Burst01.jpg", "plate-circular-weave.jpg",  1100),
    ("images/artisan_craftsmanship/20231227_145234_Burst01.jpg", "hero-circular-weave.jpg",   2200),
    ("images/artisan_craftsmanship/20231217_153919.jpg",         "plate-floor-mandala.jpg",   1100),
    ("images/artisan_craftsmanship/_DSC8183.JPG",                "after-the-shift.jpg",       1100),
    ("images/artisan_craftsmanship/_DSC8198.JPG",                "field-causeway.jpg",        1500),
    ("images/products_and_textures/20250112_164403_.jpg",        "macro-crochet.jpg",         1200),
    ("images/products_and_textures/1635655564710_originalImgFile.jpg", "artifact-round-bag.jpg",  1200),
    ("images/products_and_textures/20231206_163403.jpg",         "artifact-mat-detail.jpg",   1200),
    ("images/founder_and_journey/20220704_174705_HDR.jpg",       "expo-berlin-2022.jpg",       900),
    ("images/founder_and_journey/IMG_20220302_105524.jpg",       "expo-icar-ninfet-2022.jpg",  900),
    ("images/founder_and_journey/20220820_021154.jpg",           "expo-njb-pavilion-2022.jpg", 900),
    ("images/founder_and_journey/The great Rajiv Sethi.JPG",     "expo-rajiv-sethi.jpg",       900),
]

# Silent documentary loop: hand-braiding footage from the Sept 2022 Howrah shoot.
FILM_CLIPS = [
    "videos/artisan_crafting/DSC_8119.MOV",
    "videos/artisan_crafting/DSC_8120.MOV",
    "videos/artisan_crafting/DSC_8164.MOV",
]
FILM_OUT = "film-braiding-loop.mp4"
FILM_POSTER = "film-braiding-poster.jpg"


def build_images():
    for src_rel, name, edge in IMAGES:
        src = SRC / src_rel
        dst = OUT / name
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            im.thumbnail((edge, edge), Image.LANCZOS)
            im.save(dst, "JPEG", quality=78, optimize=True, progressive=True)
        print(f"  {name:32s} {im.size[0]}x{im.size[1]}  {dst.stat().st_size // 1024} KB")


def build_film():
    if not shutil.which("ffmpeg"):
        print("  ffmpeg not found - skipping film loop")
        return
    inputs = []
    for clip in FILM_CLIPS:
        inputs += ["-i", str(SRC / clip)]
    n = len(FILM_CLIPS)
    scale = "".join(
        f"[{i}:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=25[v{i}];"
        for i in range(n)
    )
    concat = "".join(f"[v{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=0[out]"
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", *inputs,
         "-filter_complex", scale + concat, "-map", "[out]",
         "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p",
         "-movflags", "+faststart", "-an", str(OUT / FILM_OUT)],
        check=True,
    )
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-ss", "3", "-i", str(OUT / FILM_OUT),
         "-frames:v", "1", "-q:v", "4", str(OUT / FILM_POSTER)],
        check=True,
    )
    print(f"  {FILM_OUT:32s} {(OUT / FILM_OUT).stat().st_size // 1024} KB")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    print("Images:")
    build_images()
    print("Film:")
    build_film()
