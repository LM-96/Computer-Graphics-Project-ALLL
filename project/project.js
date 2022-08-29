/*============= ENV ============================*/
var ENV;
//var SHADERS;
var GL;

function createEnv() {
	log("createEnv() | creating environment...");

	var canvas = document.getElementById('my_Canvas');
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
	ENV = createEnv();
	GL = ENV.gl;
	log("init() | ENV created")

	MESH_MANAGER = createMeshManager(ENV.gl, ENV.programInfo);
	log("init() | MESH_MANAGER setup completed");
	GL_DRAWER = createGlDrawer(MESH_MANAGER);
	log("init() | GL_DRAWER setup completed")

	MESH_MANAGER.loadFromObj('cube1', "assets/cube.obj");
	MESH_MANAGER.loadFromObj('cube2', "assets/cube.obj");

	attachHandlers(ENV.canvas, MESH_MANAGER.get('cube1'));
	log("init() | handlers attached");
}

function main() {
	init();
	log("main() | init completed");
	var cube1 = MESH_MANAGER.get("cube1");
	var cube2 = MESH_MANAGER.get("cube2");
	cube1.scalate(0.5, 0.5, 0.5);
	cube2.scalate(0.5, 0.5, 0.5);
	cube1.translate(0, 0, 2);
	cube2.translate(0, 0, -2);

	GL_DRAWER.drawScene();

}

main();
