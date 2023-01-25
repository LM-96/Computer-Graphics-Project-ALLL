import {
    ObjPosition, ObjScale,
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

    @WebGLMesh("./assets/obj_de_risi/city_lude.obj")
    private World: MeshObject

    @WebGLMesh("./assets/obj_de_risi/truck_de_risi.obj")
    @ObjPosition(0,0,0)
    @ObjScale(2,2,2)
    private truck: MeshObject

    private menu: MenuControls
    private userInputs: UserInputs

    constructor() {
        super();
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

        camera.setPosition(20,0,8);
        camera.startFollowingObject(this.truck)


        this.menu = new MenuControls(this)
        this.menu.setup()
        this.userInputs = new UserInputs(this)
        this.userInputs.setTarget(this.truck)
        this.userInputs.attachHandlers()
    }

    protected main(args: string[]): void {
        console.log("Hello world! [" + this.applicationName + "]")
        this.drawScene()
    }
}