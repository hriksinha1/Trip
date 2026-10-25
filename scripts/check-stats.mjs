import fs from "node:fs";
import assert from "node:assert/strict";

const destinationSource = fs.readFileSync("src/data/destinations.ts", "utf8");
const statsSource = fs.readFileSync("src/data/stats.ts", "utf8");

const categoryBlock = destinationSource.match(/export const destinationCategories = \[([\s\S]*?)\] as const/);
const destinationBlock = destinationSource.match(/export const destinations: Destination\[\] = \[([\s\S]*?)\n\];/);
assert.ok(categoryBlock, "Could not find destinationCategories in src/data/destinations.ts");
assert.ok(destinationBlock, "Could not find destinations in src/data/destinations.ts");

const categories = [...categoryBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
const destinationCount = [...destinationBlock[1].matchAll(/\bid:\s*"[^"]+"/g)].length;
const travelStyleCount = categories.filter((category) => category !== "All").length;

assert.ok(destinationCount > 0, "No destination entries detected.");
assert.ok(travelStyleCount > 0, "No travel categories detected.");
assert.ok(statsSource.includes('value: `${destinations.length}`'), "Destination count must derive from destinations.length.");
assert.ok(statsSource.includes('value: `${destinationCategories.filter((category) => category !== "All").length}`'), "Travel-style count must derive from categories and exclude All.");

const enquiryBlock = statsSource.match(/\{\s*id:\s*"fact-enquiry"([\s\S]*?)\n\s*\},/);
assert.ok(enquiryBlock, "Missing the enquiry feature block.");
assert.ok(!/\bvalue\s*:/.test(enquiryBlock[1]), "The enquiry feature must not claim a numeric statistic.");
assert.ok(/title:\s*"One simple enquiry"/.test(enquiryBlock[1]), 'Expected "One simple enquiry" as a feature title.');

console.log("✓ Stats validation passed.");
console.log(`✓ Derived figures: ${destinationCount} destination records, ${travelStyleCount} travel styles; enquiry feature has no fabricated number.`);
