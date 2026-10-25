import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { width: 320, height: 600 },
  { width: 360, height: 740 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1600, height: 1000 },
  { width: 1920, height: 1080 },
];

const outDir = path.resolve("docs/screenshots/before");
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: vp });
    const page = await context.newPage();
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const filename = path.join(outDir, `viewport-${vp.width}.png`);
    await page.screenshot({ path: filename, fullPage: true });
    console.log(`Saved before screenshot: ${vp.width}px`);
    await context.close();
  }
  await browser.close();
  console.log("All before screenshots saved successfully.");
}

main().catch(err => {
  console.error("Error capturing before screenshots:", err);
  process.exit(1);
});
