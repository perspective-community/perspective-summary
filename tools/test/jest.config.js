/******************************************************************************
 *
 * Copyright (c) 2019, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
module.exports = {
    // rootDir: "../",
    roots: ["test/js/"],
    verbose: true,
    testURL: "http://localhost/",
    transform: {
        ".js$": "./tools/test/transform.js",
        ".html$": "html-loader-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(d3|internmap|delaunator|robust-predicates)).+\\.js",
    ],
    automock: false,
    setupFiles: ["./tools/test/beforeEachSpec.js"],
    reporters: ["default", "./tools/test/reporter.js"],
    globalSetup: "./tools/test/globalSetup.js",
    globalTeardown: "./tools/test/globalTeardown.js",
};
