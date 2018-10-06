// WebGL1
import Texture2d from './texture-2d';

const GL_FLOAT = 0x1406;
const GL_FLOAT_VEC2 = 0x8b50;
const GL_FLOAT_VEC3 = 0x8b51;
const GL_FLOAT_VEC4 = 0x8b52;

const GL_INT = 0x1404;
const GL_INT_VEC2 = 0x8b53;
const GL_INT_VEC3 = 0x8b54;
const GL_INT_VEC4 = 0x8b55;

const GL_BOOL = 0x8b56;
const GL_BOOL_VEC2 = 0x8b57;
const GL_BOOL_VEC3 = 0x8b58;
const GL_BOOL_VEC4 = 0x8b59;

const GL_FLOAT_MAT2 = 0x8b5a;
const GL_FLOAT_MAT3 = 0x8b5b;
const GL_FLOAT_MAT4 = 0x8b5c;

const GL_SAMPLER_2D = 0x8b5e;
const GL_SAMPLER_CUBE = 0x8b60;

// WebGL2
const GL_UNSIGNED_INT = 0x1405;
const GL_UNSIGNED_INT_VEC2 = 0x8dc6;
const GL_UNSIGNED_INT_VEC3 = 0x8dc7;
const GL_UNSIGNED_INT_VEC4 = 0x8dc8;

// todo: rename x variables
// tslint:disable-next-line:variable-name
const GL_FLOAT_MAT2x3 = 0x8b65;
// tslint:disable-next-line:variable-name
const GL_FLOAT_MAT2x4 = 0x8b66;
// tslint:disable-next-line:variable-name
const GL_FLOAT_MAT3x2 = 0x8b67;
// tslint:disable-next-line:variable-name
const GL_FLOAT_MAT3x4 = 0x8b68;
// tslint:disable-next-line:variable-name
const GL_FLOAT_MAT4x2 = 0x8b69;
// tslint:disable-next-line:variable-name
const GL_FLOAT_MAT4x3 = 0x8b6a;

const GL_SAMPLER_3D = 0x8b5f;
const GL_SAMPLER_2D_SHADOW = 0x8b62;
const GL_SAMPLER_2D_ARRAY = 0x8dc1;
const GL_SAMPLER_2D_ARRAY_SHADOW = 0x8dc4;
const GL_SAMPLER_CUBE_SHADOW = 0x8dc5;
const GL_INT_SAMPLER_2D = 0x8dca;
const GL_INT_SAMPLER_3D = 0x8dcb;
const GL_INT_SAMPLER_CUBE = 0x8dcc;
const GL_INT_SAMPLER_2D_ARRAY = 0x8dcf;
const GL_UNSIGNED_INT_SAMPLER_2D = 0x8dd2;
const GL_UNSIGNED_INT_SAMPLER_3D = 0x8dd3;
const GL_UNSIGNED_INT_SAMPLER_CUBE = 0x8dd4;
const GL_UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8dd7;

// Pre-allocated typed arrays for temporary conversion
const FLOAT_ARRAY = {};
const INT_ARRAY = {};
const UINT_ARRAY = {};

export type UniformArrayType = Float32Array | Int32Array | Uint32Array | ArrayLike<number> | number | Texture2d;

const uniformSetters = {
    // WebGL1
    [GL_FLOAT]: (gl: WebGL2RenderingContext, location: WebGLUniformLocation, value: number) =>
        gl.uniform1f(location, value),

    [GL_FLOAT_VEC2]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniform2fv(location, toFloatArray(value, 2)),

    [GL_FLOAT_VEC3]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniform3fv(location, toFloatArray(value, 3)),

    [GL_FLOAT_VEC4]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniform4fv(location, toFloatArray(value, 4)),

    [GL_INT]: (gl: WebGL2RenderingContext, location: WebGLUniformLocation, value: number) =>
        gl.uniform1i(location, value),

    [GL_INT_VEC2]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniform2iv(location, toIntArray(value, 2)),

    [GL_INT_VEC3]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniform3iv(location, toIntArray(value, 3)),

    [GL_INT_VEC4]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniform4iv(location, toIntArray(value, 4)),

    [GL_BOOL]: (gl: WebGL2RenderingContext, location: WebGLUniformLocation, value: number) =>
        gl.uniform1i(location, value),

    [GL_BOOL_VEC2]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniform2iv(location, toIntArray(value, 2)),

    [GL_BOOL_VEC3]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniform3iv(location, toIntArray(value, 3)),

    [GL_BOOL_VEC4]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniform4iv(location, toIntArray(value, 4)),

    // uniformMatrix(false): don't transpose the matrix
    [GL_FLOAT_MAT2]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniformMatrix2fv(location, false, toFloatArray(value, 4)),

    [GL_FLOAT_MAT3]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniformMatrix3fv(location, false, toFloatArray(value, 9)),

    [GL_FLOAT_MAT4]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniformMatrix4fv(location, false, toFloatArray(value, 16)),

    [GL_SAMPLER_2D]: (gl: WebGL2RenderingContext, location: WebGLUniformLocation, value: number) =>
        gl.uniform1i(location, value),

    [GL_SAMPLER_CUBE]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    // WebGL2 - unsigned integers, irregular matrices, additional texture samplers
    [GL_UNSIGNED_INT]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1ui(location, value),

    [GL_UNSIGNED_INT_VEC2]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: any
    ) => gl.uniform2uiv(location, toUIntArray(value, 2)),

    [GL_UNSIGNED_INT_VEC3]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: any
    ) => gl.uniform3uiv(location, toUIntArray(value, 3)),

    [GL_UNSIGNED_INT_VEC4]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: any
    ) => gl.uniform4uiv(location, toUIntArray(value, 4)),

    // uniformMatrix(false): don't transpose the matrix
    [GL_FLOAT_MAT2x3]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniformMatrix2x3fv(location, false, toFloatArray(value, 6)),

    [GL_FLOAT_MAT2x4]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniformMatrix2x4fv(location, false, toFloatArray(value, 8)),

    [GL_FLOAT_MAT3x2]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniformMatrix3x2fv(location, false, toFloatArray(value, 6)),

    [GL_FLOAT_MAT3x4]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniformMatrix3x4fv(location, false, toFloatArray(value, 12)),

    [GL_FLOAT_MAT4x2]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniformMatrix4x2fv(location, false, toFloatArray(value, 8)),

    [GL_FLOAT_MAT4x3]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: UniformArrayType
    ) => gl.uniformMatrix4x3fv(location, false, toFloatArray(value, 12)),

    [GL_SAMPLER_3D]: (gl: WebGL2RenderingContext, location: WebGLUniformLocation, value: number) =>
        gl.uniform1i(location, value),

    [GL_SAMPLER_2D_SHADOW]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_SAMPLER_2D_ARRAY]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_SAMPLER_2D_ARRAY_SHADOW]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_SAMPLER_CUBE_SHADOW]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_INT_SAMPLER_2D]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_INT_SAMPLER_3D]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_INT_SAMPLER_CUBE]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_INT_SAMPLER_2D_ARRAY]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_UNSIGNED_INT_SAMPLER_2D]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_UNSIGNED_INT_SAMPLER_3D]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_UNSIGNED_INT_SAMPLER_CUBE]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value),

    [GL_UNSIGNED_INT_SAMPLER_2D_ARRAY]: (
        gl: WebGL2RenderingContext,
        location: WebGLUniformLocation,
        value: number
    ) => gl.uniform1i(location, value)
};

function toTypedArray<T>(
    value: UniformArrayType,
    uniformLength: number,
    t: new (l: number) => T,
    cache: any
): T {
    if (!Array.isArray(value) && !(value instanceof Float32Array) && !(value instanceof Int32Array)
      && !(value instanceof Uint32Array)
    ) {
        const r = new t(1);
        // @ts-ignore
        r[0] = value;
        return r;
    }
    const length = value.length;
    if (length % uniformLength) {
        // tslint:disable-next-line
        console.warn(`Uniform size should be multiples of ${uniformLength}`, value);
    }

    if (value instanceof t) {
        return value;
    }
    let result = cache[length];
    if (!result) {
        result = new t(length);
        cache[length] = result;
    }
    for (let i = 0; i < length; i++) {
        result[i] = value[i];
    }
    return result;
}

export function toFloatArray(value: UniformArrayType, uniformLength: number): Float32Array {
    return toTypedArray<Float32Array>(value, uniformLength, Float32Array, FLOAT_ARRAY);
}

export function toIntArray(value: UniformArrayType, uniformLength: number): Int32Array {
    return toTypedArray<Int32Array>(value, uniformLength, Int32Array, INT_ARRAY);
}

export function toUIntArray(value: UniformArrayType, uniformLength: number): Uint32Array {
    return toTypedArray<Uint32Array>(value, uniformLength, Uint32Array, UINT_ARRAY);
}

export function getUniformSetter(
    gl: WebGL2RenderingContext,
    location: WebGLUniformLocation,
    info: WebGLActiveInfo
) {
    // @ts-ignore
  const setter = uniformSetters[info.type];
    if (!setter) {
        throw new Error(`Unknown GLSL uniform type ${info.type}`);
    }
    return setter.bind(null, gl, location);
}
