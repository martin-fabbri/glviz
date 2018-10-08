import {mat4} from 'gl-matrix';
import * as React from 'react';
import VertexBuffer from '../viz/buffer';
import Program from '../viz/program';

const VERTEX_SHADER = `#version 300 es
    in vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
`;

const FRAGMENT_SHADER = `#version 300 es
    precision mediump float;
    out vec4 outColor;
    
    void main() {
      outColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;


class Model extends React.Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    public componentDidMount() {
        const gl = this.canvasRef.current!.getContext('webgl2');

        if (!gl) {
            return;
        }

        const positions = [
            -1.0,  1.0,
            1.0,  1.0,
            -1.0, -1.0,
            1.0, -1.0,
        ];

        const positionBuffer = new VertexBuffer(gl, {
            data: new Float32Array(positions)
        });

        const fieldOfView = 45 * Math.PI / 180;   // in radians
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();

        // note: glmatrix.js always has the first argument
        // as the destination to receive the result.
        mat4.perspective(projectionMatrix,
            fieldOfView,
            aspect,
            zNear,
            zFar);

        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        const modelViewMatrix = mat4.create();

        // Now move the drawing position a bit to where we want to
        // start drawing the square.

        mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [-0.0, 0.0, -6.0]);  // amount to translate

        const program = new Program(gl, {
            fs: FRAGMENT_SHADER,
            vs: VERTEX_SHADER
        });
        program
            .use()
            .setViewport(gl.canvas.width, gl.canvas.height)
            .clear()
            .setBuffers({ aVertexPosition: positionBuffer })
            .setUniforms({
                uModelViewMatrix: modelViewMatrix,
                uProjectionMatrix: projectionMatrix,
            });

        gl!.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    public render() {
        return (
            <>
                <div>test</div>
                <canvas ref={this.canvasRef} width={500} height={500} style={{width: 500, height: 500}}/>
            </>
        );
    }
}

export default Model;
