const uidCounters = {};

/**
 * Returns a unique resource id meant for caching
 */
export function uid(id = 'resource-id') {
    // @ts-ignore
  uidCounters[id] = uidCounters[id] || 1;
    // @ts-ignore
  const count = uidCounters[id]++;
    return `${id}-${count}`;
}

export type Handle = WebGLShader | WebGLVertexArrayObject | undefined | null;

export interface IResourceProps {
    id?: string;
    handle?: Handle;
}

abstract class Resource {
    public readonly id: string;

    // todo: refine type of handle
    public readonly handle: Handle;
    protected readonly gl: WebGL2RenderingContext;

    protected constructor(glCtx: WebGL2RenderingContext | null, props: IResourceProps = {}) {
        if (!glCtx) {
            throw new Error('Invalid WebGLRenderingContext.');
        }

        this.gl = glCtx;
        const { id, handle } = props;

        this.id = id || uid(this.constructor.name);
        this.handle = handle || this.createHandle();
    }

    public delete() {
        return;
    }

    protected abstract createHandle(): Handle;
}

export default Resource;
