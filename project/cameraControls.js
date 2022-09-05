//Camera controls
function CameraManager() {
  this.cameraViewModeNum = 1; //0= Vista dall'alto; 1= vista in prima persona, 2= prima persona inversa

  this.cameraPosition = new Position(cameraPos[1], cameraPos[1], cameraPos[1]);
  this.up = cameraup;
  this.target = new Position(target[0], target[0], target[0]);
  this.fov = degToRad(60);

  this.objTarget = null;
  this.followObjTarget = false;
  this.followObjTraslation = false;

  this.onTranslationCallback = (deltaX, deltaY, deltaZ) => {
    this.cameraPosition.translate(deltaX, deltaY, deltaZ);
  };

  //GETTER AND SETTER
  this.setTargetObject = function (objTarget) {
    this?.objTarget?.removeOnTranslation(this.onTranslationCallback);

    this.objTarget = objTarget;
    if (this.followTraslation)
      objTarget.setOnTranslation(this.onTranslationCallback);
  };

  this.setMode = (followObjTarget, followObjTraslation) => {
    this.followObjTarget = followObject;
  };

  this.setCameraPosition = function (x, y, z) {
    this.cameraPosition = new Position(x, y, z);
  };

  this.setCameraFov = function (fov) {
    this.fov = fov;
  };

  this.incrementCameraFov = function (deltaFov) {
    if (
      this.fov + degToRad(deltaFov) > 0 &&
      this.fov + degToRad(deltaFov) < 3.14
    )
      this.fov += degToRad(deltaFov);
  };

  this.getObjTargetPos = function () {
    return this.objTarget.position.toArray();
  };

  this.enableFollowObjTarget = function (lookAt = true, traslation = false) {
    this.followObjTarget = lookAt;
    this.followObjTraslation = traslation;
  };

  this.updatePosOnTarget = function (distanceVector) {
    this.cameraPosition = new Position(
      this.objTarget.position.x + distanceVector[0],
      this.objTarget.position.y + distanceVector[1],
      this.objTarget.position.z + distanceVector[2]
    );
    //this.updateGL_DRAWER();
  };

  //LOGIC FUNCTION
  this.traslatePosCamera = function (
    deltaX,
    deltaY,
    deltaZ,
    translateTarget = true
  ) {
    this.cameraPosition.translate(deltaX, deltaY, deltaZ);
    if (translateTarget) {
      this.target.translate(deltaX, deltaY, deltaZ);
    }
    //this.updateGL_DRAWER();
  };

  this.setVisualeDallAlto = function () {
    this.cameraUP = [0, 1, 0];
    this.setCameraPosition(0, 0, 15);
    this.cameraTargetPos = new Position(0, 0, 0);
    this.enableFollowObjTarget(false, false);
    //this.updateGL_DRAWER(); (done in reder() function)
  };

  this.setVisualeGeneral = function (
    pos = [1, 1, 0.25],
    lookAt = true,
    followTraslation = false
  ) {
    var cameraPos = new Position(pos[0], pos[1], pos[2]);

    this.cameraUP = [0, 0, 1];
    this.cameraPosition = cameraPos;
    this.enableFollowObjTarget(lookAt, followTraslation);
    if (followTraslation) this.distanceVector = pos;
    //this.updateGL_DRAWER();
  };

  this.changeCameraView = function (num) {
    switch (num) {
      case 0:
        this.setVisualeDallAlto();
        break; //Vista dall'alto
      case 1:
        this.setVisualeGeneral([0, -1.5, 1], true, true);
        break; //Vista prima persona
      case 2:
        this.setVisualeGeneral([0, 5, 2]);
        break; //Vista dal lato
      case 3:
        this.setVisualeGeneral([-5, 0, 2], false);
        break; //Vista dal lato 2
      case 4:
        this.setVisualeGeneral([3, -3, 1], true);
        break; //Vista dall'angolo con follow
      case 5:
        this.setVisualeGeneral([-1, -1, 0.5], true, true);
        break; //Vista dall'angolo con follow
      case "alto":
        target.translateL(0, 0, 0.1, m4.identity());
        break;
      case "basso":
        target.translateL(0, 0, -0.1, m4.identity());
        break;
    }
  };
}

function createCameraManager(
  objTarget,
  cameraPos = [1, 1, 1],
  cameraup = [0, 1, 0],
  target = [0, 0, 0]
) {
  var camera = new CameraManager(objTarget, cameraPos, cameraup, target);
  camera.changeCameraView(camera.cameraViewModeNum);

  return camera;
}
