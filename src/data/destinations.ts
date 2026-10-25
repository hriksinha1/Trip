export interface Destination {
  id: string;
  name: string;
  country: string;
  region: "Asia" | "Europe" | "Oceania" | "Africa" | "Caribbean" | "Pacific Island" | "Middle East";
  badge: string;
  description: string;
  tags: [string, string];
  imageId: string;
}

export const destinationCategories = [
  "All",
  "Asia",
  "Europe",
  "Oceania",
  "Africa",
  "Caribbean",
  "Pacific Island",
  "Middle East",
] as const;

export type DestinationCategory = (typeof destinationCategories)[number];

export const destinations: Destination[] = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    badge: "60+ Curated Destinations",
    description: "Watch golden sunsets over whitewashed castles and enjoy romantic getaways by the Aegean Sea.",
    tags: ["Romantic", "Luxury"],
    imageId: "dest_santorini",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    badge: "100+ Curated Destinations",
    description: "Wander through ancient temples, peaceful gardens, and charming streets filled with culture and tradition.",
    tags: ["Cultural", "Calm Escape"],
    imageId: "dest_kyoto",
  },
  {
    id: "palawan",
    name: "Palawan",
    country: "Philippines",
    region: "Asia",
    badge: "60+ Curated Destinations",
    description: "A tropical paradise of crystal lagoons and limestone cliffs perfect for sun-seekers and island dreamers.",
    tags: ["Nature", "Relaxation"],
    imageId: "dest_palawan",
  },
  {
    id: "hallstatt",
    name: "Hallstatt",
    country: "Austria",
    region: "Europe",
    badge: "45+ Curated Destinations",
    description: "Discover alpine serenity along mirror-still waters framed by centuries-old wooden chalet villages.",
    tags: ["Alpine", "Picturesque"],
    imageId: "dest_hallstatt",
  },
  {
    id: "capetown",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    badge: "75+ Curated Destinations",
    description: "Scale breathtaking coastal peaks where dramatic ocean horizons meet world-class vineyards and wildlife.",
    tags: ["Adventure", "Coastal"],
    imageId: "dest_capetown",
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    badge: "50+ Curated Destinations",
    description: "Immerse yourself in snow-dusted fiords, glacier-carved lakes, and adrenaline-fueled wilderness expeditions.",
    tags: ["Wilderness", "Active"],
    imageId: "dest_queenstown",
  },
  {
    id: "saintlucia",
    name: "Saint Lucia",
    country: "Caribbean",
    region: "Caribbean",
    badge: "40+ Curated Destinations",
    description: "Recharge under emerald volcanic twin peaks beside sheltered coves and warm Caribbean reef currents.",
    tags: ["Tropical", "Secluded"],
    imageId: "dest_saintlucia",
  },
  {
    id: "borabora",
    name: "Bora Bora",
    country: "French Polynesia",
    region: "Pacific Island",
    badge: "35+ Curated Destinations",
    description: "Wake above calm turquoise lagoons surrounded by barrier reefs and quiet Polynesian motus.",
    tags: ["Lagoon", "Serenity"],
    imageId: "dest_borabora",
  },
  {
    id: "petra",
    name: "Petra",
    country: "Jordan",
    region: "Middle East",
    badge: "55+ Curated Destinations",
    description: "Traverse high canyon gorges to reveal monumental rose-sandstone facades carved by ancient Nabataeans.",
    tags: ["Heritage", "Wonder"],
    imageId: "dest_petra",
  },
];
