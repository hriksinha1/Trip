import React from "react";
import { Dialog } from "../ui/Dialog";
import { Button } from "../ui/Button";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy" | "partner" | "help" | null;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!type) return null;

  const contentMap = {
    terms: {
      title: "Terms & Conditions",
      subtitle: "Nomira Travel Platform Guidelines (Demonstration Only)",
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          <p>
            Welcome to NOMIRA. All itineraries, seasonal trip bookings, discounts, and destinations featured across this website are presented for design demonstration purposes.
          </p>
          <p>
            1. <strong>Reservations & Flexibility</strong>: Sample pricing and booking slots do not reflect live inventory. Real bookings require confirmation via verified concierge channels.
          </p>
          <p>
            2. <strong>Intellectual Property</strong>: The Nomira geometric brand mark, typography pairings, and layout structures represent proprietary creative assets.
          </p>
          <p>
            3. <strong>Fair Use</strong>: Photography credits remain with their respective artists on Unsplash.
          </p>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "How Nomira handles your travel data and inquiries",
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          <p>
            At Nomira, we believe privacy is fundamental to an effortless travel experience.
          </p>
          <p>
            1. <strong>Data Handling</strong>: Any information entered into our demo search bars, newsletters, or booking modals is handled client-side in memory and never transmitted to external third parties.
          </p>
          <p>
            2. <strong>No Tracking Telemetry</strong>: Nomira does not use invasive cross-site behavioral cookies or advertising pixels.
          </p>
          <p>
            3. <strong>Support</strong>: For privacy inquiries, please contact our privacy compliance team via our support channels.
          </p>
        </div>
      ),
    },
    partner: {
      title: "Our Partners & Local Guides",
      subtitle: "Connecting curious travelers with ethical indigenous hosts",
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          <p>
            Nomira collaborates directly with local boat captains, community preservation trusts, certified alpine leaders, and family-owned boutique lodges in Bali, Cappadocia, Tokyo, and Raja Ampat.
          </p>
          <p>
            Interested in listing your boutique experience or leading regional expeditions? Reach out to our partnerships collective.
          </p>
        </div>
      ),
    },
    help: {
      title: "Nomira Help Center",
      subtitle: "Round-the-clock guidance for travelers",
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          <p>
            Need assistance with itinerary customisation, baggage logistics, or visa considerations?
          </p>
          <p>
            Our travel specialists are on call 24 hours a day during all active excursions. You can also review our FAQ section on the main page for immediate answers.
          </p>
        </div>
      ),
    },
  };

  const item = contentMap[type] || contentMap.terms;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={item.title} description={item.subtitle}>
      {item.body}
      <div className="pt-5 flex justify-end">
        <Button variant="primary" size="sm" onClick={onClose}>
          Understood
        </Button>
      </div>
    </Dialog>
  );
};
