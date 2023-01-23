import {WebGL, WebGLApplication, WebGLMesh, ObjPosition, ObjScale, ObjLimitsChecker} from "./webgl/webgl-application";
import {MeshObject} from "./obj/mesh-object";
import {LimitsCheckers} from "./geometry/limits/limits-checkers";
import {Log} from "./log/log";
import PerformedTranslation from "./geometry/data/performed-translation";
import {Signal} from "./signals/signal";
import {onSignal} from "./signals/options";
import {MenuControls} from "./controls/menu_controls";

const L = 3
Log.enableLog()

@WebGL("test-app",
    "my_Canvas",
    ["vertex-shader", "fragment-shader"])
class MyApp extends WebGLApplication {

    @WebGLMesh("./assets/LuchettoObj/world_decimate.obj")
    private world: MeshObject

    @WebGLMesh("./assets/LuchettoObj/truck_final.obj")
    private helmet: MeshObject

    private menu: MenuControls

    constructor() {
        super();
    }

    protected main(args: string[]): void {
        console.log("Hello world! [" + this.applicationName + "]")
        this.menu = new MenuControls(this)
        this.menu.setup()
        this.drawScene()
    }
}