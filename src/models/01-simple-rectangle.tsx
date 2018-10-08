import * as React from 'react';
import VertexBuffer from '../viz/buffer';
import Program from '../viz/program';

const VERTEX_SHADER = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

// all shaders have a main function
void main() {

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

const FRAGMENT_SHADER = `#version 300 es

precision mediump float;

uniform vec4 u_color;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = u_color;
  
}
`;


class Model extends React.Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    public componentDidMount() {
        console.log('component did mount');
        const gl = this.canvasRef.current!.getContext('webgl2');

        if (!gl) {
            console.error('No GL.');
            return;
        }

        const x1 = 30;
        const x2 = 60;
        const y1 = 30;
        const y2 = 60;

        const positionBuffer = new VertexBuffer(gl, {
            data: new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y2, x2, y1])
        });

        const colorUniform = new Float32Array([Math.random(), Math.random(), Math.random(), 1]);
        const resolutionUniform = new Int32Array([gl!.canvas.width, gl!.canvas.height]);

        const program = new Program(gl, {
            fs: FRAGMENT_SHADER,
            vs: VERTEX_SHADER
        });

        program
            .use()
            .setViewport(gl.canvas.width, gl.canvas.height)
            .clear()
            .setBuffers({ a_position: positionBuffer })
            .setUniforms({
                u_color: colorUniform,
                u_resolution: resolutionUniform
            });

        gl.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    public render() {
        return <canvas ref={this.canvasRef} width={500} height={500} style={{width: 500, height: 500}}/>;
    }
}

export default Model;
