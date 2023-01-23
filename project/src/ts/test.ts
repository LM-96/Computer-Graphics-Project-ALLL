import {WebGL, WebGLApplication, WebGLMesh} from "./webgl/webgl-application";
import {MeshObject} from "./obj/mesh-object";
import {Log} from "./log/log";
import {MenuControls} from "./controls/menu-controls";

const L = 3
Log.enableLog()

@WebGL("test-app",
    "my_Canvas",
    ["vertex-shader", "fragment-shader"])
class MyApp extends WebGLApplication {

    @WebGLMesh("./assets/assi.obj")
    private axis: MeshObject

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