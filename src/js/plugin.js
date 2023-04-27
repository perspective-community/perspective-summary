import STYLE from "../../dist/css/perspective-viewer-summary.css";

const _ALIGN_DEFAULT = "horizontal";

export class PerspectiveViewerSummaryPluginElement extends HTMLElement {
  constructor() {
    super();
    this._config = {
      align: _ALIGN_DEFAULT,
    };
  }

  connectedCallback() {
    if (!this._container) {
      this._container = document.createElement("div");
      this._container.classList.add("summary-container");
    }
    this.appendChild(this._container);
  }

  disconnectedCallback() {}

  async activate(view) {}

  get name() {
    // Plugin name is "Summary"
    return "Summary";
  }

  get select_mode() {
    // select any number of cols
    return "select";
  }

  get min_config_columns() {
    // at least 1 column
    return 1;
  }

  async draw(view) {
    await this.render(view);
  }
  async update(view) {
    await this.render(view);
  }

  async render(view) {
    // pull columns
    const columns = (await view.get_config()).columns;
    const data_window = {
      start_row: 0,
      start_col: 0,
      end_row: 1,
      end_col: columns.length,
      id: false,
    };
    const data = await view.to_columns(data_window);
    const is_pivoted = data.__ROW_PATH__ && data.__ROW_PATH__.length > 0;

    const _entries = new Map();

    columns.forEach((col) => {
      // container for data
      const col_container = document.createElement("div");
      col_container.classList.add("summary-column");

      // header
      const header_container = document.createElement("div");
      header_container.classList.add("summary-header");

      const header_data = document.createElement("span");
      header_data.classList.add("summary-header-text");
      header_data.textContent = col;
      header_container.appendChild(header_data);

      // data
      const data_container = document.createElement("div");
      data_container.classList.add("summary-data");

      const data_data = document.createElement("span");
      data_data.classList.add("summary-data-text");

      data_container.appendChild(data_data);
      // add to container
      col_container.appendChild(header_container);
      col_container.appendChild(data_container);

      // put in map
      _entries.set(col, col_container);

      if (is_pivoted) {
        data_data.textContent = data[col];
      } else {
        data_data.textContent = "--";
      }

      // set class based on alignment
      this.align();
    });

    // clear it out
    while (this._container.lastChild) {
      this._container.removeChild(this._container.lastChild);
    }

    // and refill
    _entries.forEach((value, key) => {
      this._container.appendChild(value);
    });
  }

  async resize() {
    // TODO nothing yet
  }

  async clear() {
    // TODO
  }

  save() {
    // TODO
    return { ...this._config };
  }

  restore(token) {
    // TODO
    const align = token.align || _ALIGN_DEFAULT;
    this._config.align = align;
    this.align();
  }

  align() {
    this._container.classList.remove("align-horizontal");
    this._container.classList.remove("align-vertical");
    this._container.classList.add(`align-${this._config.align}`);
  }

  async restyle(view) {
    // TODO
  }

  delete() {
    // TODO
  }
}

customElements.define(
  "perspective-viewer-summary",
  PerspectiveViewerSummaryPluginElement
);

function _register_global_styles() {
  const style = document.createElement("style");
  style.textContent = STYLE;
  document.head.insertBefore(style, document.head.firstChild);
}

function register_element() {
  customElements
    .get("perspective-viewer")
    .registerPlugin("perspective-viewer-summary");
}

customElements.whenDefined("perspective-viewer").then(register_element);
_register_global_styles();
