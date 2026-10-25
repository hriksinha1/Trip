export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I enquire about a trip?",
    answer:
      "Use \"Plan my trip\" or \"Enquire Now\", choose a destination or package, add your dates and group size, then send your enquiry to Starttrips through the channel you prefer (Instagram, and WhatsApp or email where shown).",
  },
  {
    id: "faq-2",
    question: "Can I customise a package or change the itinerary?",
    answer:
      "The trips on this page are starting points. Share your preferred dates, group size and interests in your enquiry, and Starttrips will let you know what can be arranged.",
  },
  {
    id: "faq-3",
    question: "What is included in a trip package?",
    answer:
      "Inclusions differ by trip and are confirmed with you during the enquiry. Prices on this page are indicative starting points, not final quotes.",
  },
  {
    id: "faq-4",
    question: "Can I travel with a group?",
    answer:
      "Mention your group size in the enquiry form and Starttrips will get back to you about what's possible.",
  },
  {
    id: "faq-5",
    question: "How do payments and booking confirmation work?",
    answer:
      "This website does not take payments. Nothing on it is a confirmed booking until Starttrips confirms details with you directly.",
  },
  {
    id: "faq-6",
    question: "How can I contact Starttrips?",
    answer:
      "Message Starttrips on Instagram (@starttrips_), or use the contact options shown in the footer.",
  },
];
