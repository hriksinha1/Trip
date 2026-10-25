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

const afterDir = path.resolve("docs/screenshots/after");
fs.mkdirSync(afterDir, { recursive: true });

async function verifyBrowser() {
  console.log("Launching Chromium for comprehensive verification...");
  const browser = await chromium.launch({ headless: true });
  const testResults = {
    viewportsChecked: 0,
    overflowFailures: [],
    imagesChecked: 0,
    brokenImages: [],
    ticketHeightsChecked: false,
  };

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: vp });
    const page = await context.newPage();

    // Listen to console and page errors
    const pageErrors = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Scroll down to trigger lazy images
    await page.evaluate(async () => {
      const scrollStep = window.innerHeight;
      const totalHeight = document.body.scrollHeight;
      for (let y = 0; y < totalHeight; y += scrollStep) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        hasOverflow: doc.scrollWidth > doc.clientWidth,
      };
    });

    if (overflow.hasOverflow) {
      testResults.overflowFailures.push({
        viewport: `${vp.width}x${vp.height}`,
        scrollWidth: overflow.scrollWidth,
        clientWidth: overflow.clientWidth,
      });
      console.error(`❌ Overflow at ${vp.width}px: scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`);
    } else {
      console.log(`✓ No horizontal overflow at ${vp.width}px (${overflow.clientWidth}px)`);
    }

    // Save full page after-screenshot
    const screenshotPath = path.join(afterDir, `viewport-${vp.width}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // On 1280px, verify images and ticket cards in detail
    if (vp.width === 1280) {
      // Check images
      const imgStats = await page.evaluate(() => {
        const smartImgs = Array.from(document.querySelectorAll("[data-image-key]"));
        return smartImgs.map((el) => {
          const key = el.getAttribute("data-image-key");
          const state = el.getAttribute("data-image-state");
          const isImg = el.tagName.toLowerCase() === "img";
          const naturalWidth = isImg ? el.naturalWidth : 0;
          const naturalHeight = isImg ? el.naturalHeight : 0;
          const currentSrc = isImg ? el.currentSrc : "";
          return { key, state, isImg, naturalWidth, naturalHeight, currentSrc };
        });
      });

      testResults.imagesChecked = imgStats.length;
      console.log(`\nInspecting ${imgStats.length} SmartImage elements on page:`);
      for (const img of imgStats) {
        if (img.state !== "photo" || img.naturalWidth === 0) {
          testResults.brokenImages.push(img);
          console.error(`❌ Broken image: [${img.key}] state=${img.state} size=${img.naturalWidth}x${img.naturalHeight}`);
        } else {
          console.log(`✓ [${img.key}]: OK (${img.naturalWidth}x${img.naturalHeight})`);
        }
      }

      // Check Ticket Cards height equality
      const ticketCards = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll(".ticket-card"));
        return cards.map((c) => ({
          height: c.getBoundingClientRect().height,
          computedMask: window.getComputedStyle(c).maskImage || window.getComputedStyle(c).webkitMaskImage,
        }));
      });

      console.log(`\nInspecting ${ticketCards.length} TicketCard instances:`);
      const heights = ticketCards.map((c) => Math.round(c.height));
      const allEqual = heights.every((h) => Math.abs(h - heights[0]) <= 2);
      testResults.ticketHeightsChecked = allEqual;
      console.log(`Ticket card heights: ${heights.join("px, ")}px (Equal: ${allEqual ? "YES" : "NO"})`);

      // Capture close-up of statistics section
      const statsSection = page.locator("#stats");
      if (await statsSection.count() > 0) {
        await statsSection.screenshot({ path: path.join(afterDir, "section-statistics.png") });
        console.log("✓ Saved close-up: section-statistics.png");
      }
    }

    testResults.viewportsChecked++;
    await context.close();
  }

  await browser.close();

  console.log("\n=== BROWSER VERIFICATION SUMMARY ===");
  console.log(`Viewports checked: ${testResults.viewportsChecked}/11`);
  console.log(`Overflow failures: ${testResults.overflowFailures.length}`);
  console.log(`Images verified: ${testResults.imagesChecked}`);
  console.log(`Broken images: ${testResults.brokenImages.length}`);
  console.log(`Ticket cards equal height: ${testResults.ticketHeightsChecked ? "PASSED" : "FAILED"}`);

  if (testResults.overflowFailures.length > 0 || testResults.brokenImages.length > 0 || !testResults.ticketHeightsChecked) {
    console.error("❌ Verification tests FAILED.");
    process.exit(1);
  }

  console.log("✅ All browser verification tests PASSED cleanly!");
}

verifyBrowser().catch((err) => {
  console.error("Fatal browser verification error:", err);
  process.exit(1);
});
