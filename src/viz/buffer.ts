import { GL } from './constants';
import { default as Resource, Handle } from './resource';

export type BufferDataType =
    | Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint16Array
    | Uint32Array
    | Uint8ClampedArray
    | Float32Array
    | Float64Array
    | DataView
    | ArrayBuffer
    | null;

export interface IBufferProps {
    data: BufferDataType;
    usage?: number;
    type?: number;
    size?: number;
    offset?: number;
    stride?: number;
    normalized?: boolean;
}

export interface IDefaultBufferProps {
    usage: number;
    type: number;
    size: number;
    offset: number;
    stride: number;
    normalized: boolean;
}

export type BufferPropsWithDefaults = IBufferProps & IDefaultBufferProps;

const defaultProps: IDefaultBufferProps = {
    normalized: false,
    offset: 0,
    size: 2,
    stride: 0,
    type: GL.FLOAT,
    usage: GL.STATIC_DRAW
};

class Buffer extends Resource {
    private props: BufferPropsWithDefaults;
    private target: number = 0;

    get buffer() {
        return this.handle as WebGLBuffer;
    }

    get layout() {
        return this.props;
    }

    constructor(gl: WebGL2RenderingContext | null, props: IBufferProps) {
        super(gl);
        this.props = {
            data: props.data,
            normalized: props.normalized || defaultProps.normalized,
            offset: props.offset || defaultProps.offset,
            size: props.size || defaultProps.size,
            stride: props.stride || defaultProps.stride,
            type: props.type || defaultProps.type,
            usage: props.usage || defaultProps.usage
        };
        this.initialize();
    }

    public bind(target: number = GL.ARRAY_BUFFER) {
        const { buffer, gl } = this;
        this.target = target;
        gl.bindBuffer(this.target, buffer);
        return this;
    }

    public unbind() {
        const { gl, target } = this;
        gl.bindBuffer(target, null);
        return this;
    }

    protected createHandle(): Handle {
        return this.gl.createBuffer();
    }

    private initialize() {
        const { buffer, gl } = this;
        const { data, usage } = this.props;
        this.gl.bindBuffer(gl.COPY_WRITE_BUFFER, buffer);
        this.gl.bufferData(gl.COPY_WRITE_BUFFER, data, usage);
        this.gl.bindBuffer(gl.COPY_WRITE_BUFFER, null);
    }
}

export default Buffer;
