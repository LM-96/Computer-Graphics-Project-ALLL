"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var _MenuControls_application, _MenuControls_activeObj, _MenuControls_targetObj, _MenuControls_widgets, _MenuControls_loadedObjs, _MenuControls_settings, _MenuControls_currentObjReceipt;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuControls = void 0;
const angle_1 = require("../geometry/angle/angle");
const camera_signals_1 = require("../camera/camera-signals");
const log_1 = require("../log/log");
const signals_decorator_1 = require("../signals/signals-decorator");
const options_1 = require("../signals/options");
const pair_1 = require("../types/pair");
let MenuControls = class MenuControls {
    constructor(application) {
        _MenuControls_application.set(this, void 0);
        _MenuControls_activeObj.set(this, void 0);
        _MenuControls_targetObj.set(this, void 0);
        _MenuControls_widgets.set(this, void 0);
        _MenuControls_loadedObjs.set(this, void 0);
        _MenuControls_settings.set(this, void 0);
        _MenuControls_currentObjReceipt.set(this, void 0);
        __classPrivateFieldSet(this, _MenuControls_application, application, "f");
        __classPrivateFieldSet(this, _MenuControls_loadedObjs, application.getMeshObjectManager().getAll().map((obj) => obj.getName()), "f");
        __classPrivateFieldSet(this, _MenuControls_currentObjReceipt, [], "f");
        __classPrivateFieldSet(this, _MenuControls_settings, {
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
            lightFov: application.getMeshObjectDrawer().getSlManager().getFov().getValueIn(angle_1.AngleUnit.DEG),
            lightNear: application.getMeshObjectDrawer().getSlManager().getNear(),
            lightFar: application.getMeshObjectDrawer().getSlManager().getFar(),
            spotlight: application.getMeshObjectDrawer().getSlManager().isSpotlight(),
            lightWidth: application.getMeshObjectDrawer().getSlManager().getProjWidth(),
            lightHeight: application.getMeshObjectDrawer().getSlManager().getProjHeight(),
            lightUpX: application.getMeshObjectDrawer().getSlManager().getLightUp().getFirst(),
            lightUpY: application.getMeshObjectDrawer().getSlManager().getLightUp().getSecond(),
            lightUpZ: application.getMeshObjectDrawer().getSlManager().getLightUp().getThird(),
            fov: application.getCamera().getCurrentFov().getValueIn(angle_1.AngleUnit.DEG),
            zNear: application.getMeshObjectDrawer().zNear,
            zFar: application.getMeshObjectDrawer().zFar,
            currentobj: undefined,
            hidden: false,
            draw: false,
        }, "f");
        if (__classPrivateFieldGet(this, _MenuControls_loadedObjs, "f").length > 0) {
            __classPrivateFieldGet(this, _MenuControls_settings, "f").currentobj = 0;
            __classPrivateFieldGet(this, _MenuControls_settings, "f").target = 0;
            __classPrivateFieldSet(this, _MenuControls_targetObj, __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectManager().get(__classPrivateFieldGet(this, _MenuControls_loadedObjs, "f")[0]), "f");
            this.updateActiveObj(false);
        }
    }
    subscribeCurrentObjSignals() {
        log_1.Log.log("Subscribing to signals of " + __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getName());
        __classPrivateFieldGet(this, _MenuControls_currentObjReceipt, "f").push((0, pair_1.pairOf)(__classPrivateFieldGet(this, _MenuControls_activeObj, "f").getTranslationSubscriber(), __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getTranslationSubscriber().subscribe((0, options_1.handler)((signal) => {
            __classPrivateFieldGet(this, _MenuControls_settings, "f").posX = signal.data.to.getX();
            __classPrivateFieldGet(this, _MenuControls_settings, "f").posY = signal.data.to.getY();
            __classPrivateFieldGet(this, _MenuControls_settings, "f").posZ = signal.data.to.getZ();
            this.updateUI();
        }))));
        __classPrivateFieldGet(this, _MenuControls_currentObjReceipt, "f").push((0, pair_1.pairOf)(__classPrivateFieldGet(this, _MenuControls_activeObj, "f").getScaleSubscriber(), __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getScaleSubscriber().subscribe((0, options_1.handler)((signal) => {
            __classPrivateFieldGet(this, _MenuControls_settings, "f").scaleX = signal.data.to.getFirst();
            __classPrivateFieldGet(this, _MenuControls_settings, "f").scaleY = signal.data.to.getSecond();
            __classPrivateFieldGet(this, _MenuControls_settings, "f").scaleZ = signal.data.to.getThird();
            this.updateUI();
        }))));
        __classPrivateFieldGet(this, _MenuControls_currentObjReceipt, "f").push((0, pair_1.pairOf)(__classPrivateFieldGet(this, _MenuControls_activeObj, "f").getPolarRotationSubscriber(), __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getPolarRotationSubscriber().subscribe((0, options_1.handler)((signal) => {
            __classPrivateFieldGet(this, _MenuControls_settings, "f").phi = signal.data.to.getFirst().getValueIn(angle_1.AngleUnit.DEG);
            __classPrivateFieldGet(this, _MenuControls_settings, "f").theta = signal.data.to.getSecond().getValueIn(angle_1.AngleUnit.DEG);
            __classPrivateFieldGet(this, _MenuControls_settings, "f").phi = signal.data.to.getThird().getValueIn(angle_1.AngleUnit.DEG);
            this.updateUI();
        }))));
        log_1.Log.log("Subscribed to signals of " + __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getName() +
            ", total subscriptions: " + __classPrivateFieldGet(this, _MenuControls_currentObjReceipt, "f").length);
    }
    unsubscribeCurrentObjSignals() {
        log_1.Log.log("Unsubscribing from signals of " + __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getName());
        __classPrivateFieldGet(this, _MenuControls_currentObjReceipt, "f").forEach((pair) => {
            pair.getFirst().unsubscribe(pair.getSecond());
        });
        log_1.Log.log("Unsubscribed from signals of " + __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getName() + " completed");
        __classPrivateFieldSet(this, _MenuControls_currentObjReceipt, [], "f");
    }
    updateActiveObj(updateUI = true) {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        if (__classPrivateFieldGet(this, _MenuControls_activeObj, "f") != undefined) {
            this.unsubscribeCurrentObjSignals();
        }
        __classPrivateFieldSet(this, _MenuControls_activeObj, __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectManager().get(__classPrivateFieldGet(this, _MenuControls_loadedObjs, "f")[settings.currentobj]), "f");
        settings.posX = __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getPosition().getX();
        settings.posY = __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getPosition().getY();
        settings.posZ = __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getPosition().getZ();
        settings.scaleX = __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getCurrentScale().getFirst();
        settings.scaleY = __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getCurrentScale().getSecond();
        settings.scaleZ = __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getCurrentScale().getThird();
        settings.phi = __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getPolarRotation().getFirst().getValueIn(angle_1.AngleUnit.DEG);
        settings.theta = __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getPolarRotation().getSecond().getValueIn(angle_1.AngleUnit.DEG);
        settings.hidden = __classPrivateFieldGet(this, _MenuControls_activeObj, "f").getHidden();
        this.subscribeCurrentObjSignals();
        if (updateUI) {
            this.updateUI();
        }
    }
    updateUI() {
        WebGlLessonUI.updateUI(__classPrivateFieldGet(this, _MenuControls_widgets, "f"), __classPrivateFieldGet(this, _MenuControls_settings, "f"));
    }
    onCameraSetPositionEvent(signal) {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        settings.cameraX = signal.data.to.getX();
        settings.cameraY = signal.data.to.getY();
        settings.cameraZ = signal.data.to.getZ();
        this.updateUI();
    }
    onCameraSetUpEvent(signal) {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        settings.cameraUpX = signal.data.newValue.getFirst();
        settings.cameraUpY = signal.data.newValue.getSecond();
        settings.cameraUpZ = signal.data.newValue.getThird();
        this.updateUI();
    }
    onCameraTargetChanged(signal) {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        settings.targetX = signal.data.newValue.getX();
        settings.targetY = signal.data.newValue.getY();
        settings.targetZ = signal.data.newValue.getZ();
        this.updateUI();
    }
    onCameraChange() {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        __classPrivateFieldGet(this, _MenuControls_application, "f").getCamera().setPosition(settings.cameraX, settings.cameraY, settings.cameraZ);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onObjectPositionChange() {
        if (__classPrivateFieldGet(this, _MenuControls_loadedObjs, "f") != undefined) {
            let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
            __classPrivateFieldGet(this, _MenuControls_activeObj, "f").setPosition(settings.posX, settings.posY, settings.posZ);
            __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
        }
    }
    onTargetPositionChange() {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        __classPrivateFieldGet(this, _MenuControls_application, "f").getCamera().setTarget(settings.targetX, settings.targetY, settings.targetZ);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onFovChange() {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        __classPrivateFieldGet(this, _MenuControls_application, "f").getCamera().setFov((0, angle_1.degree)(settings.fov));
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onActiveObjChange() {
        this.updateActiveObj();
    }
    onObjectScaleChange() {
        if (__classPrivateFieldGet(this, _MenuControls_loadedObjs, "f") != undefined) {
            let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
            __classPrivateFieldGet(this, _MenuControls_activeObj, "f").setScale(settings.scaleX, settings.scaleY, settings.scaleZ);
            __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
        }
    }
    onObjectPolarRotationChange() {
        if (__classPrivateFieldGet(this, _MenuControls_loadedObjs, "f") != undefined) {
            let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
            __classPrivateFieldGet(this, _MenuControls_activeObj, "f").setPolarRotation((0, angle_1.degree)(settings.psi), (0, angle_1.degree)(settings.theta), (0, angle_1.degree)(settings.phi));
            __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
        }
    }
    onCameraUpChange() {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        __classPrivateFieldGet(this, _MenuControls_application, "f").getCamera().setUp(settings.cameraUpX, settings.cameraUpY, settings.cameraUpZ);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLookAtObjectChange() {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        if (settings.look_at) {
            __classPrivateFieldGet(this, _MenuControls_application, "f").getCamera().startLookingAtObject(__classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectManager()
                .get(__classPrivateFieldGet(this, _MenuControls_loadedObjs, "f")[settings.target]));
        }
        else {
            if (settings.follow) {
                settings.follow = false;
                this.updateUI();
                this.onFollowObjectChange();
            }
            __classPrivateFieldGet(this, _MenuControls_application, "f").getCamera().stopLookingAtObject();
        }
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onFollowObjectChange() {
        let settings = __classPrivateFieldGet(this, _MenuControls_settings, "f");
        if (settings.follow) {
            if (!settings.look_at) {
                settings.look_at = true;
                this.updateUI();
                this.onLookAtObjectChange();
            }
            __classPrivateFieldGet(this, _MenuControls_application, "f").getCamera().startFollowingObject(__classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectManager()
                .get(__classPrivateFieldGet(this, _MenuControls_loadedObjs, "f")[settings.target]));
        }
        else {
            __classPrivateFieldGet(this, _MenuControls_application, "f").getCamera().stopFollowingObject();
        }
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onHiddenObjChange() {
        __classPrivateFieldGet(this, _MenuControls_activeObj, "f").setHidden(__classPrivateFieldGet(this, _MenuControls_settings, "f").hidden);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLogChanged() {
        if (__classPrivateFieldGet(this, _MenuControls_settings, "f").log) {
            log_1.Log.enableLog();
        }
        else {
            log_1.Log.disableLog();
        }
    }
    onTargetObjChange() {
        if (__classPrivateFieldGet(this, _MenuControls_settings, "f").look_at || __classPrivateFieldGet(this, _MenuControls_settings, "f").follow) {
            __classPrivateFieldGet(this, _MenuControls_settings, "f").target = __classPrivateFieldGet(this, _MenuControls_loadedObjs, "f").indexOf(__classPrivateFieldGet(this, _MenuControls_targetObj, "f").getName());
            this.updateUI();
        }
        else {
            __classPrivateFieldSet(this, _MenuControls_targetObj, __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectManager()
                .get(__classPrivateFieldGet(this, _MenuControls_loadedObjs, "f")[__classPrivateFieldGet(this, _MenuControls_settings, "f").target]), "f");
        }
    }
    onDrawPressed() {
        if (__classPrivateFieldGet(this, _MenuControls_settings, "f").draw) {
            __classPrivateFieldGet(this, _MenuControls_settings, "f").draw = false;
            __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
            this.updateUI();
        }
    }
    onZNearChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().zNear = __classPrivateFieldGet(this, _MenuControls_settings, "f").zNear;
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onZFarChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().zFar = __classPrivateFieldGet(this, _MenuControls_settings, "f").zFar;
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onFrustumChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().setLightFrustum(__classPrivateFieldGet(this, _MenuControls_settings, "f").frustum);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onShadowsChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setShadows(__classPrivateFieldGet(this, _MenuControls_settings, "f").shadows);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLightPositionChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setLightPosition(__classPrivateFieldGet(this, _MenuControls_settings, "f").lightPosX, __classPrivateFieldGet(this, _MenuControls_settings, "f").lightPosY, __classPrivateFieldGet(this, _MenuControls_settings, "f").lightPosZ);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLightTargetChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setLightTarget(__classPrivateFieldGet(this, _MenuControls_settings, "f").lightTargX, __classPrivateFieldGet(this, _MenuControls_settings, "f").lightTargY, __classPrivateFieldGet(this, _MenuControls_settings, "f").lightTargZ);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLightFovChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setFov((0, angle_1.degree)(__classPrivateFieldGet(this, _MenuControls_settings, "f").lightFov));
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onSpotlightChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setSpotlight(__classPrivateFieldGet(this, _MenuControls_settings, "f").spotlight);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLightWidthChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setProjWidth(__classPrivateFieldGet(this, _MenuControls_settings, "f").lightWidth);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLightHeightChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setProjHeight(__classPrivateFieldGet(this, _MenuControls_settings, "f").lightHeight);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLightUpChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setLightUp(__classPrivateFieldGet(this, _MenuControls_settings, "f").lightUpX, __classPrivateFieldGet(this, _MenuControls_settings, "f").lightUpY, __classPrivateFieldGet(this, _MenuControls_settings, "f").lightUpZ);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onBiasChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().setBias(__classPrivateFieldGet(this, _MenuControls_settings, "f").bias);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLightNearChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setNear(__classPrivateFieldGet(this, _MenuControls_settings, "f").lightNear);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    onLightFarChange() {
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().getSlManager().setFar(__classPrivateFieldGet(this, _MenuControls_settings, "f").lightFar);
        __classPrivateFieldGet(this, _MenuControls_application, "f").getMeshObjectDrawer().drawScene();
    }
    setup() {
        __classPrivateFieldSet(this, _MenuControls_widgets, WebGlLessonUI.setupUI(document.querySelector('#ui'), __classPrivateFieldGet(this, _MenuControls_settings, "f"), [
            { type: 'checkbox', key: 'log', change: () => { this.onLogChanged(); } },
            /* CAMERA ***************************************************************************** */
            { type: 'option', key: 'target', change: () => { this.onTargetObjChange(); }, options: __classPrivateFieldGet(this, _MenuControls_loadedObjs, "f"), },
            { type: 'checkbox', key: 'look_at', change: () => { this.onLookAtObjectChange(); }, },
            { type: 'checkbox', key: 'follow', change: () => { this.onFollowObjectChange(); }, },
            { type: 'slider', key: 'cameraX', change: () => { this.onCameraChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'cameraY', change: () => { this.onCameraChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'cameraZ', change: () => { this.onCameraChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'cameraUpX', change: () => { this.onCameraUpChange(); }, min: -1, max: 1, precision: 3, step: 0.001, },
            { type: 'slider', key: 'cameraUpY', change: () => { this.onCameraUpChange(); }, min: -1, max: 1, precision: 3, step: 0.001, },
            { type: 'slider', key: 'cameraUpZ', change: () => { this.onCameraUpChange(); }, min: -1, max: 1, precision: 3, step: 0.001, },
            { type: 'slider', key: 'zNear', change: () => { this.onZNearChange(); }, min: -10, max: 10, precision: 2, step: 1, },
            { type: 'slider', key: 'zFar', change: () => { this.onZFarChange(); }, min: -200, max: 200, precision: 1, step: 1, },
            { type: 'slider', key: 'fov', change: () => { this.onFovChange(); }, min: 0, max: 180, },
            { type: 'slider', key: 'targetX', change: () => { this.onTargetPositionChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'targetY', change: () => { this.onTargetPositionChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'targetZ', change: () => { this.onTargetPositionChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            /* LIGHT ***************************************************************************** */
            { type: 'checkbox', key: 'frustum', change: () => { this.onFrustumChange(); } },
            { type: 'checkbox', key: 'shadows', change: () => { this.onShadowsChange(); } },
            //{ type: 'slider',   key: 'bias',    change: () => { this.onBiasChange() }, min: 0, max: 10, precision: 3, step: 0.001, },
            { type: 'slider', key: 'lightPosX', change: () => { this.onLightPositionChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'lightPosY', change: () => { this.onLightPositionChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'lightPosZ', change: () => { this.onLightPositionChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'lightTargX', change: () => { this.onLightTargetChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'lightTargY', change: () => { this.onLightTargetChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'lightTargZ', change: () => { this.onLightTargetChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'lightFov', change: () => { this.onLightFovChange(); }, min: 0, max: 360, precision: 1, step: 1, },
            { type: 'slider', key: 'lightNear', change: () => { this.onLightNearChange(); }, min: 0, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'lightFar', change: () => { this.onLightFarChange(); }, min: 0, max: 1000, precision: 1, step: 1, },
            { type: 'checkbox', key: 'spotlight', change: () => { this.onSpotlightChange(); } },
            { type: 'slider', key: 'lightWidth', change: () => { this.onLightWidthChange(); }, min: 0, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'lightHeight', change: () => { this.onLightHeightChange(); }, min: 0, max: 100, precision: 1, step: 1, },
            //{ type: 'slider',   key: 'lightUpX',    change: () => { this.onLightUpChange() }, min: -1, max: 1, precision: 3, step: 0.001, },
            //{ type: 'slider',   key: 'lightUpY',    change: () => { this.onLightUpChange() }, min:   -1, max: 1, precision: 3, step: 0.001, },
            //{ type: 'slider',   key: 'lightUpZ',    change: () => { this.onLightUpChange() }, min:   -1, max: 1, precision: 3, step: 0.001, },
            /* OBJECT ***************************************************************************** */
            { type: 'option', key: 'currentobj', change: () => { this.onActiveObjChange(); }, options: __classPrivateFieldGet(this, _MenuControls_loadedObjs, "f"), },
            { type: 'checkbox', key: 'hidden', change: () => { this.onHiddenObjChange(); }, options: __classPrivateFieldGet(this, _MenuControls_loadedObjs, "f"), },
            { type: 'slider', key: 'posX', change: () => { this.onObjectPositionChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'posY', change: () => { this.onObjectPositionChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'posZ', change: () => { this.onObjectPositionChange(); }, min: -100, max: 100, precision: 1, step: 1, },
            { type: 'slider', key: 'scaleX', change: () => { this.onObjectScaleChange(); }, min: 0, max: 10, precision: 1, step: 1, },
            { type: 'slider', key: 'scaleY', change: () => { this.onObjectScaleChange(); }, min: 0, max: 10, precision: 1, step: 1, },
            { type: 'slider', key: 'scaleZ', change: () => { this.onObjectScaleChange(); }, min: 0, max: 10, precision: 1, step: 1, },
            { type: 'slider', key: 'psi', change: () => { this.onObjectPolarRotationChange(); }, min: 0, max: 360 },
            { type: 'slider', key: 'theta', change: () => { this.onObjectPolarRotationChange(); }, min: 0, max: 360 },
            { type: 'slider', key: 'phi', change: () => { this.onObjectPolarRotationChange(); }, min: 0, max: 360 },
            { type: 'checkbox', key: 'draw', change: () => { this.onDrawPressed(); } },
        ]), "f");
    }
};
_MenuControls_application = new WeakMap(), _MenuControls_activeObj = new WeakMap(), _MenuControls_targetObj = new WeakMap(), _MenuControls_widgets = new WeakMap(), _MenuControls_loadedObjs = new WeakMap(), _MenuControls_settings = new WeakMap(), _MenuControls_currentObjReceipt = new WeakMap();
__decorate([
    (0, signals_decorator_1.OnSignalMethod)(camera_signals_1.default.CAMERA_TRANSLATION_SIGNAL_STRING_NAME)
], MenuControls.prototype, "onCameraSetPositionEvent", null);
__decorate([
    (0, signals_decorator_1.OnSignalMethod)(camera_signals_1.default.CAMERA_UP_SIGNAL_STRING_NAME)
], MenuControls.prototype, "onCameraSetUpEvent", null);
__decorate([
    (0, signals_decorator_1.OnSignalMethod)(camera_signals_1.default.CAMERA_TARGET_SIGNAL_STRING_NAME)
], MenuControls.prototype, "onCameraTargetChanged", null);
MenuControls = __decorate([
    signals_decorator_1.SignalListener
], MenuControls);
exports.MenuControls = MenuControls;
//# sourceMappingURL=menu-controls.js.map