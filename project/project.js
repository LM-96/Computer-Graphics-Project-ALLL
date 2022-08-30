/*============= ENV ============================*/
var ENV;
//var SHADERS;
var GL;
var then = 0;
var modelXRotationRadians = degToRad(0);

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

	//MESH_MANAGER.loadFromObj('cube1', "assets/moto_simple_1.obj");
	/*const S = 10;
	const H = 0;

	const textureCoords = [ 0,0, 1,0, 0,1, 1,1,];

	const floor = {
	   position: 	{ numComponents: 3, data: [-S,H,-S, S,H,-S, -S,H,S,  S,H,S, ], },
	   texcoord: 	{ numComponents: 2, data: textureCoords, },
	   //color: 	{ numComponents: 3, data: [0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7], },
	   indices: 	{ numComponents: 3, data: [0,2,1, 	2,3,1,], },
	   normal:		{numComponents: 3, data: [0,1,0,	0,1,0,	0,1,0,	0,1,0,], },
	};
	MESH_MANAGER.loadFromRawData('cube1', floor.position, floor.texcoord, floor.normal, floor.indices);*/
	MESH_MANAGER.loadFromObj('cube1', 'assets/cube.obj');

	attachHandlers(ENV.canvas, MESH_MANAGER.get('cube1'));
	log("init() | handlers attached");
}

function main() {
	init();
	log("main() | init completed");
	var cube1 = MESH_MANAGER.get("cube1");
	//cube1.scalate(0.5, 0.5, 0.5);

	requestAnimationFrame(render);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function render(time) {
    time *= 0.0005;

		MESH_MANAGER.get('cube1').rotate(0, -time);
		GL_DRAWER.drawScene();
		//await sleep(200);
		requestAnimationFrame(render);
}

main();
