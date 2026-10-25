# IMAGE AUDIT REPORT — STARTTRIPS

**Date**: 2026-10-25  
**Auditor**: Senior Frontend Engineer & Image Pipeline Lead  

---

## 1. Executive Summary & Root Cause

The initial refactor to Starttrips left all 22 image slots displaying gradient cards rather than real photographs.
The root cause was a conservative verification rule ("if you cannot verify a photo, set `status: 'placeholder'` and make no network request"), which protected against unverified imagery but lacked an active acquisition and asset ingestion mechanism.

Furthermore, several architectural defects in `SmartImage` and `TicketCard` hindered proper layout and rendering:
1. **Layering Bug**: In `SmartImage.tsx`, the placeholder state hard-coded `relative`, conflicting with caller-provided `absolute inset-0 w-full h-full`. In CSS cascading order, `relative` took precedence, pulling placeholders into normal document flow instead of rendering behind content as full-height backdrops (e.g., in `HeroSection`, `StatisticsSection`, and `PromotionalCTA`).
2. **Missing Ingestion & Registry Disconnect**: No `public/images/` directory structure existed, and `SmartImage` forced gradient placeholders whenever `status === "placeholder" || !src`.
3. **Statistics Section Visual Defects**:
   - Ticket card notches were hard-coded circles painted in `#064e3b` over an image overlay, rather than true cut-outs revealing the photo underneath.
   - Notch overhangs and grid gaps caused notch circles to overlap or crowd on intermediate viewports (768px).
   - Card dimensions were constricted by `max-w-[420px]` on grid items, causing uneven heights.

---

## 2. Inventory of Registry Keys (22 Slots)

The 22 required image registry slots:
1. `hero` — Western Ghats & Coastal South India landscape (wide, 16:9)
2. `trip_goa` — Goa coastline & beaches (4:5)
3. `trip_chikmagalur` — Western Ghats coffee estates (4:5)
4. `trip_coorg` — Coorg misty plantation hills (4:5)
5. `trip_gokarna` — Gokarna rocky headlands & calm coves (4:5)
6. `trip_hyderabad` — Charminar & historic old city (4:5)
7. `stats_ocean` — Coastal waters / backwaters backdrop (~2.2:1)
8. `dest_goa` — Goa beach sunset (6:7)
9. `dest_coorg` — Coorg forest & coffee trails (6:7)
10. `dest_chikmagalur` — Chikmagalur mountain ridges (6:7)
11. `dest_gokarna` — Gokarna quiet beaches (6:7)
12. `dest_hyderabad` — Hyderabad heritage architecture (6:7)
13. `dest_kerala` — Palm-lined backwaters in Alleppey, Kerala (6:7)
14. `dest_hampi` — Vijayanagara ruins and boulders in Hampi (6:7)
15. `dest_meghalaya` — Living root bridges and waterfalls in Meghalaya (6:7)
16. `dest_ooty` — Rolling Nilgiri tea estates in Ooty (6:7)
17. `promo_mountain` — Western Ghats mountain sunset (~2.2:1)
18. `story_gokarna_om` — Om Beach crescent cove, Gokarna (4:5)
19. `story_coorg_falls` — Abbey Falls cascading through plantation forest (4:5)
20. `story_chikmagalur_peak` — Grassy ridge trail of Mullayanagiri peak (4:5)
21. `story_hyderabad_charminar` — Illuminated Charminar, Hyderabad (4:5)
22. `story_goa_beach` — Agonda beach at sunset, South Goa (4:5)

---

## 3. Runtime Image Instances (30 total)

- **Hero Section**: 1 instance (`hero`)
- **Popular Trips**: 4 instances on page (`trip_goa`, `trip_chikmagalur`, `trip_coorg`, `trip_gokarna`)
- **Brand Statement**: 4 thumbnail instances (`dest_goa`, `dest_coorg`, `dest_chikmagalur`, `dest_gokarna`)
- **Statistics Section**: 1 instance (`stats_ocean`)
- **Destination Explorer**: 9 instances (`dest_goa` through `dest_ooty`)
- **Editorial Experiences / Stories**: 10 instances (5 rendered in desktop flex row, 5 rendered in mobile carousel)
- **Promotional CTA**: 1 instance (`promo_mountain`)

---

## 4. Remediation Plan

1. **Implement Automated Pipeline**:
   - Folder structure: `public/images/{hero,trips,destinations,stories,sections}/`.
   - Script `scripts/generate-image-manifest.mjs` to parse actual files, sizes, dimensions into `src/data/image-manifest.generated.ts`.
   - Script `scripts/check-images.mjs` to enforce validity, provenance, dimensions, and missing status.
2. **Download & Verify Real Photographs**:
   - Query verified, openly licensed Wikimedia Commons imagery (CC-BY, CC-BY-SA, CC0) for all destination, trip, and story slots.
   - Inspect pixels to ensure authentic geographical match (no Dubai skylines or Thai beaches).
   - Record exact metadata (author, title, source URL, license, license URL).
3. **Refactor `SmartImage`**:
   - Add `fill` prop that controls absolute positioning uniformly across loaded and fallback states.
   - Add `data-image-key` and `data-image-state="photo|missing|error"`.
   - Implement error handling and state reset on `src` change.
4. **Redesign Statistics & Ticket Cards**:
   - CSS mask-based cut-out notches and scallops so coastal background photo shows through directly.
   - True boundary alignment with `--notch-y` variable.
   - Equal-height flex layout across all viewports.
