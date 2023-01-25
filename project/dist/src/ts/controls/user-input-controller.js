"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UserInputController_instances, _UserInputController_translateTarget, _UserInputController_rotateTarget;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputController = void 0;
const angle_1 = require("../geometry/angle/angle");
class UserInputController {
    constructor() {
        _UserInputController_instances.add(this);
        this.stepSize = 2;
        this.step = 2;
        this.controllerMode = 2;
        this.cameraMode = 0;
        this.controllerMode = 2;
    }
    //this.controllerMode = 1; //0 visuale in terza persona, //1 visuale dall'alto, //2 visuale in prima persona
    setTarget(target) {
        this.target = target;
    }
    setControllerMode(mode) {
        this.controllerMode = mode;
    }
    setCameraMode(mode) {
        this.cameraMode = mode;
    }
    move(move) {
        this.commandActuator(move, this.controllerMode);
    }
    commandActuator(move, controllerMode) {
        switch (controllerMode) {
            case 0:
                this.moveThirdPerson(move);
                break;
            case 1:
                this.moveFromTop(move);
                break; //Alto
            case 2:
                this.moveFirstPerson(move);
                break;
        }
    }
    moveFromTop(keyMove) {
        switch (keyMove) {
            case "ArrowUp":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_translateTarget).call(this, 0, this.stepSize, 0);
                break;
            case "ArrowDown":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_translateTarget).call(this, 0, -this.stepSize, 0);
                break;
            case "ArrowLeft":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_translateTarget).call(this, -this.stepSize, 0, 0);
                break;
            case "ArrowRight":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_translateTarget).call(this, this.stepSize, 0, 0);
                break;
        }
    }
    navigate(dForward, angle) {
        let dy = dForward * Math.cos(angle.getValueIn(angle_1.AngleUnit.RAD));
        let dx = dForward * -Math.sin(angle.getValueIn(angle_1.AngleUnit.RAD));
        let dz = 0;
        __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_translateTarget).call(this, dx, dy, dz);
    }
    moveFirstPerson(keyMove) {
        switch (keyMove) {
            case "ArrowUp":
                this.navigate(-4, this.target.getPolarRotation().getThird());
                break;
            case "ArrowDown":
                this.navigate(4, this.target.getPolarRotation().getThird());
                break;
            case "ArrowLeft":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_rotateTarget).call(this, (0, angle_1.degree)(0), (0, angle_1.degree)(0), (0, angle_1.degree)(5));
                break;
            case "ArrowRight":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_rotateTarget).call(this, (0, angle_1.degree)(0), (0, angle_1.degree)(0), (0, angle_1.degree)(-5));
                break;
        }
    }
    moveThirdPerson(keyMove) {
        let phi = this.target.getPolarRotation().getThird().getValueIn(angle_1.AngleUnit.RAD);
        switch (keyMove) {
            case "ArrowUp":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_translateTarget).call(this, -this.step * Math.sin(phi), this.step * Math.cos(phi), 0);
                break;
            case "ArrowDown":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_translateTarget).call(this, this.step * Math.sin(phi), -this.step * Math.cos(phi), 0);
                break;
            case "ArrowLeft":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_translateTarget).call(this, -this.step * Math.cos(phi), -this.step * Math.sin(phi), 0);
                break;
            case "ArrowRight":
                __classPrivateFieldGet(this, _UserInputController_instances, "m", _UserInputController_translateTarget).call(this, this.step * Math.cos(phi), this.step * Math.sin(phi), 0);
                break;
        }
    }
}
exports.UserInputController = UserInputController;
_UserInputController_instances = new WeakSet(), _UserInputController_translateTarget = function _UserInputController_translateTarget(dx, dy, dz) {
    let currentPos = this.target.getPosition();
    this.target.setPosition(currentPos.getX() + dx, currentPos.getY() + dy, currentPos.getZ() + dz);
}, _UserInputController_rotateTarget = function _UserInputController_rotateTarget(deltaPsi, deltaTheta, deltaPhi) {
    let currentRotation = this.target.getPolarRotation();
    this.target.setPolarRotation(currentRotation.getFirst().add(deltaPsi), currentRotation.getSecond().add(deltaTheta), currentRotation.getThird().add(deltaPhi));
};
//# sourceMappingURL=user-input-controller.js.map