/*============= Creating a canvas ======================*/
var canvas = document.getElementById('my_Canvas');
gl = canvas.getContext('webgl');

/* ============ Geometry ===============================*/
/*var vertices =  vertices=[
-1,-1,-1, 1,-1,-1, 1,1,-1, -1,1,-1, -1,-1,1, 1,-1,1, 1,1,1, -1,1,1, -1,-1,-1, -1,1,-1, -1, 1,1, -1,-1,1,
1,-1,-1, 1,1,-1, 1,1,1, 1,-1,1, -1,-1,-1, -1,-1,1, 1,-1,1, 1,-1,-1, -1,1,-1, -1,1,1, 1,1,1, 1,1,-1,];
var colors = colorsPerFaceArray(4, COLOR.RED, COLOR.BLUE, COLOR.CYAN, COLOR.GREEN, COLOR.PURPLE, COLOR.YELLOW);
var indices = [
0,1,2, 0,2,3, 4,5,6, 4,6,7, 8,9,10, 8,10,11, 12,13,14, 12,14,15, 16,17,18, 16,18,19, 20,21,22, 20,22,23 ];

var vertex_buffer = glArrayBuffer(vertices);
var color_buffer = glArrayBuffer(colors);
var index_buffer = glElementBuffer(indices);*/
var THETA = 0;
var PHI = 0;

var mObj = LoadMesh(gl, 'assets/cube.obj');

/* ============ Shader Programs ========================*/
var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader", "fragment-shader"])
gl.useProgram(program);

/* ======= Matrices ===================================*/
var positionLocation = gl.getAttribLocation(program, "a_position");
var normalLocation = gl.getAttribLocation(program, "a_normal");
var texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

/* ======= Buffers =====================================*/
var positionBuffer = glArrayBuffer(mObj.positions);
var normalsBuffer = glArrayBuffer(mObj.normals);
var texcoordBuffer = glArrayBuffer(mObj.texcoords);

/* ======= Light ======================================= */
var ambientLight=[0.2,0.2,0.2];
var colorLight=[1.0,1.0,1.0];

/* ======= Uniforms ====================================*/
gl.uniform3fv(gl.getUniformLocation(program, "diffuse" ), mObj.diffuse );
gl.uniform3fv(gl.getUniformLocation(program, "ambient" ), mObj.ambient);
gl.uniform3fv(gl.getUniformLocation(program, "specular"), mObj.specular );
gl.uniform3fv(gl.getUniformLocation(program, "emissive"), mObj.emissive );
//gl.uniform3fv(gl.getUniformLocation(program, "u_lightDirection" ), xxx );
gl.uniform3fv(gl.getUniformLocation(program, "u_ambientLight" ), ambientLight );
gl.uniform3fv(gl.getUniformLocation(program, "u_colorLight" ), colorLight );

gl.uniform1f(gl.getUniformLocation(program, "shininess"), mObj.shininess);
gl.uniform1f(gl.getUniformLocation(program, "opacity"), mObj.opacity);

// Turn on the position attribute
gl.enableVertexAttribArray(positionLocation);
// Bind the position buffer.
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 3;          // 3 components per iteration
var type = gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer
gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

// Turn on the normal attribute
gl.enableVertexAttribArray(normalLocation);
// Bind the normal buffer.
gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
gl.vertexAttribPointer(normalLocation, size, type, normalize, stride, offset);

// Turn on the teccord attribute
gl.enableVertexAttribArray(texcoordLocation);
// Bind the position buffer.
gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
// Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
size = 2;          // 2 components per iteration
gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);

var fov = degToRad(3000);
var modelXRotationRadians = degToRad(0);
var modelYRotationRadians = degToRad(0);

/* ======= P, V matrices ====================================*/
var projectionMatrix = createProjectionMatrix(fov, gl.canvas, 0.1, 200);

var viewMatrix = createViewMatrix(0, 0, 5);

var matrixLocation = gl.getUniformLocation(program, "u_world");
var textureLocation = gl.getUniformLocation(program, "diffuseMap");
var viewMatrixLocation = gl.getUniformLocation(program, "u_view");
var projectionMatrixLocation = gl.getUniformLocation(program, "u_projection");
var lightWorldDirectionLocation = gl.getUniformLocation(program, "u_lightDirection");
var viewWorldPositionLocation = gl.getUniformLocation(program, "u_viewWorldPosition");

gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
gl.uniform1i(textureLocation, 0);

/* ======= Rendering ===================================*/
var render = function() {
		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var mo_matrix = createMoMatrix(THETA, PHI);

	gl.uniformMatrix4fv(matrixLocation, false, mo_matrix);
	//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	//gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
	gl.drawArrays(gl.TRIANGLES, 0, mObj.numVertices);
	//window.requestAnimationFrame(render);
}

/* ======= Start rendering =============================*/
render();
