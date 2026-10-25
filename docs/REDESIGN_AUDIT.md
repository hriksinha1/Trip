# Starttrips redesign audit

## Baseline observations

The earlier browser measurements recorded in the supplied implementation brief described these issues on the previous build:

- The shared shell system was already in place, but its 1600 px cap left 160 px side margins at a 1920 px viewport.
- The BrandStatement section measured 764 px tall at 1440 px and 872 px at 1920 px despite around 407 px of actual content. Its viewport-relative minimum height and large vertical padding created most of the dead space.
- The statistics block measured 656 px on a desktop viewport and 1063 px at 390 px because of a large minimum height, heavy padding and three stacked ticket cards on mobile.
- Popular trips used two columns at tablet widths, making the section particularly tall at 768 px and 1024 px.
- The destination carousel initially snapped its first card to the viewport edge rather than the shell edge.
- The five overlapping story cards hid parts of adjacent captions and truncated long destination names.
- The header's inner padding offset the logo from the hero shell; justify-between did not put the desktop nav exactly at the viewport center.
- Trip buttons had inconsistent variants and heights, while prices could wrap awkwardly.
- Footer links duplicated the planning CTA, and the mobile footer used one long column.
- The previous image set was present and technically loadable, but several photos did not visually match the places or captions assigned to them.

These are baseline observations, not measurements of the new build. The browser test suite must remeasure the result after the branch is checked out and its dependencies and browsers are installed.

## Changes in this branch

- Expanded the shared shell maximum to 1760 px while keeping the existing responsive gutter token.
- Added central section, heading, card and photographic-block spacing tokens, and anchor scroll offsets.
- Removed excessive viewport-relative minimum heights from the brand statement and statistics sections.
- Replaced the centered brand statement and tiny thumbnail cluster with a split editorial composition and three destination photographs.
- Replaced perforated ticket cards and arbitrary metrics with three feature blocks: derived destination count, derived travel-style count, and an honest enquiry description.
- Normalized button sizes and added a reusable loading state; made trip enquiry buttons consistent.
- Tightened typography and section-heading spacing.
- Improved trip card footer alignment, prices, responsive grid behavior and carousel controls.
- Aligned the destination carousel with the shell, added responsive arrow state, and removed overlapping story cards that truncated their captions.
- Refined the header's centered desktop navigation, floating scrolled state and mobile menu focus management.
- Refined footer columns and mobile stacking, removed duplicated planning links and added a Photo credits dialog backed by provenance data.
- Corrected photo labels/alt text where the supplied pixels did not substantiate specific destination claims, and documented slots that need better owner-supplied photography.
- Strengthened the image metadata validation script and added a production-preview browser test covering responsive widths, visible image loading, shell alignment, mobile menu focus, FAQ and photo credits.
- Removed stale generated artifacts and the publicly served AI Studio prompt. The previous docs/screenshots/after images were stale baseline captures; the browser test regenerates fresh screenshots there.

## Remaining validation

This branch has not yet been run through a fresh dependency install, production build, Chromium run, or WebKit run in the current editing environment. The environment did not have the project dependencies installed and could not reliably retrieve packages. Do not treat the responsive measurements from the baseline as new measurements, and do not claim a pixel-perfect result until the full verify script succeeds after installing the Playwright Chromium and WebKit browsers.

## Known content and photo limitations

See PHOTO_REVIEW.md for each image's visible subject, fit, and required action. Better owner-supplied images are still recommended for the Chikmagalur package/destination, Goa destination cover and Gokarna lead trip. Several existing photos have been honestly relabelled, but the best final experience requires verified, destination-appropriate photography.

Photo credits now appear in the footer using recorded provenance metadata. The business owner should confirm the licence requirements and commercial suitability of each source before launch.
