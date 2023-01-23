"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuControls = void 0;
const angle_1 = require("../geometry/angle/angle");
const options_1 = require("../signals/options");
const camera_signals_1 = require("../camera/camera-signals");
const log_1 = require("../log/log");
var ACTIVE_MENU_CONTROLS;
class MenuControls {
    constructor(application) {
        this.application = application;
        this.loadedObjs = application.getMeshObjectManager().getAll().map((obj) => obj.getName());
        this.settings = {
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
            theta: 0,
            phi: 0,
            targetX: application.getCamera().getCurrentTarget().getX(),
            targetY: application.getCamera().getCurrentTarget().getY(),
            targetZ: application.getCamera().getCurrentTarget().getZ(),
            fov: application.getCamera().getCurrentFov().getValueIn(angle_1.AngleUnit.DEG),
            currentobj: undefined,
            hidden: false
        };
        if (this.loadedObjs.length > 0) {
            this.settings.currentobj = 0;
            this.settings.target = 0;
            this.updateObj(false);
        }
    }
    updateObj(updateUI = true) {
        this.activeObj = this.application.getMeshObjectManager().get(this.loadedObjs[this.settings.currentobj]);
        this.settings.posX = this.activeObj.getPosition().getX();
        this.settings.posY = this.activeObj.getPosition().getY();
        this.settings.posZ = this.activeObj.getPosition().getZ();
        this.settings.scaleX = this.activeObj.getCurrentScale().getFirst();
        this.settings.scaleY = this.activeObj.getCurrentScale().getSecond();
        this.settings.scaleZ = this.activeObj.getCurrentScale().getThird();
        this.settings.phi = this.activeObj.getPolarRotation().getFirst().getValueIn(angle_1.AngleUnit.DEG);
        this.settings.theta = this.activeObj.getPolarRotation().getSecond().getValueIn(angle_1.AngleUnit.DEG);
        this.settings.hidden = this.activeObj.getHidden();
        if (updateUI) {
            this.updateUI();
        }
    }
    updateUI() {
        WebGlLessonUI.updateUI(this.widgets, this.settings);
    }
    onCameraSetPositionEvent(signal) {
        console.log('onCameraSetPositionEvent');
        ACTIVE_MENU_CONTROLS.settings.cameraX = signal.data.to.getX();
        ACTIVE_MENU_CONTROLS.settings.cameraY = signal.data.to.getY();
        ACTIVE_MENU_CONTROLS.settings.cameraZ = signal.data.to.getZ();
        ACTIVE_MENU_CONTROLS.updateUI();
    }
    onCameraTargetChanged(signal) {
        ACTIVE_MENU_CONTROLS.settings.targetX = signal.data.newValue.getX();
        ACTIVE_MENU_CONTROLS.settings.targetY = signal.data.newValue.getY();
        ACTIVE_MENU_CONTROLS.settings.targetZ = signal.data.newValue.getZ();
        ACTIVE_MENU_CONTROLS.updateUI();
    }
    onCameraChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        ACTIVE_MENU_CONTROLS.application.getCamera().setPosition(settings.cameraX, settings.cameraY, settings.cameraZ);
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onObjectPositionChange() {
        if (ACTIVE_MENU_CONTROLS.loadedObjs != undefined) {
            let settings = ACTIVE_MENU_CONTROLS.settings;
            ACTIVE_MENU_CONTROLS.activeObj.setPosition(settings.posX, settings.posY, settings.posZ);
            ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
        }
    }
    onTargetPositionChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        ACTIVE_MENU_CONTROLS.application.getCamera().setTarget(settings.targetX, settings.targetY, settings.targetZ);
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onFovChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        ACTIVE_MENU_CONTROLS.application.getCamera().setFov((0, angle_1.degree)(settings.fov));
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onCurrentObjChange() {
        ACTIVE_MENU_CONTROLS.updateObj();
    }
    onObjectScaleChange() {
        if (ACTIVE_MENU_CONTROLS.loadedObjs != undefined) {
            let settings = ACTIVE_MENU_CONTROLS.settings;
            ACTIVE_MENU_CONTROLS.activeObj.setScale(settings.scaleX, settings.scaleY, settings.scaleZ);
            ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
        }
    }
    onObjectPolarRotationChange() {
        if (ACTIVE_MENU_CONTROLS.loadedObjs != undefined) {
            let settings = ACTIVE_MENU_CONTROLS.settings;
            ACTIVE_MENU_CONTROLS.activeObj.setPolarRotation((0, angle_1.degree)(settings.theta), (0, angle_1.degree)(settings.phi));
            ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
        }
    }
    onCameraUpChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        ACTIVE_MENU_CONTROLS.application.getCamera().setUp(settings.cameraUpX, settings.cameraUpY, settings.cameraUpZ);
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onLookAtObjectChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        if (settings.look_at) {
            ACTIVE_MENU_CONTROLS.application.getCamera().startLookingAtObject(ACTIVE_MENU_CONTROLS.application.getMeshObjectManager()
                .get(ACTIVE_MENU_CONTROLS.loadedObjs[settings.target]));
        }
        else {
            if (settings.follow) {
                settings.follow = false;
                ACTIVE_MENU_CONTROLS.updateUI();
                ACTIVE_MENU_CONTROLS.onFollowObjectChange();
            }
            ACTIVE_MENU_CONTROLS.application.getCamera().stopLookingAtObject();
        }
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onFollowObjectChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        if (settings.follow) {
            if (!settings.look_at) {
                settings.look_at = true;
                ACTIVE_MENU_CONTROLS.updateUI();
                ACTIVE_MENU_CONTROLS.onLookAtObjectChange();
            }
            ACTIVE_MENU_CONTROLS.application.getCamera().startFollowingObject(ACTIVE_MENU_CONTROLS.application.getMeshObjectManager()
                .get(ACTIVE_MENU_CONTROLS.loadedObjs[settings.target]));
        }
        else {
            ACTIVE_MENU_CONTROLS.application.getCamera().stopFollowingObject();
        }
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onHiddenObjChange() {
        ACTIVE_MENU_CONTROLS.activeObj.setHidden(ACTIVE_MENU_CONTROLS.settings.hidden);
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onLogChanged() {
        if (ACTIVE_MENU_CONTROLS.settings.log) {
            log_1.Log.enableLog();
        }
        else {
            log_1.Log.disableLog();
        }
    }
    setup() {
        ACTIVE_MENU_CONTROLS = this;
        this.widgets = WebGlLessonUI.setupUI(document.querySelector('#ui'), this.settings, [
            { type: 'checkbox', key: 'log', change: this.onLogChanged },
            { type: 'option', key: 'target', options: this.loadedObjs, },
            { type: 'checkbox', key: 'look_at', change: this.onLookAtObjectChange, },
            { type: 'checkbox', key: 'follow', change: this.onFollowObjectChange, },
            { type: 'slider', key: 'cameraX', change: this.onCameraChange, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'cameraY', change: this.onCameraChange, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'cameraZ', change: this.onCameraChange, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'cameraUpX', change: this.onCameraUpChange, min: -1, max: 1, precision: 1, step: 1, },
            { type: 'slider', key: 'cameraUpY', change: this.onCameraUpChange, min: -1, max: 1, precision: 1, step: 1, },
            { type: 'slider', key: 'cameraUpZ', change: this.onCameraUpChange, min: -1, max: 1, precision: 1, step: 1, },
            { type: 'slider', key: 'fov', change: this.onFovChange, min: 0, max: 180, },
            { type: 'slider', key: 'targetX', change: this.onTargetPositionChange, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'targetY', change: this.onTargetPositionChange, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'targetZ', change: this.onTargetPositionChange, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'option', key: 'currentobj', change: this.onCurrentObjChange, options: this.loadedObjs, },
            { type: 'checkbox', key: 'hidden', change: this.onHiddenObjChange, options: this.loadedObjs, },
            { type: 'slider', key: 'posX', change: this.onObjectPositionChange, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'posY', change: this.onObjectPositionChange, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'posZ', change: this.onObjectPositionChange, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'scaleX', change: this.onObjectScaleChange, min: 0, max: 10, precision: 1, step: 1, },
            { type: 'slider', key: 'scaleY', change: this.onObjectScaleChange, min: 0, max: 10, precision: 1, step: 1, },
            { type: 'slider', key: 'scaleZ', change: this.onObjectScaleChange, min: 0, max: 10, precision: 1, step: 1, },
            { type: 'slider', key: 'theta', change: this.onObjectPolarRotationChange, min: 0, max: 360 },
            { type: 'slider', key: 'phi', change: this.onObjectPolarRotationChange, min: 0, max: 360 },
        ]);
    }
}
__decorate([
    (0, options_1.OnSignal)(camera_signals_1.default.CAMERA_TRANSLATION_SIGNAL_STRING_NAME)
], MenuControls.prototype, "onCameraSetPositionEvent", null);
__decorate([
    (0, options_1.OnSignal)(camera_signals_1.default.CAMERA_TARGET_SIGNAL_STRING_NAME)
], MenuControls.prototype, "onCameraTargetChanged", null);
exports.MenuControls = MenuControls;
//# sourceMappingURL=menu-controls.js.map