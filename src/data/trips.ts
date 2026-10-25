export interface Trip {
  id: string;
  title: string;
  location: string;
  description: string;
  dates: string;
  duration: string;
  priceRange: string;
  isRecommended: boolean;
  isPrimaryButton: boolean;
  imageId: string;
}

export const trips: Trip[] = [
  {
    id: "bali-surf",
    title: "Bali Surf Escape",
    location: "Bali, Indonesia",
    description: "Catch the waves, chase sunsets, and dive into Bali's vibrant surf culture.",
    dates: "October – November",
    duration: "5 Days 4 Nights",
    priceRange: "$150–$250",
    isRecommended: true,
    isPrimaryButton: true,
    imageId: "trip_bali",
  },
  {
    id: "cappadocia-balloon",
    title: "Cappadocia Balloon Ride",
    location: "Cappadocia, Turkey",
    description: "Soar above ancient valleys on a sunrise hot-air balloon adventure.",
    dates: "December",
    duration: "4 Days 3 Nights",
    priceRange: "$180–$280",
    isRecommended: false,
    isPrimaryButton: false,
    imageId: "trip_cappadocia",
  },
  {
    id: "tokyo-street",
    title: "Tokyo Street Experience",
    location: "Tokyo, Japan",
    description: "Wander through neon streets, hidden ramen shops, and modern art corners in Tokyo.",
    dates: "October",
    duration: "5 Days 4 Nights",
    priceRange: "$200–$300",
    isRecommended: false,
    isPrimaryButton: false,
    imageId: "trip_tokyo",
  },
  {
    id: "raja-ampat",
    title: "Raja Ampat Island Hop",
    location: "West Papua, Indonesia",
    description: "Dive into crystal-clear lagoons, meet local tribes, and explore hidden islands.",
    dates: "November – December",
    duration: "5 Days 4 Nights",
    priceRange: "$250–$400",
    isRecommended: true,
    isPrimaryButton: false,
    imageId: "trip_raja_ampat",
  },
];
