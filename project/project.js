/*============= Creating a canvas ======================*/ 
var canvas = document.getElementById('my_Canvas');
gl = canvas.getContext('webgl');


//WORLD LOAD AND DRAW

var bufferInfo_obj;

loadDoc("./assets/WorldBox1.obj")

const arrays_obj = {
    position:	{ numComponents: 3, data:webglVertexData[0], },
    texcoord:	{ numComponents: 2, data:webglVertexData[1], },
    normal:		{ numComponents: 3, data:webglVertexData[2], },
 };

 bufferInfo_obj = webglUtils.createBufferInfoFromArrays(gl, arrays_obj);

 function setObjsToDraw() {
	objectsToDraw = [
        {
            //not affected by the light
            name: "world",
            programInfo: programInfo_world,
            bufferInfo: bufferInfo_obj,
            uniforms: {
                u_texture: textures[6],
                u_world: m4.identity(),
            },
        }
    ];
}

function drawWorld() {
	const viewMatrix = m4.inverse(cameraMatrix);
	
	let objToDraw = getObjToDraw(objectsToDraw, "world");
	const programInfo = objToDraw.programInfo;
	gl.useProgram(programInfo.program);
	
	let matrix_world = m4.identity();
	matrix_world = m4.translate(matrix_world,0,50,0);
	matrix_world = m4.scale(matrix_world,500,400,500);
	matrix_world = m4.yRotate(matrix_world,degToRad(270));
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	
	webglUtils.setUniforms(programInfo, {
		u_view: viewMatrix,
		u_projection: projectionMatrix,
		u_world: matrix_world,
	});
	
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	
	
}



var doneSomething=false; 
			var nstep=0; 
			var timeNow=0;
			const PHYS_SAMPLING_STEP=20; 	// numero di millisec che un passo di fisica simula


update(); // start animation
window.requestAnimationFrame(update);
