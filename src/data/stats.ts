export interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  displayValue: string;
  caption: string;
}

export const stats: StatItem[] = [
  {
    id: "stat-explorers",
    targetValue: 44,
    suffix: "K+",
    displayValue: "44K+",
    caption: "Happy explorers who found their dream trips with Nomira",
  },
  {
    id: "stat-destinations",
    targetValue: 300,
    suffix: "+",
    displayValue: "300+",
    caption: "Handpicked destinations curated for every kind of traveler",
  },
  {
    id: "stat-discount",
    targetValue: 30,
    suffix: "%",
    displayValue: "30%",
    caption: "Book your next trip today and enjoy exclusive Nomira deals",
  },
];
