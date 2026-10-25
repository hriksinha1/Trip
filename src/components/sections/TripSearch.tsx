import React, { useState, useRef, useEffect } from "react";
import { MapPin, Calendar, Users, Minus, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { destinations } from "../../data/destinations";

export interface TripSearchParams {
  destination: string;
  startDate?: string;
  endDate?: string;
  travellers: number;
}

interface TripSearchProps {
  onSearchSubmit: (params: TripSearchParams) => void;
}

export const TripSearch: React.FC<TripSearchProps> = ({ onSearchSubmit }) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travellers, setTravellers] = useState(2);

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [validationError, setValidationError] = useState("");

  const datePopoverRef = useRef<HTMLDivElement>(null);
  const guestPopoverRef = useRef<HTMLDivElement>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (datePopoverRef.current && !datePopoverRef.current.contains(e.target as Node)) {
        setIsDateOpen(false);
      }
      if (guestPopoverRef.current && !guestPopoverRef.current.contains(e.target as Node)) {
        setIsGuestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!destination.trim()) {
      setValidationError("Please select or enter a destination.");
      return;
    }

    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      setValidationError("Return date must be after departure date.");
      return;
    }

    onSearchSubmit({
      destination: destination.trim(),
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      travellers,
    });

    setIsDateOpen(false);
    setIsGuestOpen(false);
  };

  const formattedDateLabel =
    startDate && endDate
      ? `${startDate.slice(5)} to ${endDate.slice(5)}`
      : startDate
      ? `From ${startDate.slice(5)}`
      : "Travel dates";

  return (
    <div className="w-full max-w-[760px] mx-auto px-1 sm:px-2">
      <form
        onSubmit={handleSubmit}
        className="relative bg-[rgba(20,20,20,0.65)] backdrop-blur-md border border-white/20 rounded-2xl md:rounded-full p-2.5 md:p-1.5 shadow-2xl flex flex-col md:flex-row md:items-center text-white gap-2 md:gap-0"
      >
        {/* Segment 1: Destination input with datalist */}
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 md:py-1 min-h-[44px]">
          <MapPin className="w-4 h-4 text-white/80 shrink-0" aria-hidden="true" />
          <label htmlFor="search-destination" className="sr-only">
            Where would you like to travel?
          </label>
          <input
            id="search-destination"
            list="destinations-list"
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              if (validationError) setValidationError("");
            }}
            placeholder="Where would you like to go?"
            className="w-full bg-transparent text-sm text-white placeholder-white/80 focus:outline-none font-sans"
          />
          <datalist id="destinations-list">
            {destinations.map((d) => (
              <option key={d.id} value={`${d.name}, ${d.state}`} />
            ))}
          </datalist>
        </div>

        <div className="hidden md:block w-px h-6 bg-white/20 shrink-0" aria-hidden="true" />

        {/* Segment 2: Travel dates popover */}
        <div className="relative flex-1" ref={datePopoverRef}>
          <button
            type="button"
            onClick={() => {
              setIsDateOpen(!isDateOpen);
              setIsGuestOpen(false);
            }}
            aria-expanded={isDateOpen}
            aria-label="Select travel dates"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 md:py-2 min-h-[44px] text-left text-sm hover:bg-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <Calendar className="w-4 h-4 text-white/80 shrink-0" aria-hidden="true" />
            <span className="truncate text-white/90">{formattedDateLabel}</span>
          </button>

          {isDateOpen && (
            <div className="md:absolute top-full left-0 mt-2 z-50 w-full sm:w-72 bg-white text-[#151515] rounded-xl p-4 shadow-xl border border-neutral-200 modal-content-animate">
              <div className="space-y-3">
                <div>
                  <label htmlFor="search-start-date" className="block text-xs font-semibold text-neutral-700 mb-1">
                    Departure Date
                  </label>
                  <input
                    id="search-start-date"
                    type="date"
                    min={todayStr}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-sm border border-neutral-300 rounded-lg p-2 focus:ring-2 focus:ring-[#151515] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="search-end-date" className="block text-xs font-semibold text-neutral-700 mb-1">
                    Return Date (Optional)
                  </label>
                  <input
                    id="search-end-date"
                    type="date"
                    min={startDate || todayStr}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-sm border border-neutral-300 rounded-lg p-2 focus:ring-2 focus:ring-[#151515] focus:outline-none"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setIsDateOpen(false)}
                    className="text-xs font-semibold text-[#151515] hover:underline"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block w-px h-6 bg-white/20 shrink-0" aria-hidden="true" />

        {/* Segment 3: Travellers count stepper (Rooms removed per spec) */}
        <div className="relative flex-1" ref={guestPopoverRef}>
          <button
            type="button"
            onClick={() => {
              setIsGuestOpen(!isGuestOpen);
              setIsDateOpen(false);
            }}
            aria-expanded={isGuestOpen}
            aria-label="Select traveller count"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 md:py-2 min-h-[44px] text-left text-sm hover:bg-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <Users className="w-4 h-4 text-white/80 shrink-0" aria-hidden="true" />
            <span className="truncate text-white/90">
              {travellers} {travellers === 1 ? "Traveller" : "Travellers"}
            </span>
          </button>

          {isGuestOpen && (
            <div className="md:absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 w-full sm:w-64 bg-white text-[#151515] rounded-xl p-4 shadow-xl border border-neutral-200 modal-content-animate">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-neutral-800">Travellers</div>
                    <div className="text-[11px] text-neutral-500">Group or solo travellers</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={travellers <= 1}
                      onClick={() => setTravellers(Math.max(1, travellers - 1))}
                      aria-label="Decrease travellers"
                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center tabular-nums">{travellers}</span>
                    <button
                      type="button"
                      disabled={travellers >= 10}
                      onClick={() => setTravellers(Math.min(10, travellers + 1))}
                      aria-label="Increase travellers"
                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setIsGuestOpen(false)}
                    className="text-xs font-semibold text-[#151515] hover:underline"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Segment 4: Plan my trip submit button */}
        <div className="pt-1 md:pt-0 shrink-0">
          <Button
            type="submit"
            variant="onPhoto"
            size="md"
            className="w-full md:w-auto font-semibold text-sm px-6 py-3 rounded-full shadow-md min-h-[44px]"
          >
            Plan my trip
          </Button>
        </div>
      </form>

      {validationError && (
        <p role="alert" className="text-center text-xs text-amber-200 mt-2 bg-black/50 py-1 px-3 rounded-full mx-auto w-fit">
          {validationError}
        </p>
      )}
    </div>
  );
};
