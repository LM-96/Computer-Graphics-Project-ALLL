import {ObjPosition, WebGL, WebGLApplication, WebGLMesh} from "./webgl/webgl-application";
import {MeshObject} from "./obj/mesh-object";
import {Log} from "./log/log";
import {MenuControls} from "./controls/menu-controls";
import {UserInputs} from "./controls/user-inputs";
import {Angle, AngleUnit} from "./geometry/angle/angle";

const L = 3
Log.enableLog()
Log.disableLog()

@WebGL("test-app",
    "my_Canvas",
    {
        main: ["vertex-shader", "fragment-shader"],
        color:["color-vertex-shader", "color-fragment-shader"]
    }
)
class MyApp extends WebGLApplication {

    @WebGLMesh("./assets/LucaLanAssets/luca-lan-world.obj")
    private World: MeshObject

    @WebGLMesh("./assets/LucaLanAssets/helmet.obj")
    @ObjPosition(0,0,10)
    private helmet: MeshObject

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
        light.setLightPosition(20,50,50)
        light.setLightTarget(-10, -10, 0)
        light.setShadows(true)

        //Camera Set up
        let camera = this.getCamera()

        camera.setPosition(15,0,15);
        camera.startFollowingObject(this.helmet)
        camera.setFov(new Angle(60, AngleUnit.DEG))
        this.getMeshObjectDrawer().zFar = 700


        this.menu = new MenuControls(this)
        this.menu.setup()
        this.userInputs = new UserInputs(this)
        this.userInputs.setTarget(this.helmet)
        this.userInputs.attachHandlers()

        //Attacching handler for camera views
        //this.userInputs.attachHandler("onkeydown", this.keydownMapExtend)
    }

    protected main(args: string[]): void {
        console.log("Hello world! [" + this.applicationName + "]")
        this.drawScene()
    }
}