export interface Trip {
  id: string;
  title: string;
  location: string;
  description: string;
  bestTime: string;
  duration: string;
  priceFrom: number; // in INR per person (indicative)
  isRecommended: boolean;
  isPrimaryButton: boolean;
  featured: boolean;
  destinationId: string;
  imageId: string;
}

export const trips: Trip[] = [
  {
    id: "goa-beach-escape",
    title: "Goa Beach Escape",
    location: "Goa",
    description: "Sunset-lit beaches, beachside cafés and an easy coastal pace, shaped into a short getaway.",
    bestTime: "Nov – Feb",
    duration: "3 Nights / 4 Days",
    priceFrom: 8499,
    isRecommended: true,
    isPrimaryButton: true,
    featured: true,
    destinationId: "goa",
    imageId: "trip_goa",
  },
  {
    id: "chikmagalur-hills-coffee-trails",
    title: "Chikmagalur Hills & Coffee Trails",
    location: "Chikmagalur, Karnataka",
    description: "Misty Western Ghats viewpoints and coffee-country walks for a slow, green weekend.",
    bestTime: "Oct – Mar",
    duration: "2 Nights / 3 Days",
    priceFrom: 5999,
    isRecommended: false,
    isPrimaryButton: false,
    featured: true,
    destinationId: "chikmagalur",
    imageId: "trip_chikmagalur",
  },
  {
    id: "coorg-coffee-estate-retreat",
    title: "Coorg Coffee Estate Retreat",
    location: "Coorg, Karnataka",
    description: "Coffee estates, forest greens and waterfalls: a quiet escape in the hills.",
    bestTime: "Oct – Mar",
    duration: "2 Nights / 3 Days",
    priceFrom: 6499,
    isRecommended: false,
    isPrimaryButton: false,
    featured: true,
    destinationId: "coorg",
    imageId: "trip_coorg",
  },
  {
    id: "gokarna-coastal-escape",
    title: "Gokarna Coastal Escape",
    location: "Gokarna, Karnataka",
    description: "Quiet beaches, rocky headlands and unhurried sunsets on Karnataka's coast.",
    bestTime: "Oct – Mar",
    duration: "2 Nights / 3 Days",
    priceFrom: 5499,
    isRecommended: true,
    isPrimaryButton: false,
    featured: true,
    destinationId: "gokarna",
    imageId: "trip_gokarna",
  },
  {
    id: "hyderabad-heritage-food-trail",
    title: "Hyderabad Heritage & Food Trail",
    location: "Hyderabad, Telangana",
    description: "Charminar, old-city bazaars and the food Hyderabad is known for.",
    bestTime: "Oct – Feb",
    duration: "2 Nights / 3 Days",
    priceFrom: 4999,
    isRecommended: false,
    isPrimaryButton: false,
    featured: false,
    destinationId: "hyderabad",
    imageId: "trip_hyderabad",
  },
];
