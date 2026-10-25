# Starttrips — Travel & Curated Indian Getaways

Production-ready, responsive website for **Starttrips** (Instagram: [@starttrips_](https://www.instagram.com/starttrips_/)), an Indian travel agency specializing in beach breaks, hill escapes, and heritage getaways across India.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 with custom responsive layout tokens (`.shell`, `.bleed-pad`)
- **Typography**: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) (Display) & [Poppins](https://fonts.google.com/specimen/Poppins) (Body & Indian Rupee `₹` numerals)
- **Icons**: Lucide React + verified inline SVGs
- **Animations**: GSAP (+ ScrollTrigger) subtle reveals respecting `prefers-reduced-motion`

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Test
```bash
npm run lint    # runs tsc --noEmit
npm run build   # production build in dist/
npm run preview # preview production build locally
```

---

## ⚙️ Environment Configuration

Add the following optional variables to your `.env` file or in your Vercel Project Settings:

```env
# Optional: WhatsApp number with country code (e.g. 919876543210).
# When set, enables 1-click "Send on WhatsApp" button with prefilled enquiry text.
VITE_WHATSAPP_NUMBER=""

# Optional: Public enquiry email address.
# When set, enables "Send via Email" mailto link with prefilled subject and body.
VITE_CONTACT_EMAIL=""

# Optional: Endpoint to POST JSON enquiry payloads to (e.g. Formspree, Make, Zapier webhook).
# When set, enables direct submission with confirmation inside the dialog.
VITE_ENQUIRY_ENDPOINT=""
```

---

## 📸 Photo Registry & How to Supply Images

The image system lives in `src/data/images.ts`. All images currently use intentional, high-contrast typographic placeholder cards. To replace them with your own verified photography:

1. Place your photos in `public/images/<key>.webp` (or `.jpg`).
2. Update the `src` and set `status: "owner"` in `src/data/images.ts`.

| Image Key | Subject Needed | Expected File Location |
|---|---|---|
| `hero` | Wide landscape of Western Ghats ridges or coastal hills | `public/images/hero.webp` |
| `trip_goa` | Palm-fringed golden beach in Goa | `public/images/trip_goa.webp` |
| `trip_chikmagalur` | Coffee plantations and green hill trails in Chikmagalur | `public/images/trip_chikmagalur.webp` |
| `trip_coorg` | Misty hills and estate canopy in Coorg | `public/images/trip_coorg.webp` |
| `trip_gokarna` | Rocky headland and calm Arabian Sea cove in Gokarna | `public/images/trip_gokarna.webp` |
| `trip_hyderabad` | Historic Charminar framed by evening bazaars | `public/images/trip_hyderabad.webp` |
| `stats_ocean` | Top-down aerial view of coastal waters / backwaters | `public/images/stats_ocean.webp` |
| `dest_goa` | Goa beach sunset | `public/images/dest_goa.webp` |
| `dest_coorg` | Coorg plantation and waterfall trails | `public/images/dest_coorg.webp` |
| `dest_chikmagalur` | Western Ghats ridges in Chikmagalur | `public/images/dest_chikmagalur.webp` |
| `dest_gokarna` | Quiet coves of Gokarna | `public/images/dest_gokarna.webp` |
| `dest_hyderabad` | Heritage architecture of Hyderabad | `public/images/dest_hyderabad.webp` |
| `dest_kerala` | Palm-lined backwaters in Alleppey, Kerala | `public/images/dest_kerala.webp` |
| `dest_hampi` | Historic Vijayanagara ruins and boulders in Hampi | `public/images/dest_hampi.webp` |
| `dest_meghalaya` | Living root bridges and clear waterfalls in Meghalaya | `public/images/dest_meghalaya.webp` |
| `dest_ooty` | Rolling Nilgiri tea estates in Ooty | `public/images/dest_ooty.webp` |
| `promo_mountain` | Western Ghats dusk sunset landscape | `public/images/promo_mountain.webp` |
| `story_gokarna_om` | Om Beach crescent cove, Gokarna | `public/images/story_gokarna_om.webp` |
| `story_coorg_falls` | Abbey Falls cascading through forest, Coorg | `public/images/story_coorg_falls.webp` |
| `story_chikmagalur_peak` | Mullayanagiri peak trail, Chikmagalur | `public/images/story_chikmagalur_peak.webp` |
| `story_hyderabad_charminar` | Illuminated Charminar, Hyderabad | `public/images/story_hyderabad_charminar.webp` |
| `story_goa_beach` | Agonda beach at sunset, Goa | `public/images/story_goa_beach.webp` |

---

## 🏷️ Sample Labels Flag

To toggle indicative tags on prices:
- In `src/data/site.ts`, toggle `showSampleLabels: true | false`.
- When `true`, cards display an "Indicative" pill tag alongside "From ₹X,XXX / person".

---

## 📋 Content & Claims the Owner Must Confirm

Before full commercial launch, the business owner should review:
1. **Starting Prices & Durations**: Starting costs in `src/data/trips.ts` (e.g. Goa ₹8,499, Chikmagalur ₹5,999, Coorg ₹6,499, Gokarna ₹5,499, Hyderabad ₹4,999).
2. **Contact Coordinates**: Provide the official WhatsApp business phone number and customer support email in the environment variables.
3. **Official Logo**: Provide an official SVG/PNG logo and set `logoSrc` in `src/data/site.ts`.
4. **Third Stats Fact**: Confirm "Enquiry to start: tell us your plan and we'll help from first idea to the trip home" accurately matches your customer onboarding workflow.
5. **Legal Terms**: Have your legal counsel review the Terms & Conditions and Privacy Policy texts in `src/components/modals/LegalModal.tsx`.

---

## ☁️ Deployment to Vercel

1. Push your repository to GitHub (`github.com/hriksinha1/Trip`).
2. Log into [Vercel](https://vercel.com) and link the repository.
3. Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Set `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_EMAIL`, and `VITE_ENQUIRY_ENDPOINT` as needed.
4. Deploy! The included `vercel.json` provides seamless single-page application fallback routing.
