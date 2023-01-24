import {
    OnCanvasMouseEvent,
    OnCanvasTouchEvent,
    OnKeyboardEvent,
    WebGL,
    WebGLApplication,
    WebGLMesh
} from "./webgl/webgl-application";
import {MeshObject} from "./obj/mesh-object";
import {Log} from "./log/log";
import {MenuControls} from "./controls/menu-controls";
import {UserInputs} from "./controls/user-inputs";

const L = 3
Log.enableLog()

@WebGL("test-app",
    "my_Canvas",
    {
        main: ["vertex-shader", "fragment-shader"],
        color:["color-vertex-shader", "color-fragment-shader"]
    }
)
class MyApp extends WebGLApplication {

    @WebGLMesh("./assets/plane-2m.obj")
    private axis: MeshObject

    @WebGLMesh("./assets/LuchettoObj/truck_final.obj")
    private helmet: MeshObject

    private menu: MenuControls
    private userInputs: UserInputs

    constructor() {
        super();
    }

    protected beforeStart() {
        this.menu = new MenuControls(this)
        this.menu.setup()
        this.userInputs = new UserInputs(this)
        this.userInputs.setTarget(this.helmet)
        this.userInputs.attachHandlers()
    }

    protected main(args: string[]): void {
        console.log("Hello world! [" + this.applicationName + "]")
        this.drawScene()
    }
}