`pro-self-extracting-wasm` is a CLI utility for compiling self-extracting
WebAssembly executables for use in the browser.

## Usage

Install the CLI compiler and runtime library

```bash
npm install pro-self-extracting-wasm
```

Compile your target

```bash
npm exec pro_self_extracting_wasm ./my_assembly.wasm --output my_assembly.compressed.wasm
```

Unzip the bundle in JavaScript

```javascript
import {extract} from "pro-self-extracting-wasm";
const my_assembly = await extract(fetch("./my_assembly.compressed.wasm"));
```

