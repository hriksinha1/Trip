export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Can I change or cancel my trip after booking?",
    answer:
      "We know plans can change. Many trips can be updated or cancelled directly from your Nomira account, depending on the terms shown for that specific journey. Be sure to check the flexibility details before confirming.",
  },
  {
    id: "faq-2",
    question: "Does Nomira offer group travel options?",
    answer:
      "Yes, selected trips are specially tailored for groups and private parties. Look for group-friendly tags on any trip page, or reach out to our travel specialists and we'll craft the ideal itinerary for your team.",
  },
  {
    id: "faq-3",
    question: "How do I get travel support during my trip?",
    answer:
      "Our global support team can be reached 24/7 through the Nomira Help Center and dedicated in-journey chat. Dedicated local contact details for each itinerary are included in your booking confirmation.",
  },
  {
    id: "faq-4",
    question: "Can I save destinations to plan later?",
    answer:
      "Yes! You can bookmark any destination or trip package to your curated Nomira favorites list and revisit them whenever you are ready to begin planning.",
  },
  {
    id: "faq-5",
    question: "Does Nomira offer special deals or discounts?",
    answer:
      "We feature curated seasonal offers and early-bird advantages throughout the year. Explore our Deals section and subscribe to our newsletter below to receive first access to limited-edition adventures.",
  },
];
