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

    @WebGLMesh("./assets/Consegna_fiori/Saviano2.obj")
    private Saviano: MeshObject

    @WebGLMesh("./assets/Consegna_fiori/furgoncino.obj")
    @ObjScale(0.7, 0.7, 0.7)
    @ObjPosition(0,0,1)
    private Furgoncino: MeshObject

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

        camera.setPosition(15,0,5);
        this.getMeshObjectDrawer().zFar = 700
        camera.startFollowingObject(this.Furgoncino)


        this.menu = new MenuControls(this)
        this.menu.setup()
        this.userInputs = new UserInputs(this)
        this.userInputs.setTarget(this.Furgoncino)
        this.userInputs.attachHandlers()
    }

    protected main(args: string[]): void {
        console.log("Hello world! [" + this.applicationName + "]")
        this.drawScene()
    }
}