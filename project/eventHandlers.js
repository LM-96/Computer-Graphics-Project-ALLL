/* ======= MOUSE EVENTS ======================================================= */
var drag = false;
var old_x, old_y;
var dX = 0, dY = 0;
var speed = 0.05;
var target;
var input = {
  "xCam" : document.getElementById("xCamInput"),
  "yCam" : document.getElementById("yCamInput"),
  "zCam" : document.getElementById("zCamInput"),
  "fov" : document.getElementById("fovInput"),
  "xUp" : document.getElementById("xUpInput"),
  "yUp" : document.getElementById("yUpInput"),
  "zUp" : document.getElementById("zUpInput")  
}
const INCREMENT_UNIT = 0.25;
const RAD_INCREMENT_UNIT = 0.05;
const DEG_INCREMENT_UNIT = 1;

var mouseDown = function(e) {
  drag = true;
  old_x = e.pageX, old_y = e.pageY;
  e.preventDefault();
  return false;
}

var mouseUp = function(e) {
  drag = false;
}

var mouseMove = function(e) {
  if(!drag) return false;
  dX=(e.pageX-old_x)*2*Math.PI/ENV.canvas.width,
  dY=(e.pageY-old_y)*2*Math.PI/ENV.canvas.height;
  target.rotate(dX, dY);
  old_x=e.pageX, old_y=e.pageY;
  e.preventDefault();
  GL_DRAWER.drawScene();

  log("Angles || T:" + target.rotation.theta + ", P:" + target.rotation.phi);
}

var keydown = function(e) {
  switch(e.keyCode) {
    case 40 : target.translateL(0, -0.1, 0, m4.identity()); break;      //Freccia Giù
    case 38 : target.translateL(0, 0.1, 0, m4.identity()); break;       //Freccia Su
    case 37 : target.translateL(0.1, 0, 0, m4.identity()); break;       //Freccia Sx
    case 39 : target.translateL(-0.1, 0, 0, m4.identity()); break;       //Ferccia Dx
    case 104 : target.translateL(0, 0, 0.1, m4.identity()); break;
    case 98 : target.translateL(0, 0, -0.1, m4.identity()); break;
    case 97 : CAMERA_MANAGER.changeCameraView(0); break;         //NUMpad 1
    case 99 : CAMERA_MANAGER.changeCameraView(1); break;        //NumPad 3
  }
  log("pos: " + target.position.toString());
  GL_DRAWER.drawScene();
}

function increment(what, decrement = false) {
  let inc = 1;
  if (decrement) inc = -1;
  let camMgr = GL_DRAWER.cameraManager;

  switch (what) {
    case "xCam": {
      camMgr.translateCameraPosition(inc * INCREMENT_UNIT, 0, 0);
      break;
    }

    case "yCam": {
      camMgr.translateCameraPosition(0, inc * INCREMENT_UNIT, 0);
      break;
    }

    case "zCam": {
      camMgr.translateCameraPosition(0, 0, inc * INCREMENT_UNIT);
      break;
    }

    case "fov": {
      camMgr.setFov(camMgr.fov() + inc * degToRad(DEG_INCREMENT_UNIT));
      break;
    }

    case "xUp": {
      let oldUp = camMgr.up();
      camMgr.setUp(oldUp.first + inc, oldUp.second, oldUp.third);
      break;
    }

    case "yUp": {
      let oldUp = camMgr.up();
      camMgr.setUp(oldUp.first, oldUp.second + inc, oldUp.third);
      break;
    }

    case "zUp": {
      let oldUp = camMgr.up();
      camMgr.setUp(oldUp.first, oldUp.second, oldUp.third + inc);
      break;
    }
  }
}

function setInputValue(what, value) {
  input[what].value = value;
}

function attachHandlers(canvas, p_target) {
  canvas.onmousedown=mouseDown;
  canvas.onmouseup=mouseUp;
  canvas.mouseout=mouseUp;
  canvas.onmousemove=mouseMove;
  target = p_target;

  document.addEventListener('keydown', keydown);
  let camMgr = GL_DRAWER.cameraManager;

  camMgr.addOnCameraPositionChange((_oldPos, currPos) => {
    setInputValue("xCam", currPos.x);
    setInputValue("yCam", currPos.y);
    setInputValue("zCam", currPos.z);
  });

  camMgr.addOnFovChange((_oldFov, currFov) => {
    setInputValue("fov", radToDeg(currFov));
  })

  camMgr.addOnUpChange((_oldUp, currUp) => {
    log(currUp)
    setInputValue("xUp", currUp.first);
    setInputValue("yUp", currUp.second);
    setInputValue("zUp", currUp.third);
  })
}
