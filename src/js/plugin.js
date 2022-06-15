/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import STYLE from "../less/index.less";

export class PerspectiveViewerSummaryPluginElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this._container) {
            this._container = document.createElement("div");
        }
        this.parentElement.appendChild(this._container);
    }

    disconnectedCallback() {
    }

    async activate(view) {
    }

    get name() {
        return "Summary";
    }

    async draw(view) {
    }

    async update(view) {
    }

    async resize() {
    }

    async clear() {
    }

    save() {
    }

    restore(token) {
    }

    async restyle(view) {
    }

    delete() {
    }

    // Private
}

customElements.define(
    "perspective-viewer-summary",
    PerspectiveViewerSummaryPluginElement
);

/**
 * Appends the default table CSS to `<head>`, should be run once on module
 * import.
 *
 */
function _register_global_styles() {
    const style = document.createElement("style");
    style.textContent = STYLE;
    document.head.insertBefore(style, document.head.firstChild);
}

/******************************************************************************
 *
 * Main
 *
 */

function register_element() {
    customElements
        .get("perspective-viewer")
        .registerPlugin("perspective-viewer-summary");
}

customElements.whenDefined("perspective-viewer").then(register_element);
_register_global_styles();
