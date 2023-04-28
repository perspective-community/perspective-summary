import STYLE from "../../dist/css/perspective-viewer-summary.css";

const _ALIGN_DEFAULT = "horizontal";

export class PerspectiveViewerSummaryPluginElement extends HTMLElement {
  constructor() {
    super();
    /*
     * Config:
     *  align: str = "vertical" | "horizontal",  // align items vertically or horizontally, default is horizontal
     *  truncate: {[col: str]: int }, // round numbers, truncate strings
     *  header_class: str, // css class to add to all headers
     *  data_class: str, // css class to add to all datas
     *  header_classes: {[col: str]: str}, // css class to add to specific headers
     *  data_classes: {[col: str]: str}, //  css class to add to specific datas
     */
    this._config = {
      plugin_config: {
        align: _ALIGN_DEFAULT,
        truncate: {},
        header_class: "",
        data_class: "",
        header_classes: {},
        data_classes: {},
      },
    };

    // store data and dom elements
    this._data = null;
    this._schema = null;
  }

  connectedCallback() {
    if (!this._container) {
      this._container = document.createElement("div");
      this._container.classList.add("summary-container");
    }
    this.appendChild(this._container);
  }

  disconnectedCallback() {}

  async activate(view) {
    // nothing to do
  }

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
    // pull config
    const config = await view.get_config();
    this._config = {
      ...this._config,
      ...config,
      plugin_config: { ...this._config.plugin_config, ...config.plugin_config },
    };
    this._schema = await view.schema();

    // get the columns being displayed
    const columns = config.columns;

    // access the first row of data, the total aggregation
    const data_window = {
      start_row: 0,
      start_col: 0,
      end_row: 1,
      end_col: columns.length,
      id: false,
    };

    // get the data itself
    this._data = await view.to_columns(data_window);

    // set class based on alignment
    this.format();
  }

  async resize() {
    // TODO nothing yet
  }

  async clear() {
    // TODO
  }

  save() {
    return { ...this._config };
  }

  restore(token) {
    this._config = {
      ...this._config,
      plugin_config: { ...this._config.plugin_config, ...token },
    };
    this.format();
  }

  format() {
    // get the columns being displayed
    const columns = this._config.columns;

    // get the aggregations for those columns
    const aggregations = this._config.aggregates;

    // if we're not pivoted, we don't display data
    const is_pivoted =
      this._data.__ROW_PATH__ && this._data.__ROW_PATH__.length > 0;

    // keep in a map so we can format things individuallyt
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

      // add user provided classes
      if (this._config.plugin_config.header_class) {
        header_data.classList.add(this._config.plugin_config.header_class);
      }
      if (
        this._config.plugin_config.header_classes &&
        this._config.plugin_config.header_classes[col]
      ) {
        header_data.classList.add(
          this._config.plugin_config.header_classes[col]
        );
      }

      // put column name in content
      header_data.textContent = col;
      header_container.appendChild(header_data);

      // data
      const data_container = document.createElement("div");
      data_container.classList.add("summary-data");

      const data_data = document.createElement("span");
      data_data.classList.add("summary-data-text");

      // add user provided classes
      if (this._config.plugin_config.data_class) {
        data_data.classList.add(this._config.plugin_config.data_class);
      }
      if (
        this._config.plugin_config.data_classes &&
        this._config.plugin_config.data_classes[col]
      ) {
        data_data.classList.add(this._config.plugin_config.data_classes[col]);
      }
      data_container.appendChild(data_data);

      // add to container
      col_container.appendChild(header_container);
      col_container.appendChild(data_container);

      // put in map
      _entries.set(col, col_container);

      if (is_pivoted) {
        // pull the data from the first row
        let datum = this._data[col];

        // show the aggregation type in tooltip, using type-specific variants
        // NOTE: don't pull from schema as this will reflect the aggregate's type
        const aggregate =
          aggregations[col] || (Number.isNaN(datum) ? "count" : "sum");
        data_data.title = `${aggregate}("${col}")`;

        // truncate the data if necessary
        if (
          this._config.plugin_config.truncate &&
          this._config.plugin_config.truncate[col] >= 0
        ) {
          if (["integer", "float"].indexOf(this._schema[col]) >= 0) {
            // round to `n` decimals
            datum = Number(datum).toFixed(
              this._config.plugin_config.truncate[col]
            );
          } else if (
            ["boolean", "datetime", "date"].indexOf(this._schema[col]) >= 0
          ) {
            // do nothing
          } else {
            // truncate the string to `n` digits
            datum = new String(datum).substring(
              0,
              this._config.plugin_config.truncate[col]
            );
          }
        }

        if (["datetime", "date"].indexOf(this._schema[col]) >= 0) {
          // the data itself
          data_data.textContent = new Date(+datum).toString();
        } else {
          // the data itself
          data_data.textContent = datum;
        }

        // add classes to data if we have it and we have data
        if (
          this._config.plugin_config.data_classes &&
          this._config.plugin_config.data_classes[col]
        ) {
          data_data.classList.add(this._config.plugin_config.data_classes[col]);
        }
      } else {
        data_data.textContent = "--";
      }

      // set class based on alignment
      this._container.classList.remove("align-horizontal");
      this._container.classList.remove("align-vertical");
      this._container.classList.add(
        `align-${this._config.plugin_config.align || _ALIGN_DEFAULT}`
      );
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
