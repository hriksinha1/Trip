import { chromium, webkit } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const VIEWPORTS = [
  { width: 320, height: 600 }, { width: 360, height: 740 },
  { width: 390, height: 844 }, { width: 430, height: 932 },
  { width: 768, height: 1024 }, { width: 1024, height: 768 },
  { width: 1280, height: 800 }, { width: 1366, height: 768 },
  { width: 1440, height: 900 }, { width: 1600, height: 1000 },
  { width: 1920, height: 1080 }, { width: 2560, height: 1440 },
];
const WEBKIT_WIDTHS = new Set([390, 768, 1440, 1920]);
const PORT = Number(process.env.TEST_PORT || 4175);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const screenshotDir = path.resolve("docs/screenshots/after");
fs.mkdirSync(screenshotDir, { recursive: true });

const results = {
  viewportsChecked: 0,
  browserRuns: [],
  overflowFailures: [],
  shellAlignmentFailures: [],
  brokenImages: [],
  imageResponses: [],
  runtimeErrors: [],
  sectionMetrics: [],
  sectionMetricFailures: [],
  interactionFailures: [],
};

function assertOrRecord(condition, list, detail) {
  if (!condition) list.push(detail);
}

async function startPreview() {
  const viteBin = path.resolve("node_modules/vite/bin/vite.js");
  const server = spawn(process.execPath, [viteBin, "preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"], {
    stdio: "ignore",
    env: process.env,
  });
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Vite preview exited with code ${server.exitCode}`);
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) { ready = true; break; }
    } catch { /* The preview server is still starting. */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  if (!ready) {
    server.kill("SIGTERM");
    throw new Error("Vite preview did not become available on " + BASE_URL);
  }
  return server;
}

async function launchChromium() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    if (process.env.CHROMIUM_PATH) {
      return chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH });
    }
    if (fs.existsSync("/usr/bin/chromium")) {
      return chromium.launch({ headless: true, executablePath: "/usr/bin/chromium" });
    }
    throw error;
  }
}

async function inspectViewport(browser, engineName, viewport, captureScreenshot) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const pageErrors = [];
  const failedImageResponses = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") pageErrors.push(`console: ${message.text()}`);
  });
  page.on("response", (response) => {
    const url = response.url();
    if (response.status() >= 400 && /\/images\/.*\.(webp|png|jpe?g|avif)(\?|$)/i.test(url)) {
      failedImageResponses.push({ status: response.status(), url, viewport: viewport.width, engineName });
    }
  });

  try {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(250);

    // Scroll in short increments so lazy-loaded imagery is actually requested.
    await page.evaluate(async () => {
      const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
      const total = document.documentElement.scrollHeight;
      for (let y = 0; y < total; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 45));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(180);

    const measured = await page.evaluate(() => {
      const rect = (element) => {
        if (!element) return null;
        const r = element.getBoundingClientRect();
        return { left: r.left, right: r.right, width: r.width, height: r.height, top: r.top, bottom: r.bottom };
      };
      const isVisible = (element) => {
        let current = element;
        while (current && current instanceof HTMLElement) {
          const style = getComputedStyle(current);
          if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) return false;
          current = current.parentElement;
        }
        const r = element.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      };
      const shells = [
        ["hero", document.querySelector("#home [data-shell]")],
        ["trips", document.querySelector("#trips [data-shell]")],
        ["brand", document.querySelector("#about [data-shell]")],
        ["stats", document.querySelector("#stats [data-shell]")],
        ["destinations-heading", document.querySelector("#destinations > [data-shell]")],
        ["stories", document.querySelector("#stories [data-shell]")],
        ["faq", document.querySelector("#faq [data-shell]")],
        ["promo", document.querySelector("#plan [data-shell]")],
        ["footer", document.querySelector("footer#contact[data-shell]")],
      ].map(([name, element]) => ({ name, rect: rect(element) }));
      const visibleImages = Array.from(document.querySelectorAll("[data-image-key]"))
        .filter(isVisible)
        .map((element) => {
          const isImg = element.tagName.toLowerCase() === "img";
          return {
            key: element.getAttribute("data-image-key"),
            state: element.getAttribute("data-image-state"),
            isImg,
            naturalWidth: isImg ? element.naturalWidth : 0,
            naturalHeight: isImg ? element.naturalHeight : 0,
            currentSrc: isImg ? element.currentSrc : "",
          };
        });
      const destinationTrack = document.querySelector("#destinations [aria-label='Destinations carousel']");
      const firstDestination = destinationTrack?.querySelector("article");
      const firstShell = document.querySelector("#destinations > [data-shell]");
      const headerShell = document.querySelector("[data-header-scrolled]");
      const headerLogo = document.querySelector("header a[aria-label='Starttrips home']");
      const featurePanel = document.querySelector("#stats [data-shell]");
      const statsTicketCards = document.querySelectorAll(".ticket-card").length;
      const tripCards = Array.from(document.querySelectorAll("#trips article"));
      const tripActionHeights = tripCards.map((card) => {
        const button = card.querySelector("button");
        return button ? Math.round(button.getBoundingClientRect().height) : null;
      });
      const storyHeadings = Array.from(document.querySelectorAll("#stories article h3")).map((element) => ({
        text: element.textContent?.trim() || "",
        height: element.getBoundingClientRect().height,
        scrollHeight: element.scrollHeight,
      }));
      const sections = ["#home", "#trips", "#about", "#stats", "#destinations", "#stories", "#faq", "#plan", "#contact"];
      const sectionMetrics = sections.map((selector) => {
        const element = document.querySelector(selector);
        return { selector, height: element ? Math.round(element.getBoundingClientRect().height) : null };
      });
      return {
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
        shells,
        visibleImages,
        firstDestinationLeft: rect(firstDestination)?.left ?? null,
        destinationShellLeft: rect(firstShell)?.left ?? null,
        destinationScrollLeft: destinationTrack?.scrollLeft ?? null,
        headerLogoLeft: rect(headerLogo)?.left ?? null,
        headerShellRect: rect(headerShell),
        brandHeight: rect(document.querySelector("#about"))?.height ?? null,
        featurePanelHeight: rect(featurePanel)?.height ?? null,
        statsTicketCards,
        tripActionHeights,
        storyHeadings,
        sectionMetrics,
      };
    });

    if (measured.documentWidth > viewport.width) {
      results.overflowFailures.push({ engineName, viewport, documentWidth: measured.documentWidth });
    }
    const horizontalScrollX = await page.evaluate(() => {
      window.scrollTo(500, 0);
      const x = window.scrollX;
      window.scrollTo(0, 0);
      return x;
    });
    if (horizontalScrollX > 0) {
      results.overflowFailures.push({ engineName, viewport, issue: "Horizontal window scroll is possible", scrollX: horizontalScrollX });
    }
    for (const image of measured.visibleImages) {
      if (image.state !== "photo" || !image.isImg || image.naturalWidth <= 0) {
        results.brokenImages.push({ engineName, viewport: viewport.width, ...image });
      }
    }
    results.imageResponses.push(...failedImageResponses);
    results.runtimeErrors.push(...pageErrors.map((message) => ({ engineName, viewport: viewport.width, message })));

    const shellRects = measured.shells.filter((item) => item.rect);
    if (shellRects.length > 1) {
      const reference = shellRects[0].rect;
      for (const item of shellRects.slice(1)) {
        if (Math.abs(item.rect.left - reference.left) > 2 || Math.abs(item.rect.width - reference.width) > 2) {
          // A readable FAQ is intentionally narrower only inside its accordion; its outer shell still matches.
          results.shellAlignmentFailures.push({ engineName, viewport: viewport.width, name: item.name, rect: item.rect, reference });
        }
      }
    }
    if (measured.firstDestinationLeft !== null && measured.destinationShellLeft !== null &&
        Math.abs(measured.firstDestinationLeft - measured.destinationShellLeft) > 2) {
      results.shellAlignmentFailures.push({ engineName, viewport: viewport.width, name: "first destination card", left: measured.firstDestinationLeft, shellLeft: measured.destinationShellLeft, scrollLeft: measured.destinationScrollLeft });
    }
    if (measured.statsTicketCards !== 0) {
      results.interactionFailures.push({ engineName, viewport: viewport.width, issue: "Legacy ticket statistics cards remain in the DOM." });
    }
    const uniqueButtonHeights = [...new Set(measured.tripActionHeights.filter((height) => height !== null))];
    if (measured.tripActionHeights.length && uniqueButtonHeights.some((height) => height < 42)) {
      results.interactionFailures.push({ engineName, viewport: viewport.width, issue: "Trip enquiry button is below the 44px target.", heights: measured.tripActionHeights });
    }

    if (engineName === "Chromium") {
      const sectionHeight = (selector) => measured.sectionMetrics.find((item) => item.selector === selector)?.height ?? 0;
      const tripsHeight = sectionHeight("#trips");
      const footerHeight = sectionHeight("#contact");
      if (viewport.width >= 1280 && measured.brandHeight > 560) {
        results.sectionMetricFailures.push({ viewport: viewport.width, section: "brand", actual: Math.round(measured.brandHeight), target: 560 });
      }
      if (viewport.width >= 1280 && measured.featurePanelHeight > 360) {
        results.sectionMetricFailures.push({ viewport: viewport.width, section: "feature panel", actual: Math.round(measured.featurePanelHeight), target: 360 });
      }
      if (viewport.width === 390 && measured.featurePanelHeight > 520) {
        results.sectionMetricFailures.push({ viewport: viewport.width, section: "feature panel", actual: Math.round(measured.featurePanelHeight), target: 520 });
      }
      if (viewport.width === 390 && footerHeight > 720) {
        results.sectionMetricFailures.push({ viewport: viewport.width, section: "footer", actual: footerHeight, target: 720 });
      }
      if (viewport.width === 768 && tripsHeight > 1250) {
        results.sectionMetricFailures.push({ viewport: viewport.width, section: "trips", actual: tripsHeight, target: 1250 });
      }
      if (viewport.width === 1024 && tripsHeight > 1350) {
        results.sectionMetricFailures.push({ viewport: viewport.width, section: "trips", actual: tripsHeight, target: 1350 });
      }
      if (viewport.width === 1440 && tripsHeight > 1000) {
        results.sectionMetricFailures.push({ viewport: viewport.width, section: "trips", actual: tripsHeight, target: 1000 });
      }
      if (viewport.width === 1440 && measured.documentHeight > 6700) {
        results.sectionMetricFailures.push({ viewport: viewport.width, section: "page height", actual: measured.documentHeight, target: 6700 });
      }
      if (viewport.width === 390 && measured.documentHeight > 7200) {
        results.sectionMetricFailures.push({ viewport: viewport.width, section: "page height", actual: measured.documentHeight, target: 7200 });
      }
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(230);
      const scrolledHeaderBox = await page.locator('[data-header-scrolled="true"]').boundingBox().catch(() => null);
      const heroShellBox = await page.locator("#home [data-shell]").boundingBox().catch(() => null);
      if (scrolledHeaderBox && heroShellBox &&
          (Math.abs(scrolledHeaderBox.x - heroShellBox.x) > 2 || Math.abs(scrolledHeaderBox.width - heroShellBox.width) > 2)) {
        results.shellAlignmentFailures.push({ engineName, viewport: viewport.width, name: "scrolled header shell", header: scrolledHeaderBox, hero: heroShellBox });
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      results.sectionMetrics.push({ viewport: viewport.width, pageHeight: measured.documentHeight, brandHeight: Math.round(measured.brandHeight || 0), featurePanelHeight: Math.round(measured.featurePanelHeight || 0), tripsHeight, footerHeight, sections: measured.sectionMetrics });
      if (captureScreenshot) {
        await page.screenshot({ path: path.join(screenshotDir, `viewport-${viewport.width}.png`), fullPage: true });
      }
    }

    // Exercise the mobile navigation's focus entry, Escape handling and focus restoration.
    if (engineName === "Chromium" && viewport.width === 390) {
      const menuButton = page.getByRole("button", { name: "Open navigation menu" });
      await menuButton.click();
      await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Close navigation menu");
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.getElementById("mobile-navigation"));
      await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Open navigation menu");
      const focusRestored = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Open navigation menu");
      if (!focusRestored) results.interactionFailures.push({ engineName, viewport: viewport.width, issue: "Mobile navigation did not restore focus to its trigger." });

      const firstFaqButton = page.locator("#faq button[aria-controls]").first();
      if (await firstFaqButton.count()) {
        await firstFaqButton.click();
        const expanded = await firstFaqButton.getAttribute("aria-expanded");
        if (expanded !== "true" && expanded !== "false") {
          results.interactionFailures.push({ engineName, viewport: viewport.width, issue: "FAQ accordion has no valid expanded state." });
        }
      }

      const creditsButton = page.getByRole("button", { name: "Photo credits" });
      if (await creditsButton.count()) {
        await creditsButton.click();
        const dialogVisible = await page.getByRole("dialog", { name: "Photo credits" }).isVisible().catch(() => false);
        if (!dialogVisible) results.interactionFailures.push({ engineName, viewport: viewport.width, issue: "Photo credits dialog failed to open." });
        await page.keyboard.press("Escape");
      }
    }

    results.browserRuns.push({ engineName, viewport: viewport.width, images: measured.visibleImages.length, pageHeight: measured.documentHeight });
    results.viewportsChecked += 1;
    console.log(`✓ ${engineName} ${viewport.width}×${viewport.height}: ${measured.visibleImages.length} visible image(s), page height ${measured.documentHeight}px`);
  } finally {
    await context.close();
  }
}

let previewServer;
const browsers = [];
try {
  previewServer = await startPreview();
  let chromiumBrowser;
  try {
    chromiumBrowser = await launchChromium();
  } catch (error) {
    throw new Error(`Chromium could not start. Install it with "npx playwright install chromium". Original error: ${error.message}`);
  }
  browsers.push(chromiumBrowser);
  for (const viewport of VIEWPORTS) {
    await inspectViewport(chromiumBrowser, "Chromium", viewport, true);
  }

  let webkitBrowser;
  try {
    webkitBrowser = await webkit.launch({ headless: true });
  } catch (error) {
    throw new Error(`WebKit could not start. Install it with "npx playwright install webkit". Original error: ${error.message}`);
  }
  browsers.push(webkitBrowser);
  for (const viewport of VIEWPORTS.filter((item) => WEBKIT_WIDTHS.has(item.width))) {
    await inspectViewport(webkitBrowser, "WebKit", viewport, false);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      browserRuns: results.browserRuns.length,
      horizontalOverflowFailures: results.overflowFailures.length,
      shellAlignmentFailures: results.shellAlignmentFailures.length,
      sectionMetricFailures: results.sectionMetricFailures.length,
      brokenImages: results.brokenImages.length,
      failedImageResponses: results.imageResponses.length,
      runtimeErrors: results.runtimeErrors.length,
      interactionFailures: results.interactionFailures.length,
    },
    ...results,
  };
  fs.writeFileSync("docs/REDESIGN_METRICS.json", JSON.stringify(report, null, 2) + "\n");
  const metricRows = results.sectionMetrics.map((item) =>
    "| " + item.viewport + " | " + item.pageHeight + " | " + item.brandHeight + " | " + item.featurePanelHeight + " | " + item.tripsHeight + " | " + item.footerHeight + " |"
  ).join("\n");
  const reportMarkdown = [
    "# Starttrips redesign report",
    "",
    "Generated: " + report.generatedAt,
    "",
    "## Browser verification summary",
    "",
    "- Browser/viewport runs: " + report.summary.browserRuns,
    "- Horizontal overflow failures: " + report.summary.horizontalOverflowFailures,
    "- Shell and carousel alignment failures: " + report.summary.shellAlignmentFailures,
    "- Section metric failures: " + report.summary.sectionMetricFailures,
    "- Broken visible images: " + report.summary.brokenImages,
    "- Failed local image responses: " + report.summary.failedImageResponses,
    "- Runtime/console errors: " + report.summary.runtimeErrors,
    "- Interaction failures: " + report.summary.interactionFailures,
    "",
    "A zero count is only a code/browser result. Review photo accuracy and attribution separately in PHOTO_REVIEW.md.",
    "",
    "## Layout metrics",
    "",
    "| Viewport (CSS px) | Page height (px) | Brand (px) | Feature panel (px) | Trips (px) | Footer (px) |",
    "|---:|---:|---:|---:|---:|---:|",
    metricRows || "| No Chromium measurements collected | — | — | — | — | — |",
    "",
    "Fresh screenshots are saved in docs/screenshots/after/. Baseline observations are documented in REDESIGN_AUDIT.md.",
  ].join("\n");
  fs.writeFileSync("docs/REDESIGN_REPORT.md", reportMarkdown + "\n");
  console.log("\n=== Starttrips browser verification ===");
  console.log(JSON.stringify(report.summary, null, 2));

  const failureKeys = [
    "horizontalOverflowFailures",
    "shellAlignmentFailures",
    "sectionMetricFailures",
    "brokenImages",
    "failedImageResponses",
    "runtimeErrors",
    "interactionFailures",
  ];
  const hasFailures = failureKeys.some((key) => report.summary[key] > 0);
  if (hasFailures) {
    console.error("✗ Browser verification failed. Review docs/REDESIGN_METRICS.json and docs/screenshots/after/.");
    process.exitCode = 1;
  } else {
    console.log("✓ Browser verification passed.");
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  for (const browser of browsers) await browser.close().catch(() => {});
  if (previewServer && previewServer.exitCode === null) previewServer.kill("SIGTERM");
}
