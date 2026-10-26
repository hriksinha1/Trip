import React, { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { PopularTrips } from "./components/sections/PopularTrips";
import { BrandStatement } from "./components/sections/BrandStatement";
import { StatisticsSection } from "./components/sections/StatisticsSection";
import { DestinationExplorer } from "./components/sections/DestinationExplorer";
import { TravelerStories } from "./components/sections/TravelerStories";
import { FAQSection } from "./components/sections/FAQSection";
import { PromotionalCTA } from "./components/sections/PromotionalCTA";
import { StickyMobileCTA } from "./components/ui/StickyMobileCTA";

import { EnquiryModal, EnquiryInitialData } from "./components/modals/EnquiryModal";
import { DestinationModal } from "./components/modals/DestinationModal";
import { LegalModal } from "./components/modals/LegalModal";

import { Trip } from "./data/trips";
import { Destination } from "./data/destinations";
import { TripSearchParams } from "./components/sections/TripSearch";
import { useReveal } from "./hooks/useReveal";

export function App() {
  // GSAP subtle scroll reveals
  useReveal();

  // Modal States
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryInitialData, setEnquiryInitialData] = useState<EnquiryInitialData | null>(null);

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDestModalOpen, setIsDestModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<"terms" | "privacy" | null>(null);

  const isAnyModalOpen = isEnquiryOpen || isDestModalOpen || legalModalType !== null;

  const handleOpenEnquiry = (initial?: EnquiryInitialData) => {
    setEnquiryInitialData(initial || null);
    setIsEnquiryOpen(true);
  };

  const handleTripEnquire = (trip: Trip) => {
    handleOpenEnquiry({
      destination: trip.title,
    });
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsDestModalOpen(true);
  };

  const handleDestinationEnquire = (dest: Destination) => {
    setIsDestModalOpen(false);
    handleOpenEnquiry({
      destination: `${dest.name}, ${dest.state}`,
    });
  };

  const handleHeroSearchSubmit = (params: TripSearchParams) => {
    handleOpenEnquiry({
      destination: params.destination,
      startDate: params.startDate,
      endDate: params.endDate,
      travellers: params.travellers,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#151515] font-sans selection:bg-[#151515] selection:text-white">
      {/* Skip Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#151515] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Floating Header */}
      <Header onPlanTripClick={() => handleOpenEnquiry()} />

      {/* Main semantic container - plain block per spec to prevent auto-margin flex shrinking */}
      <main id="main-content" className="w-full">
        {/* 1. Header + Hero */}
        <HeroSection onSearchSubmit={handleHeroSearchSubmit} />

        {/* 2. Our Popular Trips */}
        <PopularTrips onEnquireNow={handleTripEnquire} />

        {/* 3. Brand Statement */}
        <BrandStatement onPlanTripClick={() => handleOpenEnquiry()} />

        {/* 4. Statistics / Service Facts */}
        <StatisticsSection />

        {/* 5. Discover India / Destination Explorer */}
        <DestinationExplorer onSelectDestination={handleSelectDestination} />

        {/* 6. Editorial Experiences */}
        <TravelerStories />

        {/* 7. Frequently Asked Questions */}
        <FAQSection onPlanTripClick={() => handleOpenEnquiry()} />

        {/* 8. Promotional CTA */}
        <PromotionalCTA onPlanTripClick={() => handleOpenEnquiry()} />
      </main>

      {/* 9. Full-bleed footer surface; content uses the shared inner shell. */}
      <Footer
        onOpenLegalDialog={(type) => setLegalModalType(type)}
        onPlanTripClick={() => handleOpenEnquiry()}
      />

      {/* Sticky Mobile CTA Bar */}
      <StickyMobileCTA
        onPlanTripClick={() => handleOpenEnquiry()}
        isAnyModalOpen={isAnyModalOpen}
      />

      {/* Modals & Dialogs */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialData={enquiryInitialData}
      />

      <DestinationModal
        isOpen={isDestModalOpen}
        onClose={() => setIsDestModalOpen(false)}
        destination={selectedDestination}
        onEnquireDestination={handleDestinationEnquire}
      />

      <LegalModal
        isOpen={legalModalType !== null}
        onClose={() => setLegalModalType(null)}
        type={legalModalType}
      />
    </div>
  );
}

export default App;
