import type { IPerspectiveViewerPlugin } from "@finos/perspective-viewer";

declare global {
  interface CustomElementRegistry {
    get(
      tagName: "perspective-viewer-summary"
    ): HTMLPerspectiveViewerExamplePluginElement;

    // TODO is this needed?
    whenDefined(tagName: "perspective-viewer-summary"): Promise<void>;
  }
}

interface HTMLPerspectiveViewerSummaryPluginElement
  extends IPerspectiveViewerPlugin {}

export declare class HTMLPerspectiveViewerSummaryPluginElement
  extends HTMLElement
  implements IPerspectiveViewerPlugin {}
