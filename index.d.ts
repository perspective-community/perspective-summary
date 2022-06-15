import {View} from "@finos/perspective";

declare global {
    interface CustomElementRegistry {
        get(
            tagName: "perspective-viewer-summary"
        ): PerspectiveViewerSummaryPluginElement;

        whenDefined(
            tagName: "perspective-viewer-datagrid"
        ): Promise<PerspectiveViewerDatagridPluginElement>;
    }
}

export declare class PerspectiveViewerDatagridPluginElement extends HTMLElement {
    public readonly content: HTMLElement;

    // getters accessors
    public get name(): string;

    // customElements methods
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;

    // view related methods
    public activate(view: View): Promise<void>;
    public draw(view: View): Promise<void>;
    public update(view: View): Promise<void>;
    public restyle(view: View): Promise<void>;

    // other public methods
    public resize(): Promise<void>;
    public clear(): Promise<void>;
    public delete(): void;
    public save(): Promise<void>;
    public restore(token: unknown): Promise<void>;
}
