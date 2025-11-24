import type { IPerspectiveViewerPlugin } from "@finos/perspective-viewer";

declare global {
  interface CustomElementRegistry {
    get(
      tagName: "perspective-viewer-summary",
    ): PerspectiveViewerSummaryPluginElement;

    // TODO is this needed?
    whenDefined(tagName: "perspective-viewer-summary"): Promise<void>;
  }
}

interface PerspectiveViewerSummaryPluginElement
  extends IPerspectiveViewerPlugin {}

export declare class PerspectiveViewerSummaryPluginElement
  extends HTMLElement
  implements IPerspectiveViewerPlugin {}
