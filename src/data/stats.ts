import { destinations, destinationCategories } from "./destinations";

export interface StatFact {
  id: string;
  value: string;
  caption: string;
}

// Derived from actual code data so they remain verifiably true without inflated marketing claims
export const statsFacts: StatFact[] = [
  {
    id: "fact-destinations",
    value: `${destinations.length}`,
    caption: "Indian destinations to explore, from beaches and hill stations to heritage cities",
  },
  {
    id: "fact-styles",
    value: `${destinationCategories.filter((c) => c !== "All").length}`,
    caption: "Travel styles, from beach breaks to weekend escapes",
  },
  {
    id: "fact-enquiry",
    value: "1",
    caption: "Enquiry to start: tell us your plan and we'll help from first idea to the trip home",
  },
];
