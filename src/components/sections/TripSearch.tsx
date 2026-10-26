import React, { useState, useRef, useEffect } from "react";
import { MapPin, CalendarDays, Users, Minus, Plus, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { destinations } from "../../data/destinations";
import { formatLocalDateLabel, getLocalDateString, getNextLocalDateString } from "../../lib/local-date.js";

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
  const dateTriggerRef = useRef<HTMLButtonElement>(null);
  const guestTriggerRef = useRef<HTMLButtonElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const todayStr = getLocalDateString();
  const endDateMin = startDate ? getNextLocalDateString(startDate) : todayStr;
  const hasDestinationError = Boolean(validationError && !destination.trim());

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (datePopoverRef.current && !datePopoverRef.current.contains(target)) setIsDateOpen(false);
      if (guestPopoverRef.current && !guestPopoverRef.current.contains(target)) setIsGuestOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isDateOpen) {
        event.preventDefault();
        setIsDateOpen(false);
        dateTriggerRef.current?.focus();
      } else if (isGuestOpen) {
        event.preventDefault();
        setIsGuestOpen(false);
        guestTriggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDateOpen, isGuestOpen]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError("");

    if (!destination.trim()) {
      setValidationError("Please select or enter a destination.");
      destinationRef.current?.focus();
      return;
    }

    if (startDate && endDate && endDate <= startDate) {
      setValidationError("Return date must be after departure date.");
      setIsDateOpen(true);
      dateTriggerRef.current?.focus();
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

  const formattedDateLabel = startDate && endDate
    ? formatLocalDateLabel(startDate) + " – " + formatLocalDateLabel(endDate)
    : startDate
      ? "From " + formatLocalDateLabel(startDate)
      : "Choose dates";

  return (
    <div className="relative z-20 mx-auto w-full max-w-[920px] px-0.5 sm:px-2">
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Plan a trip"
        className="grid grid-cols-1 gap-2 rounded-[26px] border border-white/25 bg-[rgba(13,18,17,0.82)] p-2 shadow-[0_22px_60px_-24px_rgba(0,0,0,.85),0_2px_8px_rgba(0,0,0,.2)] backdrop-blur-xl md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,.85fr)_auto] md:items-stretch md:gap-1.5 md:rounded-[28px] md:p-2"
      >
        <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-3.5 py-3 transition-colors hover:bg-white/[0.09] focus-within:border-white/45 focus-within:bg-white/[0.09] md:px-4 md:py-2.5">
          <MapPin className="size-[18px] shrink-0 text-white/85" aria-hidden="true" />
          <div className="min-w-0 flex-1 text-left">
            <label htmlFor="search-destination" className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">Destination</label>
            <input
              ref={destinationRef}
              id="search-destination"
              list="destinations-list"
              type="text"
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value);
                if (validationError) setValidationError("");
              }}
              placeholder="Where would you like to go?"
              aria-invalid={hasDestinationError}
              aria-describedby={hasDestinationError ? "trip-search-error" : undefined}
              autoComplete="off"
              className="w-full min-w-0 bg-transparent p-0 font-sans text-sm font-medium text-white outline-none placeholder:text-white/75 focus:outline-none"
            />
            <datalist id="destinations-list">
              {destinations.map((destinationOption) => (
                <option key={destinationOption.id} value={destinationOption.name + ", " + destinationOption.state} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="relative min-w-0" ref={datePopoverRef}>
          <button
            ref={dateTriggerRef}
            type="button"
            onClick={() => {
              setIsDateOpen((open) => !open);
              setIsGuestOpen(false);
            }}
            aria-expanded={isDateOpen}
            aria-controls="trip-date-popover"
            aria-label={"Select travel dates. " + formattedDateLabel}
            className={"flex min-h-[66px] w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:px-4 md:py-2.5 " + (isDateOpen ? "border-white/45 bg-white/[0.12]" : "border-white/10 bg-white/[0.055] hover:border-white/25 hover:bg-white/[0.09]")}
          >
            <CalendarDays className="size-[18px] shrink-0 text-white/85" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">Travel dates</span>
              <span className="block truncate text-sm font-medium text-white">{formattedDateLabel}</span>
            </span>
            <ChevronDown className={"size-4 shrink-0 text-white/70 transition-transform duration-200 " + (isDateOpen ? "rotate-180" : "")} aria-hidden="true" />
          </button>

          {isDateOpen && (
            <div id="trip-date-popover" role="group" aria-label="Choose travel dates" className="absolute left-0 top-full z-[70] mt-2 w-full min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 text-[#151515] shadow-[0_18px_48px_-18px_rgba(0,0,0,.42)] sm:w-[min(320px,calc(100vw-32px))]">
              <div className="space-y-3">
                <div>
                  <label htmlFor="search-start-date" className="mb-1.5 block text-xs font-semibold text-neutral-700">Departure date</label>
                  <input
                    id="search-start-date"
                    type="date"
                    min={todayStr}
                    value={startDate}
                    onChange={(event) => {
                      const nextStart = event.target.value;
                      setStartDate(nextStart);
                      if (endDate && nextStart && endDate <= nextStart) setEndDate("");
                    }}
                    className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm focus:border-[#151515] focus:outline-none focus:ring-2 focus:ring-[#151515]/15"
                  />
                </div>
                <div>
                  <label htmlFor="search-end-date" className="mb-1.5 block text-xs font-semibold text-neutral-700">Return date <span className="font-normal text-neutral-500">(optional)</span></label>
                  <input
                    id="search-end-date"
                    type="date"
                    min={endDateMin}
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm focus:border-[#151515] focus:outline-none focus:ring-2 focus:ring-[#151515]/15"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <button type="button" onClick={() => { setIsDateOpen(false); dateTriggerRef.current?.focus(); }} className="inline-flex min-h-11 items-center rounded-full bg-[#151515] px-5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2">Done</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative min-w-0" ref={guestPopoverRef}>
          <button
            ref={guestTriggerRef}
            type="button"
            onClick={() => {
              setIsGuestOpen((open) => !open);
              setIsDateOpen(false);
            }}
            aria-expanded={isGuestOpen}
            aria-controls="trip-traveller-popover"
            aria-label={"Select travellers. " + travellers + " " + (travellers === 1 ? "traveller" : "travellers")}
            className={"flex min-h-[66px] w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:px-4 md:py-2.5 " + (isGuestOpen ? "border-white/45 bg-white/[0.12]" : "border-white/10 bg-white/[0.055] hover:border-white/25 hover:bg-white/[0.09]")}
          >
            <Users className="size-[18px] shrink-0 text-white/85" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">Travellers</span>
              <span className="block truncate text-sm font-medium text-white">{travellers} {travellers === 1 ? "traveller" : "travellers"}</span>
            </span>
            <ChevronDown className={"size-4 shrink-0 text-white/70 transition-transform duration-200 " + (isGuestOpen ? "rotate-180" : "")} aria-hidden="true" />
          </button>

          {isGuestOpen && (
            <div id="trip-traveller-popover" role="group" aria-label="Choose number of travellers" className="absolute right-0 top-full z-[70] mt-2 w-full min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 text-[#151515] shadow-[0_18px_48px_-18px_rgba(0,0,0,.42)] sm:w-[min(304px,calc(100vw-32px))]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-neutral-900">Travellers</div>
                  <div className="mt-1 text-xs text-neutral-500">Solo or group travel</div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" disabled={travellers <= 1} onClick={() => setTravellers((value) => Math.max(1, value - 1))} aria-label="Decrease travellers" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100 active:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515]">
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <output aria-live="polite" className="w-6 text-center text-sm font-semibold tabular-nums">{travellers}</output>
                  <button type="button" disabled={travellers >= 10} onClick={() => setTravellers((value) => Math.min(10, value + 1))} aria-label="Increase travellers" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100 active:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515]">
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex justify-end border-t border-neutral-100 pt-3">
                <button type="button" onClick={() => { setIsGuestOpen(false); guestTriggerRef.current?.focus(); }} className="inline-flex min-h-11 items-center rounded-full bg-[#151515] px-5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2">Done</button>
              </div>
            </div>
          )}
        </div>

        <Button type="submit" variant="onPhoto" size="md" className="min-h-[58px] w-full self-stretch px-6 font-semibold shadow-[0_4px_14px_rgba(0,0,0,.22)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 md:min-h-[66px] md:w-auto md:px-5 lg:px-6">
          Plan my trip
        </Button>
      </form>

      {validationError && (
        <p id="trip-search-error" role="alert" className="mx-auto mt-3 w-fit max-w-full rounded-xl border border-white/20 bg-black/80 px-4 py-2 text-left text-sm font-medium text-white shadow-lg">
          {validationError}
        </p>
      )}
    </div>
  );
};
