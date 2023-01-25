import {MeshObject} from "../obj/mesh-object";
import {Point3D} from "../geometry/point/point-3d";
import {angle, Angle, AngleUnit, degree} from "../geometry/angle/angle";
import {Trio} from "../types/triple";


export class UserInputController {
    target: MeshObject
    stepSize: number = 2
    step: number = 2
    controllerMode: number = 2
    cameraMode: number = 0

    constructor() {
        this.controllerMode = 2
    }

//this.controllerMode = 1; //0 visuale in terza persona, //1 visuale dall'alto, //2 visuale in prima persona


    setTarget(target: MeshObject){
        this.target = target;
    }
    setControllerMode(mode: number){
        this.controllerMode = mode;
    }

    setCameraMode(mode: number){
        this.cameraMode = mode;
    }

    move(move: string){
        this.commandActuator(move, this.controllerMode);
    }

    commandActuator(move: string, controllerMode: number){
        switch(controllerMode){
            case 0: this.moveThirdPerson(move); break;
            case 1: this.moveFromTop(move); break;      //Alto
            case 2: this.moveFirstPerson(move); break;
        }
    }

    #translateTarget(dx: number, dy: number, dz: number){
        let currentPos: Point3D = this.target.getPosition()
        this.target.setPosition(currentPos.getX() + dx, currentPos.getY() + dy, currentPos.getZ() + dz)
    }

    #rotateTarget(deltaPsi: Angle, deltaTheta: Angle, deltaPhi: Angle){
        let currentRotation: Trio<Angle> = this.target.getPolarRotation()
        this.target.setPolarRotation(
            currentRotation.getFirst().add(deltaPsi),
            currentRotation.getSecond().add(deltaTheta),
            currentRotation.getThird().add(deltaPhi)
        )
    }

    moveFromTop(keyMove: string){
        switch(keyMove){
            case "ArrowUp" : this.#translateTarget(0, this.stepSize, 0); break;
            case "ArrowDown" : this.#translateTarget(0,-this.stepSize, 0); break;
            case "ArrowLeft" : this.#translateTarget(-this.stepSize, 0, 0); break;
            case "ArrowRight" : this.#translateTarget(this.stepSize, 0, 0); break;
        }
    }

    navigate(dForward: number, angle: Angle){
        let dy = dForward * Math.cos(angle.getValueIn(AngleUnit.RAD));
        let dx = dForward * -Math.sin(angle.getValueIn(AngleUnit.RAD));
        let dz = 0;

        this.#translateTarget(dx, dy, dz)
    }

    moveFirstPerson(keyMove: string){
        switch(keyMove){
            case "ArrowUp" : this.navigate(-4, this.target.getPolarRotation().getThird()); break;
            case "ArrowDown" : this.navigate(4, this.target.getPolarRotation().getThird()); break;
            case "ArrowLeft" : this.#rotateTarget(degree(0), degree(0), degree(5)); break;
            case "ArrowRight" : this.#rotateTarget(degree(0), degree(0), degree(-5)); break;
        }
    }

    moveThirdPerson(keyMove: string){
        let phi: number = this.target.getPolarRotation().getThird().getValueIn(AngleUnit.RAD);
        switch(keyMove){
            case "ArrowUp" : this.#translateTarget(
                -this.step*Math.sin(phi),
                this.step*Math.cos(phi),
                0); break;

            case "ArrowDown" : this.#translateTarget(
                this.step*Math.sin(phi),
                -this.step*Math.cos(phi),
                0); break;
            case "ArrowLeft" : this.#translateTarget(
                -this.step*Math.cos(phi),
                -this.step*Math.sin(phi),
                0); break;
            case "ArrowRight" : this.#translateTarget(
                this.step*Math.cos(phi),
                this.step*Math.sin(phi),
                0); break;
        }
    }

}