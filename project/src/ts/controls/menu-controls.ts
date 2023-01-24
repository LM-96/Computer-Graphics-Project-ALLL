import {WebGLApplication} from "../webgl/webgl-application";
import {MeshObject} from "../obj/mesh-object";
import {AngleUnit, degree} from "../geometry/angle/angle";
import {MenuSettings} from "./menu-settings";
import {Signal} from "../signals/signal";
import {Camera} from "../camera/camera";
import PerformedTranslation from "../geometry/data/performed-translation";
import CameraSignals from "../camera/camera-signals";
import {Log} from "../log/log";
import {PerformedObjectSet} from "../types/data/performed-object-set";
import {Point3D} from "../geometry/point/point-3d";
import {OnSignalMethod, SignalListener} from "../signals/signals-decorator";
import {SingleSignalSubscriber, SubscriptionReceipt} from "../signals/subscriptions";
import {handler} from "../signals/options";
import PerformedScale from "../geometry/data/performed-scale";
import {PerformedPolarRotation} from "../geometry/data/performed-polar-rotation";
import {Pair, pairOf} from "../types/pair";
import {PerformedNumberTrioChange} from "../types/data/performed-number-trio-change";

@SignalListener
export class MenuControls {

    #application: WebGLApplication
    #activeObj: MeshObject
    #targetObj: MeshObject
    #widgets: any
    readonly #loadedObjs: Array<string>
    readonly #settings: MenuSettings

    #currentObjReceipt: Array<Pair<SingleSignalSubscriber<any, any, any>, SubscriptionReceipt<any, any, any>>>

    constructor(application: WebGLApplication) {
        this.#application = application
        this.#loadedObjs = application.getMeshObjectManager().getAll().map((obj) => obj.getName())
        this.#currentObjReceipt = []

        this.#settings = {
            log: true,
            target: undefined,
            look_at: false,
            follow: false,
            cameraX: application.getCamera().getCurrentPosition().getX(),
            cameraY: application.getCamera().getCurrentPosition().getY(),
            cameraZ: application.getCamera().getCurrentPosition().getY(),
            cameraUpX: application.getCamera().getCurrentUp().getFirst(),
            cameraUpY: application.getCamera().getCurrentUp().getSecond(),
            cameraUpZ: application.getCamera().getCurrentUp().getThird(),
            posX: 0,
            posY: 0,
            posZ: 0.25,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            psi: 0,
            theta: 0,
            phi: 0,
            targetX: application.getCamera().getCurrentTarget().getX(),
            targetY: application.getCamera().getCurrentTarget().getY(),
            targetZ: application.getCamera().getCurrentTarget().getZ(),
            frustum: application.getMeshObjectDrawer().getLightFrustum(),
            shadows: application.getMeshObjectDrawer().getSlManager().getShadows(),
            bias: application.getMeshObjectDrawer().getBias(),
            lightPosX: application.getMeshObjectDrawer().getSlManager().getLightPosition().getX(),
            lightPosY: application.getMeshObjectDrawer().getSlManager().getLightPosition().getY(),
            lightPosZ: application.getMeshObjectDrawer().getSlManager().getLightPosition().getZ(),
            lightTargX: application.getMeshObjectDrawer().getSlManager().getLightTarget().getX(),
            lightTargY: application.getMeshObjectDrawer().getSlManager().getLightTarget().getY(),
            lightTargZ: application.getMeshObjectDrawer().getSlManager().getLightTarget().getZ(),
            lightFov: application.getMeshObjectDrawer().getSlManager().getFov().getValueIn(AngleUnit.DEG),
            lightNear: application.getMeshObjectDrawer().getSlManager().getNear(),
            lightFar: application.getMeshObjectDrawer().getSlManager().getFar(),
            spotlight: application.getMeshObjectDrawer().getSlManager().isSpotlight(),
            lightWidth: application.getMeshObjectDrawer().getSlManager().getProjWidth(),
            lightHeight: application.getMeshObjectDrawer().getSlManager().getProjHeight(),
            lightUpX: application.getMeshObjectDrawer().getSlManager().getLightUp().getFirst(),
            lightUpY: application.getMeshObjectDrawer().getSlManager().getLightUp().getSecond(),
            lightUpZ: application.getMeshObjectDrawer().getSlManager().getLightUp().getThird(),
            fov: application.getCamera().getCurrentFov().getValueIn(AngleUnit.DEG),
            zNear: application.getMeshObjectDrawer().zNear,
            zFar: application.getMeshObjectDrawer().zFar,
            currentobj: undefined,
            hidden: false,
            draw: false,
        };

        if(this.#loadedObjs.length > 0) {
            this.#settings.currentobj = 0
            this.#settings.target = 0
            this.#targetObj = this.#application.getMeshObjectManager().get(this.#loadedObjs[0])
            this.updateActiveObj(false)
        }
    }

    subscribeCurrentObjSignals() {
        Log.log("Subscribing to signals of " + this.#activeObj.getName())
        this.#currentObjReceipt.push(
            pairOf(this.#activeObj.getTranslationSubscriber(),
                this.#activeObj.getTranslationSubscriber().subscribe(
                    handler<MeshObject, PerformedTranslation, void>(
                        (signal: Signal<MeshObject, PerformedTranslation, void>) => {
                            this.#settings.posX= signal.data.to.getX()
                            this.#settings.posY = signal.data.to.getY()
                            this.#settings.posZ = signal.data.to.getZ()
                            this.updateUI()
                        }))
            )
        )
        this.#currentObjReceipt.push(
            pairOf(this.#activeObj.getScaleSubscriber(),
                this.#activeObj.getScaleSubscriber().subscribe(
                    handler<MeshObject, PerformedScale, void>(
                        (signal: Signal<MeshObject, PerformedScale, void>) => {
                            this.#settings.scaleX = signal.data.to.getFirst()
                            this.#settings.scaleY = signal.data.to.getSecond()
                            this.#settings.scaleZ = signal.data.to.getThird()
                            this.updateUI()
                        }))
            )
        )
        this.#currentObjReceipt.push(
            pairOf(this.#activeObj.getPolarRotationSubscriber(),
                this.#activeObj.getPolarRotationSubscriber().subscribe(
                    handler<MeshObject, PerformedPolarRotation, void>(
                        (signal: Signal<MeshObject, PerformedPolarRotation, void>) => {
                            this.#settings.phi = signal.data.to.getFirst().getValueIn(AngleUnit.DEG)
                            this.#settings.theta = signal.data.to.getSecond().getValueIn(AngleUnit.DEG)
                            this.#settings.phi = signal.data.to.getThird().getValueIn(AngleUnit.DEG)
                            this.updateUI()
                        }))
            )
        )
        Log.log("Subscribed to signals of " + this.#activeObj.getName() +
            ", total subscriptions: " + this.#currentObjReceipt.length)
    }

    unsubscribeCurrentObjSignals() {
        Log.log("Unsubscribing from signals of " + this.#activeObj.getName())
        this.#currentObjReceipt.forEach((pair) => {
            pair.getFirst().unsubscribe(pair.getSecond())
        })
        Log.log("Unsubscribed from signals of " + this.#activeObj.getName() + " completed")
        this.#currentObjReceipt = []
    }

    updateActiveObj(updateUI: boolean = true) {
        let settings: MenuSettings = this.#settings

        if(this.#activeObj != undefined) {
            this.unsubscribeCurrentObjSignals()
        }

        this.#activeObj = this.#application.getMeshObjectManager().get(this.#loadedObjs[settings.currentobj])
        settings.posX = this.#activeObj.getPosition().getX()
        settings.posY = this.#activeObj.getPosition().getY()
        settings.posZ = this.#activeObj.getPosition().getZ()
        settings.scaleX = this.#activeObj.getCurrentScale().getFirst()
        settings.scaleY = this.#activeObj.getCurrentScale().getSecond()
        settings.scaleZ = this.#activeObj.getCurrentScale().getThird()
        settings.phi = this.#activeObj.getPolarRotation().getFirst().getValueIn(AngleUnit.DEG)
        settings.theta = this.#activeObj.getPolarRotation().getSecond().getValueIn(AngleUnit.DEG)
        settings.hidden = this.#activeObj.getHidden()
        this.subscribeCurrentObjSignals()

        if(updateUI) {
            this.updateUI()
        }
    }

    updateUI() {
        WebGlLessonUI.updateUI(this.#widgets, this.#settings)
    }

    @OnSignalMethod(CameraSignals.CAMERA_TRANSLATION_SIGNAL_STRING_NAME)
    onCameraSetPositionEvent(signal: Signal<Camera, PerformedTranslation, void>) {
        let settings: MenuSettings = this.#settings
        settings.cameraX = signal.data.to.getX()
        settings.cameraY = signal.data.to.getY()
        settings.cameraZ = signal.data.to.getZ()
        this.updateUI()
    }

    @OnSignalMethod(CameraSignals.CAMERA_UP_SIGNAL_STRING_NAME)
    onCameraSetUpEvent(signal: Signal<Camera, PerformedNumberTrioChange, void>) {
        let settings: MenuSettings = this.#settings
        settings.cameraUpX = signal.data.newValue.getFirst()
        settings.cameraUpY = signal.data.newValue.getSecond()
        settings.cameraUpZ = signal.data.newValue.getThird()
        this.updateUI()
    }

    @OnSignalMethod(CameraSignals.CAMERA_TARGET_SIGNAL_STRING_NAME)
    onCameraTargetChanged(signal: Signal<Camera, PerformedObjectSet<Point3D>, void>) {
        let settings: MenuSettings = this.#settings
        settings.targetX = signal.data.newValue.getX()
        settings.targetY = signal.data.newValue.getY()
        settings.targetZ = signal.data.newValue.getZ()
        this.updateUI()
    }

    onCameraChange() {
        let settings = this.#settings
        this.#application.getCamera().setPosition(
            settings.cameraX, settings.cameraY, settings.cameraZ)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onObjectPositionChange() {
        if(this.#loadedObjs != undefined) {
            let settings = this.#settings
            this.#activeObj.setPosition(
                settings.posX, settings.posY, settings.posZ)
            this.#application.getMeshObjectDrawer().drawScene()
        }
    }

    onTargetPositionChange() {
        let settings = this.#settings
        this.#application.getCamera().setTarget(
            settings.targetX, settings.targetY, settings.targetZ
        )
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onFovChange() {
        let settings = this.#settings
        this.#application.getCamera().setFov(degree(settings.fov))
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onActiveObjChange() {
        this.updateActiveObj()
    }

    onObjectScaleChange() {
        if (this.#loadedObjs != undefined) {
            let settings = this.#settings
            this.#activeObj.setScale(
                settings.scaleX, settings.scaleY, settings.scaleZ
            )
            this.#application.getMeshObjectDrawer().drawScene()
        }
    }

    onObjectPolarRotationChange() {
        if(this.#loadedObjs != undefined) {
            let settings = this.#settings
            this.#activeObj.setPolarRotation(
                degree(settings.psi), degree(settings.theta), degree(settings.phi)
            )
            this.#application.getMeshObjectDrawer().drawScene()
        }
    }

    onCameraUpChange() {
        let settings = this.#settings
        this.#application.getCamera().setUp(
            settings.cameraUpX, settings.cameraUpY, settings.cameraUpZ
        )
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLookAtObjectChange() {
        let settings = this.#settings
        if(settings.look_at) {
            this.#application.getCamera().startLookingAtObject(
                this.#application.getMeshObjectManager()
                    .get(this.#loadedObjs[settings.target])
            )
        } else {
            if(settings.follow) {
                settings.follow = false
                this.updateUI()
                this.onFollowObjectChange()
            }
            this.#application.getCamera().stopLookingAtObject()
        }
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onFollowObjectChange() {
        let settings = this.#settings

        if(settings.follow) {
            if(!settings.look_at) {
                settings.look_at = true
                this.updateUI()
                this.onLookAtObjectChange()
            }

            this.#application.getCamera().startFollowingObject(
                this.#application.getMeshObjectManager()
                    .get(this.#loadedObjs[settings.target])
            )
        } else {
            this.#application.getCamera().stopFollowingObject()
        }
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onHiddenObjChange() {
        this.#activeObj.setHidden(this.#settings.hidden)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLogChanged() {
        if(this.#settings.log) {
            Log.enableLog()
        } else {
            Log.disableLog()
        }
    }

    onTargetObjChange() {
        if(this.#settings.look_at || this.#settings.follow) {
            this.#settings.target = this.#loadedObjs.indexOf(this.#targetObj.getName())
            this.updateUI()
        } else {
            this.#targetObj = this.#application.getMeshObjectManager()
                .get(this.#loadedObjs[this.#settings.target])
        }
    }

    onDrawPressed() {
        if(this.#settings.draw) {
            this.#settings.draw = false
            this.#application.getMeshObjectDrawer().drawScene()
            this.updateUI()
        }
    }

    onZNearChange() {
        this.#application.getMeshObjectDrawer().zNear = this.#settings.zNear
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onZFarChange() {
        this.#application.getMeshObjectDrawer().zFar = this.#settings.zFar
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onFrustumChange() {
        this.#application.getMeshObjectDrawer().setLightFrustum(this.#settings.frustum)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onShadowsChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setShadows(this.#settings.shadows)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLightPositionChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setLightPosition(
            this.#settings.lightPosX, this.#settings.lightPosY, this.#settings.lightPosZ)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLightTargetChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setLightTarget(
            this.#settings.lightTargX, this.#settings.lightTargY, this.#settings.lightTargZ)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLightFovChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setFov(
            degree(this.#settings.lightFov))
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onSpotlightChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setSpotlight(this.#settings.spotlight)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLightWidthChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setProjWidth(this.#settings.lightWidth)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLightHeightChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setProjHeight(this.#settings.lightHeight)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLightUpChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setLightUp(
            this.#settings.lightUpX, this.#settings.lightUpY, this.#settings.lightUpZ)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onBiasChange() {
        this.#application.getMeshObjectDrawer().setBias(this.#settings.bias)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLightNearChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setNear(this.#settings.lightNear)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    onLightFarChange() {
        this.#application.getMeshObjectDrawer().getSlManager().setFar(this.#settings.lightFar)
        this.#application.getMeshObjectDrawer().drawScene()
    }

    setup() {
        this.#widgets = WebGlLessonUI.setupUI(document.querySelector('#ui'), this.#settings, [
            { type: 'checkbox', key: 'log', change: () => { this.onLogChanged() }},
            /* CAMERA ***************************************************************************** */
            { type: 'option',   key: 'target',  change: () => { this.onTargetObjChange() }, options: this.#loadedObjs, },
            { type: 'checkbox', key: 'look_at', change: () => { this.onLookAtObjectChange() }, },
            { type: 'checkbox', key: 'follow', change: () => { this.onFollowObjectChange() }, },
            { type: 'slider',   key: 'cameraX',    change: () => { this.onCameraChange() }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'cameraY',    change: () => { this.onCameraChange() }, min:   -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'cameraZ',    change: () => { this.onCameraChange() }, min:   -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'cameraUpX',    change: () => { this.onCameraUpChange() }, min: -1, max: 1, precision: 3, step: 0.001, },
            { type: 'slider',   key: 'cameraUpY',    change: () => { this.onCameraUpChange() }, min:   -1, max: 1, precision: 3, step: 0.001, },
            { type: 'slider',   key: 'cameraUpZ',    change: () => { this.onCameraUpChange() }, min:   -1, max: 1, precision: 3, step: 0.001, },
            { type: 'slider',   key: 'zNear',    change: () => { this.onZNearChange() }, min:   -10, max: 10, precision: 2, step: 1, },
            { type: 'slider',   key: 'zFar',    change: () => { this.onZFarChange() }, min:   -200, max: 200, precision: 1, step: 1, },
            { type: 'slider',   key: 'fov', change: () => { this.onFovChange() }, min:  0, max: 180,  },
            { type: 'slider',   key: 'targetX',    change: () => { this.onTargetPositionChange() }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'targetY',    change: () => { this.onTargetPositionChange() }, min:   -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'targetZ',    change: () => { this.onTargetPositionChange() }, min: -100, max: 100, precision: 1, step: 1, },

            /* LIGHT ***************************************************************************** */
            { type: 'checkbox', key: 'frustum', change: () => { this.onFrustumChange() }},
            { type: 'checkbox', key: 'shadows', change: () => { this.onShadowsChange() }},
            //{ type: 'slider',   key: 'bias',    change: () => { this.onBiasChange() }, min: 0, max: 10, precision: 3, step: 0.001, },
            { type: 'slider',   key: 'lightPosX',    change: () => { this.onLightPositionChange() }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'lightPosY',    change: () => { this.onLightPositionChange() }, min:   -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'lightPosZ',    change: () => { this.onLightPositionChange() }, min:   -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'lightTargX',    change: () => { this.onLightTargetChange() }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'lightTargY',    change: () => { this.onLightTargetChange() }, min:   -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'lightTargZ',    change: () => { this.onLightTargetChange() }, min:   -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'lightFov',    change: () => { this.onLightFovChange() }, min:   0, max: 360, precision: 1, step: 1, },
            { type: 'slider',   key: 'lightNear',    change: () => { this.onLightNearChange() }, min:   0, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'lightFar',    change: () => { this.onLightFarChange() }, min:   0, max: 1000, precision: 1, step: 1, },
            { type: 'checkbox', key: 'spotlight', change: () => { this.onSpotlightChange() }},
            { type: 'slider',   key: 'lightWidth',    change: () => { this.onLightWidthChange() }, min:   0, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'lightHeight',    change: () => { this.onLightHeightChange() }, min:   0, max: 100, precision: 1, step: 1, },
            //{ type: 'slider',   key: 'lightUpX',    change: () => { this.onLightUpChange() }, min: -1, max: 1, precision: 3, step: 0.001, },
            //{ type: 'slider',   key: 'lightUpY',    change: () => { this.onLightUpChange() }, min:   -1, max: 1, precision: 3, step: 0.001, },
            //{ type: 'slider',   key: 'lightUpZ',    change: () => { this.onLightUpChange() }, min:   -1, max: 1, precision: 3, step: 0.001, },


            /* OBJECT ***************************************************************************** */
            { type: 'option',   key: 'currentobj', change: () => { this.onActiveObjChange() }, options: this.#loadedObjs, },
            { type: 'checkbox',   key: 'hidden', change: () => { this.onHiddenObjChange() }, options: this.#loadedObjs, },
            { type: 'slider',   key: 'posX',       change: () => { this.onObjectPositionChange() }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'posY',       change: () => { this.onObjectPositionChange() }, min:   -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'posZ',       change: () => { this.onObjectPositionChange() }, min:   -100, max: 100, precision: 1, step: 1, },
            { type: 'slider',   key: 'scaleX',       change: () => { this.onObjectScaleChange() }, min: 0, max: 10, precision: 1, step: 1, },
            { type: 'slider',   key: 'scaleY',       change: () => { this.onObjectScaleChange() }, min:   0, max: 10, precision: 1, step: 1, },
            { type: 'slider',   key: 'scaleZ',       change: () => { this.onObjectScaleChange() }, min:   0, max: 10, precision: 1, step: 1, },
            { type: 'slider',   key: 'psi',       change: () => { this.onObjectPolarRotationChange() }, min:   0, max: 360 },
            { type: 'slider',   key: 'theta',       change: () => { this.onObjectPolarRotationChange() }, min: 0, max: 360 },
            { type: 'slider',   key: 'phi',       change: () => { this.onObjectPolarRotationChange() }, min:   0, max: 360 },
            { type: 'checkbox', key: 'draw', change: () => { this.onDrawPressed() }},

        ]);
    }

}