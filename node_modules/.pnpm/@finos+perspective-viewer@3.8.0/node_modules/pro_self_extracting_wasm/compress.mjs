// ┌───────────────────────────────────────────────────────────────────────────┐
// │                                                                           │
// │  ██████╗ ██████╗  ██████╗   Copyright (C) 2025, The Prospective Company   │
// │  ██╔══██╗██╔══██╗██╔═══██╗                                                │
// │  ██████╔╝██████╔╝██║   ██║  This file is part of the Procss library,      │
// │  ██╔═══╝ ██╔══██╗██║   ██║  distributed under the terms of the            │
// │  ██║     ██║  ██║╚██████╔╝  Apache License 2.0.  The full license can     │
// │  ╚═╝     ╚═╝  ╚═╝ ╚═════╝   be found in the LICENSE file.                 │
// │                                                                           │
// └───────────────────────────────────────────────────────────────────────────┘

import { deflate } from 'node:zlib';
import fs from "node:fs";
import path from "node:path";
import leb from 'leb128';
import * as url from "url";

export { extract } from "./extract.mjs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url)).slice(0, -1);

const runtime = fs.readFileSync(path.join(__dirname, "./runtime.wasm"));

function write_custom_section(runtime, name, data) {
    let parts = [0, 0];
    parts = parts.concat(...Uint8Array.from(leb.unsigned.encode(name.length)));
    parts = parts.concat(...Uint8Array.from(new TextEncoder().encode(name)));
    parts = parts.concat(Array.from(Uint8Array.from(data)));
    const len_leb = leb.unsigned.encode(parts.length - 2);
    parts.splice(1, 1, ...Uint8Array.from(len_leb));
    const runtime2 = new Uint8Array(runtime.byteLength + parts.length);
    runtime2.set(runtime, 0);
    runtime2.set(parts, runtime.byteLength);
    return runtime2;
}

export function compress(input, output) {
    const input_data = fs.readFileSync(input);
    deflate(input_data, (_err, results) => {
        let runtime2 = write_custom_section(runtime, "psp-runtime", results);
        const x = new Uint8Array(4);
        const view = new DataView(x.buffer);
        view.setUint32(0, input_data.byteLength, true);
        runtime2 = write_custom_section(runtime2, "psp-len", x);
        fs.writeFileSync(output || input, runtime2);
        console.log(`pro_self_extracting_wasm wrote ${runtime2.byteLength} bytes`);
    });
}

export function compress_main() {
    let input, output;
    const args = process.argv.slice(2);
    while (args.length > 0) {
        const arg = args.shift();
        if (arg === "--output") {
            output = args.shift();
        } else {
            input = arg;
        }
    }

    compress(input, output || input)
}