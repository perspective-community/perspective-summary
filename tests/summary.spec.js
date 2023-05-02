import { test, expect } from "@playwright/test";

async function getSummaryContents(page) {
  return await page.evaluate(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    const viewer = document.querySelector("perspective-viewer");
    return viewer.lastChild.shadowRoot.innerHTML;
  });
}

test.describe("Summary with superstore data set - basics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./examples/basic.html", {
      waitUntil: "networkidle",
    });

    // wait up to 10s for perspective to render
    await page.waitForFunction(
      () => document.querySelector("perspective-viewer"),
      null,
      { timeout: 10000 }
    );

    await page.evaluate(async () => {
      await document.querySelector("perspective-viewer").restore({
        plugin: "Summary",
      });
    });

    // wait 1s for it to process
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  test("exists", async ({ page }) => {
    const viewer = await getSummaryContents(page);
    await expect(viewer).not.toBe("MISSING");
  });

  test("Correct default view", async ({ page }) => {
    const viewer = await getSummaryContents(page);
    await expect(viewer).toBe(
      '<style>.summary-container{display:flex;overflow-x:auto;overflow-y:auto;}.align-horizontal{flex-direction:row;}.align-vertical{flex-direction:column;}.summary-column{display:flex;flex-direction:column;text-align:center;margin:5px;}.summary-header{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:1.5vh;}.summary-data{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:3vh;}.summary-header::after{content:"";height:1px;width:90%;border-bottom:1px solid var(--inactive--color,#6e6e6e);}</style><div class="summary-container align-horizontal"><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Row ID</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Row ID&quot;)">4950</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Order ID</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Order ID&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Order Date</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Order Date&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Ship Date</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Ship Date&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Ship Mode</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Ship Mode&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Customer ID</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Customer ID&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Segment</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Segment&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Country</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Country&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">City</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;City&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">State</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;State&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Postal Code</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Postal Code&quot;)">5688218</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Region</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Region&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Product ID</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Product ID&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Category</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Category&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Sub-Category</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Sub-Category&quot;)">99</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Sales</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Sales&quot;)">21439.9077</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Quantity</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Quantity&quot;)">367</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Discount</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Discount&quot;)">15.36999999999999</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Profit</span></div><div class="summary-data"><span class="summary-data-text" title="sum(&quot;Profit&quot;)">-124.50909999999969</span></div></div></div>'
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
          format: {
            Quantity: 2,
            "Order ID": 7,
            "Order Date": "YYYY-MM-DD HH:mm:ss",
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
      '<style>.summary-container{display:flex;overflow-x:auto;overflow-y:auto;}.align-horizontal{flex-direction:row;}.align-vertical{flex-direction:column;}.summary-column{display:flex;flex-direction:column;text-align:center;margin:5px;}.summary-header{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:1.5vh;}.summary-data{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:3vh;}.summary-header::after{content:"";height:1px;width:90%;border-bottom:1px solid var(--inactive--color,#6e6e6e);}</style><div class="summary-container align-vertical"><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Quantity</span></div><div class="summary-data"><span class="summary-data-text user-data-class" title="avg(&quot;Quantity&quot;)">3.71</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Order ID</span></div><div class="summary-data"><span class="summary-data-text user-data-class" title="first(&quot;Order ID&quot;)">CA-2013</span></div></div><div class="summary-column"><div class="summary-header"><span class="summary-header-text">Order Date</span></div><div class="summary-data"><span class="summary-data-text user-data-class" title="first(&quot;Order Date&quot;)">2013-11-09 00:00:00</span></div></div></div>'
    );
  });
});
