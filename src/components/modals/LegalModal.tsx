import React from "react";
import { Dialog } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { site } from "../../data/site";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy" | null;
}

/**
 * NOTE FOR THE OWNER:
 * The legal texts below accurately reflect the current technical behavior of this website.
 * Before operating commercially, please have these terms reviewed by legal counsel.
 */
export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!type) return null;

  const contentMap = {
    terms: {
      title: "Terms & Conditions",
      subtitle: "General website terms for Starttrips",
      body: (
        <div className="space-y-3 text-sm text-neutral-600 leading-relaxed font-sans">
          <p>
            1. <strong>Indicative Information</strong>: All itineraries, travel packages, sample prices and durations displayed on this website are indicative starting points for planning purposes and may change based on season, availability and your specific preferences.
          </p>
          <p>
            2. <strong>No Online Booking or Payments</strong>: Nothing on this website constitutes a binding travel offer, booking confirmation, or payment transaction. No payments are collected on this site.
          </p>
          <p>
            3. <strong>Direct Confirmation</strong>: All arrangements, inclusions, final prices, dates and payment steps must be confirmed directly between you and Starttrips via our official communication channels.
          </p>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "How Starttrips respects your inquiry data",
      body: (
        <div className="space-y-3 text-sm text-neutral-600 leading-relaxed font-sans">
          <p>
            1. <strong>Local Message Preparation</strong>: Unless an enquiry endpoint is configured by the site owner, this website processes the enquiry details you type locally in your browser to compose a message that you choose to send via WhatsApp, Email, or Instagram. Those third-party platforms have their own privacy policies.
          </p>
          {site.enquiryEndpoint && (
            <p>
              2. <strong>Enquiry Endpoint</strong>: When submitting an online enquiry, your name, contact and travel preferences are transmitted to Starttrips' configured secure endpoint solely to respond to your inquiry.
            </p>
          )}
          <p>
            3. <strong>No Ad Trackers</strong>: This website does not sell your personal information or run behavioral ad-tracking pixels.
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
