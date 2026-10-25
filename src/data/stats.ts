import { destinations, destinationCategories } from "./destinations";

export interface StatFact {
  id: string;
  value?: string;
  title: string;
  caption: string;
}

// Only derived data is shown numerically; the third item describes the enquiry flow honestly.
export const statsFacts: StatFact[] = [
  {
    id: "fact-destinations",
    value: `${destinations.length}`,
    title: "Indian destinations",
    caption: "Beach breaks, hill stations and heritage cities to start from.",
  },
  {
    id: "fact-styles",
    value: `${destinationCategories.filter((category) => category !== "All").length}`,
    title: "ways to travel",
    caption: "Beaches, hills, nature, heritage and weekend trips, shaped around your plan.",
  },
  {
    id: "fact-enquiry",
    title: "One simple enquiry",
    caption: "Share your dates, group size and ideas. Nothing is booked until Starttrips confirms the details with you.",
  },
];
