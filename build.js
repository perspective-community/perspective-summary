const {build} = require("./tools/build/build");
const {NodeModulesExternal} = require("./tools/build/external");
const {InlineCSSPlugin} = require("./tools/build/inline_css");
const {UMDLoader} = require("./tools/build/umd");

const BUILD = [
    {
        define: {
            global: "window",
        },
        entryPoints: ["src/js/plugin.js"],
        plugins: [InlineCSSPlugin(), NodeModulesExternal()],
        format: "esm",
        loader: {
            ".html": "text",
        },
        outfile: "dist/esm/perspective-viewer-summary.js",
    },
    {
        define: {
            global: "window",
        },
        entryPoints: ["src/js/plugin.js"],
        globalName: "perspective_datagrid",
        plugins: [InlineCSSPlugin(), UMDLoader()],
        format: "cjs",
        loader: {
            ".html": "text",
        },
        outfile: "dist/umd/perspective-viewer-summary.js",
    },
    {
        define: {
            global: "window",
        },
        entryPoints: ["src/js/plugin.js"],
        plugins: [InlineCSSPlugin()],
        format: "esm",
        loader: {
            ".html": "text",
        },
        outfile: "dist/cdn/perspective-viewer-summary.js",
    },
];

async function build_all() {
    await Promise.all(BUILD.map(build)).catch(() => process.exit(1));
}

build_all();
