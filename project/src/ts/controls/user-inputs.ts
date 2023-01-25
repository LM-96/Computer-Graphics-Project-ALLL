import {WebGLApplication} from "../webgl/webgl-application";
import {Log} from "../log/log";
import {MeshObject} from "../obj/mesh-object";
import {Angle, AngleUnit, radians} from "../geometry/angle/angle";
import {Trio} from "../types/triple";
import {UserInputController} from "./user-input-controller";

export class UserInputs {

    #application: WebGLApplication
    #drag: boolean = false
    #oldX: number = 0
    #oldY: number = 0

    #target: MeshObject
    #controller: UserInputController

    constructor(application: WebGLApplication) {
        this.#application = application
        this.#controller = new UserInputController()
    }

    mouseDown(e: MouseEvent|TouchEvent) {
        this.#drag = true;
        if(e instanceof MouseEvent) {
            this.#oldX = e.pageX;
            this.#oldY = e.pageY;
        } else {
            this.#oldX = e.touches[0].clientX;
            this.#oldY = e.touches[0].clientY;
        }
        e.preventDefault();
        return false;
    }

    mouseUp1(e: MouseEvent|TouchEvent) {
        this.#drag = false;
    }

    mouseMove1(e: MouseEvent|TouchEvent) {
        if(!this.#drag) return false;
        let dX: number
        let dY: number
        if(e instanceof MouseEvent) {
            dX=(e.pageX-this.#oldX)*2*Math.PI/this.#application.getCanvas().width;
            dY=(e.pageY-this.#oldY)*2*Math.PI/this.#application.getCanvas().height;
            this.#oldX=e.pageX;
            this.#oldY=e.pageY;
        } else if(e instanceof TouchEvent) {
            dX=(e.touches[0].clientX-this.#oldX)*2*Math.PI/this.#application.getCanvas().width;
            dY=(e.touches[0].clientY-this.#oldY)*2*Math.PI/this.#application.getCanvas().height;
            this.#oldX=e.touches[0].clientX;
            this.#oldY=e.touches[0].clientY;
        }
        let currentAngles: Trio<Angle> = this.#target.getPolarRotation()
        this.#target.setPolarRotation(
            currentAngles.getFirst(),
            currentAngles.getSecond(),
            currentAngles.getThird().add(radians(dX)))
        currentAngles = this.#target.getPolarRotation()
        this.#controller.navigate(dY, currentAngles.getThird())
        //e.preventDefault();

        this.#application.getMeshObjectDrawer().drawScene()
        Log.log("Angles || PSY:" + currentAngles.getFirst().toString() + ", THETA:" + currentAngles.getSecond().toString() +
            ", PHI:" + currentAngles.getThird().toString());
    }

    keydownMap(e: KeyboardEvent) {
        Log.log("Key pressed: " + e.code)
        switch(e.code) {
            case "ArrowDown" : this.#controller.move(e.code); break;      	//Freccia Giù
            case "ArrowUp" : this.#controller.move(e.code); break;       	//Freccia Su
            case "ArrowLeft" : this.#controller.move(e.code); break;       //Freccia Sx
            case "ArrowRight" : this.#controller.move(e.code); break;       	//Ferccia Dx
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
        this.#application.getMeshObjectDrawer().drawScene()
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
        document.addEventListener("touchstart", (ev: TouchEvent) => {this.mouseDown(ev)});
        document.addEventListener("touchend", (ev: TouchEvent) => {this.mouseUp1(ev)});
        document.addEventListener("touchmove", (ev: TouchEvent) => {this.mouseMove1(ev)});

        // document.addEventListener('keydown', (event) => {this.keydownMap(event)});
        document.addEventListener("keydown", (event) => {this.keydownMapExtend(event)})
    }

    setTarget(target: MeshObject) {
        console.log("user input set target")
        this.#target = target
        this.#controller.setTarget(target)
    }


    keydownMapExtend(e : KeyboardEvent){
        let cam = this.#application.getCamera()
        switch (e.code) {
            case "ArrowDown" : this.#controller.move(e.code); break;      	//Freccia Giù
            case "ArrowUp" : this.#controller.move(e.code); break;       	//Freccia Su
            case "ArrowLeft" : this.#controller.move(e.code); break;       //Freccia Sx
            case "ArrowRight" : this.#controller.move(e.code); break;       	//Ferccia Dx
            case "KeyI": this.setCameraView(1); break;
            case "KeyO": this.setCameraView(2); break;
            case "KeyP": this.setCameraView(3); break;
            case "Space": this.setCameraView(0); break;
            case "Period": this.#application.getCamera().setFov(cam.getCurrentFov().add(5, AngleUnit.DEG)); break;
            case "Comma": this.#application.getCamera().setFov(cam.getCurrentFov().add(-5, AngleUnit.DEG)); break;
            case "KeyZ": this.placeObj("z"); break;
            case "KeyX": this.placeObj("x"); break;
            case "KeyC": this.placeObj("c"); break;
            //case "KeyV": this.placeObj("v")
        }
        this.#application.getMeshObjectDrawer().drawScene()
    }

    setCameraView(view: number){
        let cam = this.#application.getCamera()
        let helmet = this.#application.getMeshObjectManager().get("helmet")
        cam.startFollowingObject(helmet)
        cam.setFov(new Angle(60, AngleUnit.DEG))
        switch (view){
            case 1: cam.setPosition(70, 70, 80); break;
            case 2: cam.setPosition(1,1,85)
                cam.setFov(new Angle(95, AngleUnit.DEG)); break;
            case 3: cam.setPosition(80, 0, 30); break;
            case 0: cam.setPosition(helmet.getPosition().translate(15, 0, 10))
        }
    }

    placeObj(objNum : string){
        let incrementalNum = this.#application.getMeshObjectManager().getAll().length
        let myObj = this.#application.getMeshObjectManager().get("helmet")
        let d = -1;
        let objPah : string;
        switch (objNum) {
            //TODO. Add objs path
            case "z": objPah = "./assets/LucaLanAssets/helmet.obj"; break;
            case "x": objPah = "./assets/building.obj"; break;
            case "c": objPah = "./assets/bed.obj"; break;
            case "v": objPah = ""; break;
        }
        let newCreatedObj = this.#application.getMeshObjectManager().loadObj("obj"+incrementalNum, objPah)
        newCreatedObj.setPosition(myObj.getPosition().translate(-d*Math.sin(myObj.getPolarRotation().getThird().getValueIn(AngleUnit.RAD)), d*Math.cos(myObj.getPolarRotation().getThird().getValueIn(AngleUnit.RAD)),0))
        newCreatedObj.setPosition(newCreatedObj.getPosition().getX(), newCreatedObj.getPosition().getY(), 1);
        newCreatedObj.setPolarRotation(myObj.getPolarRotation().getFirst(), myObj.getPolarRotation().getSecond(), myObj.getPolarRotation().getThird())


        switch (objNum) {
            //TODO. Add objs path
            case "z": ; break;
            case "x": newCreatedObj.setScale(0.7, 0.7, 0.4); break;
            case "c": newCreatedObj.setPolarRotation(new Angle(90, AngleUnit.DEG), new Angle(0, AngleUnit.DEG), new Angle(0, AngleUnit.DEG));
            newCreatedObj.setScale(2,2,2); break;
            case "v": objPah = ""; break;
        }
    }
}