/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const utils = require("../../tools/test");
const path = require("path");

const simple_tests = require("../../tools/test/simple_tests.js");

async function get_contents(page) {
    return await page.evaluate(async () => {
        const viewer = document.querySelector(
            "perspective-viewer perspective-viewer-summary"
        );
        return viewer.innerHTML || "MISSING";
    });
}

utils.with_server({}, () => {
    describe.page(
        "superstore.html",
        () => {
            simple_tests.default(get_contents);

            test.capture(
                "perspective-config-update event is fired when column style is changed",
                async (page) => {
                    // Await the viewer element to exist on the page
                    const viewer = await page.waitForSelector(
                        "perspective-viewer"
                    );
                    const {x, y} = await page.evaluate(async (viewer) => {
                        // Await the table load
                        await viewer.getTable();

                        // Open the config panel
                        await viewer.toggleConfig();

                        // Register a listener for `perspective-config-update` event
                        window.__events__ = [];
                        viewer.addEventListener(
                            "perspective-config-update",
                            (evt) => {
                                window.__events__.push(evt);
                            }
                        );

                        // Find the column config menu button
                        const header_button = viewer.querySelector(
                            "regular-table thead tr:last-child th"
                        );

                        // Get the button coords (slightly lower than center
                        // because of the location of the menu button within
                        // this element)
                        const rect = header_button.getBoundingClientRect();
                        return {
                            x: Math.floor(rect.left + rect.width / 2),
                            y: Math.floor(rect.top + (3 * rect.height) / 4),
                        };
                    }, viewer);

                    // Click the menu button
                    await page.mouse.click(x, y);

                    // Await the style menu existing on the page
                    const style_menu = await page.waitForSelector(
                        "perspective-number-column-style"
                    );

                    const {x: xx, y: yy} = await page.evaluate(
                        async (style_menu) => {
                            // Find the 'bar' button
                            const bar_button =
                                style_menu.shadowRoot.querySelector(
                                    "#radio-list-3"
                                );

                            // Get its coords
                            const rect = bar_button.getBoundingClientRect();
                            return {
                                x: Math.floor(rect.left + rect.width / 2),
                                y: Math.floor(rect.top + rect.height / 2),
                            };
                        },
                        style_menu
                    );

                    // Click the button
                    await page.mouse.click(xx, yy);

                    const count = await page.evaluate(async (viewer) => {
                        // Await the plugin rendering
                        await viewer.flush();

                        // Count the events;
                        return window.__events__.length;
                    }, viewer);

                    // Expect 1 event
                    expect(count).toEqual(1);

                    // Return the `<table>` contents
                    return get_contents(page);
                }
            );
        },
        {root: path.join(__dirname, "..", "..")}
    );
});
