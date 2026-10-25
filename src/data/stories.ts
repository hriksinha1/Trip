export interface Story {
  id: string;
  author: string;
  quote: string;
  imageId: string;
  rotationDesktop: string; // e.g. -rotate-3
  offsetDesktop: string;   // e.g. translate-y-2
}

export const stories: Story[] = [
  {
    id: "story-1",
    author: "Carolina M.",
    quote: "Our sunrise balloon flight above the canyon was pure magic. Nomira made every detail feel effortless.",
    imageId: "story_carolina",
    rotationDesktop: "-rotate-3",
    offsetDesktop: "translate-y-2",
  },
  {
    id: "story-2",
    author: "Alessia Marika",
    quote: "The guided historic tour was incredible. I learned so much about the culture, architecture, and local life.",
    imageId: "story_alessia",
    rotationDesktop: "rotate-2",
    offsetDesktop: "-translate-y-1",
  },
  {
    id: "story-3",
    author: "Aisha Davina",
    quote: "Nomira made my first solo travel expedition feel completely safe, natural, and wonderfully easy.",
    imageId: "story_aisha",
    rotationDesktop: "-rotate-1",
    offsetDesktop: "translate-y-1",
  },
  {
    id: "story-4",
    author: "Kenji Sato",
    quote: "Everything was planned to perfection. I could simply immerse myself in the vibrant street culture.",
    imageId: "story_kenji",
    rotationDesktop: "rotate-3",
    offsetDesktop: "-translate-y-2",
  },
  {
    id: "story-5",
    author: "Owen Philips",
    quote: "Hands down the best journey of my life! I will cherish the sunset lagoon views forever.",
    imageId: "story_owen",
    rotationDesktop: "-rotate-2",
    offsetDesktop: "translate-y-3",
  },
];
