/* ======= MOUSE EVENTS ======================================================= */
var drag = false;
var old_x, old_y;
var dX = 0,
  dY = 0;
var speed = 0.05;
var target;
var xCamInput = document.getElementById("camXValue");
var yCamInput = document.getElementById("camYValue");
var zCamInput = document.getElementById("camZValue");
var xUpInput = document.getElementById("upXValue");
var yUpInput = document.getElementById("upYValue");
var zUpInput = document.getElementById("upZValue");
var fovInput = document.getElementById("fovValue");
const INCREMENT_UNIT = 0.25;
const RAD_INCREMENT_UNIT = 0.05;

var mouseDown = function (e) {
  drag = true;
  (old_x = e.pageX), (old_y = e.pageY);
  e.preventDefault();
  return false;
};

var mouseUp = function (e) {
  drag = false;
};

var mouseMove = function (e) {
  if (!drag) return false;
  (dX = ((e.pageX - old_x) * 2 * Math.PI) / ENV.canvas.width),
    (dY = ((e.pageY - old_y) * 2 * Math.PI) / ENV.canvas.height);
  target.rotate(dX, dY);
  (old_x = e.pageX), (old_y = e.pageY);
  e.preventDefault();
  GL_DRAWER.drawScene();

  log("Angles || T:" + target.rotation.theta + ", P:" + target.rotation.phi);
};

var keydown = function (e) {
  switch (e.keyCode) {
    case 40:
      target.translate(0, -0.1, 0);
      break; //Freccia Giù
    case 38:
      target.translate(0, 0.1, 0);
      break; //Freccia Su
    case 37:
      target.translate(-0.1, 0, 0);
      break; //Freccia Sx
    case 39:
      target.translate(0.1, 0, 0);
      break; //Ferccia Dx
    case 104:
      target.translate(0, 0, 0.1);
      break; //NUmpad 8
    case 189:
      target.translate(0, 0, -0.1);
      break; //-
    /*case 97:
      CAMERA_MANAGER.changeCameraView(0);
      break; //NUMpad 1
    case 98:
      CAMERA_MANAGER.changeCameraView(5);
      break; //NUMpad 2
    case 99:
      CAMERA_MANAGER.changeCameraView(1);
      break; //NumPad 3
    case 100:
      CAMERA_MANAGER.changeCameraView(2);
      break; //NumPad 4
    case 101:
      CAMERA_MANAGER.changeCameraView(3);
      break; //NumPad 5
    case 102:
      CAMERA_MANAGER.changeCameraView(4);
      break; //NumPad 6
    case 188:
      CAMERA_MANAGER.incrementCameraFov(-1);
      break; //,
    case 190:
      CAMERA_MANAGER.incrementCameraFov(1);
      break; //.*/
  }
  log("pos: " + target.position.toString());
  log("camerapos :" + GL_DRAWER.cameraManager.getCameraPosition().toString());
  GL_DRAWER.drawScene();
};
function increment(what, decrement = false, _updateView = true, draw = true) {
  var inc = 1;
  if (decrement) inc = -1;

  switch (what) {
    case "xCam": {
      GL_DRAWER.cameraManager.translateCameraPosition(inc * INCREMENT_UNIT, 0, 0);
      break;
    }

    case "yCam": {
      GL_DRAWER.cameraManager.translateCameraPosition(0, inc * INCREMENT_UNIT, 0);
      break;
    }

    case "zCam": {
      GL_DRAWER.cameraManager.translateCameraPosition(0, 0, inc * INCREMENT_UNIT);
      break;
    }

    case "fov": {
      GL_DRAWER.cameraManager.setCameraFovRadiants(GL_DRAWER.cameraManager.getFov() + inc * RAD_INCREMENT_UNIT);
      break;
    }

    case "xUp": {
      let oldUp = GL_DRAWER.cameraManager.getUp();
      GL_DRAWER.cameraManager.setUp([oldUp[0] + inc, oldUp[1], oldUp[2]]);
      break;
    }

    case "yUp": {
      let oldUp = GL_DRAWER.cameraManager.getUp();
      GL_DRAWER.cameraManager.setUp([oldUp[0], oldUp[1] + inc, oldUp[2]]);
      break;
    }

    case "zUp": {
      let oldUp = GL_DRAWER.cameraManager.getUp();
      GL_DRAWER.cameraManager.setUp([oldUp[0], oldUp[1], oldUp[2] + inc]);
      break;
    }
  }

  if (_updateView) updateView(what);
  if (draw) GL_DRAWER.drawScene();
}

function set(what, value, updateView = true, draw = true) {
  switch (what) {
    case "xCam": {
      GL_DRAWER.cameraManager.cameraPosition.x = value;
      break;
    }

    case "yCam": {
      GL_DRAWER.cameraManager.cameraPosition.y = value;
      break;
    }

    case "zCam": {
      GL_DRAWER.cameraManager.cameraPosition.z = value;
      break;
    }

    case "fov": {
      GL_DRAWER.cameraManager.fov = value;
      break;
    }

    case "xUp": {
      GL_DRAWER.cameraManager.up[0] = value;
      break;
    }

    case "yUp": {
      GL_DRAWER.cameraManager.up[1] = value;
      break;
    }

    case "zUp": {
      GL_DRAWER.cameraManager.up[2] = value;
      break;
    }
  }

  if (updateView) updateView(what);
  if (draw) GL_DRAWER.drawScene();
}

function updateView(what) {
  switch (what) {
    case "xCam": {
      xCamInput.value = GL_DRAWER.cameraManager.getCameraPosition().x;
      break;
    }

    case "yCam": {
      yCamInput.value = GL_DRAWER.cameraManager.getCameraPosition().y;
      break;
    }

    case "zCam": {
      zCamInput.value = GL_DRAWER.cameraManager.getCameraPosition().z;
      break;
    }

    case "fov": {
      fovInput.value = GL_DRAWER.cameraManager.getFovDegree();
      break;
    }

    case "xUp": {
      xUpInput.value = GL_DRAWER.cameraManager.getUp()[0];
      break;
    }

    case "yUp": {
      yUpInput.value = GL_DRAWER.cameraManager.getUp()[1];
      break;
    }

    case "zUp": {
      zUpInput.value = GL_DRAWER.cameraManager.getUp()[2];
      break;
    }
  }
}

function attachHandlers(canvas, p_target) {
  canvas.onmousedown = mouseDown;
  canvas.onmouseup = mouseUp;
  canvas.mouseout = mouseUp;
  canvas.onmousemove = mouseMove;
  target = p_target;

  document.addEventListener("keydown", keydown);

  /* AUTO UPDATE VIEW ********************************************* */
  GL_DRAWER.cameraManager.addOnCameraPositionChange((_, endPos) => {
    xCamInput.value = endPos.x;
    yCamInput.value = endPos.y;
    zCamInput.value = endPos.z;
  });

  GL_DRAWER.cameraManager.addOnFovChange((_, endFov) => {
    fovInput.value = radToDeg(endFov);
  })

  GL_DRAWER.cameraManager.addOnUpChange((_, newUp) => {
    xUpInput.value = newUp[0];
    yUpInput.value = newUp[1];
    zUpInput.value = newUp[2];
  })
}

function syncView() {
  let cameraPosition = GL_DRAWER.cameraManager.getCameraPosition();
  let up = GL_DRAWER.cameraManager.getUp();
  xCamInput.value = cameraPosition.x;
  yCamInput.value = cameraPosition.y;
  zCamInput.value = cameraPosition.z;
  fovInput.value = GL_DRAWER.cameraManager.getFovDegree();
  xUpInput.value = up[0];
  yUpInput.value = up[1];
  zUpInput.value = up[2];
}
