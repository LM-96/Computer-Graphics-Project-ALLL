/* ======= GL Utilities ======================================================= */
function glArrayBuffer(array) {
	var res = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, res);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	return res;
}

function glElementBuffer(array) {
	var res = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, res);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(array), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	return res;
}

/* ======= Colors ============================================================= */
function singleColorArray(color, vertexNumber) {
	var res = [];
	for(let i=0; i < vertexNumber; i++) {
		res = res.concat(color);
	}
	return res;
}

function colorsPerFaceArray(vertexNumberPerFace, ...colors) {
	var res = [];
	for(const faceColor of colors) {
		res = res.concat(singleColorArray(faceColor, vertexNumberPerFace));
	}
	return res;
}

/* ======= P, V, M matrices =================================================== */
function createViewMatrix(theta, phi, distance) {
	var camera = [distance*Math.sin(phi)*Math.cos(theta),
						distance*Math.sin(phi)*Math.sin(theta),
						distance*Math.cos(phi)];
//    console.log(camera);
	var target = [0, 0, 0];
	var up = [0, 1, 0];
	return m4.inverse(m4.lookAt(camera, target, up));
}

function createMoMatrix(theta, phi) {
	var mo_matrix=[];
	m4.identity(mo_matrix);
	m4.yRotate(mo_matrix, theta, mo_matrix);
	m4.xRotate(mo_matrix, phi, mo_matrix);
	return mo_matrix;
}

function createProjectionMatrix(fov, canvas, zNear, zFar, ) {
  return m4.perspective(degToRad(fov), canvas.clientWidth / canvas.clientHeight, zNear, zFar);
}

/* ======= Maths ============================================================== */
function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

function radToDeg(r) {
  return r * 180 / Math.PI;
}

function degToRad(d) {
  return d * Math.PI / 180;
}

/* ======= Colors ============================================================= */
const COLOR = {
  "RED"       : [1, 0, 0],
  "GREEN"     : [0, 1, 0],
  "BLUE"      : [0, 0, 1],
  "PURPLE"    : [1, 0, 1],
  "CYAN"      : [0, 1, 1],
  "YELLOW"    : [1, 1, 0],
  "WHITE"     : [1, 1, 1],
  "BLACK"     : [0, 0, 0],
}

function getColor(color) {

}
