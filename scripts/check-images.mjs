import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const REQUIRED_KEYS = [
  { key: "hero", file: "public/images/hero/hero.webp" },
  { key: "trip_goa", file: "public/images/trips/trip_goa.webp" },
  { key: "trip_chikmagalur", file: "public/images/trips/trip_chikmagalur.webp" },
  { key: "trip_coorg", file: "public/images/trips/trip_coorg.webp" },
  { key: "trip_gokarna", file: "public/images/trips/trip_gokarna.webp" },
  { key: "trip_hyderabad", file: "public/images/trips/trip_hyderabad.webp" },
  { key: "stats_ocean", file: "public/images/sections/stats_ocean.webp" },
  { key: "dest_goa", file: "public/images/destinations/dest_goa.webp" },
  { key: "dest_coorg", file: "public/images/destinations/dest_coorg.webp" },
  { key: "dest_chikmagalur", file: "public/images/destinations/dest_chikmagalur.webp" },
  { key: "dest_gokarna", file: "public/images/destinations/dest_gokarna.webp" },
  { key: "dest_hyderabad", file: "public/images/destinations/dest_hyderabad.webp" },
  { key: "dest_kerala", file: "public/images/destinations/dest_kerala.webp" },
  { key: "dest_hampi", file: "public/images/destinations/dest_hampi.webp" },
  { key: "dest_meghalaya", file: "public/images/destinations/dest_meghalaya.webp" },
  { key: "dest_ooty", file: "public/images/destinations/dest_ooty.webp" },
  { key: "promo_mountain", file: "public/images/sections/promo_mountain.webp" },
  { key: "story_gokarna_om", file: "public/images/stories/story_gokarna_om.webp" },
  { key: "story_coorg_falls", file: "public/images/stories/story_coorg_falls.webp" },
  { key: "story_chikmagalur_peak", file: "public/images/stories/story_chikmagalur_peak.webp" },
  { key: "story_hyderabad_charminar", file: "public/images/stories/story_hyderabad_charminar.webp" },
  { key: "story_goa_beach", file: "public/images/stories/story_goa_beach.webp" },
];

const provenancePath = path.resolve("src/data/provenance.json");
const registryPath = path.resolve("src/data/images.ts");
const provenance = JSON.parse(fs.readFileSync(provenancePath, "utf8"));
const registrySource = fs.readFileSync(registryPath, "utf8");

function getRegistryEntry(key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = registrySource.match(new RegExp(`\\b${escapedKey}: \\{([\\s\\S]*?)\\n  \\},`));
  return match?.[1] ?? "";
}

async function checkImages() {
  console.log(`Checking ${REQUIRED_KEYS.length} required images and attribution metadata...`);
  const isStrict = process.env.IMAGES_STRICT === "1" || process.argv.includes("--strict");
  const errors = [];
  const results = [];

  for (const item of REQUIRED_KEYS) {
    const fullPath = path.resolve(item.file);
    const entry = getRegistryEntry(item.key);
    const altMatch = entry.match(/\\balt:\\s*"((?:\\\\.|[^"])*)"/);
    const labelMatch = entry.match(/\\blabel:\\s*"((?:\\\\.|[^"])*)"/);
    const alt = altMatch?.[1]?.trim() ?? "";
    const label = labelMatch?.[1]?.trim() ?? "";
    const source = provenance[item.key];

    if (!entry) errors.push(`Missing image registry entry for "${item.key}".`);
    if (alt.length < 12) errors.push(`Missing or inadequate alt text for "${item.key}".`);
    if (!source?.sourceUrl || !source?.originalTitle || !source?.author || !source?.license || !source?.licenseUrl || !source?.subject) {
      errors.push(`Incomplete provenance metadata for "${item.key}" (requires subject, source, title, author and licence fields).`);
    }

    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing file for key "${item.key}": ${item.file}`);
      results.push({ key: item.key, status: "MISSING", dimensions: "-", size: "-", source: source?.originalTitle || "-", alt });
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.size < 5000) {
      errors.push(`File too small (<5KB) for key "${item.key}": ${item.file} (${stat.size} bytes)`);
      results.push({ key: item.key, status: "TOO_SMALL", dimensions: "-", size: `${stat.size} B`, source: source?.originalTitle || "-", alt });
      continue;
    }

    try {
      const meta = await sharp(fullPath).metadata();
      if (!meta.width || !meta.height) throw new Error("Invalid raster dimensions");
      results.push({
        key: item.key,
        label,
        alt,
        source: source?.originalTitle || "-",
        author: source?.author || "-",
        license: source?.license || "-",
        status: "OK",
        dimensions: `${meta.width}x${meta.height}`,
        format: meta.format,
        size: `${Math.round(stat.size / 1024)} KB`,
      });
    } catch (error) {
      errors.push(`Unreadable image for key "${item.key}": ${item.file} (${error.message})`);
      results.push({ key: item.key, status: "INVALID", dimensions: "-", size: `${stat.size} B`, source: source?.originalTitle || "-", alt });
    }
  }

  console.table(results);

  if (errors.length > 0) {
    console.error(`\\n❌ Image check failed with ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`  - ${error}`));
    if (isStrict) process.exit(1);
  } else {
    console.log(`\\n✅ All ${REQUIRED_KEYS.length} required images have valid files, registry entries, alt text and provenance metadata.`);
    console.log("Note: a script validates metadata and file integrity, not whether the depicted subject matches the caption. See docs/PHOTO_REVIEW.md for visual review.");
  }
}

checkImages().catch((error) => {
  console.error("Fatal image check error:", error);
  process.exit(1);
});
