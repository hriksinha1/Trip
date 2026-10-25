export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export const navLinks: NavLink[] = [
  { label: "Destinations", href: "#destinations", id: "destinations" },
  { label: "Trips", href: "#trips", id: "trips" },
  { label: "Experiences", href: "#stories", id: "stories" },
  { label: "About", href: "#about", id: "about" },
  { label: "FAQs", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const exploreLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Trips", href: "#trips" },
  { label: "Experiences", href: "#stories" },
  { label: "About", href: "#about" },
];

export const supportLinks = [
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];
