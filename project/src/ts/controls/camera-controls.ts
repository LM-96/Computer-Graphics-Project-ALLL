import {WebGLApplication} from "../webgl/webgl-application";
import {Camera} from "../camera/camera";
import {handler} from "../signals/options";
import {Signal} from "../signals/signal";
import PerformedTranslation from "../geometry/data/performed-translation";
import {getInputElementById} from "./dom-utils";
import {Log} from "../log/log";
import {PerformedNumberTrioChange} from "../types/data/performed-number-trio-change";
import {Angle, AngleUnit} from "../geometry/angle/angle";
import {PerformedObjectSet} from "../types/data/performed-object-set";
import {Point3D} from "../geometry/point/point-3d";

const INPUT_NAMES = {
    xCam : "xCamInput", yCam : "yCamInput", zCam : "zCamInput",
    fov : "fovInput",
    xUp : "xUpInput", yUp : "yUpInput", zUp : "zUpInput",
    xTarget : "xTargetInput", yTarget : "yTargetInput", zTarget : "zTargetInput",
    lookAtObject : "lookAtObjectInput", followTranslation : "followTranslationInput",
    xCamDist : "xCamDistInput", yCamDist : "yCamDistInput", zCamDist : "zCamDistInput"
};

const CARD_NAMES = {
    cameraPosition : "cameraPositionCard",
    up : "upCard",
    target : "targetCard",
    fov : "fovCard",
    cameraDistance : "cameraDistance"
}

const BUTTONS = {
    xCamIncBtn: "xCamIncBtn", xCamDecBtn : "xCamDecBtn",
    yCamIncBtn: "yCamIncBtn", yCamDecBtn : "yCamDecBtn",
    zCamIncBtn: "zCamIncBtn", zCamDecBtn : "zCamDecBtn",
    xUpIncBtn: "xUpIncBtn", xUpDecBtn : "xUpDecBtn",
    yUpIncBtn: "yUpIncBtn", yUpDecBtn : "yUpDecBtn",
    zUpIncBtn: "zUpIncBtn", zUpDecBtn : "zUpDecBtn",
    fovIncBtn: "fovIncBtn", fovDecBtn : "fovDecBtn",
    setXTargetBtn: "setXTargetBtn", setYTargetBtn : "setYTargetBtn", setZTargetBtn : "setZTargetBtn",
}

export class CameraControls {

    static #initPositionControls(application: WebGLApplication) {
        let camera = application.getCamera()
        document.getElementById(BUTTONS.xCamIncBtn)?.addEventListener("click", (e) => {
            camera
                .setPosition(camera.getCurrentPosition().getX() + 1,
                    camera.getCurrentPosition().getY(),
                    camera.getCurrentPosition().getZ());
        })

        document.getElementById(BUTTONS.xCamDecBtn)?.addEventListener("click", (e) => {
            camera
                .setPosition(camera.getCurrentPosition().getX() - 1,
                    camera.getCurrentPosition().getY(),
                    camera.getCurrentPosition().getZ());
        })

        document.getElementById(BUTTONS.yCamIncBtn)?.addEventListener("click", (e) => {
            camera
                .setPosition(camera.getCurrentPosition().getX(),
                    camera.getCurrentPosition().getY() + 1,
                    camera.getCurrentPosition().getZ());
        })

        document.getElementById(BUTTONS.yCamDecBtn)?.addEventListener("click", (e) => {
            camera
                .setPosition(camera.getCurrentPosition().getX(),
                    camera.getCurrentPosition().getY() - 1,
                    camera.getCurrentPosition().getZ());
        })

        document.getElementById(BUTTONS.zCamIncBtn)?.addEventListener("click", (e) => {
            camera
                .setPosition(camera.getCurrentPosition().getX(),
                    camera.getCurrentPosition().getY(),
                    camera.getCurrentPosition().getZ() + 1);
        })

        document.getElementById(BUTTONS.zCamDecBtn)?.addEventListener("click", (e) => {
            camera
                .setPosition(camera.getCurrentPosition().getX(),
                    camera.getCurrentPosition().getY(),
                    camera.getCurrentPosition().getZ() - 1);
        })

        let updateCameraViewers = function(x: number, y: number, z: number) {
            getInputElementById(INPUT_NAMES.xCam).value = x.toString();
            getInputElementById(INPUT_NAMES.yCam).value = y.toString();
            getInputElementById(INPUT_NAMES.zCam).value = z.toString();
        }
        updateCameraViewers(camera.getCurrentPosition().getX(),
            camera.getCurrentPosition().getY(),
            camera.getCurrentPosition().getZ())

        camera.getCameraPositionSubscriber().subscribe(handler((signal: Signal<Camera, PerformedTranslation, void>) => {
            updateCameraViewers(signal.data.to.getX(), signal.data.to.getY(), signal.data.to.getZ())
            application.getMeshObjectDrawer().drawScene()
        }))
    }

    static #initUpControls(application: WebGLApplication) {
        let camera = application.getCamera()
        document.getElementById(BUTTONS.xUpIncBtn)?.addEventListener("click", (e) => {
            camera
                .setUp(camera.getCurrentUp().getFirst() + 1,
                    camera.getCurrentUp().getSecond(),
                    camera.getCurrentUp().getThird());
        })

        document.getElementById(BUTTONS.xUpDecBtn)?.addEventListener("click", (e) => {
            camera
                .setUp(camera.getCurrentUp().getFirst() - 1,
                    camera.getCurrentUp().getSecond(),
                    camera.getCurrentUp().getThird());
        })

        document.getElementById(BUTTONS.yUpIncBtn)?.addEventListener("click", (e) => {
            camera
                .setUp(camera.getCurrentUp().getFirst(),
                    camera.getCurrentUp().getSecond() + 1,
                    camera.getCurrentUp().getThird());
        })

        document.getElementById(BUTTONS.yUpDecBtn)?.addEventListener("click", (e) => {
            camera
                .setUp(camera.getCurrentUp().getFirst(),
                    camera.getCurrentUp().getSecond() - 1,
                    camera.getCurrentUp().getThird());
        })

        document.getElementById(BUTTONS.zUpIncBtn)?.addEventListener("click", (e) => {
            camera
                .setUp(camera.getCurrentUp().getFirst(),
                    camera.getCurrentUp().getSecond(),
                    camera.getCurrentUp().getThird() + 1);
        })

        document.getElementById(BUTTONS.zUpDecBtn)?.addEventListener("click", (e) => {
            camera
                .setUp(camera.getCurrentUp().getFirst(),
                    camera.getCurrentUp().getSecond(),
                    camera.getCurrentUp().getThird() - 1);
        })

        let updateUpViewers = function(x: number, y: number, z: number) {
            getInputElementById(INPUT_NAMES.xUp).value = x.toString();
            getInputElementById(INPUT_NAMES.yUp).value = y.toString();
            getInputElementById(INPUT_NAMES.zUp).value = z.toString();
        }
        updateUpViewers(camera.getCurrentUp().getFirst(),
            camera.getCurrentUp().getSecond(),
            camera.getCurrentUp().getThird())


        camera.getUpSubscriber().subscribe(handler((signal: Signal<Camera, PerformedNumberTrioChange, void>) => {
            updateUpViewers(signal.data.newValue.getFirst(),
                signal.data.newValue.getSecond(),
                signal.data.newValue.getThird())
            application.getMeshObjectDrawer().drawScene()
        }))
    }

    static #initFovControls(application: WebGLApplication) {
        let camera = application.getCamera()
        document.getElementById(BUTTONS.fovIncBtn)?.addEventListener("click", (e) => {
            camera
                .setFov(camera.getCurrentFov().clone().add(1));
        })

        document.getElementById(BUTTONS.fovDecBtn)?.addEventListener("click", (e) => {
            camera
                .setFov(camera.getCurrentFov().clone().subtract(1));
        })

        let updateFovViewers = function(fov: Angle) {
            getInputElementById(INPUT_NAMES.fov).value = fov.getValueIn(AngleUnit.DEG).toString();
        }

        updateFovViewers(camera.getCurrentFov())
        camera.getFovSubscriber().subscribe(handler((signal: Signal<Camera, PerformedObjectSet<Angle>, void>) => {
            updateFovViewers(signal.data.newValue)
            application.getMeshObjectDrawer().drawScene()
        }))
    }

    static #initTargetControls(application: WebGLApplication) {
        let camera: Camera = application.getCamera()

        document.getElementById(BUTTONS.setXTargetBtn)?.addEventListener("click", (e) => {
            camera
                .setTarget(+getInputElementById(INPUT_NAMES.xTarget).value + 1,
                    camera.getCurrentTarget().getY(),
                    camera.getCurrentTarget().getZ());
        })

        document.getElementById(BUTTONS.setYTargetBtn)?.addEventListener("click", (e) => {
            camera
                .setTarget(camera.getCurrentTarget().getX(),
                    +getInputElementById(INPUT_NAMES.yTarget).value + 1,
                    camera.getCurrentTarget().getZ());
        })

        document.getElementById(BUTTONS.setZTargetBtn)?.addEventListener("click", (e) => {
            camera
                .setTarget(camera.getCurrentTarget().getX(),
                    camera.getCurrentTarget().getY(),
                    +getInputElementById(INPUT_NAMES.zTarget).value + 1);
        })

        let updateTargetViewers = function(x: number, y: number, z: number) {
            getInputElementById(INPUT_NAMES.xTarget).value = x.toString();
            getInputElementById(INPUT_NAMES.yTarget).value = y.toString();
            getInputElementById(INPUT_NAMES.zTarget).value = z.toString();
        }

        updateTargetViewers(camera.getCurrentTarget().getX(),
            camera.getCurrentTarget().getY(),
            camera.getCurrentTarget().getZ())
        camera.getTargetSubscriber().subscribe(handler((signal: Signal<Camera, PerformedObjectSet<Point3D>, void>) => {
            updateTargetViewers(signal.data.newValue.getX(),
                signal.data.newValue.getY(),
                signal.data.newValue.getZ())
            application.getMeshObjectDrawer().drawScene()
        }))
    }

    static init(application: WebGLApplication) {
        Log.log("CameraControls | init")
        let camera = application.getCamera()

        this.#initPositionControls(application)
        this.#initUpControls(application)
        this.#initFovControls(application)
        this.#initTargetControls(application)
    }

}