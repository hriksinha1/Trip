import React, { useState, useRef, useEffect } from "react";
import { MapPin, Calendar, Users, Minus, Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface TripSearchProps {
  onSearchSubmit: (query: { destination: string; checkIn: string; checkOut: string; persons: number; rooms: number }) => void;
}

export const TripSearch: React.FC<TripSearchProps> = ({ onSearchSubmit }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [persons, setPersons] = useState(2);
  const [rooms, setRooms] = useState(1);

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [validationError, setValidationError] = useState("");

  const datePopoverRef = useRef<HTMLDivElement>(null);
  const guestPopoverRef = useRef<HTMLDivElement>(null);

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
      setValidationError("Please enter a destination to explore.");
      return;
    }

    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      setValidationError("Check-out date must be after check-in date.");
      return;
    }

    onSearchSubmit({ destination: destination.trim(), checkIn, checkOut, persons, rooms });
    setIsDateOpen(false);
    setIsGuestOpen(false);
  };

  const formattedDateLabel =
    checkIn && checkOut
      ? `${checkIn.slice(5)} to ${checkOut.slice(5)}`
      : checkIn
      ? `From ${checkIn.slice(5)}`
      : "Pick your dates";

  return (
    <div className="w-full max-w-[760px] mx-auto px-2">
      <form
        onSubmit={handleSubmit}
        className="relative bg-[rgba(20,20,20,0.55)] backdrop-blur-md border border-white/20 rounded-2xl md:rounded-full p-2 md:p-1.5 shadow-2xl flex flex-col md:flex-row md:items-center text-white"
      >
        {/* Segment 1: Where to next (Input) */}
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 md:py-1">
          <MapPin className="w-4 h-4 text-white/80 shrink-0" aria-hidden="true" />
          <label htmlFor="search-destination" className="sr-only">
            Where to next
          </label>
          <input
            id="search-destination"
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              if (validationError) setValidationError("");
            }}
            placeholder="Where to next"
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-white/80 focus:outline-none font-sans"
          />
        </div>

        <div className="hidden md:block w-px h-6 bg-white/20 shrink-0" aria-hidden="true" />

        {/* Segment 2: Pick your dates (Popover Button) */}
        <div className="relative flex-1" ref={datePopoverRef}>
          <button
            type="button"
            onClick={() => {
              setIsDateOpen(!isDateOpen);
              setIsGuestOpen(false);
            }}
            aria-expanded={isDateOpen}
            aria-label="Select trip dates"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 md:py-2 text-left text-xs sm:text-sm hover:bg-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <Calendar className="w-4 h-4 text-white/80 shrink-0" aria-hidden="true" />
            <span className="truncate text-white/90">{formattedDateLabel}</span>
          </button>

          {isDateOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-72 bg-white text-[#151515] rounded-xl p-4 shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95">
              <div className="space-y-3">
                <div>
                  <label htmlFor="check-in-date" className="block text-xs font-semibold text-neutral-600 mb-1">
                    Check-in Date
                  </label>
                  <input
                    id="check-in-date"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-neutral-300 rounded-lg p-2 focus:ring-2 focus:ring-[#151515] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="check-out-date" className="block text-xs font-semibold text-neutral-600 mb-1">
                    Check-out Date
                  </label>
                  <input
                    id="check-out-date"
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-neutral-300 rounded-lg p-2 focus:ring-2 focus:ring-[#151515] focus:outline-none"
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

        {/* Segment 3: Persons & Room (Stepper Popover) */}
        <div className="relative flex-1" ref={guestPopoverRef}>
          <button
            type="button"
            onClick={() => {
              setIsGuestOpen(!isGuestOpen);
              setIsDateOpen(false);
            }}
            aria-expanded={isGuestOpen}
            aria-label="Select guest and room counts"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 md:py-2 text-left text-xs sm:text-sm hover:bg-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <Users className="w-4 h-4 text-white/80 shrink-0" aria-hidden="true" />
            <span className="truncate text-white/90">
              {persons} {persons === 1 ? "Person" : "Persons"} · {rooms} {rooms === 1 ? "Room" : "Rooms"}
            </span>
          </button>

          {isGuestOpen && (
            <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 w-full sm:w-64 bg-white text-[#151515] rounded-xl p-4 shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95">
              <div className="space-y-4">
                {/* Persons Stepper */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-neutral-800">Persons</div>
                    <div className="text-[11px] text-neutral-500">Ages 13 and above</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={persons <= 1}
                      onClick={() => setPersons(Math.max(1, persons - 1))}
                      aria-label="Decrease persons"
                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center tabular-nums">{persons}</span>
                    <button
                      type="button"
                      disabled={persons >= 10}
                      onClick={() => setPersons(Math.min(10, persons + 1))}
                      aria-label="Increase persons"
                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Rooms Stepper */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <div>
                    <div className="text-xs font-bold text-neutral-800">Rooms</div>
                    <div className="text-[11px] text-neutral-500">Private accommodation</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      aria-label="Decrease rooms"
                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center tabular-nums">{rooms}</span>
                    <button
                      type="button"
                      disabled={rooms >= 5}
                      onClick={() => setRooms(Math.min(5, rooms + 1))}
                      aria-label="Increase rooms"
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

        {/* Segment 4: Find my trip (Button) */}
        <div className="pt-2 md:pt-0 shrink-0">
          <Button
            type="submit"
            variant="onPhoto"
            size="md"
            className="w-full md:w-auto font-semibold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full shadow-md"
          >
            Find my trip
          </Button>
        </div>
      </form>

      {/* Validation alert */}
      {validationError && (
        <p role="alert" className="text-center text-xs text-amber-200 mt-2 bg-black/40 py-1 px-3 rounded-full mx-auto w-fit">
          {validationError}
        </p>
      )}
    </div>
  );
};
