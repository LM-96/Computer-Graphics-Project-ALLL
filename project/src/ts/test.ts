import {WebGL, WebGLApplication, WebGLMesh, ObjPosition, ObjScale, ObjLimitsChecker} from "./webgl/webgl-application";
import {MeshObject} from "./obj/mesh-object";
import {LimitsCheckers} from "./geometry/limits/limits-checkers";
import {Log} from "./log/log";
import PerformedTranslation from "./geometry/data/performed-translation";
import {Signal} from "./signals/signal";
import {onSignal} from "./signals/options";

const L = 3
Log.enableLog()

@WebGL("test-app",
    "my_Canvas",
    ["vertex-shader", "fragment-shader"])
class MyApp extends WebGLApplication {

    // @WebGLMesh("./assets/AntoniosObj/world_tiger.obj")
    // private world: MeshObject

    @WebGLMesh("./assets/AntoniosObj/helmet.obj")
    private helmet: MeshObject

    constructor() {
        super();
    }

    protected main(args: string[]): void {
        console.log("Hello world! [" + this.applicationName + "]")
        this.drawScene()
    }
}