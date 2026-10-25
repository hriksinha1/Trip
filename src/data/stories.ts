export interface EditorialStory {
  id: string;
  place: string;
  caption: string;
  imageId: string;
  rotationDesktop: string;
  offsetDesktop: string;
}

export const editorialStories: EditorialStory[] = [
  {
    id: "exp-gokarna",
    place: "Om Beach, Gokarna",
    caption: "A crescent-shaped bay with calm mornings and golden evenings.",
    imageId: "story_gokarna_om",
    rotationDesktop: "-rotate-3",
    offsetDesktop: "translate-y-2",
  },
  {
    id: "exp-coorg",
    place: "Abbey Falls, Coorg",
    caption: "A short walk through coffee and spice estates leads to the falls.",
    imageId: "story_coorg_falls",
    rotationDesktop: "rotate-2",
    offsetDesktop: "-translate-y-1",
  },
  {
    id: "exp-chikmagalur",
    place: "Mullayanagiri, Chikmagalur",
    caption: "Karnataka's highest peak, made for early starts and big views.",
    imageId: "story_chikmagalur_peak",
    rotationDesktop: "-rotate-1",
    offsetDesktop: "translate-y-1",
  },
  {
    id: "exp-hyderabad",
    place: "Charminar, Hyderabad",
    caption: "A 16th-century landmark with the old city's bazaars on its doorstep.",
    imageId: "story_hyderabad_charminar",
    rotationDesktop: "rotate-3",
    offsetDesktop: "-translate-y-2",
  },
  {
    id: "exp-goa",
    place: "Agonda Beach, Goa",
    caption: "A quieter stretch of South Goa's coast.",
    imageId: "story_goa_beach",
    rotationDesktop: "-rotate-2",
    offsetDesktop: "translate-y-3",
  },
];
