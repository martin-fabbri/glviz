import * as React from 'react';
import VertexBuffer from '../viz/buffer';
import Program from '../viz/program';

const VERTEX_SHADER = `#version 300 es
    in vec3 aPosition;

    uniform float uPointSize;

    void main() {
        gl_PointSize = uPointSize;
        gl_Position = vec4(aPosition, 1.0);
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

        const position = [
            0.0,  0.0,
            0.0,  0.5,
            -0.5, -0.5,
        ];

        const positionBuffer = new VertexBuffer(gl, {
            data: new Float32Array(position)
        });

        const program = new Program(gl, {
            fs: FRAGMENT_SHADER,
            vs: VERTEX_SHADER
        });
        program
            .use()
            .setViewport(gl.canvas.width, gl.canvas.height)
            .clear()
            .setBuffers({ aPosition: positionBuffer })
            .setUniforms({
                uPointSize: 50.0,
            });

        gl!.drawArrays(gl.POINTS, 0, 3);
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
