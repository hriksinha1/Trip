export interface EditorialStory {
  id: string;
  place: string;
  caption: string;
  imageId: string;
  rotationDesktop: string;
  offsetDesktop: string;
}

// Editorial destination inspiration; these are not customer testimonials.
export const editorialStories: EditorialStory[] = [
  {
    id: "exp-gokarna",
    place: "Gokarna coast",
    caption: "Rocky shoreline, low waves and warm evening light on Karnataka's coast.",
    imageId: "story_gokarna_om",
    rotationDesktop: "-rotate-3",
    offsetDesktop: "translate-y-2",
  },
  {
    id: "exp-coorg",
    place: "Abbey Falls, Coorg",
    caption: "A short walk through green plantation country leads to a powerful waterfall.",
    imageId: "story_coorg_falls",
    rotationDesktop: "rotate-2",
    offsetDesktop: "-translate-y-1",
  },
  {
    id: "exp-hyderabad",
    place: "Charminar, Hyderabad",
    caption: "A landmark from the old city, surrounded by Hyderabad's lively streets.",
    imageId: "story_hyderabad_charminar",
    rotationDesktop: "rotate-3",
    offsetDesktop: "-translate-y-2",
  },
  {
    id: "exp-goa",
    place: "Goa rocky shoreline",
    caption: "Evening light over the coast, with rocks and calm water in the foreground.",
    imageId: "story_goa_beach",
    rotationDesktop: "-rotate-2",
    offsetDesktop: "translate-y-3",
  },
];
