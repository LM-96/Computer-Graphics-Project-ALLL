const canvas = document.getElementById("my_Canvas");
var ciao = function (e){
    log(e.type);
}


/*============= ENV ============================*/
var ENV, ENV2;
//var SHADERS;
var GL;
var then = 0;
var CAMERA_MANAGER; //CAMERA_MANAGER2, CubeController;
var CAMERA_MODE = 0;			//0 visuale in terza persona, //1 visuale dall'alto, //2 visuale in prima persona
var targetObject = null;

var GL_DRAWER2, MESH_MANAGER2;



var canvas1;// canvas2;


function createEnv(canvasId) {
    log("createEnv() | creating environment...");

    var canvas = document.getElementById(canvasId);
    log("createEnv() | canvas: " + canvas);
    gl = canvas.getContext('webgl');
    if(!gl) {
        throw new Error("WegGL not supported");
    }
    log("createEnv() | canvas and GL context created");

    log("createShaders() | creating shader programs...");
    var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader", "fragment-shader"]);
    var program = programInfo.program;
    gl.useProgram(program);
    log("createShaders() | shader programs created and used");

    return {
        canvas : canvas,
        gl : gl,
        programInfo : programInfo,
        program: program
    }
}

async function render(time) {

    time *= 0.001;
    var delta = time - then;
    then = time;

    canvas1.CAMERA_MANAGER.updateGL_DRAWER();
    //canvas2.CAMERA_MANAGER.updateGL_DRAWER();
    canvas1.GlDrawer.drawScene();
    //canvas2.GlDrawer.drawScene();
    activateColor(settings.Active_Menu);

    requestAnimationFrame(render);
}

function canvasMain() {
    canvas1 = new CanvasEnv("my_Canvas");
    //canvas2 = new CanvasEnv("obj_canvas");

    canvas1.main();
    //canvas2.main();


    CAMERA_MANAGER = canvas1.CAMERA_MANAGER;
    //Start rendering loop
    // requestAnimationFrame(render);
    render(0);
}

function main(){
    log("CIAO!")
    attachHandler(canvas, "onkeydown", keydownMapLog);
    // attachHandlers(canvas, "onmousemove", log);
    attachHandler(canvas, "onmousedown", ciao);
    attachHandler(canvas, "onmouseup", log);
    attachHandler(canvas, "onmouseout", log);


    menu();
    canvasMain();
}


/** Main Func **/
main();

