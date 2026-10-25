import React, { useState, useEffect } from "react";
import { Copy, Check, MessageCircle, Mail, Instagram, Minus, Plus } from "lucide-react";
import { Dialog } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { trips } from "../../data/trips";
import { destinations } from "../../data/destinations";
import { site } from "../../data/site";
import { submitEnquiry } from "../../lib/enquiry";

export interface EnquiryInitialData {
  destination?: string;
  startDate?: string;
  endDate?: string;
  travellers?: number;
}

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: EnquiryInitialData | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFlexible, setIsFlexible] = useState(false);
  const [travellers, setTravellers] = useState(2);
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrepared, setIsPrepared] = useState(false);
  const [preparedMessage, setPreparedMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [endpointSubmitted, setEndpointSubmitted] = useState(false);

  // Initialize or reset form values when dialog opens
  useEffect(() => {
    if (isOpen) {
      setIsPrepared(false);
      setEndpointSubmitted(false);
      setIsCopied(false);
      setValidationError("");

      if (initialData?.destination) {
        setSelectedItem(initialData.destination);
      } else if (!selectedItem) {
        setSelectedItem(trips[0]?.title || destinations[0]?.name || "Goa");
      }

      if (initialData?.startDate) setStartDate(initialData.startDate);
      if (initialData?.endDate) setEndDate(initialData.endDate);
      if (initialData?.travellers) setTravellers(initialData.travellers);
    }
  }, [isOpen, initialData]);

  const formatDateDisplay = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  const buildTextMessage = () => {
    let dateLine = "Dates: Flexible";
    if (!isFlexible && startDate) {
      dateLine = `Dates: ${formatDateDisplay(startDate)}${endDate ? ` to ${formatDateDisplay(endDate)}` : ""}`;
    }

    return [
      `Hi Starttrips! I'd like to plan a trip.`,
      `Destination / Package: ${selectedItem}`,
      dateLine,
      `Travellers: ${travellers}`,
      `Name: ${name.trim()}`,
      contact.trim() ? `Contact: ${contact.trim()}` : "",
      notes.trim() ? `Notes: ${notes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!name.trim()) {
      setValidationError("Please enter your name.");
      return;
    }

    if (!isFlexible && !startDate) {
      setValidationError("Please select a departure date or tick 'I'm flexible with dates'.");
      return;
    }

    if (!isFlexible && startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      setValidationError("Return date must be after departure date.");
      return;
    }

    if (site.enquiryEndpoint && !contact.trim()) {
      setValidationError("Please provide your phone number or email address.");
      return;
    }

    const message = buildTextMessage();
    setPreparedMessage(message);

    if (site.enquiryEndpoint) {
      setIsSubmitting(true);
      const res = await submitEnquiry({
        name: name.trim(),
        destination: selectedItem,
        startDate: isFlexible ? undefined : startDate,
        endDate: isFlexible ? undefined : endDate,
        isFlexibleDates: isFlexible,
        travellers,
        contact: contact.trim(),
        notes: notes.trim(),
      });
      setIsSubmitting(false);

      if (res.ok) {
        setEndpointSubmitted(true);
      } else {
        setValidationError(res.error || "Unable to send enquiry online. Please use manual options below.");
        setIsPrepared(true);
      }
    } else {
      setIsPrepared(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = preparedMessage;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  const handleInstagramDM = () => {
    copyToClipboard();
    window.open(site.instagramUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={isPrepared || endpointSubmitted ? "Your Enquiry is Ready" : "Plan Your Trip with Starttrips"}
      description={
        isPrepared || endpointSubmitted
          ? "Choose your preferred channel below to send your enquiry directly to Starttrips."
          : "Tell us where you'd like to go and we'll help shape your itinerary."
      }
    >
      {endpointSubmitted ? (
        <div className="py-4 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl">
            ✓
          </div>
          <h4 className="font-display text-lg font-semibold text-neutral-900">
            Enquiry Submitted Successfully
          </h4>
          <p className="text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
            Thank you, {name}! Your travel preferences have been received. We'll review and get back to you shortly.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      ) : isPrepared ? (
        <div className="space-y-4">
          {/* Message Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="enquiry-preview-box" className="text-xs font-semibold text-neutral-700">
                Message Preview
              </label>
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1 text-xs text-[#151515] hover:underline font-medium"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy message</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              id="enquiry-preview-box"
              readOnly
              value={preparedMessage}
              rows={5}
              className="w-full text-xs sm:text-sm font-mono bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-800 focus:outline-none"
            />
          </div>

          {/* Action Send Options */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Send via:
            </p>

            <div className="grid grid-cols-1 gap-2">
              {site.whatsappNumber && (
                <a
                  href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(preparedMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition-colors text-sm font-medium"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>Send on WhatsApp</span>
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold">Open App →</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleInstagramDM}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-900 transition-colors text-sm font-medium text-left"
              >
                <span className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-neutral-700" />
                  <span>Message on Instagram ({site.instagramHandle})</span>
                </span>
                <span className="text-xs text-neutral-500 font-semibold">Copies message & opens →</span>
              </button>

              {site.contactEmail && (
                <a
                  href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Trip Enquiry: ${selectedItem}`)}&body=${encodeURIComponent(preparedMessage)}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-900 transition-colors text-sm font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-neutral-700" />
                    <span>Send via Email</span>
                  </span>
                  <span className="text-xs text-neutral-500 font-semibold">Open client →</span>
                </a>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsPrepared(false)}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline"
            >
              ← Edit details
            </button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="enquiry-name" className="block text-xs font-semibold text-neutral-700 mb-1">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="enquiry-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (validationError) setValidationError("");
              }}
              placeholder="e.g. Asha Rao"
              className="w-full text-sm border border-neutral-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#151515] focus:outline-none"
            />
          </div>

          {/* Destination / Package Select */}
          <div>
            <label htmlFor="enquiry-destination" className="block text-xs font-semibold text-neutral-700 mb-1">
              Destination or Package <span className="text-rose-500">*</span>
            </label>
            <select
              id="enquiry-destination"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full text-sm border border-neutral-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#151515] focus:outline-none bg-white"
            >
              <optgroup label="Popular Trips">
                {trips.map((t) => (
                  <option key={t.id} value={t.title}>
                    {t.title} ({t.location})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Destinations Across India">
                {destinations.map((d) => (
                  <option key={d.id} value={`${d.name}, ${d.state}`}>
                    {d.name}, {d.state} ({d.badge})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Preferred Dates & Flexible Checkbox */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="enquiry-start-date" className="text-xs font-semibold text-neutral-700">
                Preferred Travel Dates {!isFlexible && <span className="text-rose-500">*</span>}
              </label>
              <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFlexible}
                  onChange={(e) => setIsFlexible(e.target.checked)}
                  className="rounded border-neutral-300 text-[#151515] focus:ring-[#151515]"
                />
                <span>I'm flexible with dates</span>
              </label>
            </div>

            {!isFlexible && (
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <div>
                  <label htmlFor="enquiry-start-date" className="sr-only">
                    Departure date
                  </label>
                  <input
                    id="enquiry-start-date"
                    type="date"
                    required={!isFlexible}
                    min={new Date().toISOString().split("T")[0]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-sm border border-neutral-300 rounded-lg p-2 focus:ring-2 focus:ring-[#151515] focus:outline-none"
                  />
                  <span className="text-[11px] text-neutral-500 mt-0.5 block">From</span>
                </div>
                <div>
                  <label htmlFor="enquiry-end-date" className="sr-only">
                    Return date
                  </label>
                  <input
                    id="enquiry-end-date"
                    type="date"
                    min={startDate || new Date().toISOString().split("T")[0]}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-sm border border-neutral-300 rounded-lg p-2 focus:ring-2 focus:ring-[#151515] focus:outline-none"
                  />
                  <span className="text-[11px] text-neutral-500 mt-0.5 block">To (Optional)</span>
                </div>
              </div>
            )}
          </div>

          {/* Travellers Count Stepper */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <label htmlFor="enquiry-travellers-stepper" className="block text-xs font-semibold text-neutral-700">
                Number of Travellers
              </label>
              <span className="text-[11px] text-neutral-500">Solo, couple, or group</span>
            </div>
            <div id="enquiry-travellers-stepper" className="flex items-center gap-2">
              <button
                type="button"
                disabled={travellers <= 1}
                onClick={() => setTravellers(Math.max(1, travellers - 1))}
                aria-label="Decrease travellers"
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-semibold w-5 text-center tabular-nums">{travellers}</span>
              <button
                type="button"
                disabled={travellers >= 10}
                onClick={() => setTravellers(Math.min(10, travellers + 1))}
                aria-label="Increase travellers"
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Contact (shown when enquiryEndpoint is set) */}
          {site.enquiryEndpoint && (
            <div>
              <label htmlFor="enquiry-contact" className="block text-xs font-semibold text-neutral-700 mb-1">
                Phone Number or Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="enquiry-contact"
                type="text"
                required
                autoComplete="tel email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+91 or you@domain.com"
                className="w-full text-sm border border-neutral-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#151515] focus:outline-none"
              />
            </div>
          )}

          {/* Notes (Optional) */}
          <div>
            <label htmlFor="enquiry-notes" className="block text-xs font-semibold text-neutral-700 mb-1">
              Notes or Special Requests (Optional)
            </label>
            <textarea
              id="enquiry-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Prefer peaceful stays, early morning departures..."
              className="w-full text-sm border border-neutral-300 rounded-lg p-2 focus:ring-2 focus:ring-[#151515] focus:outline-none"
            />
          </div>

          {validationError && (
            <p role="alert" className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
              {validationError}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
              {site.enquiryEndpoint ? (isSubmitting ? "Sending..." : "Send enquiry") : "Prepare my enquiry"}
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
};
