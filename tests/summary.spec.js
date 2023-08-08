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
      { timeout: 10000 },
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
      '<style>.summary-container{display:flex;}.align-horizontal{flex-direction:row;}.align-vertical{flex-direction:column;}.summary-column{display:flex;text-align:center;align-items:center;justify-content:space-between;margin:5px;}.align-header-top .summary-column,.align-header-bottom .summary-column{flex-direction:column;}.align-header-left .summary-column,.align-header-right .summary-column{flex-direction:row;}.summary-header{display:flex;justify-content:center;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:1.3vh;}.align-header-top .summary-header,.align-header-bottom .summary-header{flex-direction:column;}.align-header-left .summary-header,.align-header-right .summary-header{transform:rotate(-180deg);-webkit-transform:rotate(-180deg);-moz-transform:rotate(-180deg);-ms-transform:rotate(-180deg);-o-transform:rotate(-180deg);writing-mode:vertical-lr;text-overflow:ellipsis;display:inline-block;font-size:0.8vh;}.align-header-left .summary-header{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider,.align-header-right .summary-header-divider{display:none;}.summary-data{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:3vh;}.summary-header-divider::after{content:"";display:block;margin:auto;}.align-header-top .summary-header-divider::after{border-bottom:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider::after{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header-divider::after{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-bottom .summary-header-divider::after{border-top:1px solid var(--inactive--color,#6e6e6e);}.align-header-top .summary-header-divider,.align-header-bottom .summary-header-divider{width:100%;}.align-horizontal.align-header-top .summary-header-divider::after,.align-horizontal.align-header-bottom .summary-header-divider::after{height:1px;width:90%;}.align-vertical.align-header-top .summary-header-divider::after,.align-vertical.align-header-bottom .summary-header-divider::after{height:1px;width:50%;}.align-horizontal.align-header-left .summary-header-divider::after,.align-horizontal.align-header-right .summary-header-divider::after{height:90%;width:1px;}.align-vertical.align-header-left .summary-header-divider::after,.align-vertical.align-header-right .summary-header-divider::after{height:50%;width:1px;}</style><div class="summary-container align-horizontal align-header-top"><div class="summary-column"><span class="summary-header">Row ID</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Row ID&quot;)">4950</span></div><div class="summary-column"><span class="summary-header">Order ID</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Order ID&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Order Date</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Order Date&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Ship Date</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Ship Date&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Ship Mode</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Ship Mode&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Customer ID</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Customer ID&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Segment</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Segment&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Country</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Country&quot;)">99</span></div><div class="summary-column"><span class="summary-header">City</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;City&quot;)">99</span></div><div class="summary-column"><span class="summary-header">State</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;State&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Postal Code</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Postal Code&quot;)">5688218</span></div><div class="summary-column"><span class="summary-header">Region</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Region&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Product ID</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Product ID&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Category</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Category&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Sub-Category</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Sub-Category&quot;)">99</span></div><div class="summary-column"><span class="summary-header">Sales</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Sales&quot;)">21439.9</span></div><div class="summary-column"><span class="summary-header">Quantity</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Quantity&quot;)">367</span></div><div class="summary-column"><span class="summary-header">Discount</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Discount&quot;)">15.4</span></div><div class="summary-column"><span class="summary-header">Profit</span><span class="summary-header-divider"></span><span class="summary-data" title="sum(&quot;Profit&quot;)">-124.5</span></div></div>',
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
      '<style>.summary-container{display:flex;}.align-horizontal{flex-direction:row;}.align-vertical{flex-direction:column;}.summary-column{display:flex;text-align:center;align-items:center;justify-content:space-between;margin:5px;}.align-header-top .summary-column,.align-header-bottom .summary-column{flex-direction:column;}.align-header-left .summary-column,.align-header-right .summary-column{flex-direction:row;}.summary-header{display:flex;justify-content:center;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:1.3vh;}.align-header-top .summary-header,.align-header-bottom .summary-header{flex-direction:column;}.align-header-left .summary-header,.align-header-right .summary-header{transform:rotate(-180deg);-webkit-transform:rotate(-180deg);-moz-transform:rotate(-180deg);-ms-transform:rotate(-180deg);-o-transform:rotate(-180deg);writing-mode:vertical-lr;text-overflow:ellipsis;display:inline-block;font-size:0.8vh;}.align-header-left .summary-header{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider,.align-header-right .summary-header-divider{display:none;}.summary-data{display:flex;flex-direction:column;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:3vh;}.summary-header-divider::after{content:"";display:block;margin:auto;}.align-header-top .summary-header-divider::after{border-bottom:1px solid var(--inactive--color,#6e6e6e);}.align-header-left .summary-header-divider::after{border-right:1px solid var(--inactive--color,#6e6e6e);}.align-header-right .summary-header-divider::after{border-left:1px solid var(--inactive--color,#6e6e6e);}.align-header-bottom .summary-header-divider::after{border-top:1px solid var(--inactive--color,#6e6e6e);}.align-header-top .summary-header-divider,.align-header-bottom .summary-header-divider{width:100%;}.align-horizontal.align-header-top .summary-header-divider::after,.align-horizontal.align-header-bottom .summary-header-divider::after{height:1px;width:90%;}.align-vertical.align-header-top .summary-header-divider::after,.align-vertical.align-header-bottom .summary-header-divider::after{height:1px;width:50%;}.align-horizontal.align-header-left .summary-header-divider::after,.align-horizontal.align-header-right .summary-header-divider::after{height:90%;width:1px;}.align-vertical.align-header-left .summary-header-divider::after,.align-vertical.align-header-right .summary-header-divider::after{height:50%;width:1px;}</style><div class="summary-container align-vertical align-header-top"><div class="summary-column"><span class="summary-header">Quantity</span><span class="summary-header-divider"></span><span class="summary-data user-data-class" title="avg(&quot;Quantity&quot;)">3.71</span></div><div class="summary-column"><span class="summary-header">Order ID</span><span class="summary-header-divider"></span><span class="summary-data user-data-class" title="first(&quot;Order ID&quot;)">CA-2013</span></div><div class="summary-column"><span class="summary-header">Order Date</span><span class="summary-header-divider"></span><span class="summary-data user-data-class" title="first(&quot;Order Date&quot;)">2013-11-09 00:00:00</span></div></div>',
    );
  });
});
