import {
    ObjLimitsChecker,
    ObjPosition,
    ObjRotation,
    ObjScale,
    OnCanvasMouseEvent,
    OnCanvasTouchEvent,
    OnKeyboardEvent,
    WebGL,
    WebGLApplication,
    WebGLMesh,
    WebGLShaderReference
} from "./webgl/webgl-application";
import {MeshObject} from "./obj/mesh-object";
import {Log} from "./log/log";
import {MenuControls} from "./controls/menu-controls";
import {UserInputs} from "./controls/user-inputs";
import {LimitsCheckers} from "./geometry/limits/limits-checkers";
import {degree} from "./geometry/angle/angle";
import {Point3D} from "./geometry/point/point-3d";
import {CameraManWorkMode} from "./camera/camera-man";

const SHADERS: WebGLShaderReference = {
    main: ["vertex-shader", "fragment-shader"],
    color:["color-vertex-shader", "color-fragment-shader"]
}

// VERTICES OF THE WORLD (0, 0), (B, 0), (B, -H), (0, -H)
const BASE: number = 200
const HIGH: number = 365
const TOLERANCE: number = 3

@WebGL("gotham-app", "my_Canvas", SHADERS)
class GothamApp extends WebGLApplication {

    @WebGLMesh("./assets/objs/batmoto.obj")
    @ObjPosition(170,-131,1)
    @ObjRotation(degree(0),degree(0),degree(90))
    @ObjScale(0.3,0.3,0.3)
    @ObjLimitsChecker(LimitsCheckers.linear(TOLERANCE, HIGH - TOLERANCE,
        -BASE + TOLERANCE, 0 - TOLERANCE, 1, 1))
    private batMoto: MeshObject

    @WebGLMesh("./assets/objs/city.obj")
    @ObjScale(0.7,0.7,0.7)
    private world: MeshObject

    private menu: MenuControls
    private userInputs: UserInputs
    constructor() {
        super();
    }

    @OnCanvasMouseEvent("mousedown")
    @OnCanvasTouchEvent("touchstart")
    protected onMouseDown(e: MouseEvent|TouchEvent) {
        Log.log("WebGLApplication | capturing mouse down [event type: " + e.type + "]")
        this.userInputs.mouseDown(e)
    }

    @OnCanvasMouseEvent("mouseup")
    @OnCanvasTouchEvent("touchend")
    @OnCanvasMouseEvent("mouseout")
    protected onMouseUp(e: MouseEvent|TouchEvent) {
        Log.log("WebGLApplication | capturing mouse up [event type: " + e.type + "]")
        this.userInputs.mouseUp1(e)
    }

    @OnCanvasMouseEvent("mousemove")
    @OnCanvasTouchEvent("touchmove")
    protected onMouseMove(e: MouseEvent|TouchEvent) {
        Log.log("WebGLApplication | capturing mouse move [event type: " + e.type + "]")
        this.userInputs.mouseMove1(e)
    }

    @OnKeyboardEvent("keydown")
    onKeyDown(e: KeyboardEvent) {
        Log.log("WebGLApplication | capturing key down [event type: " + e.type +
            ", key: " + e.key + "]")
        this.userInputs.keydownMap(e)
    }

    protected init() {
        this.menu = new MenuControls(this)
        this.userInputs = new UserInputs(this)
    }

    protected afterObjectsLoaded() {
        // It's now possible to setup the menu
        Log.log("WebGLApplication | after objects loaded")
        let cameraMan = this.getMeshObjectDrawer().getCameraMan()
        cameraMan.setTarget(this.batMoto)
        cameraMan.setPhase(this.batMoto.getPolarRotation().getThird().multiply(-1))
        cameraMan.hire(CameraManWorkMode.THIRD_PERSON)
    }

    protected afterEventsRegistered() {
        // Set the target object of the user inputs used by the event listeners
        // immediately after they
        Log.log("WebGLApplication | after events registered")
        this.userInputs.setTarget(this.batMoto)
    }

    protected beforeStart() {
        // Light Set up
        let light = this.getMeshObjectDrawer().getSlManager()
        light.setFar(200)
        light.setProjHeight(500)
        light.setProjWidth(500)
        light.setLightPosition(200,20,100)
        light.setLightTarget(20, 20, 0)
        light.setShadows(true)

        this.getMeshObjectDrawer().zFar = 700
        this.menu.setup()
    }

    protected main(args: string[]): void {
        console.log("Hello world! [" + this.applicationName + "]")
        this.renderScene()
    }
}