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

export async function extract(input) {
    let bin;
    if (typeof input?.then === "function") {
        input = await input;
    }

    if (input instanceof Response) {
        bin = await WebAssembly.instantiateStreaming(input);
    } else if (typeof input === "string") {
        bin = await WebAssembly.instantiateStreaming(fetch(input));
    } else if (input instanceof ArrayBuffer) {
        bin = await WebAssembly.instantiate(input);
    } else if (input instanceof Uint8Array) {
        bin = await WebAssembly.instantiate(input.buffer);
    } else {
        bin = input;
    }

    const inst = bin.instance.exports;
    const [payload] = WebAssembly.Module.customSections(bin.module, "psp-runtime");
    const [raw_length_view] = WebAssembly.Module.customSections(bin.module, "psp-len");
    const raw_length = new DataView(raw_length_view).getUint32(0, true);
    const ptr = inst.resize(payload.byteLength);
    new Uint8Array(inst.memory.buffer).set(new Uint8Array(payload), ptr);
    const offset = inst.compile(payload.byteLength, raw_length);
    return new Uint8Array(inst.memory.buffer).slice(offset, raw_length + offset);
}