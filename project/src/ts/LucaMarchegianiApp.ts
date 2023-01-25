import {
    ObjPosition, ObjScale,
    OnCanvasMouseEvent,
    OnCanvasTouchEvent,
    OnKeyboardEvent,
    WebGL,
    WebGLApplication,
    WebGLMesh, WebGLShaderReference
} from "./webgl/webgl-application";
import {MeshObject} from "./obj/mesh-object";
import {Log} from "./log/log";
import {MenuControls} from "./controls/menu-controls";
import {UserInputs} from "./controls/user-inputs";

const SHADERS: WebGLShaderReference = {
    main: ["vertex-shader", "fragment-shader"],
    color:["color-vertex-shader", "color-fragment-shader"]
}

@WebGL("gotham-app", "my_Canvas", SHADERS)
class GothamApp extends WebGLApplication {

    @WebGLMesh("./assets/objs/city.obj")
    @ObjScale(0.7,0.7,0.7)
    private world: MeshObject

    @WebGLMesh("./assets/objs/batmoto.obj")
    @ObjPosition(0,0,1)
    @ObjScale(0.3,0.3,0.3)
    private batMoto: MeshObject

    private menu: MenuControls
    private userInputs: UserInputs
    constructor() {
        super();
        this.userInputs = new UserInputs(this)
    }

    //@OnCanvasTouchEvent("mousedown")
    //@OnCanvasTouchEvent("touchstart")
    protected onMouseDown(e: MouseEvent|TouchEvent) {
        Log.log("WebGLApplication | capturing mouse down [event type: " + e.type + "]")
        this.userInputs.mouseDown(e)
    }

    // @OnCanvasMouseEvent("mouseup")
    // @OnCanvasTouchEvent("touchend")
    // @OnCanvasMouseEvent("mouseout")
    protected onMouseUp(e: MouseEvent|TouchEvent) {
        Log.log("WebGLApplication | capturing mouse up [event type: " + e.type + "]")
        this.userInputs.mouseUp1(e)
    }

    // @OnCanvasMouseEvent("mousemove")
    // @OnCanvasTouchEvent("touchmove")
    protected onMouseMove(e: MouseEvent|TouchEvent) {
        Log.log("WebGLApplication | capturing mouse move [event type: " + e.type + "]")
        this.userInputs.mouseMove1(e)
    }

    // @OnKeyboardEvent("keydown")
    onKeyDown(e: KeyboardEvent) {
        Log.log("WebGLApplication | capturing key down [event type: " + e.type +
            ", key: " + e.key + "]")
        this.userInputs.keydownMap(e)
    }

    protected beforeStart() {
        // Light Set up
        let light = this.getMeshObjectDrawer().getSlManager()
        light.setFar(200)
        light.setProjHeight(200)
        light.setProjWidth(200)
        light.setLightPosition(20,20,100)
        light.setLightTarget(20, 20, 0)
        light.setShadows(true)

        //Camera Set up
        let camera = this.getCamera()

        camera.setPosition(25,0,20);
        this.getMeshObjectDrawer().zFar = 700
        camera.startFollowingObject(this.batMoto)


        this.menu = new MenuControls(this)
        this.menu.setup()
        this.userInputs.setTarget(this.batMoto)
        this.userInputs.attachHandlers()
    }

    protected main(args: string[]): void {
        console.log("Hello world! [" + this.applicationName + "]")
        this.renderScene()
    }
}