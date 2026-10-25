# Starttrips — Indian travel getaways

Responsive, image-led landing page for Starttrips, an Indian travel agency. The site is built with React 19, TypeScript, Vite 8 and Tailwind CSS v4, with GSAP for restrained reveals and Lucide React for icons.

## Design system

- **Display:** Bricolage Grotesque
- **Body/UI:** Poppins
- **Layout:** shared responsive `.shell`, fluid gutters and section spacing tokens in `src/index.css`
- **Core UI:** reusable buttons, destination filters, image registry, accessible dialogs and enquiry flows
- **Photos:** local assets in `public/images/**`, a generated manifest, registry descriptions and attribution metadata in `src/data/provenance.json`

## Run locally

The repository currently keeps `bun.lock` as its lockfile.

```bash
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:3000.

If you use npm instead, run `npm install` and then the same npm scripts below. Do not commit a second lockfile unless the team deliberately switches the project to npm.

## Validate and build

```bash
npm run check:images -- --strict
npm run check:stats
npm run lint
npm run build
npm run preview
```

For full browser verification, install the Playwright browsers once:

```bash
npx playwright install chromium webkit
npm run test:browser
```

The `test:browser` script launches a Vite production preview, checks responsive widths, verifies visible local images, checks shell and carousel alignment, validates the mobile navigation interaction, and records screenshots and measurements under `docs/screenshots/after/` and `docs/REDESIGN_METRICS.json`. Review `docs/REDESIGN_REPORT.md` after running the full suite.

`npm run verify` runs strict image validation, data checks, TypeScript validation, a production build, and the browser suite.

## Photo registry and adding imagery

1. Add correctly licensed image files to the relevant folder under `public/images/`.
2. Regenerate the manifest with `npm run generate:manifest`.
3. Add or update the matching entry in `src/data/images.ts`.
4. Record the exact source title, source page, author, licence, licence URL and a truthful description in `src/data/provenance.json`.
5. Confirm the image visually fits its slot, its alt text describes what is actually shown, and the strict image check passes.

The strict check verifies that files are readable, registry alt text is present, and provenance fields exist. **It cannot determine whether a photograph depicts the destination in its caption.** Review `docs/PHOTO_REVIEW.md` and supply a better asset when a current photograph does not accurately represent its advertised place.

Photo credits are available from the site footer. Credits are generated from the provenance metadata; confirm the licence and commercial-use conditions before publishing or reusing photographs.

## Business configuration

Optional values are read from environment variables in `src/data/site.ts`:

```env
VITE_WHATSAPP_NUMBER=""
VITE_CONTACT_EMAIL=""
VITE_ENQUIRY_ENDPOINT=""
```

Leave a value empty unless it is an official configured contact or endpoint. Optional contact buttons are hidden when the corresponding value is absent. The site presents indicative package prices only; enquiry does not confirm a booking or collect payment.

## Vercel

The project is a Vite single-page application. Keep the existing `vercel.json` build command and SPA rewrite, which excludes static `images/` and `assets/` paths. Import the repository into Vercel and use the Vite preset, `npm run build`, and `dist` as the output directory. No backend is required for the current demo enquiry flow.

## Before commercial launch

- Review the current image fit report and supply better photos for any flagged destination slot.
- Review every linked image licence and attribution detail.
- Confirm all illustrative package prices, dates and durations.
- Configure only official contact details and a real enquiry endpoint, if one is used.
- Have the legal copy reviewed for the business's actual operating practices.
- Run `npm run verify` on a clean install and review the rendered desktop, mobile, and WebKit screenshots before deploying.
