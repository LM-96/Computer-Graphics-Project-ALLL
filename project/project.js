/*============= Creating a canvas ======================*/
var canvas = document.getElementById('my_Canvas');
gl = canvas.getContext('webgl');

/* ============ Geometry ===============================*/
var vertices =  vertices=[
-1,-1,-1, 1,-1,-1, 1,1,-1, -1,1,-1, -1,-1,1, 1,-1,1, 1,1,1, -1,1,1, -1,-1,-1, -1,1,-1, -1, 1,1, -1,-1,1,
1,-1,-1, 1,1,-1, 1,1,1, 1,-1,1, -1,-1,-1, -1,-1,1, 1,-1,1, 1,-1,-1, -1,1,-1, -1,1,1, 1,1,1, 1,1,-1,];
var colors = colorsPerFaceArray(4, COLOR.RED, COLOR.BLUE, COLOR.CYAN, COLOR.GREEN, COLOR.PURPLE, COLOR.YELLOW);
var indices = [
0,1,2, 0,2,3, 4,5,6, 4,6,7, 8,9,10, 8,10,11, 12,13,14, 12,14,15, 16,17,18, 16,18,19, 20,21,22, 20,22,23 ];

var vertex_buffer = glArrayBuffer(vertices);
var color_buffer = glArrayBuffer(colors);
var index_buffer = glElementBuffer(indices);
var THETA = 0;
var PHI = 0;
/* ============ Shader Programs ========================*/
var shaderProgram = webglUtils.createProgramFromScripts(gl, ["vertex-shader", "fragment-shader"])

/* ======= Matrices ===================================*/
var _Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
var _Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
var _Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var _coordinates = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(_coordinates, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(_coordinates);

gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
var _colors = gl.getAttribLocation(shaderProgram, "color");
gl.vertexAttribPointer(_colors, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(_colors);

gl.useProgram(shaderProgram);

/* ======= P, V matrices ====================================*/
var proj_matrix = createProjectionMatrix(gl.canvas, 1, 100, 40)
var view_matrix = createViewMatrix(0, 0, 5);

gl.uniformMatrix4fv(_Pmatrix, false, proj_matrix);
gl.uniformMatrix4fv(_Vmatrix, false, view_matrix);

/* ======= Rendering ===================================*/
var render = function() {
	console.log("render");
	var mo_matrix = createMoMatrix(THETA, PHI);
	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(0.8, 0.8, .8, 1);
	gl.clearDepth(1.0);
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.uniformMatrix4fv(_Mmatrix, false, mo_matrix);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

	//window.requestAnimationFrame(render);
}

/* ======= Start rendering =============================*/
render();
