import React, { useState } from "react";
import { Dialog } from "../ui/Dialog";
import { Button } from "../ui/Button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setEmail("");
    setName("");
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title="Create Your Nomira Account"
      description="Unlock member rates, save your favorite destinations, and manage your seasonal itineraries."
    >
      {success ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-display">
            N
          </div>
          <h4 className="font-display text-xl font-bold text-neutral-900">
            Welcome to the Explorers Circle!
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
            Welcome aboard, {name || "Traveler"}! This is a demo interface showcasing Nomira's membership privileges. No real account was created.
          </p>
          <div className="pt-2">
            <Button variant="primary" onClick={handleResetAndClose}>
              Continue Exploring
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Hayes"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan@domain.com"
              className="w-full text-xs sm:text-sm border border-neutral-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#151515] focus:outline-none"
            />
          </div>

          <div className="bg-[#FAF9F6] border border-[#E8E6E0] rounded-xl p-3 text-xs text-neutral-600">
            ✨ Members receive early notice on seasonal trips and up to 30% discount access.
          </div>

          <p className="text-[11px] text-neutral-400 italic">
            * Demo Mode: No passwords, third-party authentication or tracking required.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
            >
              Close
            </button>
            <Button type="submit" variant="primary" size="sm">
              Create Demo Account
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
};
