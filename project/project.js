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

	return {
		program : program,
		locations : {
			position : gl.getAttribLocation(program, "a_position"),
			normal : gl.getAttribLocation(program, "a_normal"),
			texcoord : gl.getAttribLocation(program, "a_texcoord"),
			diffuse : gl.getUniformLocation(program, "diffuse" ),
			ambient : gl.getUniformLocation(program, "ambient" ),
			specular : gl.getUniformLocation(program, "specular" ),
			emissive : gl.getUniformLocation(program, "emissive" ),
			ambientLight : gl.getUniformLocation(program, "u_ambientLight" ),
			colorLight : gl.getUniformLocation(program, "u_colorLight" ),
			shininess : gl.getUniformLocation(program, "shininess" ),
			opacity : gl.getUniformLocation(program, "opacity"),
			worldMatrix : gl.getUniformLocation(program, "u_world"),
			texture : gl.getUniformLocation(program, "diffuseMap"),
			viewMatrix : gl.getUniformLocation(program, "u_view"),
			projectionMatrix : gl.getUniformLocation(program, "u_projection"),
			lightWorldDirection : gl.getUniformLocation(program, "u_lightDirection"),
			viewWorldPosition : gl.getUniformLocation(program, "u_viewWorldPosition")
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

	attachHandlers(ENV.canvas);
	log("init() | handlers attached");
}

function main() {
	init();
	var mObj = MOLOADER.get('cube').data;
	MOBJ = mObj;

	/* ======= Buffers =====================================*/
	var positionBuffer = glArrayBuffer(GL, mObj.positions);
	var normalsBuffer = glArrayBuffer(GL, mObj.normals);
	var texcoordBuffer = glArrayBuffer(GL, mObj.texcoords);

	/* ======= Light ======================================= */
	var ambientLight=[0.2,0.2,0.2];
	var colorLight=[1.0,1.0,1.0];

	/* ======= Uniforms ====================================*/
	GL.uniform3fv(SHADERS.locations.diffuse, mObj.diffuse );
	GL.uniform3fv(SHADERS.locations.ambient, mObj.ambient);
	GL.uniform3fv(SHADERS.locations.specular, mObj.specular );
	GL.uniform3fv(SHADERS.locations.emissive, mObj.emissive );
	//GL.uniform3fv(GL.getUniformLocation(program, "u_lightDirection" ), xxx );
	GL.uniform3fv(SHADERS.locations.ambientLight, ambientLight );
	GL.uniform3fv(SHADERS.locations.colorLight, colorLight );

	GL.uniform1f(SHADERS.locations.shininess, mObj.shininess);
	GL.uniform1f(SHADERS.locations.opacity, mObj.opacity);

	// Turn on the position attribute
	GL.enableVertexAttribArray(SHADERS.locations.position);
	// Bind the position buffer.
	GL.bindBuffer(GL.ARRAY_BUFFER, positionBuffer);
	// Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	var size = 3;          // 3 components per iteration
	var type = GL.FLOAT;   // the data is 32bit floats
	var normalize = false; // don't normalize the data
	var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
	var offset = 0;        // start at the beginning of the buffer
	GL.vertexAttribPointer(SHADERS.locations.position, size, type, normalize, stride, offset);

	// Turn on the normal attribute
	GL.enableVertexAttribArray(SHADERS.locations.normal);
	// Bind the normal buffer.
	GL.bindBuffer(GL.ARRAY_BUFFER, normalsBuffer);
	GL.vertexAttribPointer(SHADERS.locations.normal, size, type, normalize, stride, offset);

	// Turn on the teccord attribute
	GL.enableVertexAttribArray(SHADERS.locations.texcoord);
	// Bind the position buffer.
	GL.bindBuffer(GL.ARRAY_BUFFER, texcoordBuffer);
	// Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	size = 2;          // 2 components per iteration
	GL.vertexAttribPointer(SHADERS.locations.texcoord, size, type, normalize, stride, offset);

	var fov = degToRad(3000);
	var modelXRotationRadians = degToRad(0);
	var modelYRotationRadians = degToRad(0);

	/* ======= P, V matrices ====================================*/
	var projectionMatrix = createProjectionMatrix(ENV.fov, ENV.gl.canvas, 0.1, 200);

	var viewMatrix = createViewMatrix(0, 0, 5);

	GL.uniformMatrix4fv(SHADERS.locations.viewMatrix, false, viewMatrix);
	GL.uniformMatrix4fv(SHADERS.locations.projectionMatrix, false, projectionMatrix);
	GL.uniform1i(SHADERS.locations.texture, 0);
	render();

}

/* ======= Rendering ===================================*/
var render = function() {
		GL.viewport(0, 0, ENV.canvas.width, ENV.canvas.height);
		GL.enable(GL.DEPTH_TEST);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

	var mo_matrix = createMoMatrix(ENV.theta, ENV.phi);

	GL.uniformMatrix4fv(SHADERS.locations.worldMatrix, false, mo_matrix);
	//GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, index_buffer);
	//GL.drawElements(GL.TRIANGLES, indices.length, GL.UNSIGNED_SHORT, 0);
	GL.drawArrays(GL.TRIANGLES, 0, MOBJ.numVertices);
	//window.requestAnimationFrame(render);
}

main();
