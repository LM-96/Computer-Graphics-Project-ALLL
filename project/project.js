/*============= ENV ============================*/
var ENV;
var SHADERS;
var GL;
var MOBJ;

function createEnv() {
	log("createEnv() | creating environment...");

	var canvas = document.getElementById('my_Canvas');
	gl = canvas.getContext('webgl');
	if(!gl) {
		throw new Error("WegGL not supported");
	}
	log("createEnv() | canvas and GL context created");

	return {
		canvas : canvas,
		gl : gl,
		theta : 0,
		phi : 0,
		d : 5,
		aspect : gl.canvas.clientWidth / gl.canvas.clientHeight,
		zmin : 1,
		zmax : 100,
		fov : degToRad(3000)
	}
}

function createShaders(gl) {
	log("createShaders() | creating shader programs...");
	var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader", "fragment-shader"]);
	gl.useProgram(program);
	log("createShaders() | shader programs created and used");

	var all_attributes = getAttributeLocations(gl, program, ...ALL_ATTRIBUTES);
	var all_uniforms = getUniformLocations(gl, program, ...ALL_UNIFORMS);
	var all_matrix_uniforms = getUniformLocations(gl, program, ...ALL_MATRIX_UNIFORMS);
	log("createShaders() | get uniforms and attributes completed");

	return {
		program : program,
		locations : {
			uniforms : all_matrix_uniforms.concat(all_uniforms),
			attributes : all_attributes
		}
	};
}

function init() {
	log("init() | starting...")
	ENV = createEnv();
	GL = ENV.gl;
	log("init() | ENV created")

	MOLOADER = createMOLoader(GL);
	log("init() | MeshObjectLoader created");
	MOLOADER.add('cube', 'assets/cube.obj');
	MOLOADER.loadAll();
	log("init() | all mesh objects loaded");

	SHADERS = createShaders(GL);
	log("init() | SHADERS created");

	MODRAWER = createMODrawer(GL, SHADERS);

	attachHandlers(ENV.canvas);
	log("init() | handlers attached");
}

function main() {
	init();
	log("main() | init completed");

	var mObj = MOLOADER.get('cube');
	MOBJ = mObj;
	log("main() | mesh object loaded: " + mObj);

	/* ======= Buffers =====================================*/
	mObj.createGlPNTBuffers(ENV.gl);
	log("main() | created buffers");

	mObj.writePNTBuffers(ENV.gl);
	log("main() | written buffers")

	MODRAWER.setAmbientLight(0.2, 0.2, 0.2);
	MODRAWER.setColorLight(1.0, 1.0, 1.0);
	log("main() | light set");

	mObj.setUniforms(ENV.gl, SHADERS);
	log("main() | uniforms set");
	mObj.writePNTToVertexShader(ENV.gl, SHADERS);
	log("main() | written attributes to shaders");

	MODRAWER.setProjection(ENV.fov, ENV.aspect, 0.1, 200);
	log("main() | projection matrix set");
	MODRAWER.setView([4.5, 4.5, 2], [0, 0, 0], [0, 0, 1]);
	log("main() | view matrix set");
	MODRAWER.setTextureUnit(0);
	log("main() | texture set");
	render();

}

/* ======= Rendering ===================================*/
var render = function() {
	log("render() | called");
	MODRAWER.setGlViewport(0, 0, ENV.canvas.width, ENV.canvas.height);
	MODRAWER.drawObject(MOBJ, true);
	/*doStep();
	movementRender();*/
}

main();
