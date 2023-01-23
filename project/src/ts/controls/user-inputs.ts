import {WebGLApplication} from "../webgl/webgl-application";
import {Log} from "../log/log";
import {MeshObject} from "../obj/mesh-object";
import {Couple} from "../types/pair";
import {Angle, radians} from "../geometry/angle/angle";
import {Trio} from "../types/triple";

export class UserInputs {

    #application: WebGLApplication
    #drag: boolean = false
    #oldX: number = 0
    #oldY: number = 0

    #target: MeshObject

    constructor(application: WebGLApplication) {
        this.#application = application
    }

    mouseDown(e: MouseEvent) {
        this.#drag = true;
        this.#oldX = e.pageX;
        this.#oldY = e.pageY;
        e.preventDefault();
        return false;
    }

    mouseUp1(e: MouseEvent) {
        this.#drag = false;
    }

    mouseMove1(e: MouseEvent) {
        if(!this.#drag) return false;
        let dX=(e.pageX-this.#oldX)*2*Math.PI/this.#application.getCanvas().width;
        let dY=(e.pageY-this.#oldY)*2*Math.PI/this.#application.getCanvas().height;
        let currentAngles: Trio<Angle> = this.#target.getPolarRotation()
        this.#target.setPolarRotation(
            currentAngles.getFirst(),
            currentAngles.getSecond().add(radians(dY)),
            currentAngles.getThird())
        currentAngles = this.#target.getPolarRotation()
        this.#oldX=e.pageX;
        this.#oldY=e.pageY;
        e.preventDefault();

        Log.log("Angles || PSY:" + currentAngles.getFirst().toString() + ", THETA:" + currentAngles.getSecond().toString() +
            ", PHI:" + currentAngles.getThird().toString());
    }

    keydownMap(e: KeyboardEvent) {
        switch(e.code) {
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

    attachHandler(handlerType: string, handlerFunc: (e: any) => void) {
        switch (handlerType.toLowerCase()) {
            case "onmousedown": this.#application.getCanvas().onmousedown = handlerFunc; break;
            case "onmouseup": this.#application.getCanvas().onmouseup = handlerFunc;  break;
            case "onmouseout": this.#application.getCanvas().onmouseout = handlerFunc;  break;
            case "onmousemove": this.#application.getCanvas().onmousemove=handlerFunc;  break;
            case "onkeydown": document.addEventListener('keydown', handlerFunc);  break;
            case "ontouchmove": document.addEventListener("ontouchmove", handlerFunc); break;
            case "ontouchstart": document.addEventListener("ontouchstart", handlerFunc); break;
            case "ontouchend": document.addEventListener("ontouchend", handlerFunc); break;
        }
        Log.log("Attached Handler: " + handlerType.toLowerCase());
    }

    attachHandlers() {
        this.#application.getCanvas().onmousedown= (ev) => {this.mouseDown(ev)};
        this.#application.getCanvas().onmouseup= (ev) => {this.mouseUp1(ev)};
        this.#application.getCanvas().onmouseout = (ev) => {this.mouseUp1(ev)};
        this.#application.getCanvas().onmousemove = (ev) => {this.mouseMove1(ev)};

        //document.addEventListener('keydown', keydownMap);
    }

    setTarget(target: MeshObject) {
        this.#target = target
    }

}