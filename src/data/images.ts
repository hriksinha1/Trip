import { imageManifest } from "./image-manifest.generated";
import provenanceData from "./provenance.json";

export interface ImageItem {
  id: string;
  status: "verified" | "placeholder" | "owner";
  label: string;
  src?: string;
  srcSet?: string;
  alt: string;
  objectPosition?: string;
  width?: number;
  height?: number;
  fallback: string;
  accent?: string;
  credit?: string;
  sourceUrl?: string;
  license?: string;
  licenseUrl?: string;
  author?: string;
  subject?: string;
  sizes?: string;
}

const baseImages: Record<string, Omit<ImageItem, "status" | "src" | "srcSet" | "width" | "height">> = {
  hero: {
    id: "hero",
    label: "Western Ghats & Coastal India",
    alt: "Scenic view of mist-covered ridges in the Western Ghats and coastal hills of South India",
    objectPosition: "50% 45%",
    fallback: "linear-gradient(145deg, #1b382b 0%, #29523e 45%, #182b22 100%)",
    accent: "#1b382b",
  },
  trip_goa: {
    id: "trip_goa",
    label: "Goa Coast",
    alt: "Palm-fringed golden sand beach along the coastline of Goa at late afternoon",
    objectPosition: "center 40%",
    fallback: "linear-gradient(135deg, #244855 0%, #e64a19 60%, #fbe9e7 100%)",
    accent: "#244855",
  },
  trip_chikmagalur: {
    id: "trip_chikmagalur",
    label: "Chikmagalur roadside viewpoint",
    alt: "Vehicles parked at a roadside viewpoint beneath low cloud with a green hill behind, near Chikmagalur, Karnataka",
    objectPosition: "center 40%",
    fallback: "linear-gradient(135deg, #1b3b22 0%, #30583b 50%, #587b5a 100%)",
    accent: "#1b3b22",
  },
  trip_coorg: {
    id: "trip_coorg",
    label: "Coorg Hill Retreat",
    alt: "Misty morning over estate canopy and Western Ghats forests in Coorg, Karnataka",
    objectPosition: "center 40%",
    fallback: "linear-gradient(135deg, #1e3a29 0%, #2e533d 50%, #466e53 100%)",
    accent: "#1e3a29",
  },
  trip_gokarna: {
    id: "trip_gokarna",
    label: "Gokarna coastal viewpoint",
    alt: "Sandy shoreline and a green headland viewed from a coastal deck with a wooden railing in the foreground",
    objectPosition: "center 40%",
    fallback: "linear-gradient(135deg, #1a3644 0%, #2b5b73 50%, #c49764 100%)",
    accent: "#1a3644",
  },
  trip_hyderabad: {
    id: "trip_hyderabad",
    label: "Charminar & Old Hyderabad",
    alt: "The historic Charminar monument framed by evening bazaar lights in Hyderabad, Telangana",
    objectPosition: "center 35%",
    fallback: "linear-gradient(135deg, #422006 0%, #78350f 50%, #d97706 100%)",
    accent: "#78350f",
  },
  stats_ocean: {
    id: "stats_ocean",
    label: "Indian Coastal Waters & Backwaters",
    alt: "Aerial top-down view of turquoise coastal waters and green shorelines in South India",
    objectPosition: "center center",
    fallback: "linear-gradient(145deg, #064e3b 0%, #0f766e 50%, #115e59 100%)",
    accent: "#064e3b",
  },
  dest_goa: {
    id: "dest_goa",
    label: "Goa",
    alt: "Golden sunset over calm surf and coconut palms in South Goa",
    objectPosition: "center center",
    fallback: "linear-gradient(180deg, #1e3a5f 0%, #c2410c 60%, #fdba74 100%)",
    accent: "#1e3a5f",
  },
  dest_coorg: {
    id: "dest_coorg",
    label: "Coorg",
    alt: "Misty forest path through coffee and spice plantations in Coorg, Karnataka",
    objectPosition: "center center",
    fallback: "linear-gradient(180deg, #143522 0%, #265437 60%, #437a54 100%)",
    accent: "#143522",
  },
  dest_chikmagalur: {
    id: "dest_chikmagalur",
    label: "Rural landscape",
    alt: "Aerial view of fields, a winding road and a small temple amid scattered buildings; the exact location is not verified",
    objectPosition: "center center",
    fallback: "linear-gradient(180deg, #183321 0%, #2d5539 60%, #527c5c 100%)",
    accent: "#183321",
  },
  dest_gokarna: {
    id: "dest_gokarna",
    label: "Gokarna beach",
    alt: "People walking along a sandy beach with calm water and a distant green headland; the exact beach is not visually identifiable",
    objectPosition: "center center",
    fallback: "linear-gradient(180deg, #163645 0%, #2c5f78 60%, #b88656 100%)",
    accent: "#163645",
  },
  dest_hyderabad: {
    id: "dest_hyderabad",
    label: "Hyderabad",
    alt: "Heritage stonework and arches of Qutb Shahi era landmarks in Hyderabad",
    objectPosition: "center center",
    fallback: "linear-gradient(180deg, #381a07 0%, #69320e 60%, #b45309 100%)",
    accent: "#381a07",
  },
  dest_kerala: {
    id: "dest_kerala",
    label: "Kerala Backwaters",
    alt: "Traditional wooden boat navigating tranquil palm-fringed backwaters in Alleppey, Kerala",
    objectPosition: "center center",
    fallback: "linear-gradient(180deg, #064e3b 0%, #047857 60%, #10b981 100%)",
    accent: "#064e3b",
  },
  dest_hampi: {
    id: "dest_hampi",
    label: "Hampi",
    alt: "Ancient Vijayanagara stone temples set among vast boulder fields in Hampi, Karnataka",
    objectPosition: "center center",
    fallback: "linear-gradient(180deg, #573318 0%, #854d0e 60%, #d97706 100%)",
    accent: "#573318",
  },
  dest_meghalaya: {
    id: "dest_meghalaya",
    label: "Meghalaya",
    alt: "Living root bridge spanning a clear turquoise stream in Meghalaya valleys",
    objectPosition: "center center",
    fallback: "linear-gradient(180deg, #022c22 0%, #065f46 60%, #0d9488 100%)",
    accent: "#022c22",
  },
  dest_ooty: {
    id: "dest_ooty",
    label: "Nilgiri countryside",
    alt: "Green hillside fields, open ground and scattered trees in a rural Nilgiri landscape",
    objectPosition: "center center",
    fallback: "linear-gradient(180deg, #143522 0%, #205537 60%, #3b8256 100%)",
    accent: "#143522",
  },
  promo_mountain: {
    id: "promo_mountain",
    label: "Western Ghats ridgelines",
    alt: "Layered green ridgelines in the Western Ghats beneath a pale open sky in South India",
    objectPosition: "50% 60%",
    fallback: "linear-gradient(180deg, #0e1713 0%, #1e3a2b 45%, #7c2d12 80%, #0E0E0E 100%)",
    accent: "#1e3a2b",
  },
  story_gokarna_om: {
    id: "story_gokarna_om",
    label: "Gokarna coastal sunset",
    alt: "Low waves washing around dark rocks on an Indian shoreline at sunset",
    objectPosition: "center 30%",
    fallback: "linear-gradient(135deg, #1f4254 0%, #3a718c 100%)",
  },
  story_coorg_falls: {
    id: "story_coorg_falls",
    label: "Abbey Falls, Coorg",
    alt: "Cascade falling through spice and coffee plantation canopy in Coorg",
    objectPosition: "center 30%",
    fallback: "linear-gradient(135deg, #1a3c26 0%, #2f613f 100%)",
  },
  story_chikmagalur_peak: {
    id: "story_chikmagalur_peak",
    label: "Chikmagalur town",
    alt: "A town street with parked cars and roadside buildings",
    objectPosition: "center 30%",
    fallback: "linear-gradient(135deg, #2b4530 0%, #4a6e51 100%)",
  },
  story_hyderabad_charminar: {
    id: "story_hyderabad_charminar",
    label: "Charminar, Hyderabad",
    alt: "Illuminated minarets of Charminar in historic Hyderabad old city",
    objectPosition: "center 30%",
    fallback: "linear-gradient(135deg, #45240c 0%, #7c3a14 100%)",
  },
  story_goa_beach: {
    id: "story_goa_beach",
    label: "Goa rocky shoreline",
    alt: "Warm sunset light across a rocky shoreline and calm sea",
    objectPosition: "center 30%",
    fallback: "linear-gradient(135deg, #283e52 0%, #d97706 100%)",
  },
};

const typedProvenance = provenanceData as Record<string, {
  subject?: string;
  sourceUrl?: string;
  license?: string;
  licenseUrl?: string;
  author?: string;
}>;

// Build full merged images dictionary
export const images: Record<string, ImageItem> = Object.keys(baseImages).reduce<Record<string, ImageItem>>(
  (acc, key) => {
    const base = baseImages[key];
    const manifestEntry = imageManifest[key];
    const prov = typedProvenance[key];

    const hasRealFile = Boolean(manifestEntry?.src);

    acc[key] = {
      ...base,
      status: hasRealFile ? "verified" : "placeholder",
      src: manifestEntry?.src,
      srcSet: manifestEntry?.srcSet,
      width: manifestEntry?.width,
      height: manifestEntry?.height,
      sourceUrl: prov?.sourceUrl,
      license: prov?.license,
      licenseUrl: prov?.licenseUrl,
      author: prov?.author,
      credit: prov?.author ? `${prov.author} (${prov.license || "CC"})` : undefined,
      subject: prov?.subject,
    };

    return acc;
  },
  {}
);

export function getImage(id: string): ImageItem | undefined {
  return images[id];
}
