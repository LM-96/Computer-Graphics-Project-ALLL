"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _CameraControls_initPositionControls, _CameraControls_initUpControls, _CameraControls_initFovControls, _CameraControls_initTargetControls;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraControls = void 0;
const options_1 = require("../signals/options");
const dom_utils_1 = require("./dom-utils");
const log_1 = require("../log/log");
const angle_1 = require("../geometry/angle/angle");
const INPUT_NAMES = {
    xCam: "xCamInput", yCam: "yCamInput", zCam: "zCamInput",
    fov: "fovInput",
    xUp: "xUpInput", yUp: "yUpInput", zUp: "zUpInput",
    xTarget: "xTargetInput", yTarget: "yTargetInput", zTarget: "zTargetInput",
    lookAtObject: "lookAtObjectInput", followTranslation: "followTranslationInput",
    xCamDist: "xCamDistInput", yCamDist: "yCamDistInput", zCamDist: "zCamDistInput"
};
const CARD_NAMES = {
    cameraPosition: "cameraPositionCard",
    up: "upCard",
    target: "targetCard",
    fov: "fovCard",
    cameraDistance: "cameraDistance"
};
const BUTTONS = {
    xCamIncBtn: "xCamIncBtn", xCamDecBtn: "xCamDecBtn",
    yCamIncBtn: "yCamIncBtn", yCamDecBtn: "yCamDecBtn",
    zCamIncBtn: "zCamIncBtn", zCamDecBtn: "zCamDecBtn",
    xUpIncBtn: "xUpIncBtn", xUpDecBtn: "xUpDecBtn",
    yUpIncBtn: "yUpIncBtn", yUpDecBtn: "yUpDecBtn",
    zUpIncBtn: "zUpIncBtn", zUpDecBtn: "zUpDecBtn",
    fovIncBtn: "fovIncBtn", fovDecBtn: "fovDecBtn",
    setXTargetBtn: "setXTargetBtn", setYTargetBtn: "setYTargetBtn", setZTargetBtn: "setZTargetBtn",
};
class CameraControls {
    static init(application) {
        log_1.Log.log("CameraControls | init");
        let camera = application.getCamera();
        __classPrivateFieldGet(this, _a, "m", _CameraControls_initPositionControls).call(this, application);
        __classPrivateFieldGet(this, _a, "m", _CameraControls_initUpControls).call(this, application);
        __classPrivateFieldGet(this, _a, "m", _CameraControls_initFovControls).call(this, application);
        __classPrivateFieldGet(this, _a, "m", _CameraControls_initTargetControls).call(this, application);
    }
}
exports.CameraControls = CameraControls;
_a = CameraControls, _CameraControls_initPositionControls = function _CameraControls_initPositionControls(application) {
    var _b, _c, _d, _e, _f, _g;
    let camera = application.getCamera();
    (_b = document.getElementById(BUTTONS.xCamIncBtn)) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
        camera
            .setPosition(camera.getCurrentPosition().getX() + 1, camera.getCurrentPosition().getY(), camera.getCurrentPosition().getZ());
    });
    (_c = document.getElementById(BUTTONS.xCamDecBtn)) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
        camera
            .setPosition(camera.getCurrentPosition().getX() - 1, camera.getCurrentPosition().getY(), camera.getCurrentPosition().getZ());
    });
    (_d = document.getElementById(BUTTONS.yCamIncBtn)) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (e) => {
        camera
            .setPosition(camera.getCurrentPosition().getX(), camera.getCurrentPosition().getY() + 1, camera.getCurrentPosition().getZ());
    });
    (_e = document.getElementById(BUTTONS.yCamDecBtn)) === null || _e === void 0 ? void 0 : _e.addEventListener("click", (e) => {
        camera
            .setPosition(camera.getCurrentPosition().getX(), camera.getCurrentPosition().getY() - 1, camera.getCurrentPosition().getZ());
    });
    (_f = document.getElementById(BUTTONS.zCamIncBtn)) === null || _f === void 0 ? void 0 : _f.addEventListener("click", (e) => {
        camera
            .setPosition(camera.getCurrentPosition().getX(), camera.getCurrentPosition().getY(), camera.getCurrentPosition().getZ() + 1);
    });
    (_g = document.getElementById(BUTTONS.zCamDecBtn)) === null || _g === void 0 ? void 0 : _g.addEventListener("click", (e) => {
        camera
            .setPosition(camera.getCurrentPosition().getX(), camera.getCurrentPosition().getY(), camera.getCurrentPosition().getZ() - 1);
    });
    let updateCameraViewers = function (x, y, z) {
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.xCam).value = x.toString();
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.yCam).value = y.toString();
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.zCam).value = z.toString();
    };
    updateCameraViewers(camera.getCurrentPosition().getX(), camera.getCurrentPosition().getY(), camera.getCurrentPosition().getZ());
    camera.getCameraPositionSubscriber().subscribe((0, options_1.handler)((signal) => {
        updateCameraViewers(signal.data.to.getX(), signal.data.to.getY(), signal.data.to.getZ());
        application.getMeshObjectDrawer().drawScene();
    }));
}, _CameraControls_initUpControls = function _CameraControls_initUpControls(application) {
    var _b, _c, _d, _e, _f, _g;
    let camera = application.getCamera();
    (_b = document.getElementById(BUTTONS.xUpIncBtn)) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
        camera
            .setUp(camera.getCurrentUp().getFirst() + 1, camera.getCurrentUp().getSecond(), camera.getCurrentUp().getThird());
    });
    (_c = document.getElementById(BUTTONS.xUpDecBtn)) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
        camera
            .setUp(camera.getCurrentUp().getFirst() - 1, camera.getCurrentUp().getSecond(), camera.getCurrentUp().getThird());
    });
    (_d = document.getElementById(BUTTONS.yUpIncBtn)) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (e) => {
        camera
            .setUp(camera.getCurrentUp().getFirst(), camera.getCurrentUp().getSecond() + 1, camera.getCurrentUp().getThird());
    });
    (_e = document.getElementById(BUTTONS.yUpDecBtn)) === null || _e === void 0 ? void 0 : _e.addEventListener("click", (e) => {
        camera
            .setUp(camera.getCurrentUp().getFirst(), camera.getCurrentUp().getSecond() - 1, camera.getCurrentUp().getThird());
    });
    (_f = document.getElementById(BUTTONS.zUpIncBtn)) === null || _f === void 0 ? void 0 : _f.addEventListener("click", (e) => {
        camera
            .setUp(camera.getCurrentUp().getFirst(), camera.getCurrentUp().getSecond(), camera.getCurrentUp().getThird() + 1);
    });
    (_g = document.getElementById(BUTTONS.zUpDecBtn)) === null || _g === void 0 ? void 0 : _g.addEventListener("click", (e) => {
        camera
            .setUp(camera.getCurrentUp().getFirst(), camera.getCurrentUp().getSecond(), camera.getCurrentUp().getThird() - 1);
    });
    let updateUpViewers = function (x, y, z) {
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.xUp).value = x.toString();
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.yUp).value = y.toString();
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.zUp).value = z.toString();
    };
    updateUpViewers(camera.getCurrentUp().getFirst(), camera.getCurrentUp().getSecond(), camera.getCurrentUp().getThird());
    camera.getUpSubscriber().subscribe((0, options_1.handler)((signal) => {
        updateUpViewers(signal.data.newValue.getFirst(), signal.data.newValue.getSecond(), signal.data.newValue.getThird());
        application.getMeshObjectDrawer().drawScene();
    }));
}, _CameraControls_initFovControls = function _CameraControls_initFovControls(application) {
    var _b, _c;
    let camera = application.getCamera();
    (_b = document.getElementById(BUTTONS.fovIncBtn)) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
        camera
            .setFov(camera.getCurrentFov().clone().add(1));
    });
    (_c = document.getElementById(BUTTONS.fovDecBtn)) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
        camera
            .setFov(camera.getCurrentFov().clone().subtract(1));
    });
    let updateFovViewers = function (fov) {
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.fov).value = fov.getValueIn(angle_1.AngleUnit.DEG).toString();
    };
    updateFovViewers(camera.getCurrentFov());
    camera.getFovSubscriber().subscribe((0, options_1.handler)((signal) => {
        updateFovViewers(signal.data.newValue);
        application.getMeshObjectDrawer().drawScene();
    }));
}, _CameraControls_initTargetControls = function _CameraControls_initTargetControls(application) {
    var _b, _c, _d;
    let camera = application.getCamera();
    (_b = document.getElementById(BUTTONS.setXTargetBtn)) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
        camera
            .setTarget(+(0, dom_utils_1.getInputElementById)(INPUT_NAMES.xTarget).value + 1, camera.getCurrentTarget().getY(), camera.getCurrentTarget().getZ());
    });
    (_c = document.getElementById(BUTTONS.setYTargetBtn)) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
        camera
            .setTarget(camera.getCurrentTarget().getX(), +(0, dom_utils_1.getInputElementById)(INPUT_NAMES.yTarget).value + 1, camera.getCurrentTarget().getZ());
    });
    (_d = document.getElementById(BUTTONS.setZTargetBtn)) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (e) => {
        camera
            .setTarget(camera.getCurrentTarget().getX(), camera.getCurrentTarget().getY(), +(0, dom_utils_1.getInputElementById)(INPUT_NAMES.zTarget).value + 1);
    });
    let updateTargetViewers = function (x, y, z) {
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.xTarget).value = x.toString();
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.yTarget).value = y.toString();
        (0, dom_utils_1.getInputElementById)(INPUT_NAMES.zTarget).value = z.toString();
    };
    updateTargetViewers(camera.getCurrentTarget().getX(), camera.getCurrentTarget().getY(), camera.getCurrentTarget().getZ());
    camera.getTargetSubscriber().subscribe((0, options_1.handler)((signal) => {
        updateTargetViewers(signal.data.newValue.getX(), signal.data.newValue.getY(), signal.data.newValue.getZ());
        application.getMeshObjectDrawer().drawScene();
    }));
};
//# sourceMappingURL=camera-controls.js.map