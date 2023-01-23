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
var _UserInputs_application, _UserInputs_drag, _UserInputs_oldX, _UserInputs_oldY, _UserInputs_target;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputs = void 0;
const log_1 = require("../log/log");
const angle_1 = require("../geometry/angle/angle");
class UserInputs {
    constructor(application) {
        _UserInputs_application.set(this, void 0);
        _UserInputs_drag.set(this, false);
        _UserInputs_oldX.set(this, 0);
        _UserInputs_oldY.set(this, 0);
        _UserInputs_target.set(this, void 0);
        __classPrivateFieldSet(this, _UserInputs_application, application, "f");
    }
    mouseDown(e) {
        __classPrivateFieldSet(this, _UserInputs_drag, true, "f");
        __classPrivateFieldSet(this, _UserInputs_oldX, e.pageX, "f");
        __classPrivateFieldSet(this, _UserInputs_oldY, e.pageY, "f");
        e.preventDefault();
        return false;
    }
    mouseUp1(e) {
        __classPrivateFieldSet(this, _UserInputs_drag, false, "f");
    }
    mouseMove1(e) {
        if (!__classPrivateFieldGet(this, _UserInputs_drag, "f"))
            return false;
        let dX = (e.pageX - __classPrivateFieldGet(this, _UserInputs_oldX, "f")) * 2 * Math.PI / __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().width;
        let dY = (e.pageY - __classPrivateFieldGet(this, _UserInputs_oldY, "f")) * 2 * Math.PI / __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().height;
        let currentAngles = __classPrivateFieldGet(this, _UserInputs_target, "f").getPolarRotation();
        __classPrivateFieldGet(this, _UserInputs_target, "f").setPolarRotation(currentAngles.getFirst(), currentAngles.getSecond().add((0, angle_1.radians)(dY)), currentAngles.getThird());
        currentAngles = __classPrivateFieldGet(this, _UserInputs_target, "f").getPolarRotation();
        __classPrivateFieldSet(this, _UserInputs_oldX, e.pageX, "f");
        __classPrivateFieldSet(this, _UserInputs_oldY, e.pageY, "f");
        e.preventDefault();
        log_1.Log.log("Angles || PSY:" + currentAngles.getFirst().toString() + ", THETA:" + currentAngles.getSecond().toString() +
            ", PHI:" + currentAngles.getThird().toString());
    }
    keydownMap(e) {
        switch (e.code) {
            // case "ArrowDown" : canvas1.controller.move(KEYMOVE.downArrow); break;      	//Freccia Giù
            // case "ArrowUp" : canvas1.controller.move(KEYMOVE.upArrow); break;       	//Freccia Su
            // case "ArrowLeft" : canvas1.controller.move(KEYMOVE.leftArrow); break;       //Freccia Sx
            // case "ArrowLeft" : canvas1.controller.move(KEYMOVE.rightArrow); break;       	//Ferccia Dx
            // case 104 : trans(0,0,0.1); break;		//NUmpad 8
            // case 189:  trans(0,0,-0.1); break;		//-
            // case 96 : 	CAMERA_MANAGER.changeCameraView(0); break;        //NUMpad 0
            // case 49 : 	CAMERA_MANAGER.changeCameraView(1); break;         	//NUMpad 1
            // case 50 : 	CAMERA_MANAGER.changeCameraView(2); break;      	//NUMpad 2
            // case 51 : 	CAMERA_MANAGER.changeCameraView(3); break;          //NumPad 3
            // case 52 :	CAMERA_MANAGER.changeCameraView(4); break;        	//NumPad 4
            // case 53 :	CAMERA_MANAGER.changeCameraView(5); break;			//NumPad 5
            // case 54 :	CAMERA_MANAGER.changeCameraView(0); break;			//NumPad 6
            // case 188: 	CAMERA_MANAGER.incrementCameraFov(-1); break;		//,
            // case 190:	CAMERA_MANAGER.incrementCameraFov(1); break;		//.
        }
    }
    //
    // const keydownMapLog = function(e) {
    //     switch(e.keyCode) {
    //         case 40 : log("Freccia Giù"); break;      	//Freccia Giù
    //         case 38 : log("Freccia Su"); break;       	//Freccia Su
    //         case 37 : log("Freccia Sx"); break;       //Freccia Sx
    //         case 39 : log("Freccia Dx"); break;       	//Ferccia Dx
    //         case 104 : log("Tasto: 8"); break;		//NUmpad 8
    //         case 189: console.log(settings); break;    //-
    //         default: log("Tasto:" + e.keyCode)
    //     }
    // }
    attachHandler(handlerType, handlerFunc) {
        switch (handlerType.toLowerCase()) {
            case "onmousedown":
                __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().onmousedown = handlerFunc;
                break;
            case "onmouseup":
                __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().onmouseup = handlerFunc;
                break;
            case "onmouseout":
                __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().onmouseout = handlerFunc;
                break;
            case "onmousemove":
                __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().onmousemove = handlerFunc;
                break;
            case "onkeydown":
                document.addEventListener('keydown', handlerFunc);
                break;
            case "ontouchmove":
                document.addEventListener("ontouchmove", handlerFunc);
                break;
            case "ontouchstart":
                document.addEventListener("ontouchstart", handlerFunc);
                break;
            case "ontouchend":
                document.addEventListener("ontouchend", handlerFunc);
                break;
        }
        log_1.Log.log("Attached Handler: " + handlerType.toLowerCase());
    }
    attachHandlers() {
        __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().onmousedown = (ev) => { this.mouseDown(ev); };
        __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().onmouseup = (ev) => { this.mouseUp1(ev); };
        __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().onmouseout = (ev) => { this.mouseUp1(ev); };
        __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().onmousemove = (ev) => { this.mouseMove1(ev); };
        //document.addEventListener('keydown', keydownMap);
    }
    setTarget(target) {
        __classPrivateFieldSet(this, _UserInputs_target, target, "f");
    }
}
exports.UserInputs = UserInputs;
_UserInputs_application = new WeakMap(), _UserInputs_drag = new WeakMap(), _UserInputs_oldX = new WeakMap(), _UserInputs_oldY = new WeakMap(), _UserInputs_target = new WeakMap();
//# sourceMappingURL=user-inputs.js.map