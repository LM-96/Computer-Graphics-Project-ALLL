/*============= Creating a canvas ======================*/ 
var canvas = document.getElementById('my_Canvas');
gl = canvas.getContext('webgl');


//WORLD LOAD AND DRAW

var bufferInfo_obj;

loadDoc("./assets/WorldBox.obj")

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


// FUNCTION RENDER AND UPDATE

function update(time){
	if(nstep*PHYS_SAMPLING_STEP <= timeNow){ //skip the frame if the call is too early
		throwPizza();
		CarDoStep(); 
		nstep++; 
		doneSomething=true;
		window.requestAnimationFrame(update);
		return; // return as there is nothing to do
	}
	timeNow=time;
	if (doneSomething) {
		render();
		doneSomething=false;
	}
	window.requestAnimationFrame(update); // get next frame
}

function render(){

	//gl.enable(gl.CULL_FACE); 	//se è disabilitato, riesco a vedere dentro al cubo, se no no
    gl.enable(gl.DEPTH_TEST);

    // first draw from the POV of the light
    lightWorldMatrix = m4.lookAt(
        [settings.x_light, settings.y_light, settings.z_light],          			// position
        [settings.x_targetlight, settings.y_targetlight, settings.z_targetlight], 	// target
        settings.up,                                              					// up
    );

    lightProjectionMatrix = m4.perspective(
            degToRad(settings.fovLight),
            settings.width_projLight / settings.height_projLight,
            1,  	// near: top of the frustum
            700);   // far: bottom of the frustum


	// -----------------------------------------------------------
    // draw to the depth texture
	
    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.viewport(0, 0, depthTextureSize, depthTextureSize);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawScene( lightProjectionMatrix, lightWorldMatrix, m4.identity(), lightWorldMatrix, programInfo_color);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1); //setta tutto a nero se 0,0,0,1
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let textureMatrix = m4.identity();
    textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
    textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));

	// -------------------------------------------------------------------
	//matrici di vista
	
	projectionMatrix = m4.perspective(settings.fov, settings.aspect, 1, 2000);

	var targetAuto = [px, py, pz];
	
	camera = [px + (settings.D*Math.sin(degToRad(facing))), py+20, pz+(settings.D*Math.cos(degToRad(facing)))]; //posteriore alla macchina

	//cambiaCamera = true --> camera posteriore
	if(cambiaCamera){
		var targetAuto = [px, py, pz];
		camera = [px+(-settings.D*Math.sin(degToRad(facing))), py+20, pz+(-settings.D*Math.cos(degToRad(facing)))];		
	}
	//permette di muoversi nella scena (esempio con la drag del mouse)
	if(cameraLibera){
		camera = [settings.D*7*Math.sin(settings.PHI)*Math.cos(settings.THETA),
					settings.D*7*Math.sin(settings.PHI)*Math.sin(settings.THETA),
					settings.D*7*Math.cos(settings.PHI)];
	}
	
    cameraMatrix = m4.lookAt(camera, targetAuto, settings.up);

    drawScene( projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, programInfo_sun);
    
	drawAdvert();
	//drawFrustum();
	drawWorld();
	drawDeliveryArea();
}

