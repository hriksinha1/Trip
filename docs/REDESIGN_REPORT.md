# Starttrips redesign report

**Status: browser verification pending.** This file is generated with measured results by `npm run test:browser`. It is not a claim that the current changes have passed production validation.

Before deployment:

1. Install dependencies using the committed lockfile.
2. Install Playwright Chromium and WebKit: `npx playwright install chromium webkit`.
3. Run `npm run verify`.
4. Review the generated viewport screenshots under `docs/screenshots/after/` and the metrics in `docs/REDESIGN_METRICS.json`.
5. Review `docs/PHOTO_REVIEW.md` for destination imagery that still needs owner-supplied replacements and confirm the image licence details.

The report generator overwrites this template with browser counts, measured layout values and a verification summary. Do not describe the website as pixel-perfect until those checks are successful and the screenshots have been reviewed.
