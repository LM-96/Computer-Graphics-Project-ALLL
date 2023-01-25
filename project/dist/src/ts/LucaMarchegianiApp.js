"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const webgl_application_1 = require("./webgl/webgl-application");
const log_1 = require("./log/log");
const menu_controls_1 = require("./controls/menu-controls");
const user_inputs_1 = require("./controls/user-inputs");
const limits_checkers_1 = require("./geometry/limits/limits-checkers");
const angle_1 = require("./geometry/angle/angle");
const camera_man_1 = require("./camera/camera-man");
const SHADERS = {
    main: ["vertex-shader", "fragment-shader"],
    color: ["color-vertex-shader", "color-fragment-shader"]
};
// VERTICES OF THE WORLD (0, 0), (B, 0), (B, -H), (0, -H)
const BASE = 200;
const HIGH = 365;
const TOLERANCE = 3;
let GothamApp = class GothamApp extends webgl_application_1.WebGLApplication {
    constructor() {
        super();
    }
    onMouseDown(e) {
        log_1.Log.log("WebGLApplication | capturing mouse down [event type: " + e.type + "]");
        this.userInputs.mouseDown(e);
    }
    onMouseUp(e) {
        log_1.Log.log("WebGLApplication | capturing mouse up [event type: " + e.type + "]");
        this.userInputs.mouseUp1(e);
    }
    onMouseMove(e) {
        log_1.Log.log("WebGLApplication | capturing mouse move [event type: " + e.type + "]");
        this.userInputs.mouseMove1(e);
    }
    onKeyDown(e) {
        log_1.Log.log("WebGLApplication | capturing key down [event type: " + e.type +
            ", key: " + e.key + "]");
        this.userInputs.keydownMap(e);
    }
    init() {
        this.menu = new menu_controls_1.MenuControls(this);
        this.userInputs = new user_inputs_1.UserInputs(this);
    }
    afterObjectsLoaded() {
        // It's now possible to setup the menu
        log_1.Log.log("WebGLApplication | after objects loaded");
        let cameraMan = this.getMeshObjectDrawer().getCameraMan();
        cameraMan.setTarget(this.batMoto);
        cameraMan.setPhase(this.batMoto.getPolarRotation().getThird().multiply(-1));
        cameraMan.hire(camera_man_1.CameraManWorkMode.THIRD_PERSON);
    }
    afterEventsRegistered() {
        // Set the target object of the user inputs used by the event listeners
        // immediately after they
        log_1.Log.log("WebGLApplication | after events registered");
        this.userInputs.setTarget(this.batMoto);
    }
    beforeStart() {
        // Light Set up
        let light = this.getMeshObjectDrawer().getSlManager();
        light.setFar(200);
        light.setProjHeight(200);
        light.setProjWidth(200);
        light.setLightPosition(20, 20, 100);
        light.setLightTarget(20, 20, 0);
        light.setShadows(true);
        this.getMeshObjectDrawer().zFar = 700;
        this.menu.setup();
    }
    main(args) {
        console.log("Hello world! [" + this.applicationName + "]");
        this.renderScene();
    }
};
__decorate([
    (0, webgl_application_1.WebGLMesh)("./assets/objs/batmoto.obj"),
    (0, webgl_application_1.ObjPosition)(170, -131, 1),
    (0, webgl_application_1.ObjRotation)((0, angle_1.degree)(0), (0, angle_1.degree)(0), (0, angle_1.degree)(90)),
    (0, webgl_application_1.ObjScale)(0.3, 0.3, 0.3),
    (0, webgl_application_1.ObjLimitsChecker)(limits_checkers_1.LimitsCheckers.linear(TOLERANCE, HIGH - TOLERANCE, -BASE + TOLERANCE, 0 - TOLERANCE, 1, 1))
], GothamApp.prototype, "batMoto", void 0);
__decorate([
    (0, webgl_application_1.WebGLMesh)("./assets/objs/city.obj"),
    (0, webgl_application_1.ObjScale)(0.7, 0.7, 0.7)
], GothamApp.prototype, "world", void 0);
__decorate([
    (0, webgl_application_1.OnCanvasMouseEvent)("mousedown"),
    (0, webgl_application_1.OnCanvasTouchEvent)("touchstart")
], GothamApp.prototype, "onMouseDown", null);
__decorate([
    (0, webgl_application_1.OnCanvasMouseEvent)("mouseup"),
    (0, webgl_application_1.OnCanvasTouchEvent)("touchend"),
    (0, webgl_application_1.OnCanvasMouseEvent)("mouseout")
], GothamApp.prototype, "onMouseUp", null);
__decorate([
    (0, webgl_application_1.OnCanvasMouseEvent)("mousemove"),
    (0, webgl_application_1.OnCanvasTouchEvent)("touchmove")
], GothamApp.prototype, "onMouseMove", null);
__decorate([
    (0, webgl_application_1.OnKeyboardEvent)("keydown")
], GothamApp.prototype, "onKeyDown", null);
GothamApp = __decorate([
    (0, webgl_application_1.WebGL)("gotham-app", "my_Canvas", SHADERS)
], GothamApp);
//# sourceMappingURL=LucaMarchegianiApp.js.map