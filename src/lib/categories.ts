export type Category = {
  slug: string;
  name: string;
  icon: string;
  baseRate: number;
};

export const categories: Category[] = [
  { slug: "mason", name: "Mason (Mistri)", icon: "🧱", baseRate: 1500 },
  { slug: "plumber", name: "Plumber", icon: "🔧", baseRate: 1200 },
  { slug: "electrician", name: "Electrician", icon: "⚡", baseRate: 1200 },
  { slug: "painter", name: "Painter", icon: "🎨", baseRate: 2000 },
  { slug: "carpenter", name: "Carpenter", icon: "🪚", baseRate: 1800 },
  { slug: "ac-technician", name: "AC Technician", icon: "❄️", baseRate: 1500 },
  { slug: "welder", name: "Welder", icon: "🔩", baseRate: 1600 },
  { slug: "tile-installer", name: "Tile Installer", icon: "▦", baseRate: 2000 },
  { slug: "cctv-installer", name: "CCTV Installer", icon: "📷", baseRate: 2500 },
  { slug: "solar-technician", name: "Solar Technician", icon: "☀️", baseRate: 3000 },
  { slug: "house-cleaner", name: "House Cleaner", icon: "🧹", baseRate: 1000 },
  { slug: "gardener", name: "Gardener", icon: "🌿", baseRate: 900 },
  { slug: "labor", name: "Construction Labor", icon: "🏗️", baseRate: 1000 },
  { slug: "movers", name: "Movers", icon: "📦", baseRate: 3500 },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
