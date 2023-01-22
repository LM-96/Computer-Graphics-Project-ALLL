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

    //@WebGLMesh("./assets/plane-2m.obj")
    //@ObjScale(L, L, 0)
    //private floor: MeshObject

    @WebGLMesh("./assets/cubo_con_assi.obj")
    @ObjPosition(0, 0, 0.25)
    @ObjScale(0.25, 0.25, 0.25)
    @ObjLimitsChecker(LimitsCheckers.linear(-L+0.25, L-0.25, -L+0.25, L-0.25, 3, 3))
    private cube: MeshObject

    constructor() {
        super();
    }

    @onSignal("mesh-objects.cube.translation")
    handler(signal: Signal<MeshObject, PerformedTranslation, void>): void {
        console.log("Handler called (obj: " + signal.source.getName() + ", translation: " +
            signal.data.translationVector.toString() + ")")
    }
    protected main(args: string[]): void {
        console.log("Hello world! [" + this.applicationName + "]")
        this.drawScene()
    }
}