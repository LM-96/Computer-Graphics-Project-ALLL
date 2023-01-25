import {WebGLEnvironment} from "../webgl/webgl-environment";
import {MeshObjectManager} from "./mesh-object-manager";
import {Camera} from "../camera/camera";
import FlowedCamera from "../camera/flowed-camera";
import {ProgramInfo, SharedUniforms} from "../webgl/webgl-wrappers";
import {AngleUnit} from "../geometry/angle/angle";
import {Log} from "../log/log";
import {SlManager} from "./sl-manager";
import {Pair} from "../types/pair";

export class MeshObjectDrawer {



    readonly applicationName: string
    #glEnvironment: WebGLEnvironment
    #meshObjectManager: MeshObjectManager
    zNear: number = 0.1
    zFar: number = 200
    #camera: Camera = new FlowedCamera()
    #sharedUniforms: SharedUniforms
    #slManager: SlManager
    #lightFrustum: boolean
    #bias: number

    readonly #cubeLinesBufferInfo: any

    constructor(applicationName: string, glEnvironment: WebGLEnvironment, meshObjectManager: MeshObjectManager) {
        this.applicationName = applicationName
        this.#glEnvironment = glEnvironment
        this.#meshObjectManager = meshObjectManager
        this.#sharedUniforms = new SharedUniforms()
        this.#slManager = new SlManager(this.#sharedUniforms)
        this.#lightFrustum = false
        this.#bias = -0.006

        this.#cubeLinesBufferInfo = WebGLUtils.createBufferInfoFromArrays(
            this.#glEnvironment.getContext(), {
            position: [
                -1, -1, -1,
                1, -1, -1,
                -1,  1, -1,
                1,  1, -1,
                -1, -1,  1,
                1, -1,  1,
                -1,  1,  1,
                1,  1,  1,
            ],
            indices: [
                0, 1,
                1, 3,
                3, 2,
                2, 0,

                4, 5,
                5, 7,
                7, 6,
                6, 4,

                0, 4,
                1, 5,
                3, 7,
                2, 6,
            ],
        });
    }

    /**
     * Updates the internal *View Matrix* using the camera
     */
    updateViewMatrix() {
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | updating view matrix")
        this.#sharedUniforms.u_view = M4.inverse(this.#camera.calculateCameraMatrix())
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | view matrix updated")
    }

    /**
     * Updates the internal *Projection Matrix* using the camera, the canvas, the zNear and the zFar
     */
    updateProjectionMatrix() {
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | updating projection matrix")
        this.#sharedUniforms.u_projection = M4.perspective(
            this.#camera.getCurrentFov().getValueIn(AngleUnit.RAD),
            this.#glEnvironment.calculateAspectRatio(), this.zNear, this.zFar)
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | projection matrix updated")
    }

    drawSceneWith(projectionMatrix: number[], cameraMatrix: number[],
                     textureMatrix: number[], lightWorldMatrix: number[],
                     programInfo: ProgramInfo) {
        Log.log("MeshObjectDrawer[" + this.applicationName +
            "] | starting drawing with program info [" + programInfo + "]")
        let gl: WebGLRenderingContext = this.#glEnvironment.getContext()
        let viewMatrix = M4.inverse(cameraMatrix)
        gl.useProgram(programInfo.program)
        WebGLUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: this.#bias,
            u_textureMatrix: textureMatrix,
            u_projectedTexture: SlManager.getTextureForLights(this.#glEnvironment.getContext()).getFirst(),
            u_lightDirection: this.#slManager.calculateLightWorldMatrix().slice(8, 11),
        });
        gl.uniform1f(gl.getUniformLocation(programInfo.program, "mesh"), 1.);
        for(let meshObject of this.#meshObjectManager.getAll()) {
            Log.log("MeshObjectDrawer[" + this.applicationName + "] | drawing mesh object [" + meshObject.getName() + "]")
            meshObject.draw(gl, programInfo, false)
        }
    }


    #logDrawInformation() {
        Log.log("MeshObjectDrawer[" + this.applicationName + "]\n" +
            "\tcanvas size: " + this.#glEnvironment.getCanvas().width + "x" + this.#glEnvironment.getCanvas().height + "\n" +
            "\tcanvas aspect ratio: " + this.#glEnvironment.calculateAspectRatio() + "\n" +
            "\tcamera position: " + this.#camera.getCurrentPosition().toString() + "\n" +
            "\tcamera up: " + this.#camera.getCurrentUp().toString() + "\n" +
            "\tcamera target: " + this.#camera.getCurrentTarget().toString() + "\n" +
            "\tfov: " + this.#camera.getCurrentFov().getValueIn(AngleUnit.DEG) + "°\n" +
            "\tzNear: " + this.zNear + "\n" +
            "\tzFar: " + this.zFar + "\n" +
            "\tlightPosition: " + this.#slManager.getLightPosition().toString() + "\n" +
            "\tlightTarget: " + this.#slManager.getLightTarget().toString() + "\n" +
            "\tlightUp: " + this.#slManager.getLightUp().toString() + "\n" +
            "\tlightWidth: " + this.#slManager.getProjWidth() + "\n" +
            "\tlightHeight: " + this.#slManager.getProjHeight() + "\n" +
            "\tlightFov: " + this.#slManager.getFov().getValueIn(AngleUnit.DEG) + "°\n" +
            "\tlightZNear: " + this.#slManager.getNear() + "\n" +
            "\tlightZFar: " + this.#slManager.getFar() + "\n" +
            "\tlightFrustum: " + this.#lightFrustum + "\n" +
            "\tbias: " + this.#bias + "\n" +
            "\tshadows: " + this.#slManager.getShadows() + "\n" +
            "\tspotlight: " + this.#slManager.isSpotlight() + "\n"
        )
    }

    /**
     * Draw the scene using the object manager and the camera
     */
    renderScene() {
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | rendering scene")
        this.#logDrawInformation()
        let gl: WebGLRenderingContext = this.#glEnvironment.getContext()
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | CULL_FACE and DEPTH_TEST enabled")

        let lightWorldMatrix = this.#slManager.calculateLightWorldMatrix()
        let lightProjectionMatrix = this.#slManager.calculateLightProjectionMatrix()
        Log.log("MeshObjectDrawer[" + this.applicationName +
            "] | light world matrix and light projection matrix calculated")

        gl.bindFramebuffer(gl.FRAMEBUFFER, SlManager.getTextureForLights(this.#glEnvironment.getContext()).getSecond());
        gl.viewport(0, 0, SlManager.depthTextureSize, SlManager.depthTextureSize);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | framebuffer for depth texture bound")

        /* TO ADJUST BASED ON WHICH PROGRAMS ARE PRESENT AND USED */
        if(this.#slManager.getShadows()) {
            this.drawSceneWith(lightProjectionMatrix, lightWorldMatrix, M4.identity(), lightWorldMatrix,
                this.#glEnvironment.getProgramInfo('color'))
            Log.log("MeshObjectDrawer[" + this.applicationName + "] | shadows drawn")
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        Log.log("MeshObjectDrawer[" + this.applicationName +
            "] | framebuffer, color buffer and depth buffer cleared")

        let textureMatrix: number[] = M4.identity();
        textureMatrix = M4.translate(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = M4.scale(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = M4.multiply(textureMatrix, lightProjectionMatrix);
        textureMatrix = M4.multiply(
            textureMatrix,
            M4.inverse(lightWorldMatrix));
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | texture matrix calculated")

        this.updateProjectionMatrix()
        this.updateViewMatrix()
        let viewProjectionMatrix = M4.multiply(this.#sharedUniforms.u_projection,
            this.#sharedUniforms.u_view)
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | view projection matrix calculated")

        this.drawSceneWith(viewProjectionMatrix, this.#camera.calculateCameraMatrix(), textureMatrix,
            lightWorldMatrix, this.#glEnvironment.getProgramInfo('main'))
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | scene drawn with main program")

        if(this.#lightFrustum) {
            let viewMatrix = M4.inverse(this.#camera.calculateCameraMatrix())
            gl.useProgram(this.#glEnvironment.getProgramInfo('color').program)
            WebGLUtils.setBuffersAndAttributes(gl,
                this.#glEnvironment.getProgramInfo('color'),
                this.#cubeLinesBufferInfo);

            const mat = M4.multiply(lightWorldMatrix, M4.inverse(lightProjectionMatrix));
            WebGLUtils.setUniforms(this.#glEnvironment.getProgramInfo('color'), {
                u_color: [1, 1, 1, 1],
                u_view: viewMatrix,
                u_projection: this.#sharedUniforms.u_projection,
                u_world: mat,
            });
            WebGLUtils.drawBufferInfo(gl, this.#cubeLinesBufferInfo, gl.LINES);
            Log.log("MeshObjectDrawer[" + this.applicationName + "] | light frustum drawn")
        }
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | render complete")
    }

    setBias(bias: number) {
        this.#bias = bias
    }

    /**
     * Returns the `Camera` associated of this drawer
     */
    getCamera(): Camera {
        return this.#camera
    }

    /**
     * Returns the manager for the shadows and the lights
     */
    getSlManager(): SlManager {
        return this.#slManager
    }

    /**
     * Returns the `MeshObjectManager` associated of this drawer
     */
    getMeshObjectManager(): MeshObjectManager {
        return this.#meshObjectManager
    }

    setLightFrustum(lightFrustum: boolean) {
        this.#lightFrustum = lightFrustum
    }

    getLightFrustum(): boolean {
        return this.#lightFrustum
    }

    getBias(): number {
        return this.#bias
    }
}