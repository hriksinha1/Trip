export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export const navLinks: NavLink[] = [
  { label: "Destinations", href: "#destinations", id: "destinations" },
  { label: "Experiences", href: "#trips", id: "trips" },
  { label: "Deals", href: "#deals", id: "deals" },
  { label: "Guides", href: "#stories", id: "stories" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const exploreLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Experiences", href: "#trips" },
  { label: "Travel Deals", href: "#deals" },
  { label: "Favorite Trip Package", href: "#trips" },
  { label: "Guides", href: "#stories" },
];

export const supportLinks = [
  { label: "About Nomira", href: "#about" },
  { label: "Our Partners", href: "#contact" },
  { label: "Contact Us", href: "#contact" },
  { label: "FAQs", href: "#faq" },
  { label: "Help Center", href: "#faq" },
];
