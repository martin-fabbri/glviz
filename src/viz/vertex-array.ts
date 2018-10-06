import { default as VertexBuffer } from './buffer';
import { default as Resource, Handle } from './resource';

class VertexArray extends Resource {
    public static getInstance(gl: WebGL2RenderingContext | null) {
        if (!VertexArray.instance) {
            VertexArray.instance = new VertexArray(gl);
        }
        return VertexArray.instance;
    }

    private static instance: VertexArray;

    private constructor(gl: WebGL2RenderingContext | null) {
        super(gl);
    }

    get vao() {
        return this.handle as WebGLVertexArrayObject;
    }

    public setBuffer(location: number, buffer: VertexBuffer) {
        const { gl } = this;
        buffer.bind(gl.ARRAY_BUFFER);
        gl.enableVertexAttribArray(location);

        const { size, type, normalized, stride, offset } = buffer.layout;
        gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        gl.bindVertexArray(null);
    }

    public bind() {
        const { gl, vao } = this;
        gl.bindVertexArray(vao);
        return this;
    }

    public unbind() {
        const { gl } = this;
        gl.bindVertexArray(null);
        return this;
    }

    protected createHandle(): Handle {
        return this.gl.createVertexArray();
    }
}

export default VertexArray;
