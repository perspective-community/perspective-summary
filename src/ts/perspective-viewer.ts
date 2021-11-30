/******************************************************************************
 *
 * Copyright (c) 2018, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms
 * of the Apache License 2.0.  The full license can be found in the LICENSE
 * file.
 *
 */

/**
 * Module for the `<perspective-viewer>` custom element.  This module has no
 * (real) exports, but importing it has a side effect: the
 * `PerspectiveViewerElement`class is registered as a custom element, after
 * which it can be used as a standard DOM element.
 *
 * Though `<perspective-viewer>` is written mostly in Rust, the nature
 * of WebAssembly's compilation makes it a dynamic module;  in order to
 * guarantee that the Custom Elements extension methods are registered
 * synchronously with this package's import, we need perform said registration
 * within this wrapper module.
 *
 * The documentation in this module defines the instance structure of a
 * `<perspective-viewer>` DOM object instantiated typically, through HTML or any
 * relevent DOM method e.g. `document.createElement("perspective-viewer")` or
 * `document.getElementsByTagName("perspective-viewer")`.
 *
 * @module perspective-viewer
 */

export {IPerspectiveViewerPlugin} from "./plugin";
export {PerspectiveViewerPluginElement} from "./plugin";
export {PerspectiveViewerElement} from "./viewer";
export {PerspectiveViewerConfig} from "./viewer";
export * from "./extensions";

import "./style";

import "mobile-drag-drop-shadow-dom";
