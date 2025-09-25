const { BuildCss } = require("@prospective.co/procss/target/cjs/procss.js");
const fs = require("fs");
const path_mod = require("path");
const esbuild = require("esbuild");

const DEFAULT_BUILD = {
  target: ["es2022"],
  bundle: true,
  minify: !process.env.PSP_DEBUG,
  sourcemap: true,
  metafile: true,
  entryNames: "[name]",
  chunkNames: "[name]",
  assetNames: "[name]",
};

/**
 * An `esbuild` plugin to mark `node_modules` dependencies as external.
 * @returns 
 */
function NodeModulesExternal(whitelist) {
  function setup(build) {
    build.onResolve({ filter: /^[A-Za-z0-9\@]/ }, (args) => {
      return {
        path: args.path,
        external: true,
        namespace: "skip-node-modules",
      };
    });
  }

  return {
    name: "node_modules_external",
    setup,
  };
}

/**
 * A build convenienve wrapper.
 * @param {any} config An `esbuild.build` config.
 */
async function build(config) {
  await esbuild.build({
    ...DEFAULT_BUILD,
    ...config,
  });
}

const BUILD = [
  {
    define: {
      global: "window",
    },
    entryPoints: ["src/js/plugin.js"],
    plugins: [NodeModulesExternal()],
    format: "esm",
    loader: {
      ".css": "text",
      ".html": "text",
    },
    outfile: "dist/esm/perspective-viewer-summary.js",
  },
  {
    define: {
      global: "window",
    },
    entryPoints: ["src/js/plugin.js"],
    plugins: [],
    format: "esm",
    loader: {
      ".css": "text",
      ".html": "text",
    },
    outfile: "dist/cdn/perspective-viewer-summary.js",
  },
];

function add(builder, path) {
  builder.add(
    path,
    fs.readFileSync(path_mod.join("./src/less", path)).toString(),
  );
}

async function compile_css() {
  fs.mkdirSync("dist/css", { recursive: true });
  const builder1 = new BuildCss("");
  add(builder1, "./default.less");
  add(builder1, "./common.less");
  fs.writeFileSync(
    "dist/css/perspective-viewer-summary.css",
    builder1.compile().get("default.css"),
  );

  const builder2 = new BuildCss("");
  add(builder2, "./common.less");
  add(builder2, "./minimal.less");
  fs.writeFileSync(
    "dist/css/perspective-viewer-summary-minimal.css",
    builder2.compile().get("minimal.css"),
  );

  const builder3 = new BuildCss("");
  add(builder3, "./common.less");
  add(builder3, "./default.less");
  add(builder3, "./modern.less");
  fs.writeFileSync(
    "dist/css/perspective-viewer-summary-modern.css",
    builder3.compile().get("modern.css"),
  );
}

async function build_all() {
  await compile_css();
  await Promise.all(BUILD.map(build)).catch(() => process.exit(1));
}

build_all();
