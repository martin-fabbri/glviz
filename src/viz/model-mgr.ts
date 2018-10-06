import { GraphTypes } from "../../../../libs/constants";
import PseudocolorModel from "./pseudocolor-model";


interface ICachedModel {
    [modelId: string]: PseudocolorModel;
}

class ModelMgr {
    private static webgl2Context: WebGL2RenderingContext;
    private static cachedModels: ICachedModel = {};

    private constructor() {}

    public static getGl() {
        if (!ModelMgr.webgl2Context) {
            const webglCanvas = document.createElement('canvas');
            webglCanvas.setAttribute('width', '300');
            webglCanvas.setAttribute('height', '300');
            ModelMgr.webgl2Context = webglCanvas.getContext('webgl2') as WebGL2RenderingContext;
            // tslint:disable-next-line
            // console.log(this.webgl2Context);
        }
        return this.webgl2Context;
    }

    public static getModel(modelType: GraphTypes) {
        const gl = ModelMgr.getGl();
        let model = ModelMgr.cachedModels[modelType];
        if (!model) {
            model = new PseudocolorModel(gl);
        }
        return model;
    }

}

export default ModelMgr;