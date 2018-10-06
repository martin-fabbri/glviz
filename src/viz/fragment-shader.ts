import { ShaderType } from './constants';
import { Handle } from './resource';
import { default as Shader } from './shader';

const type = ShaderType.FragmentShader;

class FragmentShader extends Shader {
    constructor(gl: WebGL2RenderingContext, source: string) {
        super(gl, type, source);
    }

    protected createHandle(): Handle {
        const { gl } = this;
        return gl.createShader(gl.FRAGMENT_SHADER);
    }
}

export default FragmentShader;
