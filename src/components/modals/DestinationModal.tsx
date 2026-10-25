import React from "react";
import { Dialog } from "../ui/Dialog";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";
import { Destination } from "../../data/destinations";

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination | null;
  onEnquireDestination: (destination: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  isOpen,
  onClose,
  destination,
  onEnquireDestination,
}) => {
  if (!destination) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`${destination.name}, ${destination.state}`}
      description={destination.badge}
    >
      <div className="space-y-4">
        {/* Destination Image */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-xs">
          <SmartImage
            imageId={destination.imageId}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed font-sans">
          {destination.description}
        </p>

        {/* Tags and State */}
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <span className="text-xs font-semibold text-neutral-500">Highlights:</span>
          {destination.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full bg-[#F3F2EE] border border-[#E8E6E0] text-xs font-medium text-neutral-800"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-xs text-neutral-500">
            State: <strong className="text-neutral-800">{destination.state}</strong>
          </span>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
          >
            Close
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              onEnquireDestination(destination);
            }}
          >
            Enquire about {destination.name}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
