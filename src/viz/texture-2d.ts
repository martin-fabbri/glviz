import { GL } from './constants';
import { default as Resource, Handle } from './resource';

export interface ITextureProps {
    data: TextureDataType;
    internalFormat: number;
    type?: number;
    border?: number;
    recreate?: boolean;
    width: number;
    height: number;
    dataFormat?: any;
    offset?: number;
    level?: number;
}

export interface IDefaultProps {
    type: number;
    border: number;
    recreate: boolean;
    dataFormat: number;
    offset: number;
    level: number;
}

export type TexturePropsWithDefaults = ITextureProps & IDefaultProps;

export type TextureDataType = Float32Array | Int32Array | Uint8Array | Uint32Array;

// legal/common combinations for internalFormat, dataFormat and type
export const TEXTURE_FORMATS = {
    [GL.RGB]: {dataFormat: GL.RGB, type: GL.UNSIGNED_BYTE},
    [GL.RGBA]: {dataFormat: GL.RGBA, type: GL.UNSIGNED_BYTE},
    [GL.ALPHA]: {dataFormat: GL.ALPHA, type: GL.UNSIGNED_BYTE},
    [GL.LUMINANCE]: {dataFormat: GL.LUMINANCE, type: GL.UNSIGNED_BYTE},
    [GL.LUMINANCE_ALPHA]: {dataFormat: GL.LUMINANCE_ALPHA, type: GL.UNSIGNED_BYTE},
    [GL.RED]: {dataFormat: GL.R32F, type: GL.FLOAT},
    [GL.R8]: {dataFormat: GL.RED, type: GL.UNSIGNED_BYTE},
    [GL.R32F]: {dataFormat: GL.RED, type: GL.FLOAT}
};

class Texture2d extends Resource {
    protected readonly props: ITextureProps;
    private unit = 0;

    constructor(gl: WebGL2RenderingContext, props: ITextureProps) {
        super(gl);

        const commonCombination = TEXTURE_FORMATS[props.internalFormat];

        if (!commonCombination) {
            throw new Error(`Invalid Texture format: ${props.internalFormat}`);
        }

        this.props = {
            border: props.border || 0,
            data: props.data,
            dataFormat: props.dataFormat || commonCombination.dataFormat,
            height: props.height || 1,
            internalFormat: props.internalFormat,
            level: props.level || 0,
            offset: props.offset || 0,
            recreate: props.recreate || false,
            type: props.type || commonCombination.type,
            width: props.width || 1
        };
    }

    get texture() {
        return this.handle as WebGLTexture;
    }

    get textureProps() {
        return this.props;
    }

    get textureUnit() {
        return this.unit;
    }

    public bind(unit = this.unit) {
        const { gl, texture } = this;
        this.unit = unit;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return this;
    }

    public unbind() {
        const { gl } = this;
        gl.activeTexture(gl.TEXTURE0 + this.unit);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    public setData(data: TextureDataType = this.props.data) {
        const { border, dataFormat, internalFormat, height, level, type, width} = this
            .props as TexturePropsWithDefaults;
        const { gl } = this;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, level, dataFormat, width, height, border, internalFormat, type, data);
        // gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, dataFormat, type, data);
        return this;
    }

    public setPixeldStorei(param: number, value: number) {
        const { gl } = this;
        gl.pixelStorei(param, value);
        return this;
    }

    public magnification() {
        const { gl } = this;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        return this;
    }

    public clamp() {
        const { gl } = this;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return this;
    }

    protected createHandle(): Handle {
        const { gl } = this;
        return gl.createTexture();
    }
}

export default Texture2d;
