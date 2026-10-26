import assert from "node:assert/strict";
import { formatLocalDateLabel, getLocalDateString, getNextLocalDateString } from "../src/lib/local-date.js";

process.env.TZ = "Asia/Kolkata";
const earlyMorningInIndia = new Date("2026-11-01T19:30:00.000Z");
assert.equal(getLocalDateString(earlyMorningInIndia), "2026-11-02", "Local date must not regress to the previous UTC date in India.");
assert.equal(getNextLocalDateString("2026-11-02"), "2026-11-03", "Return date minimum should advance by one calendar day.");
assert.equal(formatLocalDateLabel("2026-11-02"), "2 Nov", "Date labels should be human-readable and timezone-stable.");
console.log("✓ Local date helpers pass India early-morning timezone regressions.");
