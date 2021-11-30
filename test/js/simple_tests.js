/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

async function get_contents_default(page) {
    return await page.evaluate(async () => {
        const viewer = document.querySelector(
            "perspective-viewer perspective-viewer-plugin"
        );
        return viewer.innerHTML;
    });
}

exports.default = function (get_contents = get_contents_default) {
    test.capture("shows a grid without any settings applied", async (page) => {
        await page.evaluate(async () => {
            const viewer = document.querySelector("perspective-viewer");
            await viewer.getTable();
            await viewer.restore({settings: true});
        });

        return await get_contents(page);
    });
};
