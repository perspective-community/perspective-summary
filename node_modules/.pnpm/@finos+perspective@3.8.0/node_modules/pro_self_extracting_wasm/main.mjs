#!/usr/bin/env node --max-old-space-size=8192

import("pro_self_extracting_wasm").then(x => x.compress_main());

