import {WebGLEnvironment} from "../webgl/webgl-environment";
import {MeshObjectManager} from "./mesh-object-manager";
import {Camera} from "../camera/camera";
import FlowedCamera from "../camera/flowed-camera";
import {ProgramInfo, SharedUniforms} from "../webgl/webgl-wrappers";
import {AngleUnit} from "../geometry/angle/angle";
import {Log} from "../log/log";

export class MeshObjectDrawer {
    readonly applicationName: string
    #glEnvironment: WebGLEnvironment
    #meshObjectManager: MeshObjectManager
    zNear: number = 0.1
    zFar: number = 200
    #camera: Camera = new FlowedCamera()
    #sharedUniforms: SharedUniforms = new SharedUniforms()

    constructor(applicationName: string, glEnvironment: WebGLEnvironment, meshObjectManager: MeshObjectManager) {
        this.applicationName = applicationName
        this.#glEnvironment = glEnvironment
        this.#meshObjectManager = meshObjectManager
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

    /**
     * Begin the drawing process
     */
    startDrawing() {
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | starting drawing...")
        Log.log("MeshObjectDrawer[" + this.applicationName + "]\n" +
            "\tcanvas size: " + this.#glEnvironment.getCanvas().width + "x" + this.#glEnvironment.getCanvas().height + "\n" +
            "\tcanvas aspect ratio: " + this.#glEnvironment.calculateAspectRatio() + "\n" +
            "\tcamera position: " + this.#camera.getCurrentPosition().toString() + "\n" +
            "\tcamera up: " + this.#camera.getCurrentUp().toString() + "\n" +
            "\tcamera target: " + this.#camera.getCurrentTarget().toString() + "\n" +
            "\tfov: " + this.#camera.getCurrentFov().getValueIn(AngleUnit.DEG) + "°\n" +
            "\tzNear: " + this.zNear + "\n" +
            "\tzFar: " + this.zFar
        )

        let gl: WebGLRenderingContext = this.#glEnvironment.getContext()
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | context obtained [" + gl + "]")

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        gl.enable(gl.DEPTH_TEST)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        this.updateProjectionMatrix()
        this.updateViewMatrix()

        gl.useProgram(this.#glEnvironment.getProgram())
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | program used [" + this.#glEnvironment.getProgram() + "]")

        WebGLUtils.setUniforms(this.#glEnvironment.getProgramInfo(), this.#sharedUniforms)
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | uniforms set [" + this.#sharedUniforms + "]")
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | start drawing done!")
    }

    /**
     * Draw the scene using the object manager and the camera
     */
    drawScene() {
        Log.log("MeshObjectDrawer[" + this.applicationName + "] | drawing scene")

        let gl: WebGLRenderingContext = this.#glEnvironment.getContext()
        let programInfo: ProgramInfo = this.#glEnvironment.getProgramInfo()
        this.startDrawing()
        for(let meshObject of this.#meshObjectManager.getAll()) {
            Log.log("MeshObjectDrawer[" + this.applicationName + "] | drawing mesh object [" + meshObject.getName() + "]")
            meshObject.draw(gl, programInfo, false)
        }

        Log.log("MeshObjectDrawer[" + this.applicationName + "] | scene drawn")
    }

    /**
     * Returns the `Camera` associated of this drawer
     */
    getCamera(): Camera {
        return this.#camera
    }

    /**
     * Returns the `MeshObjectManager` associated of this drawer
     */
    getMeshObjectManager(): MeshObjectManager {
        return this.#meshObjectManager
    }
}