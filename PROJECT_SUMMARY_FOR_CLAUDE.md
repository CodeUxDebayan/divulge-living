# PROJECT SUMMARY: DIVULGE JUTE HANDICRAFTS — CULTURAL ARCHIVE
**Status as of October 2026**

---

## 📌 Executive Overview
- **Project:** Divulge Handicrafts Living Cultural Archive
- **Client:** Nilay Guha Roy (Proprietor, Divulge Handicrafts, West Bengal)
- **Workspace Root:** `g:/Code/CLIENTS/Divulge Handicrafts/`
- **Current Live Prototype:** Running locally at `http://localhost:8080/index.html` (`python -m http.server 8080`)
- **Key Positioning:** Cultural Pavilion & Living Archival Monograph (NOT an e-commerce shopping cart).
- **Core Narrative:** Bengal's Golden Strand (*Corchorus olitorius*), the 65 rural women master custodians, biomimicry of the Baya Weaver Bird (*Babui Pakhi*), and the 45-day soil return science.

---

## 📂 Key Assets & References
1. **`CLAUDE.md`** (in `g:/Code/CLIENTS/Divulge Handicrafts/`): Master instructions automatically read by Claude Code.
2. **`assets/BRAND_STORY_AND_GUIDE.md`**: Brand narrative, customer psychology, voice and tone.
3. **`assets/CULTURAL_PORTFOLIO_SPEC.md`**: 5-chapter curatorial architecture.
4. **`assets/DESIGN_BENCHMARKS_AND_INSPIRATION.md`**: Visual research from Awwwards, Behance, Dribbble.
5. **`assets/MOODBOARD_AND_TASTE_SPEC.md`**: Analysis of 25 pins from Pinterest (torn paper, raw twine, cross-stitch, wax seals, linen grain).
6. **`assets/ASSET_CATALOG.md`**: Index of 185 organized photos and 37 video files.

---

## 💻 Tech Stack & Features Built
- **HTML5 (`index.html`):** Semantic 5-chapter museum monograph with SVG botanical illustrations, hanging kraft tag tied with twine, crimson wax seal, rubber stamps, jagged deckle paper dividers, 4K loom video room, Roman numeral generational plates, interactive 45-day biodegradation console, and curatorial dossier request form.
- **CSS3 (`style.css`):** Zero-framework custom design system with SVG paper noise grain overlay, earth & mineral color palette, Cormorant Garamond editorial serif typography, washi tape effects, and custom responsive layouts.
- **JavaScript (`script.js`):** Web Audio API handloom acoustic rhythm synthesizer (`♫ Loom Audio`), scroll-driven living golden thread, 3D card perspective tilt, milestone-driven biodegradation time-lapse slider, and dossier dispatch state.

---

## 🚀 Recommended Next Actions for Claude Code
- Run `claude` inside `g:\Code\CLIENTS\Divulge Handicrafts\`.
- Claude Code will automatically detect `CLAUDE.md`.
- Next feature suggestions:
  1. Add an interactive fiber magnifying loupe component.
  2. Create a museum-grade Artifact Lookbook of specific zero-waste pieces.
  3. Integrate an interactive SVG map of Bengal's artisanal weaving clusters (Howrah, Nadia, Shantipur).

---

## 🧵 Refinement Pass — 10 Oct 2026
- **Media:** page now loads `assets/web/` derivatives (~5 MB total, previously ~70 MB of raw camera JPGs plus a 65 MB video). Regenerate with `python build_web_assets.py`. Originals are untouched.
- **Truthfulness:** every photo caption matches its photo. Fabricated details were removed: the "National Jute Archive" stamp, the "non-profit registry" claim, the 711101 address, and invented loom specs and hours. The real address, NJB, IEC and JCI details come from `assets/documents_md/registrations/`.
- **Economics Index:** uses the client's actual 5-parameter matrix (including Initial Cost, the one row where plastic wins).
- **Poem:** full 8-line Rajanikanta Sen *Swadhinatar Sukh*, with a corrected translation.
- **Previous version:** `.backup/pre-refinement/`.
- **Open items for the client:** (1) real artisan testimony to replace the "Sunita Devi" archetype; (2) confirm how 4.2/10 for plastic is weighted (the simple mean of its five scores is 2.8); (3) a source for the 45-day figure (the client's own blog says "several months"); (4) whether the village-level address may be public.


---

## 7. Current Build — "The Golden Strand" reel (supersedes §3–§5 where they differ)

**Concept:** promo film × portfolio × rustic minimal. The page reads as one continuous reel: opening titles, a running timecode and crop marks, and chapters ("scenes") that are pinned, scrubbed GSAP timelines.

**Stack:** Vite 5 + vanilla JS modules. `gsap@3.13` (ScrollTrigger, SplitText, DrawSVGPlugin — all free since 3.13) and `lenis@1.1` from npm.
- `npm install` → `npm run dev` (http://localhost:5173) → `npm run build` (outputs `dist/`, ships only the referenced media, about 5.4 MB).
- `index.html` (root), `src/main.js`, `src/style.css`, `public/favicon.png`. Media is in `assets/web/` (regenerate with `python build_web_assets.py`).
- The python `http.server` no longer works: the page needs Vite to resolve its modules.

**Sequence:** Intro (slate → thread draw → পাট → "divulge" → curtain split) → Prologue (arch image opens to full bleed) → I The Strand (pinned horizontal season, day counter, self-drawing thread) → II The Nest (nest drawn stroke by stroke as the Rajanikanta Sen poem is read) → Interlude film (clip-path opens; plays only on screen; pause button) → III The Hands (65 count-up, word-by-word quote, plate deck fans out) → IV The Return (scroll = days 0–45; slider scrubs the scroll) → ledger → V The Exchange (exhibition record parallax, mailto enquiry) → colophon wordmark.

**Design tokens:** paper `#EDE4D3`, sand `#E0D0B4`, ochre `#A57C45`, gold `#C9A46A`, cocoa `#3A2819`, soil `#1D1510`, olive `#55542F`, madder `#9B2C1F` (used sparingly). Type: Fraunces (display, light and italic), Inter Tight (body), IBM Plex Mono (labels), Noto Serif Bengali.

**Rules:** `html.motion` is set before first paint unless the visitor prefers reduced motion. Without it, the page is a calm static document; keep it that way. Headless Chrome reports reduced motion, so test with `emulateMediaFeatures` set to `no-preference`. Previous versions are in `.backup/`.
