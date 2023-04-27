import { test, expect } from "@playwright/test";

async function getSummaryContents(page) {
  return await page.evaluate(async () => {
    const viewer = document.querySelector(
      "perspective-viewer perspective-viewer-summary"
    );
    return viewer.innerHTML || "MISSING";
  });
}

test.describe("Summary with superstore data set - basics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./examples/basic.html", {
      waitUntil: "networkidle",
    });

    await page.evaluate(async () => {
      await document.querySelector("perspective-viewer").restore({
        plugin: "Summary",
      });
    });
  });

  test("exists", async ({ page }) => {
    const viewer = await getSummaryContents(page);
    await expect(viewer).not.toBe("MISSING");
  });
});
