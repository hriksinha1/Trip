import React, { useState } from "react";
import { Dialog } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Trip } from "../../data/trips";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip?: Trip | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  trip,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    travelers: "2",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", date: "", travelers: "2" });
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={trip ? `Reserve ${trip.title}` : "Book Your Adventure"}
      description={
        trip
          ? `${trip.location} · ${trip.duration} (${trip.priceRange} / Person)`
          : "Reserve your spot on our next seasonal expedition."
      }
    >
      {submitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
            ✓
          </div>
          <h4 className="font-display text-xl font-bold text-neutral-900">
            Reservation Request Received!
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
            Thank you! This is an interactive demo of the Nomira booking flow. No real transaction has occurred, and your dates have not been charged.
          </p>
          <div className="pt-2">
            <Button variant="primary" onClick={handleResetAndClose}>
              Back to Exploration
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Elena Rostova"
              className="w-full text-xs sm:text-sm border border-neutral-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#151515] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@domain.com"
              className="w-full text-xs sm:text-sm border border-neutral-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#151515] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Preferred Travel Month
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder={trip?.dates || "October"}
                className="w-full text-xs sm:text-sm border border-neutral-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#151515] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Travelers
              </label>
              <select
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                className="w-full text-xs sm:text-sm border border-neutral-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#151515] focus:outline-none bg-white"
              >
                <option value="1">1 Solo Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4">4+ Travelers</option>
              </select>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 italic pt-1">
            * This is an interactive demo for Nomira. No credit card or real payment is requested.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <Button type="submit" variant="primary" size="sm">
              Confirm Reservation Request
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
};
