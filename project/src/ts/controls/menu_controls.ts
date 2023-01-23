import {WebGLApplication} from "../webgl/webgl-application";
import {MeshObject} from "../obj/mesh-object";
import {degree} from "../geometry/angle/angle";

var ACTIVE_MENU_CONTROLS: MenuControls
export class MenuControls {

    readonly application: WebGLApplication
    activeObj: MeshObject
    widgets: any
    readonly #loadedObj: Array<string>
    private readonly settings: any

    constructor(application: WebGLApplication) {
        this.application = application
        this.#loadedObj = application.getMeshObjectManager().getAll().map((obj) => obj.getName())

        this.settings = {
            Active_Menu: false,
            cameraX: 2.75,
            cameraY: 5,
            cameraZ: 1,
            posX: 0,
            posY: 0,
            posZ: 0.25,
            targetX: 0,
            targetY: 0,
            targetZ: 0,
            fieldOfView: 60,
            currentobj: undefined
        };

        if(this.#loadedObj.length > 0) {
            this.activeObj = application.getMeshObjectManager().get(this.#loadedObj[0])
            this.settings.currentobj = this.#loadedObj.indexOf(this.activeObj.getName())
        } else {
            this.#loadedObj = undefined
            this.settings.currentobj = ''
        }
    }

    updateObj() {
        this.activeObj = this.application.getMeshObjectManager().get(this.#loadedObj[this.settings.currentobj])
        this.settings.posX = this.activeObj.getPosition().getX()
        this.settings.posY = this.activeObj.getPosition().getY()
        this.settings.posZ = this.activeObj.getPosition().getZ()
        WebGlLessonUI.updateUI(this.widgets, this.settings)
    }

    onCameraChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings
        ACTIVE_MENU_CONTROLS.application.getCamera().setPosition(
            settings.cameraX, settings.cameraY, settings.cameraZ)
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene()
    }

    onObjectPositionChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings
        ACTIVE_MENU_CONTROLS.activeObj.setPosition(
            settings.posX as number, settings.posY as number, settings.posZ as number
        )
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene()
    }

    onTargetPositionChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings
        ACTIVE_MENU_CONTROLS.application.getCamera().setTarget(
            settings.targetX, settings.targetY, settings.targetZ
        )
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene()
    }

    onFovChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings
        ACTIVE_MENU_CONTROLS.application.getCamera().setFov(degree(settings.fieldOfView))
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene()
    }

    onCurrentObjChange() {
        ACTIVE_MENU_CONTROLS.updateObj()
    }

    setup() {
        ACTIVE_MENU_CONTROLS = this
        this.widgets = WebGlLessonUI.setupUI(document.querySelector('#ui'), this.settings, [
            { type: 'checkbox', key: 'Active_Menu', },
            { type: 'slider',   key: 'cameraX',    change: this.onCameraChange, min: -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider',   key: 'cameraY',    change: this.onCameraChange, min:   -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider',   key: 'cameraZ',    change: this.onCameraChange, min:   -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider',   key: 'fieldOfView', change: this.onFovChange, min:  0, max: 180,  },
            { type: 'slider',   key: 'targetX',    change: this.onTargetPositionChange, min: -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider',   key: 'targetY',    change: this.onTargetPositionChange, min:   0, max: 20, precision: 2, step: 0.001, },
            { type: 'slider',   key: 'targetZ',    change: this.onTargetPositionChange, min: -10, max: 20, precision: 2, step: 0.001, },
            { type: 'option',   key: 'currentobj', change: this.onCurrentObjChange, options: this.#loadedObj, },
            { type: 'slider',   key: 'posX',       change: this.onObjectPositionChange, min: -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider',   key: 'posY',       change: this.onObjectPositionChange, min:   -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider',   key: 'posZ',       change: this.onObjectPositionChange, min:   0.25, max: 5, precision: 2, step: 0.001, },

        ]);
    }

}