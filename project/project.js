/*============= ENV ============================*/
var ENV, ENV2;
//var SHADERS;
var GL;
var then = 0;
var CAMERA_MANAGER, CAMERA_MANAGER2, CubeController;
var CAMERA_MODE = 0;			//0 visuale in terza persona, //1 visuale dall'alto, //2 visuale in prima persona
var targetObject = null;

var GL_DRAWER2, MESH_MANAGER2;

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

function init() {
	log("init() | starting...")
	ENV = createEnv('my_Canvas');
	ENV2 = createEnv('obj_canvas');
	GL = ENV.gl;
	log("init() | ENV created")

	MESH_MANAGER = createMeshManager(ENV.gl, ENV.programInfo);
	MESH_MANAGER2 = createMeshManager(ENV2.gl, ENV2.programInfo);
	log("init() | MESH_MANAGER setup completed");
	GL_DRAWER = GL_DRAWER_LIST[createGlDrawer(MESH_MANAGER)];
	GL_DRAWER2 = GL_DRAWER_LIST[createGlDrawer(MESH_MANAGER2)]
	log("init() | GL_DRAWER setup completed")

	const L = 3;
	var floor = MESH_MANAGER.loadFromObj('floor', './assets/plane-2m.obj');
	floor.scalate(L, L, 0);
	var cube = MESH_MANAGER.loadFromObj('cube1', './assets/cubo_con_assi.obj');
	MESH_MANAGER2.loadFromObj('cube2', './assets/cubo_con_assi.obj');
	cube.limits = Limits.linear(-L+0.25, L-0.25, -L+0.25, L-0.25, 3, 3);
	cube.setPosition(0, 0, 0.25);
	cube.scalate(0.25, 0.25, 0.25);
	
	log("init() | handlers attached");
}

function main() {
	init();
	log("main() | init completed");
	var obj = MESH_MANAGER.get("cube1");
	obj.setPosition(0,0,0.25);
	obj.rotate(90,0);
	//obj.scalate(0.25, 0.25, 0.25);
	
	targetObject = obj;
	CubeController = new Controller(obj);
	CAMERA_MANAGER = createCameraManager(GL_DRAWER, obj);
	attachHandlers(ENV.canvas, obj);

	//Canvas 2 //test
	var obj2 = MESH_MANAGER2.get("cube2");
	obj2.setPosition(0,0,0.25);
	obj2.rotate(90,0);
	CAMERA_MANAGER2 = createCameraManager(GL_DRAWER2 ,obj2, [-2,-1,0.25]);

	
	

	//Start rendering loop
	requestAnimationFrame(render);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function render(time) {

	time *= 0.001;
	var delta = time - then;
	then = time;
	
	CAMERA_MANAGER.updateGL_DRAWER();
	GL_DRAWER.drawScene();

	CAMERA_MANAGER2.updateGL_DRAWER();
	GL_DRAWER2.drawScene();
	
	//await sleep(200);
	requestAnimationFrame(render);
}

main();
