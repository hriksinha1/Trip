import fs from "fs";
import path from "path";
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

async function checkImages() {
  console.log(`Checking ${REQUIRED_KEYS.length} required images...`);
  const isStrict = process.env.IMAGES_STRICT === "1" || process.argv.includes("--strict");
  const errors = [];
  const results = [];

  for (const item of REQUIRED_KEYS) {
    const fullPath = path.resolve(item.file);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing file for key "${item.key}": ${item.file}`);
      results.push({ key: item.key, status: "MISSING", dimensions: "-", size: "-" });
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.size < 5000) {
      errors.push(`File too small (<5KB) for key "${item.key}": ${item.file} (${stat.size} bytes)`);
      results.push({ key: item.key, status: "TOO_SMALL", dimensions: "-", size: `${stat.size} B` });
      continue;
    }

    try {
      const meta = await sharp(fullPath).metadata();
      if (!meta.width || !meta.height) {
        throw new Error("Invalid raster dimensions");
      }
      results.push({
        key: item.key,
        status: "OK",
        dimensions: `${meta.width}x${meta.height}`,
        format: meta.format,
        size: `${Math.round(stat.size / 1024)} KB`,
      });
    } catch (err) {
      errors.push(`Unreadable image for key "${item.key}": ${item.file} (${err.message})`);
      results.push({ key: item.key, status: "INVALID", dimensions: "-", size: `${stat.size} B` });
    }
  }

  console.table(results);

  if (errors.length > 0) {
    console.error(`\n❌ Image check failed with ${errors.length} error(s):`);
    errors.forEach((e) => console.error(`  - ${e}`));
    if (isStrict) {
      process.exit(1);
    }
  } else {
    console.log(`\n✅ All ${REQUIRED_KEYS.length} required images are present, valid, and verified!`);
  }
}

checkImages().catch((err) => {
  console.error("Fatal check error:", err);
  process.exit(1);
});
