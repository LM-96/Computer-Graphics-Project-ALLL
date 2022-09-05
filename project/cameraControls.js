//Camera controls
function CameraManager() {
  this.cameraViewModeNum = 1; //0= Vista dall'alto; 1= vista in prima persona, 2= prima persona inversa

  var cameraPosition = new Position(1, 1, 1);
  var up = [0, 1, 0];
  var target = new Position(0, 0, 0);
  var fov = degToRad(60);

  /**
   * The target object
   */
  var targetObject = null;

  /**
   * Indicates if the camera has to look at the target object
   */
  this.lookingAtObject = false;

  /**
   * Indicates if the camera has to follow the transition of the target object
   */
  this.followObjTraslation = false;

  /**
   * The callback that updates the position of the camera when the target object
   * is moved. This callback is internally attached to the position of the target
   * when the 'setTargetObject' is called
   * @param {Position} startPosition the start position of the object
   * @param {number} deltaX the value of the translation over the x axis
   * @param {number} deltaY the value of the translation over the y axis
   * @param {number} deltaZ the value of the translation over the z axis
   * @param {Position} endPosition the end position of the object
   */
  this.onTranslationCallback = (startPosition, deltaX, deltaY, deltaZ, endPosition) => {
    if(this.followObjTraslation) {
      this.translateCameraPosition(deltaX, deltaY, deltaZ);
    }
  };

  var onCameraPositionChange = [];
  var onFovChange = [];
  var onUpChange = [];

  /**
   * Adds a callback that will be invoked when the camera position is changed.
   * The callback must accept four parameters:
   *    - a startPosition, that represents the position of the camera before the change (it will be passed as a copy)
   *    - a endPosition, that represents the end position of the camera (it will be passed as a copy)
   * @param {function} func a callback that will be invoked when the object is rotated
   */
  this.addOnCameraPositionChange = function(func) {
    if (typeof func != "function") {
      log("addOnCameraPositionChange() | func is not a function");
    } else {
      onCameraPositionChange.push(func);
    }
  }

  this.removeOnCameraPositionChange = function(func) {
    onCameraPositionChange = onCameraPositionChange.filter((f) => f !== func)
  }

  this.addOnFovChange = function(func) {
    if (typeof func != "function") {
      log("addOnFovChange() | func is not a function");
    } else {
      onFovChange.push(func);
    }
  }

  this.removeOnFovChange = function(func) {
    onFovChange = onFovChange.filter((f) => f !== func)
  }

  this.addOnUpChange = function(func) {
    if (typeof func != "function") {
      log("addOnUpChange() | func is not a function");
    } else {
      onUpChange.push(func);
    }
  }

  this.removeOnUpChange = function(func) {
    onUpChange = onUpChange.filter((f) => f !== func)
  }

  /**
   * Sets the target object for the camera
   * @param {MeshObject} objTarget the mesh object used as target
   * @param {boolean} lookingAtObject indicates if the camera is locked to look at the target object
   * ('true' by default)
   * @param {boolean} followObjTarget indicates if the camera has to follow the translation of the target object
   * ('true' by default)
   */
  this.setTargetObject = function (objTarget, lookingAtObject = true, followObjTraslation = true) {
    this?.targetObject?.removeOnTranslation(this.onTranslationCallback);

    this.targetObject = objTarget;
    this.lookingAtObject = lookingAtObject;
    this.followObjTraslation = followObjTraslation;
    if (this.followObjTraslation && this.targetObject != null && this.targetObject != undefined) {
      this.targetObject.addOnTranslation(this.onTranslationCallback);
    }
  };

  /**
   * Returns the set fov in degree
   * @returns the set fov in degree
   */
  this.getFovDegree = () => {
    return radToDeg(fov);
  }

  /**
   * Returns the fov in radiants
   * @returns the set fov in degree
   */
   this.getFov = () => {
    return fov;
  }

  /**
   * Sets the distance of the camera from the target object or the target coordinates.
   * The distance parameter can be a number or an array containing the distance for each axis (x, y and z)
   * @param {*} distance the value of the distance (same for each axis) or an array containing the distance
   * for each axis
   */
  this.setDistanceFromTarget = function (distance) {
    if(!typeof(distance) == "number" || Array.isArray(distance)) {
      throw new Error(
        "setDistanceFromTarger: distance must be a number or an array of number"
      );
    }

    let pos;
    if(this.lookingAtObject) {
      pos = this.targetObject.position;
    } else {
      pos = this.targetPosition;
    }

    if (typeof distance == "number") {
      cameraPosition.translate(pos.x - distance, pos.y - distance, pos.z - distance);
    } else if (Array.isArray(distance)) {
      cameraPosition.translate(pos.x - distance[0], pos.y - distance[1], pos.z - distance[2]);
    } 
  };

  /**
   * Sets the parget position of the camera
   * @param {Position} targetPosition the target position of the camera
   * @param {boolean} lookingAtObject indicates if the camera is locked to look at the target object
   * ('false' by default)
   * @param {boolean} followObjTarget indicates if the camera has to follow the translation of the target object
   * ('false' by default)
   */
  this.setTargetPosition = function(targetPosition, lookingAtObject = false, followObjTraslation = false) {
    this.target = targetPosition;
    this.lookingAtObject = lookingAtObject;
    this.followObjTraslation = followObjTraslation;
  }

  /**
   * Sets the position of the camera using the given absolute coordinates
   * @param {number} x the absolute x coordinate for the position of the camera
   * @param {number} y the absolute y coordinate for the position of the camera
   * @param {number} z the absolute z coordinate for the position of the camera
   */
  this.setCameraCoordinates = function (x, y, z) {
    let startPos = cameraPosition.copy();
    cameraPosition.x = x;
    cameraPosition.y = y;
    cameraPosition.z = z;
    let endPos = cameraPosition.copy();

    onCameraPositionChange.forEach((f) => f(startPos, endPos));
  };

  /**
   * Sets the position of the camera to that passed as parameter.
   * Notice that the position is passed as a copy, then a change over the
   * original position does not affect that of the camera
   * @param {Position} position the position to be set
   */
  this.setCameraPosition = function(position) {
    this.setCameraCoordinates(position.x, position.y, position.z);
  }

  /**
   * Translates the position of the camer
   * @param {number} deltaX the x component of the translation
   * @param {number} deltaY the y component of the translation
   * @param {number} deltaZ the z component of the translation
   */
  this.translateCameraPosition = function(deltaX, deltaY, deltaZ) {
    let startPos = cameraPosition.copy();
    cameraPosition.translate(deltaX, deltaY, deltaZ);
    let endPos = cameraPosition.copy();

    onCameraPositionChange.forEach((f) => f(startPos, endPos));
  }

  /**
   * Sets the camera FOV using the given angle in radiants
   * @param {number} fov the radiants of the fov
   */
  this.setCameraFovRadiants = function (fovRad) {
    let oldFov = fov;
    fov = fovRad;

    onFovChange.forEach((f) => f(oldFov, fov));
  };

  /**
   * Sets the camera FOV using the given angle in degree
   * @param {number} fov the degree of the fov
   */
  this.setCameraFovDegree = function (fovDeg) {
    let oldFov = fov;
    this.fov = degToRad(fovDeg);

    onFovChange.forEach((f) => f(oldFov, fov))
  }

  /**
   * Sets the up using the passed array
   * @param {object} _up the array containing the three values for the up
   */
  this.setUp = function(_up) {
    let oldUp = [up[0], up[1], up[2]];
    up = [_up[0], _up[1], _up[2]];
    let newUp = [up[0], up[1], up[2]];

    onUpChange.forEach((f) => f(oldUp, newUp));
  }

  /**
   * Returns a copy of the current camera position
   * @returns a copy of the current camera position
   */
  this.getCameraPosition = function() {
    return cameraPosition.copy();
  }

  /**
   * Returns an array that is a copy of the current up value
   * @returns an array that is a copy of the current up value
   */
  this.getUp = function() {
    return [up[0], up[1], up[2]];
  }

  /**
   * Returns a copy of the current target position
   * @returns a copy of the current target position
   */
  this.getTarget = function() {
    return target.copy();
  }

  /**
   * Calculates the camera matrix using the parameter mainained of this object
   * @returns the camera matrix using the parameter mainained of this object
   */
  this.calculateCameraMatrix = function() {
    if(this.lookingAtObject && targetObject != null && targetObject != undefined) {
      return m4.lookAt(cameraPosition.toArray(), targetObject.position.toArray(), up);
    } else {
      return m4.lookAt(cameraPosition.toArray(), target.toArray(), up);
    }
  }

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
  this.traslateCameraPosition = function (
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