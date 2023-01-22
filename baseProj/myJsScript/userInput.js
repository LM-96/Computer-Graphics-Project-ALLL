/** PUBLIC FUNC: Attach handlers to the canvas **/
function attachHandler(canvas, handlerType, handlerFunc) {
    switch (handlerType.toLowerCase()) {
        case "onmousedown": canvas.onmousedown=handlerFunc; break;
        case "onmouseup": canvas.onmouseup=handlerFunc;  break;
        case "onmouseout": canvas.mouseout=handlerFunc;  break;
        case "onmousemove": canvas.onmousemove=handlerFunc;  break;
        case "onkeydown": document.addEventListener('keydown', handlerFunc);  break;
        case "ontouchmove": document.addEventListener("ontouchmove", handlerFunc); break;
        case "ontouchstart": document.addEventListener("ontouchstart", handlerFunc); break;
        case "ontouchend": document.addEventListener("ontouchend", handlerFunc); break;
    }
    log("Attached Handler: " + handlerType.toLowerCase());
}

//Imported
function attachHandlers(canvas, p_target) {
    canvas.onmousedown=mouseDown;
    canvas.onmouseup=mouseUp1;
    canvas.mouseout=mouseUp1;
    canvas.onmousemove=mouseMove1;
    target = p_target;

    document.addEventListener('keydown', keydownMap);
}



/** PRIVATE LOGIC OF INPUT HANDLERS **/
var mouseDown = function(e) {
    drag = true;
    old_x = e.pageX;
    old_y = e.pageY;
    e.preventDefault();
    return false;
}

var mouseUp1 = function(e) {
    drag = false;
}

var mouseMove1= function(e) {
    // var env = canvas2.ENV;
    // if(!drag) return false;
    // dX=(e.pageX-old_x)*2*Math.PI/env.canvas.width;
    // dY=(e.pageY-old_y)*2*Math.PI/env.canvas.height;
    // target.rotate(dX, dY, true);
    old_x=e.pageX;
    old_y=e.pageY;
    e.preventDefault();

    log("Angles || T:" + target.rotation.theta + ", P:" + target.rotation.phi);
}

var keydownMap = function(e) {
    if(!settings.Active_Menu)
        switch(e.keyCode) {
            case 40 : canvas1.controller.move(KEYMOVE.downArrow); break;      	//Freccia Giù
            case 38 : canvas1.controller.move(KEYMOVE.upArrow); break;       	//Freccia Su
            case 37 : canvas1.controller.move(KEYMOVE.leftArrow); break;       //Freccia Sx
            case 39 : canvas1.controller.move(KEYMOVE.rightArrow); break;       	//Ferccia Dx
            // case 104 : trans(0,0,0.1); break;		//NUmpad 8
            // case 189:  trans(0,0,-0.1); break;		//-
            case 96 : 	CAMERA_MANAGER.changeCameraView(0); break;        //NUMpad 0
            case 49 : 	CAMERA_MANAGER.changeCameraView(1); break;         	//NUMpad 1
            case 50 : 	CAMERA_MANAGER.changeCameraView(2); break;      	//NUMpad 2
            case 51 : 	CAMERA_MANAGER.changeCameraView(3); break;          //NumPad 3
            case 52 :	CAMERA_MANAGER.changeCameraView(4); break;        	//NumPad 4
            case 53 :	CAMERA_MANAGER.changeCameraView(5); break;			//NumPad 5
            case 54 :	CAMERA_MANAGER.changeCameraView(0); break;			//NumPad 6
            case 188: 	CAMERA_MANAGER.incrementCameraFov(-1); break;		//,
            case 190:	CAMERA_MANAGER.incrementCameraFov(1); break;		//.
        }
    log("pos: " + target.position.toString());
}

const keydownMapLog = function(e) {
    switch(e.keyCode) {
        case 40 : log("Freccia Giù"); break;      	//Freccia Giù
        case 38 : log("Freccia Su"); break;       	//Freccia Su
        case 37 : log("Freccia Sx"); break;       //Freccia Sx
        case 39 : log("Freccia Dx"); break;       	//Ferccia Dx
        case 104 : log("Tasto: 8"); break;		//NUmpad 8
        case 189: console.log(settings); break;    //-
        default: log("Tasto:" + e.keyCode)
    }
}

