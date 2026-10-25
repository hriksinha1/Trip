export const destinationCategories = [
  "All",
  "Beaches",
  "Hills",
  "Nature",
  "Heritage",
  "Weekend Trips",
] as const;

export type DestinationCategory = (typeof destinationCategories)[number];

export interface Destination {
  id: string;
  name: string;
  state: string;
  categories: DestinationCategory[];
  tags: [string, string];
  description: string;
  badge: string;
  imageId: string;
}

export const destinations: Destination[] = [
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    categories: ["Beaches", "Weekend Trips"],
    tags: ["Beaches", "Sunsets"],
    description: "Golden sunsets, lively shores and easy coastal days.",
    badge: "Beaches",
    imageId: "dest_goa",
  },
  {
    id: "coorg",
    name: "Coorg",
    state: "Karnataka",
    categories: ["Hills", "Nature", "Weekend Trips"],
    tags: ["Coffee Estates", "Waterfalls"],
    description: "Misty coffee country, forest walks and cool green escapes.",
    badge: "Hills",
    imageId: "dest_coorg",
  },
  {
    id: "chikmagalur",
    name: "Chikmagalur",
    state: "Karnataka",
    categories: ["Hills", "Nature", "Weekend Trips"],
    tags: ["Countryside", "Weekend Escape"],
    description: "Open rural scenery and slow weekends around Karnataka's hill country.",
    badge: "Hills",
    imageId: "dest_chikmagalur",
  },
  {
    id: "gokarna",
    name: "Gokarna",
    state: "Karnataka",
    categories: ["Beaches", "Weekend Trips"],
    tags: ["Quiet Beaches", "Sunsets"],
    description: "Unhurried beaches and rocky headlands along Karnataka's coast.",
    badge: "Beaches",
    imageId: "dest_gokarna",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    categories: ["Heritage"],
    tags: ["Charminar", "Food Trail"],
    description: "A city of old bazaars, historic monuments and a food culture of its own.",
    badge: "Heritage",
    imageId: "dest_hyderabad",
  },
  {
    id: "kerala",
    name: "Kerala Backwaters",
    state: "Kerala",
    categories: ["Nature"],
    tags: ["Backwaters", "Greenery"],
    description: "Calm waterways lined with coconut palms in Alleppey and beyond.",
    badge: "Nature",
    imageId: "dest_kerala",
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    categories: ["Heritage"],
    tags: ["Ancient Ruins", "Boulders"],
    description: "A boulder-strewn landscape holding the ruins of a historic empire.",
    badge: "Heritage",
    imageId: "dest_hampi",
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    state: "Meghalaya",
    categories: ["Nature"],
    tags: ["Waterfalls", "Living Root Bridges"],
    description: "Green valleys, waterfalls and the region's famous root bridges.",
    badge: "Nature",
    imageId: "dest_meghalaya",
  },
  {
    id: "ooty",
    name: "Ooty",
    state: "Tamil Nadu",
    categories: ["Hills"],
    tags: ["Nilgiris", "Hill Escapes"],
    description: "Open hillsides and quieter countryside in the Nilgiri region.",
    badge: "Hills",
    imageId: "dest_ooty",
  },
];
