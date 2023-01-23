"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MenuControls_loadedObj;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuControls = void 0;
const angle_1 = require("../geometry/angle/angle");
var ACTIVE_MENU_CONTROLS;
class MenuControls {
    constructor(application) {
        _MenuControls_loadedObj.set(this, void 0);
        this.application = application;
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
            currentobj: 'option1',
        };
        __classPrivateFieldSet(this, _MenuControls_loadedObj, application.getMeshObjectManager().getAll().map((obj) => obj.getName()), "f");
        this.activeObj = application.getMeshObjectManager().get(this.settings.currentobj);
    }
    updateObj() {
        this.activeObj = this.application.getMeshObjectManager().get(this.settings.currentobj);
        this.settings.posX = this.activeObj.getPosition().getX();
        this.settings.posY = this.activeObj.getPosition().getY();
        this.settings.posZ = this.activeObj.getPosition().getZ();
        WebGlLessonUI.updateUI(this.widgets, this.settings);
    }
    onCameraChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        ACTIVE_MENU_CONTROLS.application.getCamera().setPosition(settings.cameraX, settings.cameraY, settings.cameraZ);
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onObjectPositionChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        ACTIVE_MENU_CONTROLS.activeObj.setPosition(settings.posX, settings.posY, settings.posZ);
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onTargetPositionChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        ACTIVE_MENU_CONTROLS.application.getCamera().setTarget(settings.targetX, settings.targetY, settings.targetZ);
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onFovChange() {
        let settings = ACTIVE_MENU_CONTROLS.settings;
        ACTIVE_MENU_CONTROLS.application.getCamera().setFov((0, angle_1.degree)(settings.fieldOfView));
        ACTIVE_MENU_CONTROLS.application.getMeshObjectDrawer().drawScene();
    }
    onCurrentObjChange() {
        ACTIVE_MENU_CONTROLS.updateObj();
    }
    setup() {
        ACTIVE_MENU_CONTROLS = this;
        this.widgets = WebGlLessonUI.setupUI(document.querySelector('#ui'), this.settings, [
            { type: 'checkbox', key: 'Active_Menu', },
            { type: 'slider', key: 'cameraX', change: this.onCameraChange, min: -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider', key: 'cameraY', change: this.onCameraChange, min: -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider', key: 'cameraZ', change: this.onCameraChange, min: -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider', key: 'fieldOfView', change: this.onFovChange, min: 0, max: 180, },
            { type: 'slider', key: 'targetX', change: this.onTargetPositionChange, min: -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider', key: 'targetY', change: this.onTargetPositionChange, min: 0, max: 20, precision: 2, step: 0.001, },
            { type: 'slider', key: 'targetZ', change: this.onTargetPositionChange, min: -10, max: 20, precision: 2, step: 0.001, },
            { type: 'option', key: 'currentobj', change: this.onCurrentObjChange, options: __classPrivateFieldGet(this, _MenuControls_loadedObj, "f"), },
            { type: 'slider', key: 'posX', change: this.onObjectPositionChange, min: -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider', key: 'posY', change: this.onObjectPositionChange, min: -10, max: 10, precision: 2, step: 0.001, },
            { type: 'slider', key: 'posZ', change: this.onObjectPositionChange, min: 0.25, max: 5, precision: 2, step: 0.001, },
        ]);
    }
}
exports.MenuControls = MenuControls;
_MenuControls_loadedObj = new WeakMap();
//# sourceMappingURL=menu_controls.js.map