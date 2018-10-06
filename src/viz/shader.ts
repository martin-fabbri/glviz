import { ShaderType } from './constants';
import { default as Resource, Handle } from './resource';

abstract class Shader extends Resource {
    protected type: ShaderType;

    protected constructor(
        gl: WebGL2RenderingContext,
        type: ShaderType = ShaderType.VertexShader,
        source: string
    ) {
        super(gl);
        this.type = type;
        this.compile(source);
    }

    get shader() {
        return this.handle as WebGLShader;
    }

    protected abstract createHandle(): Handle;

    private compile(source: string) {
        const { gl, handle } = this;
        const shader = handle as WebGLShader;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        // todo: For performance reasons, avoid checking shader compilation errors on production?
        // todo: Introduce env variable?
        // todo: Is resource is getting cached?
        // https://gamedev.stackexchange.com/questions/30429/how-to-detect-glsl-warnings
        const compileStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compileStatus) {
            // tslint:disable-next-line
            console.error(
                'An error occurred compiling the fragment shader.',
                gl.getShaderInfoLog(shader)
            );
            gl.deleteShader(shader);
            throw new Error(`GLSL compilation error: ${gl.getShaderInfoLog(shader)}`);
        }
    }
}

export default Shader;
