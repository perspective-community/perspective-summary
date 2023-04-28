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

  test("Correct default view", async ({ page }) => {
    const viewer = await getSummaryContents(page);
    await expect(viewer).toBe(
      '<div class="summary-container align-horizontal"><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Row ID</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Order ID</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Order Date</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Ship Date</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Ship Mode</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Customer ID</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Segment</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Country</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">City</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">State</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Postal Code</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Region</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Product ID</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Category</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Sub-Category</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Sales</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Quantity</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Discount</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Profit</span></div><div class="summary-data"><span class="summary-data-text">--</span></div></div></div>'
    );
  });

  test("Correct config parsing", async ({ page }) => {
    await page.evaluate(async () => {
      await document.querySelector("perspective-viewer").restore({
        plugin: "Summary",
        plugin_config: {
          align: "vertical",
          data_class: "user-data-class",
          data_classes: {},
          header_class: "",
          header_classes: {},
          truncate: {
            Quantity: 2,
            "Order ID": 7,
            "Order Date": 5,
          },
        },
        settings: true,
        theme: "Pro Light",
        title: null,
        group_by: ["Row ID"],
        split_by: [],
        columns: ["Quantity", "Order ID", "Order Date"],
        filter: [],
        sort: [],
        expressions: [],
        aggregates: {
          Quantity: "avg",
          "Order ID": "first",
          "Order Date": "first",
        },
      });
    });
    const viewer = await getSummaryContents(page);
    await expect(viewer).toBe(
      '<div class="summary-container align-vertical"><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Quantity</span></div><div class="summary-data"><span class="summary-data-text user-data-class" title="avg(&quot;Quantity&quot;)">3.71</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Order ID</span></div><div class="summary-data"><span class="summary-data-text user-data-class" title="first(&quot;Order ID&quot;)">CA-2013</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Order Date</span></div><div class="summary-data"><span class="summary-data-text user-data-class" title="first(&quot;Order Date&quot;)">Fri Nov 08 2013 19:00:00 GMT-0500 (Eastern Standard Time)</span></div></div></div>'
    );
  });
});
