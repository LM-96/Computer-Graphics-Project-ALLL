/* ======= MOUSE EVENTS ======================================================= */
var drag = false;
var old_x, old_y;
var dX = 0, dY = 0;
var speed = 0.05;
var target;
const input = {
  "xCam" : document.getElementById("xCamInput"),
  "yCam" : document.getElementById("yCamInput"),
  "zCam" : document.getElementById("zCamInput"),
  "fov" : document.getElementById("fovInput"),
  "xUp" : document.getElementById("xUpInput"),
  "yUp" : document.getElementById("yUpInput"),
  "zUp" : document.getElementById("zUpInput"),
  "xTarget" : document.getElementById("xTargetInput"),
  "yTarget" : document.getElementById("yTargetInput"),
  "zTarget" : document.getElementById("zTargetInput"),
  "objSelects" : document.getElementsByClassName("meshx-obj-sel"),
  "lookAtObject" : document.getElementById("lookAtObjectInput"),
  "followTranslation" : document.getElementById("followTranslationInput"),
  "xCamDist" : document.getElementById("xCamDistInput"),
  "yCamDist" : document.getElementById("yCamDistInput"),
  "zCamDist" : document.getElementById("zCamDistInput"),
}
const cards = {
  "cameraPosition" : document.getElementById("cameraPositionCard"),
  "up" : document.getElementById("upCard"),
  "target" : document.getElementById("targetCard"),
  "fov" : document.getElementById("fovCard"),
  "cameraDistance" : document.getElementById("cameraDistanceCard")
}
const mainAccordion = document.getElementById("mainAccordion")
const INCREMENT_UNIT = 0.25;
const RAD_INCREMENT_UNIT = 0.05;
const DEG_INCREMENT_UNIT = 1;
const ACCORDION_ITEM_OBJ = `<div class="accordion-item">
<h2 class="accordion-header" id="heading#objName#">
  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse#objName#" aria-expanded="false" aria-controls="collapse#objName#">
  #objName#
  </button>
</h2>
<div id="collapse#objName#" class="accordion-collapse collapse" aria-labelledby="heading#objName#" data-bs-parent="#mainAccordion">
  <div class="accordion-body">
    <div id="#objName#Card" class="card center mt-2 mb-1" > 
      <b>Position</b>
      <div class="row m-2">
        <div class="col">
          <button class="btn" type="button" onclick="objIncrement('#objName#', 'x', true)"><img src="resources/images/dash-circle.svg" /></button>
          <input class="form-control center" id="x#objName#Input" type="text" disabled="true" value="0"\>
          <button class="btn" type="button" onclick="objIncrement('#objName#', 'x', true)"><img src="resources/images/plus-circle.svg" /></button>
        </div>
        <div class="col">
          <button class="btn" type="button" onclick="objIncrement('#objName#', 'y', true)"><img src="resources/images/dash-circle.svg" /></button>
          <input class="form-control center" id="y#objName#Input" type="text" disabled="true" value="0"\>
          <button class="btn" type="button" onclick="objIncrement('#objName#', 'y', true)"><img src="resources/images/plus-circle.svg" /></button>
        </div>
        <div class="col">
          <button class="btn" type="button" onclick="objIncrement('#objName#', 'z', true)"><img src="resources/images/dash-circle.svg" /></button>
          <input class="form-control center" id="z#objName#Input" type="text" disabled="true" value="0"\>
          <button class="btn" type="button" onclick="objIncrement('#objName#', 'z', true)"><img src="resources/images/plus-circle.svg" /></button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`

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
  e.preventDefault();
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

    case "xTarget" : {
      let oldTarget = camMgr.target();
      camMgr.setTarget(oldTarget.x + inc * INCREMENT_UNIT, oldTarget.y, oldTarget.z);
      break;
    }

    case "yTarget" : {
      let oldTarget = camMgr.target();
      camMgr.setTarget(oldTarget.x, oldTarget.y + inc * INCREMENT_UNIT, oldTarget.z);
      break;
    }

    case "zTarget" : {
      let oldTarget = camMgr.target();
      camMgr.setTarget(oldTarget.x, oldTarget.y, oldTarget.z + inc * INCREMENT_UNIT);
      break;
    }

    case "xCamDist": {
      let oldDistance = camMgr.distanceFromTarget();
      camMgr.setDistanceFromTarget(oldDistance.first + inc * INCREMENT_UNIT, oldDistance.second, oldDistance.third,
        true, input.followTranslation.checked);
      break;
    }

    case "yCamDist": {
      let oldDistance = camMgr.distanceFromTarget();
      camMgr.setDistanceFromTarget(oldDistance.first, oldDistance.second + inc * INCREMENT_UNIT, oldDistance.third,
        true, input.followTranslation.checked);
      break;
    }

    case "zCamDist": {
      let oldDistance = camMgr.distanceFromTarget();
      camMgr.setDistanceFromTarget(oldDistance.first, oldDistance.second, oldDistance.third + inc * INCREMENT_UNIT,
        true, input.followTranslation.checked);
      break;
    }
  }
  GL_DRAWER.drawScene();
}

function set(what, value) {
  log("set(" + what + ", " + value + ")");
  let camMgr = GL_DRAWER.cameraManager;

  switch (what) {
    case "xCam": {
      let oldPos = camMgr.cameraPosition();
      camMgr.setCameraPosition(value, oldPos.y, oldPos.z);
      break;
    }

    case "yCam": {
      let oldPos = camMgr.cameraPosition();
      camMgr.setCameraPosition(oldPos.x, value, oldPos.z);
      break;
    }

    case "zCam": {
      let oldPos = camMgr.cameraPosition();
      camMgr.setCameraPosition(oldPos.x, oldPos.y, value);
      break;
    }

    case "fov": {
      camMgr.setFov(value);
      break;
    }

    case "xUp": {
      let oldUp = camMgr.up();
      camMgr.setUp(value, oldUp.second, oldUp.third);
      break;
    }

    case "yUp": {
      let oldUp = camMgr.up();
      camMgr.setUp(oldUp.first, value, oldUp.third);
      break;
    }

    case "zUp": {
      let oldUp = camMgr.up();
      camMgr.setUp(oldUp.first, oldUp.second, value);
      break;
    }

    case "xTarget" : {
      let oldTarget = camMgr.target();
      camMgr.setTarget(value, oldTarget.y, oldTarget.z);
      break;
    }

    case "yTarget" : {
      let oldTarget = camMgr.target();
      camMgr.setTarget(oldTarget.x, value, oldTarget.z);
      break;
    }

    case "zTarget" : {
      let oldTarget = camMgr.target();
      camMgr.setTarget(oldTarget.x, oldTarget.y, value);
      break;
    }
  }

  GL_DRAWER.drawScene();
}

function setInputValue(what, value) {
  //log("setInputValue(" + what + ", " + value + ")");
  input[what].value = value;
}

function onLookAtObjectInput(checked) {
  GL_DRAWER.cameraManager.setLookingAtObject(checked);
  if(!checked) {
    cards["cameraDistance"].style.display = "none";
  } else {
    cards["cameraDistance"].style.display = "";
  }

  GL_DRAWER.drawScene();
}

function onFollowObjectTranslationInput(checked) {
  GL_DRAWER.cameraManager.setFollowObjectTranslation(checked);
  GL_DRAWER.drawScene();
}

function onTargetObjectInput(objName) {
  if(objName == "undefined") {
    GL_DRAWER.cameraManager.removeTarget();
  } else {
    GL_DRAWER.cameraManager.setTargetObject(MESH_MANAGER.get(objName),
      input["lookAtObject"].checked,
      input["followTranslation"].checked);
  }
  GL_DRAWER.drawScene();
}

function objIncrement(objName, what, decrement = false) {
  let inc = 1;
  if (decrement) inc = -1;
  let obj = MESH_MANAGER.get(objName);
  switch(what) {
    case "x" : {
      obj.translate(inc * INCREMENT_UNIT, 0, 0);
    }
    case "y" : {
      obj.translate(0, inc * INCREMENT_UNIT, 0);
    }
    case "z" : {
      obj.translate(0, 0, inc * INCREMENT_UNIT);
    }
    case "theta" : {
      obj.rotate(inc * degToRad(DEG_INCREMENT_UNIT), 0);
    }
    case "phi" : {
      obj.rotate(0, inc * degToRad(DEG_INCREMENT_UNIT));
    }
    case "sx" : {
      obj.scalate(inc * INCREMENT_UNIT, 1, 1);
    }
    case "sy" : {
      obj.scalate(1, inc * INCREMENT_UNIT, 1);
    }
    case "sz" : {
      obj.scalate(1, 1, inc * INCREMENT_UNIT);
    }
  }
  GL_DRAWER.drawScene();
}


function objSet(objName, what, value) {
  let obj = MESH_MANAGER.get(objName);
  switch(what) {
    case "x" : {
      let oldPos = obj.position;
      obj.setPosition(value, oldPos.y, oldPos.z);
    }
    case "y" : {
      let oldPos = obj.position;
      obj.setPosition(oldPos.x, value, oldPos.z);
    }
    case "z" : {
      let oldPos = obj.position;
      obj.setPosition(oldPos.x, oldPos.y, value);
    }
    case "theta" : {
      let oldRot = obj.rotation;
      obj.setRotation(value, oldRot.phi);
    }
    case "phi" : {
      let oldRot = obj.rotation;
      obj.setRotation(oldRot.theta, value);
    }
    case "sx" : {
      let oldScale = obj.scale;
      obj.setScale(value, oldScale.y, oldScale.z);
    }
    case "sy" : {
      let oldScale = obj.scale;
      obj.setScale(oldScale.x, value, oldScale.z);
    }
    case "sz" : {
      let oldScale = obj.scale;
      obj.setScale(oldScale.x, oldScale.y, value);
    }
  }
  GL_DRAWER.drawScene();
}

function attachHandlers(canvas, p_target) {
  //1: attach mouse events
  canvas.onmousedown=mouseDown;
  canvas.onmouseup=mouseUp;
  canvas.mouseout=mouseUp;
  canvas.onmousemove=mouseMove;
  target = p_target;

  //2: attach keyboard events
  document.addEventListener('keydown', keydown);
  let camMgr = GL_DRAWER.cameraManager;

  //3: attach callbacks for UI update
  camMgr.addOnCameraPositionChange((_oldPos, currPos) => {
    setInputValue("xCam", currPos.x);
    setInputValue("yCam", currPos.y);
    setInputValue("zCam", currPos.z);
  });

  camMgr.addOnFovChange((_oldFov, currFov) => {
    setInputValue("fov", radToDeg(currFov));
  })

  camMgr.addOnUpChange((_oldUp, currUp) => {
    setInputValue("xUp", currUp.first);
    setInputValue("yUp", currUp.second);
    setInputValue("zUp", currUp.third);
  })

  camMgr.addOnTargetChange((_oldPos, currPos) => {
    setInputValue("xTarget", currPos.x);
    setInputValue("yTarget", currPos.y);
    setInputValue("zTarget", currPos.z);
  });

  camMgr.addLookingAtObjectChange((_oldLAO, currLAO) => {
    input["lookAtObject"].checked = currLAO;
  })

  camMgr.addFollowObjectTranslationChange((_oldFOT, currFOT) => {
    input["followTranslation"].checked = currFOT;
  })

  camMgr.addOnDistanceFromTargetChange((_oldDist, currDist) => {
    setInputValue("xCamDist", currDist.first);
    setInputValue("yCamDist", currDist.second);
    setInputValue("zCamDist", currDist.third);
  })

  //4: updating UI at startup
  let currPos = camMgr.cameraPosition();
  setInputValue("xCam", currPos.x);
  setInputValue("yCam", currPos.y);
  setInputValue("zCam", currPos.z);
  let currUp = camMgr.up();
  setInputValue("xUp", currUp.first);
  setInputValue("yUp", currUp.second);
  setInputValue("zUp", currUp.third);
  setInputValue("fov", radToDeg(camMgr.fov()));

  let currDistFromTarget = camMgr.distanceFromTarget();
  setInputValue("xCamDist", currDistFromTarget.first);
  setInputValue("yCamDist", currDistFromTarget.second);
  setInputValue("zCamDist", currDistFromTarget.third);

  let lookingAtObject = camMgr.lookingAtObject();
  input["lookAtObject"].checked = camMgr.lookingAtObject();
  if(!lookingAtObject) {
    cards.cameraDistance.style.display = "none";
  }

  input["followTranslation"].checked = camMgr.followObjectTranslation();

  const objs = MESH_MANAGER.getAll();
  let value = 2;
  for(const select of input["objSelects"]) {
    select.innerHTML += (`<option value="undefined">${undefined}</option>\n`);
  }
  for(const obj of objs) {
    accordionItemFor(obj);
    for(const select of input["objSelects"]) {
      select.innerHTML += (`<option value="${obj.name}">${obj.name}</option>\n`);
    }
    value++;
  }

}

function accordionItemFor(obj) {
  mainAccordion.innerHTML += (ACCORDION_ITEM_OBJ.replaceAll("#objName#", obj.name));
  let xInput = document.getElementById("x" + obj.name + "Input");
  let yInput = document.getElementById("y" + obj.name + "Input");
  let zInput = document.getElementById("z" + obj.name + "Input");
  
  //1: Attaching callback for UI updates
  obj.addOnTranslation((_oldPos, currPos) => {
    xInput.value = currPos.x;
    yInput.value = currPos.y;
    zInput.value = currPos.z;
  })

  //2: Updates UI on startup
  xInput.value = obj.position.x;
  yInput.value = obj.position.y;
  zInput.value = obj.position.z;
}
