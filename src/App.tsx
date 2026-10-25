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

import { BookingModal } from "./components/modals/BookingModal";
import { AuthModal } from "./components/modals/AuthModal";
import { DestinationModal } from "./components/modals/DestinationModal";
import { LegalModal } from "./components/modals/LegalModal";

import { Trip, trips } from "./data/trips";
import { Destination } from "./data/destinations";
import { useReveal } from "./hooks/useReveal";

export function App() {
  // GSAP subtle scroll reveals
  useReveal();

  // Modal States
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDestModalOpen, setIsDestModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<"terms" | "privacy" | "partner" | "help" | null>(null);

  // Search notification status
  const [searchStatus, setSearchStatus] = useState<string | null>(null);

  const handleOpenBooking = (trip?: Trip) => {
    setSelectedTrip(trip || trips[0]);
    setIsBookingOpen(true);
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsDestModalOpen(true);
  };

  const handleSearchSubmit = (query: {
    destination: string;
    checkIn: string;
    checkOut: string;
    persons: number;
    rooms: number;
  }) => {
    const statusMsg = `Showing sample trips matching "${query.destination}". (Demo: sample availability only)`;
    setSearchStatus(statusMsg);

    // Smooth scroll down to popular trips section
    const tripsEl = document.getElementById("trips");
    if (tripsEl) {
      tripsEl.scrollIntoView({ behavior: "smooth" });
    }

    // Clear message after 8 seconds
    setTimeout(() => {
      setSearchStatus(null);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#151515] flex flex-col font-sans selection:bg-[#151515] selection:text-white">
      {/* Skip Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#151515] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Floating Header */}
      <Header onSignUpClick={() => setIsAuthOpen(true)} />

      {/* Semantic Main Content */}
      <main id="main-content" className="flex-1 flex flex-col">
        {/* 1. Header + Hero */}
        <HeroSection
          onSearchSubmit={handleSearchSubmit}
          searchNotification={searchStatus}
        />

        {/* 2. Our Popular Trips */}
        <PopularTrips onBookNow={handleOpenBooking} />

        {/* 3. Brand Statement */}
        <BrandStatement />

        {/* 4. Statistics */}
        <StatisticsSection />

        {/* 5. Discover the World */}
        <DestinationExplorer onSelectDestination={handleSelectDestination} />

        {/* 6. Traveler Stories */}
        <TravelerStories onSeeMoreStories={() => setIsAuthOpen(true)} />

        {/* 7. Frequently Asked Questions */}
        <FAQSection onExploreMoreQuestions={() => setLegalModalType("help")} />

        {/* 8. Promotional CTA */}
        <PromotionalCTA onBookNow={() => handleOpenBooking()} />
      </main>

      {/* 9. Footer */}
      <div className="px-3 sm:px-6 md:px-10 lg:px-14 pb-4 sm:pb-6 max-w-[1440px] mx-auto w-full">
        <Footer onOpenLegalDialog={(type) => setLegalModalType(type)} />
      </div>

      {/* Modals & Dialogs */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        trip={selectedTrip}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <DestinationModal
        isOpen={isDestModalOpen}
        onClose={() => setIsDestModalOpen(false)}
        destination={selectedDestination}
        onBookTrip={() => {
          setIsDestModalOpen(false);
          handleOpenBooking();
        }}
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
