/** PUBLIC FUNC: Attach handlers to the canvas **/
function attachHandlers(canvas, handlerType, handlerFunc) {
    switch (handlerType.toLowerCase()) {
        case "onmousedown": canvas.onmousedown=handlerFunc; break;
        case "onmouseup": canvas.onmouseup=handlerFunc;  break;
        case "onmouseout": canvas.mouseout=handlerFunc;  break;
        case "onmousemove": canvas.onmousemove=handlerFunc;  break;
        case "onkeydown": document.addEventListener('keydown', handlerFunc);  break;
    }
    log("Attached Handler: " + handlerType.toLowerCase());
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

var mouseMove1 = function(e) {
    var env = canvas2.ENV;
    if(!drag) return false;
    dX=(e.pageX-old_x)*2*Math.PI/env.canvas.width;
    dY=(e.pageY-old_y)*2*Math.PI/env.canvas.height;
    target.rotate(dX, dY, true);
    old_x=e.pageX;
    old_y=e.pageY;
    e.preventDefault();

    log("Angles || T:" + target.rotation.theta + ", P:" + target.rotation.phi);
}

var keydownMap1 = function(e) {
    switch(e.keyCode) {
        case 40 : canvas1.controller.move(KEYMOVE.downArrow); break;      	//Freccia Giù
        case 38 : canvas1.controller.move(KEYMOVE.upArrow); break;       	//Freccia Su
        case 37 : canvas1.controller.move(KEYMOVE.leftArrow); break;       //Freccia Sx
        case 39 : canvas1.controller.move(KEYMOVE.rightArrow); break;       	//Ferccia Dx
        case 104 : trans(0,0,0.1); break;		//NUmpad 8
        case 189: 	trans(0,0,-0.1); break;		//-
        case 96 : 	CAMERA_MANAGER.changeCameraView(0); break;        //NUMpad 0
        case 97 : 	CAMERA_MANAGER.changeCameraView(1); break;         	//NUMpad 1
        case 98 : 	CAMERA_MANAGER.changeCameraView(2); break;      	//NUMpad 2
        case 99 : 	CAMERA_MANAGER.changeCameraView(3); break;          //NumPad 3
        case 100 :	CAMERA_MANAGER.changeCameraView(4); break;        	//NumPad 4
        case 101 :	CAMERA_MANAGER.changeCameraView(5); break;			//NumPad 5
        case 102 :	CAMERA_MANAGER.changeCameraView(0); break;			//NumPad 6
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
        case 189: 	log("Tasto: -"); break;		//-
        default: log("Tasto:" + e.keyCode)
    }
}