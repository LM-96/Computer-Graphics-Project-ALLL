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
var _UserInputs_application, _UserInputs_drag, _UserInputs_oldX, _UserInputs_oldY, _UserInputs_target, _UserInputs_controller;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputs = void 0;
const log_1 = require("../log/log");
const angle_1 = require("../geometry/angle/angle");
const user_input_controller_1 = require("./user-input-controller");
class UserInputs {
    constructor(application) {
        _UserInputs_application.set(this, void 0);
        _UserInputs_drag.set(this, false);
        _UserInputs_oldX.set(this, 0);
        _UserInputs_oldY.set(this, 0);
        _UserInputs_target.set(this, void 0);
        _UserInputs_controller.set(this, void 0);
        __classPrivateFieldSet(this, _UserInputs_application, application, "f");
        __classPrivateFieldSet(this, _UserInputs_controller, new user_input_controller_1.UserInputController(), "f");
    }
    mouseDown(e) {
        __classPrivateFieldSet(this, _UserInputs_drag, true, "f");
        if (e instanceof MouseEvent) {
            __classPrivateFieldSet(this, _UserInputs_oldX, e.pageX, "f");
            __classPrivateFieldSet(this, _UserInputs_oldY, e.pageY, "f");
        }
        else {
            __classPrivateFieldSet(this, _UserInputs_oldX, e.touches[0].clientX, "f");
            __classPrivateFieldSet(this, _UserInputs_oldY, e.touches[0].clientY, "f");
        }
        e.preventDefault();
        return false;
    }
    mouseUp1(e) {
        __classPrivateFieldSet(this, _UserInputs_drag, false, "f");
    }
    mouseMove1(e) {
        if (!__classPrivateFieldGet(this, _UserInputs_drag, "f"))
            return false;
        let dX;
        let dY;
        if (e instanceof MouseEvent) {
            dX = (e.pageX - __classPrivateFieldGet(this, _UserInputs_oldX, "f")) * 2 * Math.PI / __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().width;
            dY = (e.pageY - __classPrivateFieldGet(this, _UserInputs_oldY, "f")) * 2 * Math.PI / __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().height;
            __classPrivateFieldSet(this, _UserInputs_oldX, e.pageX, "f");
            __classPrivateFieldSet(this, _UserInputs_oldY, e.pageY, "f");
        }
        else if (e instanceof TouchEvent) {
            dX = (e.touches[0].clientX - __classPrivateFieldGet(this, _UserInputs_oldX, "f")) * 2 * Math.PI / __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().width;
            dY = (e.touches[0].clientY - __classPrivateFieldGet(this, _UserInputs_oldY, "f")) * 2 * Math.PI / __classPrivateFieldGet(this, _UserInputs_application, "f").getCanvas().height;
            __classPrivateFieldSet(this, _UserInputs_oldX, e.touches[0].clientX, "f");
            __classPrivateFieldSet(this, _UserInputs_oldY, e.touches[0].clientY, "f");
        }
        let currentAngles = __classPrivateFieldGet(this, _UserInputs_target, "f").getPolarRotation();
        __classPrivateFieldGet(this, _UserInputs_target, "f").setPolarRotation(currentAngles.getFirst(), currentAngles.getSecond(), currentAngles.getThird().add((0, angle_1.radians)(dX)));
        currentAngles = __classPrivateFieldGet(this, _UserInputs_target, "f").getPolarRotation();
        __classPrivateFieldGet(this, _UserInputs_controller, "f").navigate(dY, currentAngles.getThird());
        //e.preventDefault();
        __classPrivateFieldGet(this, _UserInputs_application, "f").getMeshObjectDrawer().drawScene();
        log_1.Log.log("Angles || PSY:" + currentAngles.getFirst().toString() + ", THETA:" + currentAngles.getSecond().toString() +
            ", PHI:" + currentAngles.getThird().toString());
    }
    keydownMap(e) {
        log_1.Log.log("Key pressed: " + e.code);
        switch (e.code) {
            case "ArrowDown":
                __classPrivateFieldGet(this, _UserInputs_controller, "f").move(e.code);
                break; //Freccia Giù
            case "ArrowUp":
                __classPrivateFieldGet(this, _UserInputs_controller, "f").move(e.code);
                break; //Freccia Su
            case "ArrowLeft":
                __classPrivateFieldGet(this, _UserInputs_controller, "f").move(e.code);
                break; //Freccia Sx
            case "ArrowRight":
                __classPrivateFieldGet(this, _UserInputs_controller, "f").move(e.code);
                break; //Ferccia Dx
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
        __classPrivateFieldGet(this, _UserInputs_application, "f").getMeshObjectDrawer().drawScene();
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
        document.addEventListener("touchstart", (ev) => { this.mouseDown(ev); });
        document.addEventListener("touchend", (ev) => { this.mouseUp1(ev); });
        document.addEventListener("touchmove", (ev) => { this.mouseMove1(ev); });
        // document.addEventListener('keydown', (event) => {this.keydownMap(event)});
        document.addEventListener("keydown", (event) => { this.keydownMapExtend(event); });
    }
    setTarget(target) {
        console.log("user input set target");
        __classPrivateFieldSet(this, _UserInputs_target, target, "f");
        __classPrivateFieldGet(this, _UserInputs_controller, "f").setTarget(target);
    }
    keydownMapExtend(e) {
        let cam = __classPrivateFieldGet(this, _UserInputs_application, "f").getCamera();
        switch (e.code) {
            case "ArrowDown":
                __classPrivateFieldGet(this, _UserInputs_controller, "f").move(e.code);
                break; //Freccia Giù
            case "ArrowUp":
                __classPrivateFieldGet(this, _UserInputs_controller, "f").move(e.code);
                break; //Freccia Su
            case "ArrowLeft":
                __classPrivateFieldGet(this, _UserInputs_controller, "f").move(e.code);
                break; //Freccia Sx
            case "ArrowRight":
                __classPrivateFieldGet(this, _UserInputs_controller, "f").move(e.code);
                break; //Ferccia Dx
            case "KeyI":
                this.setCameraView(1);
                break;
            case "KeyO":
                this.setCameraView(2);
                break;
            case "KeyP":
                this.setCameraView(3);
                break;
            case "Space":
                this.setCameraView(0);
                break;
            case "Period":
                __classPrivateFieldGet(this, _UserInputs_application, "f").getCamera().setFov(cam.getCurrentFov().add(5, angle_1.AngleUnit.DEG));
                break;
            case "Comma":
                __classPrivateFieldGet(this, _UserInputs_application, "f").getCamera().setFov(cam.getCurrentFov().add(-5, angle_1.AngleUnit.DEG));
                break;
            case "KeyZ":
                this.placeObj("z");
                break;
            case "KeyX":
                this.placeObj("x");
                break;
            case "KeyC":
                this.placeObj("c");
                break;
            //case "KeyV": this.placeObj("v")
        }
        __classPrivateFieldGet(this, _UserInputs_application, "f").getMeshObjectDrawer().drawScene();
    }
    setCameraView(view) {
        let cam = __classPrivateFieldGet(this, _UserInputs_application, "f").getCamera();
        let helmet = __classPrivateFieldGet(this, _UserInputs_application, "f").getMeshObjectManager().get("helmet");
        cam.startFollowingObject(helmet);
        cam.setFov(new angle_1.Angle(60, angle_1.AngleUnit.DEG));
        switch (view) {
            case 1:
                cam.setPosition(70, 70, 80);
                break;
            case 2:
                cam.setPosition(1, 1, 85);
                cam.setFov(new angle_1.Angle(95, angle_1.AngleUnit.DEG));
                break;
            case 3:
                cam.setPosition(80, 0, 30);
                break;
            case 0: cam.setPosition(helmet.getPosition().translate(15, 0, 10));
        }
    }
    placeObj(objNum) {
        let incrementalNum = __classPrivateFieldGet(this, _UserInputs_application, "f").getMeshObjectManager().getAll().length;
        let myObj = __classPrivateFieldGet(this, _UserInputs_application, "f").getMeshObjectManager().get("helmet");
        let d = -1;
        let objPah;
        switch (objNum) {
            //TODO. Add objs path
            case "z":
                objPah = "./assets/LucaLanAssets/helmet.obj";
                break;
            case "x":
                objPah = "./assets/building.obj";
                break;
            case "c":
                objPah = "./assets/bed.obj";
                break;
            case "v":
                objPah = "";
                break;
        }
        let newCreatedObj = __classPrivateFieldGet(this, _UserInputs_application, "f").getMeshObjectManager().loadObj("obj" + incrementalNum, objPah);
        newCreatedObj.setPosition(myObj.getPosition().translate(-d * Math.sin(myObj.getPolarRotation().getThird().getValueIn(angle_1.AngleUnit.RAD)), d * Math.cos(myObj.getPolarRotation().getThird().getValueIn(angle_1.AngleUnit.RAD)), 0));
        newCreatedObj.setPosition(newCreatedObj.getPosition().getX(), newCreatedObj.getPosition().getY(), 1);
        newCreatedObj.setPolarRotation(myObj.getPolarRotation().getFirst(), myObj.getPolarRotation().getSecond(), myObj.getPolarRotation().getThird());
        switch (objNum) {
            //TODO. Add objs path
            case "z":
                ;
                break;
            case "x":
                newCreatedObj.setScale(0.7, 0.7, 0.4);
                break;
            case "c":
                newCreatedObj.setPolarRotation(new angle_1.Angle(90, angle_1.AngleUnit.DEG), new angle_1.Angle(0, angle_1.AngleUnit.DEG), new angle_1.Angle(0, angle_1.AngleUnit.DEG));
                newCreatedObj.setScale(2, 2, 2);
                break;
            case "v":
                objPah = "";
                break;
        }
    }
}
exports.UserInputs = UserInputs;
_UserInputs_application = new WeakMap(), _UserInputs_drag = new WeakMap(), _UserInputs_oldX = new WeakMap(), _UserInputs_oldY = new WeakMap(), _UserInputs_target = new WeakMap(), _UserInputs_controller = new WeakMap();
//# sourceMappingURL=user-inputs.js.map