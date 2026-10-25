import { destinations, destinationCategories } from "../src/data/destinations";
import { statsFacts } from "../src/data/stats";

console.log("Checking statistics facts derived values...");

const destCount = destinations.length;
const categoryCount = destinationCategories.filter((c) => c !== "All").length;

const factDest = statsFacts.find((f) => f.id === "fact-destinations");
const factStyle = statsFacts.find((f) => f.id === "fact-styles");
const factEnquiry = statsFacts.find((f) => f.id === "fact-enquiry");

let errors = [];

if (factDest?.value !== `${destCount}`) {
  errors.push(`Destination fact mismatch: expected ${destCount}, got ${factDest?.value}`);
}
if (factStyle?.value !== `${categoryCount}`) {
  errors.push(`Style fact mismatch: expected ${categoryCount}, got ${factStyle?.value}`);
}
if (factEnquiry?.value !== "1") {
  errors.push(`Enquiry fact mismatch: expected "1", got ${factEnquiry?.value}`);
}

if (errors.length > 0) {
  console.error("❌ Stats facts validation failed:", errors);
  process.exit(1);
} else {
  console.log(`✅ Stats facts verified: ${destCount} destinations, ${categoryCount} styles, 1 enquiry.`);
}
