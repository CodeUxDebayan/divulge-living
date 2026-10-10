# CLAUDE.md — Divulge Handicrafts Living Cultural Archive

> **Purpose:** Master context and architectural brief for Claude Code / Claude models.  
> **Brand:** DIVULGE Handicrafts (Nilay Guha Roy, Proprietor)  
> **Origin:** Howrah & Nadia Craft Clusters, West Bengal, India  
> **Positioning:** Living Cultural Pavilion & Ecological Knowledge Archive (Non-Profit / Monograph Aesthetic — NOT an e-commerce storefront).

---

## 1. Executive Summary & Project Ethos

DIVULGE is transitioning from a conventional craft producer into a **world-heritage cultural pavilion** celebrating:
1. **The Golden Strand (*Corchorus olitorius*):** Bengal’s sacred indigenous fiber — a planetary carbon sink absorbing 15 tons of $\text{CO}_2$ per hectare in 120 days.
2. **The Biomimicry of the Weaver Bird (*Babui Pakhi*):** Nature’s master artisan whose teardrop suspended nest embodies 100% zero-waste interlocking tension without synthetic adhesives.
3. **The 65 Custodians:** Rural women master weavers who own the craft memory, paid fair living wages, and recognized as cultural stewards.
4. **The Science of Biodegradability:** Empirical proof of complete 45-day soil return into fertile humus vs. 500-year synthetic plastic persistence.
5. **Cultural Exchange & Exhibitions:** Elevating grassroots Indian craft into international design dialogues, pavilions, and museums (inspired by dialogues with Padma Bhushan laureate Rajiv Sethi).

---

## 2. Design Commandments: "Anti-Slop, Anti-Trash"

This project strictly rejects generic corporate templates, flat Bootstrap cards, and sterile digital minimalism. It embraces **physical material honesty**:

| ❌ REJECT (Digital Slop) | ✅ EMBRACE (Divulge Tactile Luxury) |
|---|---|
| Flat sterile `#FFFFFF` backgrounds | Unbleached linen (`#F6F3EB`), handmade deckle paper with micro-grain |
| E-commerce "Add to Cart" carts & discounts | "Inspect the Specimen", "Explore the Monograph" |
| Abrupt rectangular section cuts | Hand-torn deckle paper parallax dividers (jagged SVG edges) |
| Generic corporate sans-serif | Haute editorial serifs (*Cormorant Garamond*) + typewriter/archival mono (*Space Mono*) + handwritten annotations (*Caveat*) |
| Flat digital boxes | Physical archival cards: washi tape stickers, brass eyelets, hanging kraft tags with jute string, crimson cross-stitch (`+ + +`), embossed red wax seals, rubber ink stamps |
| Generic vector stock art | Authentic high-res documentary photography, botanical herbarium etchings, and real 4K silent loom video loops |

---

## 3. Directory & Asset Architecture

```text
g:/Code/CLIENTS/Divulge Handicrafts/
├── index.html                      # The primary cultural archive application
├── style.css                       # Tactile CSS design system & physics
├── script.js                       # Sensory engine (audio synth, 3D tilt, sliders)
├── CLAUDE.md                       # This master briefing file
├── PROJECT_SUMMARY_FOR_CLAUDE.md   # Duplicate summary for quick reference
├── organize_and_convert.py         # Media & document ingestion script
│
├── assets/
│   ├── BRAND_STORY_AND_GUIDE.md    # Complete brand story & voice synthesis
│   ├── CULTURAL_PORTFOLIO_SPEC.md  # 5-Chapter architectural blueprint
│   ├── DESIGN_BENCHMARKS_AND_INSPIRATION.md # Awwwards/Behance/Dribbble research
│   ├── MOODBOARD_AND_TASTE_SPEC.md # 25-pin Pinterest aesthetic analysis
│   ├── ASSET_CATALOG.md            # Complete index of 185 photos & 37 videos
│   │
│   ├── moodboard/                  # Visual benchmark captures from Pinterest/Dribbble
│   ├── documents_md/               # Converted client docs (About Us, Policies, etc.)
│   ├── web/                        # Web-optimised derivatives the page loads (build_web_assets.py)
│   ├── images/
│   │   ├── brand_identity/         # Logos (D v5.png, LOGO HD PNG.png), NJB, ICAR, MSME
│   │   ├── artisan_craftsmanship/  # Real high-res photos (_DSC8134.JPG to _DSC8198.JPG)
│   │   ├── founder_and_journey/    # Field photos of jute harvesting and monsoon retting
│   │   └── products_and_textures/  # Macro textures of raw golden jute and braided cords
│   └── videos/
│       └── artisan_crafting/       # 37 isolated videos (weaving art.mp4, 20231122_081655.mp4)
```

---

## 4. Current Web Application Architecture

### Technical Stack
- **Zero Framework Bloat:** Pure semantic HTML5 + Vanilla CSS3 + Vanilla ES6 JavaScript.
- **Local Dev Server:** Runs via `python -m http.server 8080`.
- **Live URL:** `http://localhost:8080/index.html`

### The 5 Curatorial Page Chapters
1. **Hero Header:**
   - Accession metadata bar (`DIV-2026-CULT`).
   - Physical hanging kraft tag tied with golden twine string and brass eyelet (subtle sway physics).
   - Herbarium specimen frame of *Corchorus olitorius* with crimson wax seal (`✦ 100% EARTH`) and rubber ink postmark.
   - Monumental editorial headline with gold mineral gradient shimmer.
   - Infinite kinetic moving ribbon tape.
   - Organic jagged torn-paper deckle divider into Chapter 1.
2. **Chapter I: The Golden Strand:**
   - 120-day agricultural lifecycle, Ganges alluvial floodplains, and microbial water retting.
   - Field dossier folder with translucent washi-tape corners and field photo.
   - Comparative Ecological Ledger (15t $\text{CO}_2$ absorbed, 11t $\text{O}_2$ released, 0 petrochemicals).
   - 10x Macro specimen card of raw golden cellulose core.
3. **Chapter II: The Animal Soul (Biomimicry of Babui Pakhi):**
   - Detailed SVG illustration of the teardrop suspended woven nest.
   - Bengal folk poetry (*Rajanikanta Sen*) celebrating the weaver bird's architectural genius.
   - The 3 Laws of Weaver Bird Biomimicry (Zero-discard remnants, interlocking tension without adhesives, 100% soil return).
4. **Film Room ("The Rhythm of the Braid"):**
   - Silent 33s loop `assets/web/film-braiding-loop.mp4` cut from `DSC_8119/8120/8164.MOV` (Howrah workshop, Sept 2022): women hand-braiding raw jute rope. Plays only while on screen; has a pause control.
   - NOTE: the collective hand-braids, coils and crochets. There is no pit-loom in the footage; do not caption anything as loom weaving.
5. **Chapter III: The 65 Custodians:**
   - Rural women master weavers from Howrah & Nadia districts.
   - Quote card attributed to *Sunita Devi*, an archetype from the client's draft copy, not a recorded interview. Replace with a real, consented testimony before launch.
   - Portrait plate (Plate I — The Twisting Hands) with circular rotating stamped seal.
   - The Generational Plates (`Plate II: The Braiding Circle`, `Plate III: The Circular Weave`, `Plate IV: The Floor Mandala`). Captions describe what each photo actually shows.
6. **Chapter IV: The Science of Biodegradability & Ecological Economics:**
   - Interactive time-lapse console with custom slider and milestone buttons (`Day 0`, `Day 10`, `Day 25`, `Day 45`).
   - Real-time side-by-side comparison: Golden Jute (100% soil assimilation into humus) vs. Synthetic Polypropylene (500-year microplastic contamination).
   - The Divulge Ecological Economics Index (True lifecycle cost: Jute **7.8 / 10** vs Petro-Synthetics **4.2 / 10**).
7. **Chapter V: Cultural Exchange & Colophon:**
   - Museum exhibition invitations, educational fellowships, and institutional procurement.
   - Registrations: NJB (JDP reg.), MSME Udyam, ICAR-NINFET start-up stall (2022), JCI empanelment.
   - Exhibition Record: four documented appearances (ICAR-NINFET Kolkata Mar 2022, Messe Berlin Jul 2022, NJB Pavilion Kolkata Aug 2022, with Rajiv Sethi 2024).
   - Dossier form composes a pre-filled email (mailto) to divulgejute.official@gmail.com. There is no backend yet.
   - Institutional colophon footer with official legal registrations (GSTIN, Udyam, TM).

### Sensory & Interactive Features (`script.js`)
- **The Living Thread:** Left-margin golden twine progress indicator tracking scroll depth.
- **Web Audio Handloom Sound Synthesizer:** Click `♫ Loom Audio` in navigation to trigger a real rhythmic wooden shuttle click-clack and loom pedal acoustic synthesized using native browser Web Audio API (zero external audio files).
- **3D Card Perspective Tilt:** Physical tilt on mouse movement across all `[data-tilt]` plates.
- **Biodegradability Time-Lapse Engine:** Dynamic updates of decomposition stages and meter widths.

---

## 5. Design System Tokens (`style.css`)

```css
:root {
    --bg-parchment:      #F6F3EB;       /* Unbleached linen deckle paper */
    --bg-card:           #EFEAE0;       /* Sun-warmed kraft paper */
    --bg-earth:          #E8E1D5;       /* Alluvial silt paper */
    --bg-dark:           #1C201A;       /* Deep river silt / charcoal olive */
    --bg-dark-surface:   #252B23;       /* Dark curatorial plate */
    
    --text-dark:         #1C201A;
    --text-light:        #F6F3EB;
    --text-muted:        #63685E;
    --text-gold:         #D6B485;

    --accent-jute:       #C5A880;       /* Golden raw jute */
    --accent-terracotta: #C85A32;       /* Bengal terracotta clay */
    --accent-sage:       #52796F;       /* Botanical leaf sage */
    --accent-stitch:     #B82B2B;       /* Madder crimson thread */

    --font-serif:        'Cormorant Garamond', Georgia, serif;
    --font-sans:         'Plus Jakarta Sans', system-ui, sans-serif;
    --font-mono:         'Space Mono', monospace;
    --font-hand:         'Caveat', cursive;
}
```

---

## 6. Recommended Next Steps for Claude Code

When taking over the project, consider these high-impact directions:
1. **Interactive Fiber Specimen Loupe / Inspector:** Allow visitors to hover over raw jute photography or product weaves and see a magnified fiber weave with thread counts and tensile strength metrics.
2. **Bengali Cultural Audio Integration:** Expand the Web Audio synthesizer with ambient morning riverbank sounds (soft water lap, monsoon breeze) alongside the wooden shuttle clicks.
3. **Artifact Monograph Lookbook:** Add a curated curatorial section displaying 6–8 of Divulge's actual physical pieces (braided table mats, lifestyle totes, botanical plant holders) framed as **numbered museum artifacts** with artisan signatures, hours of handloom work, and grams of $\text{CO}_2$ sequestered.
4. **Interactive Delta Map:** A stylized vector map of Bengal highlighting the specific artisanal villages in Howrah, Nadia, and Hooghly.
5. **Backend Form Handler:** Connect the Curatorial Inquiry dossier form to a lightweight serverless endpoint or email dispatch service.


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

### v4 notes (Divulge Living)
- Brand name on the site is **Divulge Living** only (no "Handicrafts", no proprietor name). Labels use Inter Tight (no monospace).
- Hero: title stays put; the arch opens into a cinemascope strip. A golden strand (pluckable with the cursor, with a sound when sound is on) crosses the hero.
- Custom cursor ring, magnetic buttons, graded chapter counter. Titles reveal without clipping masks (descenders stay whole).
- Differentiation: amatajutetea.com is a photographic, product-led site; this one is a film-like archive. Keep it that way.
- Page backdrop colour crossfade was tried and removed: it breaks around pinned sections.
