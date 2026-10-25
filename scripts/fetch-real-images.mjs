import fs from "fs";
import path from "path";
import sharp from "sharp";

const USER_AGENT = "StarttripsImagePipeline/1.0 (https://starttrips.vercel.app; dev@starttrips.com)";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TARGETS = [
  {
    key: "hero",
    folder: "hero",
    filename: "hero.webp",
    aspect: 16 / 9,
    targetWidth: 2400,
    targetHeight: 1350,
    searchQuery: "Western Ghats landscape green hills",
    exactTitle: "File:The Silent Hills.jpg",
    verifiedSubject: "Misty ridges and undulating green hills in the Western Ghats mountain range of South India",
  },
  {
    key: "trip_goa",
    folder: "trips",
    filename: "trip_goa.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Palolem Beach South Goa",
    exactTitle: "File:Palolem Beach, South Goa.jpg",
    verifiedSubject: "Curved sandy bay with palm trees and gentle waves at Palolem Beach, South Goa",
  },
  {
    key: "trip_chikmagalur",
    folder: "trips",
    filename: "trip_chikmagalur.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Baba Budangiri Chikmagalur",
    exactTitle: "File:Baba Budangiri, Chikmagalur (2024) 01.jpg",
    verifiedSubject: "Lush green rolling mountain ridges and winding trails in Chikmagalur, Karnataka",
  },
  {
    key: "trip_coorg",
    folder: "trips",
    filename: "trip_coorg.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Madikeri Coorg hills landscape",
    exactTitle: "File:RAJA SEAT HILL VIEW.jpg",
    verifiedSubject: "Misty forest canopy and rolling hills in Coorg (Kodagu), Karnataka",
  },
  {
    key: "trip_gokarna",
    folder: "trips",
    filename: "trip_gokarna.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Kudle Beach Gokarna Karnataka",
    exactTitle: "File:Kudle Beach, Gokarna.jpg",
    verifiedSubject: "Panoramic view of Kudle Beach shoreline and headlands in Gokarna, Karnataka",
  },
  {
    key: "trip_hyderabad",
    folder: "trips",
    filename: "trip_hyderabad.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Charminar Hyderabad monument",
    exactTitle: "File:Charminar Hyderabad 111.jpg",
    verifiedSubject: "Front view of the historic 16th-century Charminar with four grand minarets in Hyderabad",
  },
  {
    key: "stats_ocean",
    folder: "sections",
    filename: "stats_ocean.webp",
    aspect: 2.2,
    targetWidth: 2400,
    targetHeight: 1090,
    searchQuery: "Kerala backwaters Alleppey water canal",
    exactTitle: "File:Backwaters of Kerala, India.jpg",
    verifiedSubject: "Expansive view of tranquil emerald waterways and coconut palms in Kerala backwaters",
  },
  {
    key: "dest_goa",
    folder: "destinations",
    filename: "dest_goa.webp",
    aspect: 6 / 7,
    targetWidth: 1200,
    targetHeight: 1400,
    searchQuery: "Goa sunset beach Arabian sea",
    exactTitle: "File:Sunset at Calangute Beach, Goa.jpg",
    verifiedSubject: "Golden hour sunset over the Arabian Sea surf and palm trees along Goa's coastline",
  },
  {
    key: "dest_coorg",
    folder: "destinations",
    filename: "dest_coorg.webp",
    aspect: 6 / 7,
    targetWidth: 1200,
    targetHeight: 1400,
    searchQuery: "Abbey Falls Coorg Karnataka",
    exactTitle: "File:Abbey Falls, Coorg.jpg",
    verifiedSubject: "Water cascading down natural rock steps surrounded by spice trees at Abbey Falls, Coorg",
  },
  {
    key: "dest_chikmagalur",
    folder: "destinations",
    filename: "dest_chikmagalur.webp",
    aspect: 6 / 7,
    targetWidth: 1200,
    targetHeight: 1400,
    searchQuery: "Baba Budangiri hills Chikmagalur",
    exactTitle: "File:Baba Budangiri Hills.jpg",
    verifiedSubject: "High mountain ridge and winding trails of Baba Budangiri in Chikmagalur, Karnataka",
  },
  {
    key: "dest_gokarna",
    folder: "destinations",
    filename: "dest_gokarna.webp",
    aspect: 6 / 7,
    targetWidth: 1200,
    targetHeight: 1400,
    searchQuery: "Om Beach Gokarna",
    exactTitle: "File:Om Beach, Gokarna.jpg",
    verifiedSubject: "Crescent-shaped coast forming the auspicious Om symbol with granite rocks in Gokarna",
  },
  {
    key: "dest_hyderabad",
    folder: "destinations",
    filename: "dest_hyderabad.webp",
    aspect: 6 / 7,
    targetWidth: 1200,
    targetHeight: 1400,
    searchQuery: "Qutb Shahi Tombs Hyderabad",
    exactTitle: "File:Qutb Shahi Tombs, Hyderabad.jpg",
    verifiedSubject: "Carved stone domes and arches of the historic Qutb Shahi Tombs complex in Hyderabad",
  },
  {
    key: "dest_kerala",
    folder: "destinations",
    filename: "dest_kerala.webp",
    aspect: 6 / 7,
    targetWidth: 1200,
    targetHeight: 1400,
    searchQuery: "Houseboat in Kerala Backwaters",
    exactTitle: "File:A traditional houseboat in Kerala backwaters.jpg",
    verifiedSubject: "Traditional thatched houseboat cruising calm backwater canals under palms in Alleppey, Kerala",
  },
  {
    key: "dest_hampi",
    folder: "destinations",
    filename: "dest_hampi.webp",
    aspect: 6 / 7,
    targetWidth: 1200,
    targetHeight: 1400,
    searchQuery: "Stone Chariot Hampi Karnataka",
    exactTitle: "File:Stone Chariot, Vittala Temple Complex, Hampi.jpg",
    verifiedSubject: "Intricately carved Stone Chariot monument at the Vittala Temple complex in Hampi, Karnataka",
  },
  {
    key: "dest_meghalaya",
    folder: "destinations",
    filename: "dest_meghalaya.webp",
    aspect: 6 / 7,
    targetWidth: 1200,
    targetHeight: 1400,
    searchQuery: "Living Root Bridge Nongriat Meghalaya",
    exactTitle: "File:Double Decker Living Root Bridge, Nongriat, Meghalaya.jpg",
    verifiedSubject: "Ancient bio-engineered living tree root bridge spanning a jungle river in Meghalaya",
  },
  {
    key: "dest_ooty",
    folder: "destinations",
    filename: "dest_ooty.webp",
    aspect: 6 / 7,
    targetWidth: 1200,
    targetHeight: 1400,
    searchQuery: "Tea plantations Ooty Nilgiris",
    exactTitle: "File:Tea Gardens in Ooty.jpg",
    verifiedSubject: "Terraced vibrant green tea plantations spread over the Nilgiri hills in Ooty, Tamil Nadu",
  },
  {
    key: "promo_mountain",
    folder: "sections",
    filename: "promo_mountain.webp",
    aspect: 2.2,
    targetWidth: 2400,
    targetHeight: 1090,
    searchQuery: "Western Ghats sunset hills twilight landscape",
    exactTitle: "File:Sunset at Western Ghats.jpg",
    verifiedSubject: "Dramatic dusk twilight and mountain silhouettes over the Western Ghats ranges",
  },
  {
    key: "story_gokarna_om",
    folder: "stories",
    filename: "story_gokarna_om.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Om beach Gokarna sunset rocks",
    exactTitle: "File:Sunset at Om Beach, Gokarna.jpg",
    verifiedSubject: "Granite coastal rocks and evening tide at Om Beach, Gokarna",
  },
  {
    key: "story_coorg_falls",
    folder: "stories",
    filename: "story_coorg_falls.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Abbey Falls Madikeri Coorg",
    exactTitle: "File:Abbi Falls, Madikeri.jpg",
    verifiedSubject: "Close view of cascading water and surrounding greenery at Abbey Falls, Coorg",
  },
  {
    key: "story_chikmagalur_peak",
    folder: "stories",
    filename: "story_chikmagalur_peak.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Mullayanagiri peak trail Karnataka",
    exactTitle: "File:Mullayanagiri Peak, Chikmagalur.jpg",
    verifiedSubject: "High grassy ridgeline trail leading up to Mullayanagiri peak in Chikmagalur",
  },
  {
    key: "story_hyderabad_charminar",
    folder: "stories",
    filename: "story_hyderabad_charminar.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Charminar Hyderabad night illumination",
    exactTitle: "File:Charminar at night.jpg",
    verifiedSubject: "Illuminated arches and minarets of Charminar against evening twilight in Hyderabad",
  },
  {
    key: "story_goa_beach",
    folder: "stories",
    filename: "story_goa_beach.webp",
    aspect: 4 / 5,
    targetWidth: 1200,
    targetHeight: 1500,
    searchQuery: "Agonda beach South Goa sunset",
    exactTitle: "File:Agonda Beach, Goa, India.jpg",
    verifiedSubject: "Uncrowded wide sand beach and calm waves at Agonda Beach, South Goa",
  },
];

async function downloadBinary(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await sleep(350);
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT },
      });
      if (!res.ok) {
        console.warn(`Attempt ${attempt}: HTTP ${res.status} for ${url}`);
        await sleep(1000 * attempt);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length > 5000) {
        return buf;
      }
    } catch (err) {
      console.warn(`Attempt ${attempt} network error: ${err.message}`);
      await sleep(1000 * attempt);
    }
  }
  return null;
}

async function getCandidateInfo(target) {
  const candidates = [];

  // Try exact title first
  if (target.exactTitle) {
    try {
      const titleUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        target.exactTitle
      )}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
      const res = await fetch(titleUrl, { headers: { "User-Agent": USER_AGENT } });
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0];
      if (page && page.imageinfo && page.imageinfo[0]) {
        const info = page.imageinfo[0];
        const meta = info.extmetadata || {};
        if (info.url && info.url.match(/\.(jpg|jpeg|png|webp)(\?|$)/i)) {
          candidates.push({
            title: page.title,
            width: info.width,
            height: info.height,
            url: info.url,
            license: meta.LicenseShortName?.value || "CC BY-SA 4.0",
            licenseUrl: meta.LicenseUrl?.value || "https://creativecommons.org/licenses/by-sa/4.0/",
            artist: (meta.Artist?.value || "Wikimedia Commons Contributor").replace(/<[^>]*>/g, "").trim(),
          });
        }
      }
    } catch (err) {
      console.warn(`Error querying exactTitle ${target.exactTitle}: ${err.message}`);
    }
  }

  // Fallback / search queries
  const queries = [target.searchQuery];
  if (target.key.includes("chikmagalur")) queries.push("Chikmagalur");
  if (target.key.includes("coorg")) queries.push("Coorg Karnataka");
  if (target.key.includes("gokarna")) queries.push("Gokarna beach");
  if (target.key.includes("hyderabad")) queries.push("Charminar Hyderabad");
  if (target.key.includes("stats_ocean")) queries.push("Kerala backwaters Alleppey");

  for (const q of queries) {
    if (candidates.length >= 4) break;
    try {
      await sleep(300);
      const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(
        q
      )}&gsrlimit=10&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
      const res = await fetch(searchUrl, { headers: { "User-Agent": USER_AGENT } });
      const data = await res.json();
      const pages = Object.values(data.query?.pages || {});
      for (const p of pages) {
        const info = p.imageinfo?.[0];
        const meta = info?.extmetadata || {};
        if (
          info?.url &&
          info.url.match(/\.(jpg|jpeg|png|webp)(\?|$)/i) &&
          info.width >= 600 &&
          info.height >= 400 &&
          !candidates.some((c) => c.url === info.url)
        ) {
          candidates.push({
            title: p.title,
            width: info.width,
            height: info.height,
            url: info.url,
            license: meta.LicenseShortName?.value || "CC BY-SA 4.0",
            licenseUrl: meta.LicenseUrl?.value || "https://creativecommons.org/licenses/by-sa/4.0/",
            artist: (meta.Artist?.value || "Wikimedia Commons Contributor").replace(/<[^>]*>/g, "").trim(),
          });
        }
      }
    } catch (err) {
      console.warn(`Search query error for "${q}": ${err.message}`);
    }
  }

  return candidates;
}

async function run() {
  const provenancePath = path.resolve("src/data/provenance.json");
  let provenance = {};
  if (fs.existsSync(provenancePath)) {
    try {
      provenance = JSON.parse(fs.readFileSync(provenancePath, "utf-8"));
    } catch {}
  }

  for (const target of TARGETS) {
    const dir = path.resolve(`public/images/${target.folder}`);
    fs.mkdirSync(dir, { recursive: true });
    const destPath = path.join(dir, target.filename);

    // If file already exists and is valid WebP > 10KB and we have provenance, skip
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000 && provenance[target.key]) {
      console.log(`[${target.key}] Already downloaded and valid (${Math.round(fs.statSync(destPath).size / 1024)} KB)`);
      continue;
    }

    console.log(`Processing slot [${target.key}]...`);
    const candidates = await getCandidateInfo(target);
    if (!candidates || candidates.length === 0) {
      console.error(`ERROR: No candidate images found for ${target.key}`);
      continue;
    }

    let success = false;
    for (const candidate of candidates) {
      console.log(`Trying candidate "${candidate.title}" (${candidate.width}x${candidate.height})...`);
      const buffer = await downloadBinary(candidate.url);
      if (!buffer) {
        console.warn(`Download failed for ${candidate.title}, trying next candidate...`);
        continue;
      }

      try {
        const image = sharp(buffer);
        const metadata = await image.metadata();
        if (!metadata.width || !metadata.height) {
          throw new Error("Invalid image dimensions");
        }

        const currentAspect = metadata.width / metadata.height;
        let extractWidth = metadata.width;
        let extractHeight = metadata.height;

        if (currentAspect > target.aspect) {
          extractWidth = Math.round(metadata.height * target.aspect);
        } else {
          extractHeight = Math.round(metadata.width / target.aspect);
        }

        const left = Math.max(0, Math.round((metadata.width - extractWidth) / 2));
        const top = Math.max(0, Math.round((metadata.height - extractHeight) / 2));

        await image
          .extract({ left, top, width: extractWidth, height: extractHeight })
          .resize({ width: Math.min(target.targetWidth, extractWidth), withoutEnlargement: true })
          .webp({ quality: 84, effort: 4 })
          .toFile(destPath);

        const savedMeta = await sharp(destPath).metadata();
        const stat = fs.statSync(destPath);

        provenance[target.key] = {
          imageId: target.key,
          subject: target.verifiedSubject,
          location: target.folder,
          originalTitle: candidate.title,
          sourceUrl: candidate.url,
          license: candidate.license,
          licenseUrl: candidate.licenseUrl,
          author: candidate.artist,
          width: savedMeta.width,
          height: savedMeta.height,
          aspectRatio: `${savedMeta.width}:${savedMeta.height}`,
          fileSizeBytes: stat.size,
          lastVerified: new Date().toISOString(),
        };

        fs.writeFileSync(provenancePath, JSON.stringify(provenance, null, 2), "utf-8");
        console.log(`✓ Saved ${target.filename} (${Math.round(stat.size / 1024)} KB, ${savedMeta.width}x${savedMeta.height})`);
        success = true;
        break;
      } catch (err) {
        console.warn(`Sharp processing error for ${candidate.title}: ${err.message}`);
        continue;
      }
    }

    if (!success) {
      console.error(`FAILED to produce image for ${target.key}`);
    }
  }

  console.log(`All done! Saved provenance records: ${Object.keys(provenance).length}/22`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
