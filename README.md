# NOMIRA — Travel & Curated Adventures Landing Page

NOMIRA is an editorial, cinematic travel brand landing page built with React, TypeScript, Tailwind CSS, and GSAP. It replicates the reference desktop composition, typography hierarchy, and subtle interactions while adapting smoothly to tablet and mobile viewports.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens and fluid type scales
- **Typography**: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) (Display / Headings / Numbers) & [Poppins](https://fonts.google.com/specimen/Poppins) (Body / Labels / Navigation)
- **Icons**: Lucide React + Custom Inline SVGs for the NOMIRA geometric logo mark and social channels
- **Animations**: GSAP (+ ScrollTrigger) for subtle entrance reveals, with full `prefers-reduced-motion` compliance

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
Verify output locally with:
```bash
npm run preview
```

---

## 📁 Project Structure

```
├── index.html                   # Entry HTML with Google Fonts, OpenGraph, theme-color, & SVG favicon
├── vercel.json                  # Single-Page Application (SPA) routing fallback for Vercel
├── src/
│   ├── main.tsx                 # React DOM root entry
│   ├── App.tsx                  # Top-level composition of all 9 semantic sections & modals
│   ├── index.css                # Base Tailwind layers, tokens, feather masks, & scallop utilities
│   ├── data/                    # Structured data collections (easy to customize)
│   │   ├── images.ts            # Central image registry (URLs, dimensions, fallbacks)
│   │   ├── trips.ts             # Popular trips (Bali, Cappadocia, Tokyo, Raja Ampat)
│   │   ├── destinations.ts      # Curated destinations across 8 global regions
│   │   ├── stories.ts           # Traveler polaroid stories & quotes
│   │   ├── faqs.ts              # Frequently asked questions & answers
│   │   ├── stats.ts             # Explorer & destination ticket counters
│   │   └── navigation.ts        # Nav links, explore, & support links
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Over-hero floating header with capsule & scroll transitions
│   │   │   ├── MobileMenu.tsx   # Accessible mobile overlay sheet with smooth scroll anchors
│   │   │   └── Footer.tsx       # 4-column footer with newsletter validation & social SVGs
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx  # Hero with feathered dissolve mask & Cappadocia dawn photo
│   │   │   ├── TripSearch.tsx   # Translucent search capsule with date & guest popovers
│   │   │   ├── PopularTrips.tsx # 4-column trip cards with recommended badge & overflow pager
│   │   │   ├── BrandStatement.tsx # Generous whitespace, display copy & overlapping avatars
│   │   │   ├── StatisticsSection.tsx # Teal ocean backdrop with 3 notched ticket cards & count-up
│   │   │   ├── DestinationExplorer.tsx # Region filter chips & edge-peek horizontal carousel
│   │   │   ├── TravelerStories.tsx # Tilted polaroid cards with lift & straighten hover
│   │   │   ├── FAQSection.tsx   # Accordion with single-open logic & role="region"
│   │   │   └── PromotionalCTA.tsx # Mount Fuji sunset CTA smoothly uniting with the footer
│   │   ├── ui/
│   │   │   ├── Button.tsx       # Pill button variants (primary, outline, onPhoto, ghost)
│   │   │   ├── Chip.tsx         # Interactive filter pill buttons with aria-pressed
│   │   │   ├── Dialog.tsx       # Accessible modal dialog with focus trap & Esc handling
│   │   │   ├── Logo.tsx         # Geometric interlocking "N" mark + NOMIRA wordmark
│   │   │   ├── PolaroidCard.tsx # Rotated polaroid paper cards with paper shadows
│   │   │   ├── SectionHeading.tsx # Balanced titles with fluid display typography
│   │   │   ├── SmartImage.tsx   # Lazy/eager image loader with resilient gradient fallback
│   │   │   ├── SocialIcon.tsx   # Inline SVGs for Instagram, TikTok, X, & Facebook
│   │   │   └── TicketCard.tsx   # Perforated ticket cards with circular notches & scalloped edge
│   │   └── modals/
│   │       ├── BookingModal.tsx # Demo trip reservation confirmation flow
│   │       ├── AuthModal.tsx    # Demo account creation flow
│   │       ├── DestinationModal.tsx # Detailed modal for individual destinations
│   │       └── LegalModal.tsx   # Terms, Privacy Policy, Partners & Help Center
│   └── hooks/
│       └── useReveal.ts         # Subtle GSAP reveals respecting reduced-motion
```

---

## 🎨 How to Customize Content & Images

All content is decoupled from layout components and lives inside `src/data/`:
1. **Swap Photos**: Open `src/data/images.ts` to update image URLs, object positions, or color gradient fallbacks.
2. **Update Trips**: Open `src/data/trips.ts` to edit trip names, seasonal dates, durations, or prices.
3. **Change Destinations**: Open `src/data/destinations.ts` to adjust regions, badges, or tag chips.
4. **Edit Testimonials & FAQs**: Check `src/data/stories.ts` and `src/data/faqs.ts`.

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Set the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: None required
5. Click **"Deploy"**. The included `vercel.json` ensures client-side routes and assets resolve correctly.
