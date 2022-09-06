/* ----------- Copy ----------------------------------------------------------- */
/**
 * Tries to make a deep copy of the given object using its 'copy()' function
 * if defined. If the object does not define the copy function, this method
 * directly returns the object
 * @param {object} object 
 * @returns a copy of the object if it defines the 'copy()' method or
 * directly the same object otherwise
 */
function tryCopy(object) {
  if (typeof object.copy == "function") {
    return object.copy();
  }

  return object;
}

/* ----------- Result --------------------------------------------------------- */
function Result(value = undefined, error = undefined) {
  var _value = value;
  /**
   * Returns the value maintained in this result or 'undefined' if no
   * value is present. This last case means that the result should contain
   * an error
   * @returns the value maintained in this result or 'undefined' if no
   * value is present
   */
  this.value = () => {
    return _value;
  }

  var _error = error;
  /**
   * Returns the error maintained in this result or 'undefined' if no
   * error has been thrown. This last case means that the result has been calculated
   * with no errors
   * @returns 
   */
  this.error = () => {
    return _error;
  }

  /**
   * Returns 'true' if this Result contains an error, 'false' otherwise
   * @returns 'true' if this Result contains an error, 'false' otherwise
   */
  this.isError = () => {
    return _error !== undefined
  }

  /**
   * Returns 'true' if this Result contains a value, 'false' otherwise
   * @returns 'true' if this Result contains a value, 'false' otherwise
   */
  this.isValue = () => {
    return _value !== undefined
  }

  /**
   * Calls the 'onError' block if this Result contains an error.
   * If no error is present, nothing is done
   * @param {function} onError the function to be called if this Result
   * contains an error
   */
  this.withError = (onError) => {
    if(typeof(onError) !== 'function') {
      throw new Error("Result.withError() | onError is not a function");
    }

    if(this.isError()) {
      onError(_error);
    }
  }

  /**
   * Calls the 'onValue' block if this Result contains a value.
   * If no value is present, nothing is done
   * @param {function} onValue 
   */
  this.withValue = (onValue) => {
    if(typeof(onError) !== 'function') {
      throw new Error("Result.withValue() | onValue is not a function");
    }

    if(this.isValue()) {
      onValue(_value);
    }
  }
}

/**
 * Creates and returns a successful Result object with the value
 * passed as parameter. Invoking the function 'isValue' on the returning
 * Result will return 'true' while 'isError' will return false
 * @param {*} value the value that represents the result of the computation
 * @returns a successful Result object with the value
 * passed as parameter
 */
Result.success = (value) => {
  return new Result(value, undefined);
}

/**
 * Creates and returns a failure Result object with the error
 * passed as parameter. Invoking the function 'isValue' on the returning
 * Result will return 'false' while 'isError' will return true
 * @param {*} value the value that represents the result of the computation
 * @returns a failure Result object with the error
 * passed as parameter
 */
Result.failure = (error) => {
  return new Result(undefined, error);
}

/**
 * Creates and returns a failure Result with an Error created using
 * the given 'msg' string. Invoking the function 'isValue' on the returning
 * Result will return 'false' while 'isError' will return true.
 * This function throws an error if the 'msg' parameter is not a string
 * @param {string} msg the message of the Error
 * @returns a failure Result object with an error that has the message
 * passed as parameter
 */
 Result.failureStr = (msg) => {
  if(typeof(msg) != 'string') {
    throw new Error("Result.failureStr() | \'" + msg + "\' is not a string");
  }

  return new Result(undefined, new Error(msg));
}

/* ----------- Pair, Triple --------------------------------------------------- */
/**
 * Represents a generic pair of two values
 * @param {*} first the first value
 * @param {*} second the second value
 */
function Pair(first, second) {
  /**
   * The first value
   */
  this.first = first;

  /**
   * The second value
   */
  this.second = second;

  /**
   * Returns a deep copy of this pair
   * This function tries to make a copy also of the two values
   * if their types define the copy() function
   * @returns a deep copy of this pair
   */
  this.copy = function () {
    return Pair(tryCopy(this.first), tryCopy(this.second));
  };

  this.toArray = function() {
    return [this.first, this.second];
  }
}

/**
 * Creates a Pair
 * @param {*} first the first value
 * @param {*} second the second value
 * @returns a Pair containing the first and the second values passed as parameter
 */
Pair.of = function (first, second) {
  return new Pair(first, second);
};

/**
 * Returns a Pair using the first two elements of the given array
 * @param {object} array the array to be used
 * @returns a Pair using the first two elements of the given array
 */
 Pair.fromArray = function(array) {
  return Pair.of(array[0], array[1]);
}

/**
 * Represents a generic triple of two values
 * @param {*} first the first value
 * @param {*} second the second value
 * @param {*} third the third value
 */
function Triple(first, second, third) {
  this.first = first;
  this.second = second;
  this.third = third;

  /**
   * Returns a deep copy of this triple
   * This function tries to make a copy also of the three values
   * if their types define the copy() function
   * @returns a deep copy of this Triple
   */
  this.copy = function () {
    return Triple(
      tryCopy(this.first),
      tryCopy(this.second),
      tryCopy(this.third)
    );
  };

  this.toArray = function() {
    return [this.first, this.second, this.third];
  }
}

/**
 * Creates a Triple
 * @param {*} first the first value
 * @param {*} second the second value
 * @param {*} third the third value
 * @returns a Triple containing the first,the second and the third values passed as parameter
 */
Triple.of = function (first, second, third) {
  return new Triple(first, second, third);
};

/**
 * Returns a Triple using the first three elements of the given array
 * @param {object} array the array to be used
 * @returns a Triple using the first three elements of the given array
 */
Triple.fromArray = function(array) {
  return Triple.of(array[0], array[1], array[2]);
}
/* ----------- Data Objects --------------------------------------------------- */
/**
 * Enumeration for the axis of the coordinate
 */
const COORDINATE = {
  /**
   * X coordinate
   */
  X: 0,

  /**
   * Y coordinate
   */
  Y: 1,

  /**
   * Z coordinate
   */
  Z: 2,
};

/**
 * Represents a position in a 3-D reference system
 * @param {number} x the x coordinate
 * @param {number} y the y coordinate
 * @param {number} z the z coordinate
 */
function Position(x, y, z) {
  /* ****************************************** */
  this.x = x;
  this.y = y;
  this.z = z;

  /**
   * Get the coordinate of the type passed as param (COORDINATE.x, COORDINATE.y or COORDINATE.z)
   * @param {COORDINATE} coordinate the type of the coordinate
   * @returns the coordinate of the type passed as param
   */
  this.getCoordinate = function (coordinate) {
    switch (coordinate) {
      case COORDINATE.X:
        return this.x;
      case COORDINATE.Y:
        return this.y;
      case COORDINATE.Z:
        return this.z;
    }

    return undefined;
  };

  /**
   * Applies a translation on the x coordinate of this position
   * @param {number} xTranslation the value of the translation to apply to the x coordinate
   * @returns this position
   */
  this.translateX = function (xTranslation) {
    this.x += xTranslation;
    return this;
  };

  /**
   * Applies a translation on the y coordinate of this position
   * @param {number} yTranslation the value of the translation to apply to the y coordinate
   * @returns this position
   */
  this.translateY = function (yTranslation) {
    this.y += yTranslation;
    return this;
  };

  /**
   * Applies a translation on the z coordinate of this position
   * @param {number} zTranslation the value of the translation to apply to the z coordinate
   * @returns this position
   */
  this.translateZ = function (zTranslation) {
    this.z += zTranslation;
    return this;
  };

  /**
   * Applies a translation on this position
   * @param {number} xTranslation the value of the translation to apply to the x coordinate
   * @param {number} yTranslation the value of the translation to apply to the y coordinate
   * @param {numer} zTranslation the value of the translation to apply to the z coordinate
   * @returns this position
   */
  this.translate = function (xTranslation, yTranslation, zTranslation) {
    this.translateX(xTranslation);
    this.translateY(yTranslation);
    this.translateZ(zTranslation);
    return this;
  };

  /**
   * Returns a new position that is the sum of this plus that passed as param.
   * The resulting position is a translation of this position using the coordinates of
   * that passed as parameter
   * @param {Position} position the position to add
   * @returns a new Position that is the sum of this plus that passed as param
   */
  this.plus = function (position) {
    return new Positon(
      this.x + position.x,
      this.y + position.y,
      this.z + position.z
    );
  };

  /**
   * Returns a new position that has the coordinates of this plus the deltas passed as
   * parameters. The resulting position is a translation of this position using the coordinates of
   * that passed as parameter
   * @param {number} deltaX the delta to add to the x coordinate of this position
   * @param {number} deltaY the delta to add to the y coordinate of this position
   * @param {number} deltaZ the delta to add to the z coordinate of this position
   * @returns
   */
  this.plus = function (deltaX, deltaY, deltaZ) {
    return new Position(this.x + deltaX, this.y + deltaY, this.z + deltaZ);
  };

  /**
   * Returns this position as an array containing the three coordinates ([this.x, this.y, this.z])
   * @returns an array containing the three coordinates of this position
   */
  this.toArray = function () {
    return [this.x, this.y, this.z];
  };

  /**
   * Returns a string representation of this position using the classical
   * mathematical notation for points (X, Y, Z)
   * @returns a string representation of this position
   */
  this.toString = function () {
    return "(" + this.x + ", " + this.y + ", " + this.z + ")";
  };

  /**
   * Creates and returns a copy of this position.
   *  All the changes applied to this new position are not propagated
   * to the original position
   * @returns a copy of this position
   */
  this.copy = function () {
    return new Position(this.x, this.y, this.z);
  };
}

/**
 * Returns a position with all coordinate set to zero (0, 0, 0)
 * @returns a position with all coordinate set to zero (0, 0, 0)
 */
Position.zeroPosition = function () {
  return new Position(0, 0, 0);
};

/**
 * Creates and returns a new position checking if the passed parameters
 * are numbers. This function throws an error if one parameter is not a number.
 * It is better to use this function instead the normal creation with the 'new' operator.
 * @param {number} x the x coordinate of the new position
 * @param {number} y the y coordinate of the new position
 * @param {number} z the z coordinate of the new position
 * @returns the new position
 */
Position.newPosition = function (x, y, z) {
  if (!(typeof x == "number")) {
    throw new Error("x value '" + x + "' is not a number");
  }
  if (!(typeof y == "number")) {
    throw new Error("y value '" + x + "' is not a number");
  }
  if (!(typeof z == "number")) {
    throw new Error("z value '" + x + "' is not a number");
  }

  return new Position(x, y, z);
};

/**
 * Returns a deep copy of this position.
 * All the changes applied to this new position are not propagated
 * to the original position
 * @param {Position} position the position to copy
 * @returns a new position that is the deep copy of that passed as parameter
 */
Position.copyOf = function (position) {
  return position.copy();
};

/**
 * Returns a position that is the difference between the two passed as parameter
 * (target - start). In the geometrical sense, the returned position is the "vector" to
 * sum to the start position to go to the target
 * @param {Position} target the target position
 * @param {Position} start the start position
 * @returns a position that is the difference between the two passed as parameter
 */
Position.difference = function (target, start) {
  return Position.newPosition(
    target.x - start.x,
    target.y - start.y,
    target.z - start.z
  );
};

/**
 * Represents the speed of an object able to move in 3-D reference system
 * @param {number} vx the x component of the speed
 * @param {number} vy the y component of the speed
 * @param {number} vz the z component of the speed
 */
function Speed(vx, vy, vz) {
  /* ****************************************** */
  this.vx = vx;
  this.vy = vy;
  this.vz = vz;

  /**
   * Applies a uniform motion to the x coordinate of the passed position using the
   * x component of this speed.
   * The unit of the time must be consistent with that of this speed to have a
   * correct result
   * @param {Position} position the position that has to be moved
   * @param {number} time the time of the movement
   * @returns the position passed as param after the movement
   */
  this.applyXUniformMotionStepTo = function (position, time) {
    position.translateX(this.vx * time);
    return position;
  };

  /**
   * Applies a uniform motion to the y coordinate of the passed position using the
   * y component of this speed.
   * The unit of the time must be consistent with that of this speed to have a
   * correct result
   * @param {Position} position the position that has to be moved
   * @param {number} time the time of the movement
   * @returns the position passed as param after the movement
   */
  this.applyYUniformMotionStepTo = function (position, time) {
    position.translateY(this.vy * time);
    return position;
  };

  /**
   * Applies a uniform motion to the z coordinate of the passed position using the
   * z component of this speed.
   * The unit of the time must be consistent with that of this speed to have a
   * correct result
   * @param {Position} position the position that has to be moved
   * @param {number} time the time of the movement
   * @returns the position passed as param after the movement
   */
  this.applyZUniformMotionStepTo = function (position, time) {
    position.translateZ(this.vz * time);
    return position;
  };

  /**
   * Applies a uniform motion to the position passed as parameter using this speed.
   * The unit of the time must be consistent with that of this speed to have a
   * correct result
   * @param {Position} position the position that has to be moved
   * @param {number} time the time of the movement
   * @returns the position passed as param after the movement
   */
  this.applyUniformMotionStepTo = function (position, time) {
    position.translate(this.vx * time, this.vy * time, this.vz * time);
    return position;
  };

  /**
   * Applies a uniformly accelerated motion to the x coordinate of the passed position using the
   * x component of this speed and the acceleration passed as parameter.
   * The motion is applies also to this speed so, after the invocation of this function,
   * the x component of this speed is updated.
   * The unit of the time and the acceleration must be consistent with that of this speed to have a
   * correct result
   * @param {Position} position the position that has to be moved
   * @param {number} accelerationX the acceleration of the x component of this speed
   * @param {number} time the time of the movement
   * @returns a Pair containing the passed position and this speed after the movement
   */
  this.applyXUniformlyAccelleratedMotionStepTo = function (
    position,
    accelerationX,
    time
  ) {
    position.translateX(
      position.x + this.vx * t + 0.5 * accelerationX * (time * time)
    );
    this.vx = this.vx + accelerationX * time;
    return Pair.of(position, this);
  };

  /**
   * Applies a uniformly accelerated motion to the y coordinate of the passed position using the
   * y component of this speed and the acceleration passed as parameter.
   * The motion is applies also to this speed so, after the invocation of this function,
   * the y component of this speed is updated.
   * The unit of the time and the acceleration must be consistent with that of this speed to have a
   * correct result
   * @param {Position} position the position that has to be moved
   * @param {number} accelerationY the acceleration of the y component of this speed
   * @param {number} time the time of the movement
   * @returns a Pair containing the passed position and this speed after the movement
   */
  this.applyYUniformlyAccelleratedMotionStepTo = function (
    position,
    accelerationY,
    time
  ) {
    position.translateY(
      position.y + this.vy * t + 0.5 * accelerationY * (time * time)
    );
    this.vy = this.vy + accelerationY * time;
    return Pair.of(position, this);
  };

  /**
   * Applies a uniformly accelerated motion to the z coordinate of the passed position using the
   * z component of this speed and the acceleration passed as parameter.
   * The motion is applies also to this speed so, after the invocation of this function,
   * the z component of this speed is updated.
   * The unit of the time and the acceleration must be consistent with that of this speed to have a
   * correct result
   * @param {Position} position the position that has to be moved
   * @param {number} accelerationZ the acceleration of the z component of this speed
   * @param {number} time the time of the movement
   * @returns a Pair containing the passed position and this speed after the movement
   */
  this.applyZUniformlyAccelleratedMotionStepTo = function (
    position,
    accelerationZ,
    time
  ) {
    position.translateZ(
      position.z + this.vz * t + 0.5 * accelerationZ * (time * time)
    );
    this.vz = this.vz + accelerationZ * time;
    return Pair.of(position, this);
  };

  /**
   * Applies a uniformly accelerated motion to the passed position using the
   * this speed and the accelerations passed as parameter.
   * The motion is applies also to this speed so, after the invocation of this function,
   * all the components of this speed are updated.
   * The unit of the time and the acceleration must be consistent with that of this speed to have a
   * @param {*} position the position that has to be moved
   * @param {*} accelerationX the acceleration of the x component of this speed
   * @param {*} accelerationY the acceleration of the y component of this speed
   * @param {*} accelerationZ the acceleration of the z component of this speed
   * @param {*} time the time of the movement
   * @returns a Pair containing the passed position and this speed after the movement
   */
  this.applyUniformlyAccelleratedMotionStepTo = function (
    position,
    accelerationX,
    accelerationY = accelerationX,
    accelerationZ = accelerationX,
    time
  ) {
    this.applyUniformlyAccelleratedMotionTo(position, accelerationX, time);
    this.applyYUniformlyAccelleratedMotionTo(position, accelerationY, time);
    this.applyZUniformlyAccelleratedMotionTo(position, accelerationZ, time);

    return Pair.of(position, this);
  };

  /**
   * Creates and returns a copy of this speed.
   *  All the changes applied to this new speed are not propagated
   * to the original speed
   * @returns a copy of this speed
   */
  this.copy = function () {
    return new Speed(this.vx, this.vy, this.vz);
  };
}

/**
 * Returns a speed with all components set to zero (0, 0, 0)
 * @returns a speed with all components set to zero (0, 0, 0)
 */
Speed.zeroSpeed = function () {
  return new Speed(0, 0, 0);
};

/**
 * Creates and returns a new speed checking if the passed parameters
 * are numbers. This function throws an error if one parameter is not a number.
 * It is better to use this function instead the normal creation with the 'new' operator.
 * @param {number} vx the x component of the new speed
 * @param {number} vy the y component of the new speed
 * @param {number} vz the z component of the new speed
 * @returns the new speed
 */
Speed.newSpeed = function (vx, vy, vz) {
  if (!(typeof vx == "number")) {
    throw new Error("vx value '" + x + "' is not a number");
  }
  if (!(typeof vy == "number")) {
    throw new Error("vy value '" + x + "' is not a number");
  }
  if (!(typeof vz == "number")) {
    throw new Error("vz value '" + x + "' is not a number");
  }

  return new Speed(x, y, z);
};

/**
 * Returns a deep copy of this speed.
 * All the changes applied to this new speed are not propagated
 * to the original position
 * @param {Speed} speed the speed to copy
 * @returns a new speed that is the deep copy of that passed as parameter
 */
Speed.copyOf = function (speed) {
  return speed.copy();
};

/**
 * Represents a rotation with the two angles 'theta' and 'phi' in a 2-D reference system.
 * @param {number} theta is the angle rotation of the x axis
 * @param {number} phi is the angle rotation of the y axis
 */
function Rotation(theta, phi) {
  /* *************************************** */
  this.theta = theta;
  this.phi = phi;

  /**
   * Applies a rotation on the theta angle.
   * This function simply adds the deltaTheta passed as parameter to the theta of
   * this rotation
   * @param {number} deltaTheta the delta to add to theta
   * @returns this rotation
   */
  this.rotateTheta = function (deltaTheta) {
    this.theta += deltaTheta;
    return this;
  };

  /**
   * Applies a rotation on the phi angle.
   * This function simply adds the deltaPhi passed as parameter to the phi of
   * this rotation
   * @param {number} deltaTheta the delta to add to theta
   * @returns this rotation
   */
  this.rotatePhi = function (deltaPhi) {
    this.phi += deltaPhi;
    return this;
  };

  /**
   * Applies a rotation on the angles of this rotation.
   * This function simply adds the deltaTheta and the deltaPhi passed as parameters to the
   * corrispondent angles of this rotation
   * @param {*} deltaTheta
   * @param {*} deltaPhi
   * @returns
   */
  this.rotate = function (deltaTheta, deltaPhi) {
    this.rotateTheta(deltaTheta);
    this.rotatePhi(deltaPhi);
    return this;
  };

  /**
   * Creates and returns a copy of this rotation.
   *  All the changes applied to this new rotation are not propagated
   * to the original rotation
   * @returns a copy of this rotation
   */
  this.copy = function () {
    return Rotation(this.theta, this.phi);
  };
}

/**
 * Returns a rotation with all components set to zero (0, 0)
 * @returns a rotation with all components set to zero (0, 0)
 */
Rotation.zeroRotation = function () {
  return new Rotation(0, 0);
};

/**
 * Creates and returns a new rotation checking if the passed parameters
 * are numbers. This function throws an error if one parameter is not a number.
 * It is better to use this function instead the normal creation with the 'new' operator.
 * @param {number} theta the theta angle of the new rotation
 * @param {number} phi the  phi angle of the new rotation
 * @returns the new rotation
 */
Rotation.newRotation = function (theta, phi) {
  if (!(typeof theta == "number")) {
    throw new Error("theta value '" + x + "' is not a number");
  }
  if (!(typeof phi == "number")) {
    throw new Error("phi value '" + x + "' is not a number");
  }

  return new Rotation(theta, phi);
};

/**
 * Returns a deep copy of this rotation.
 * All the changes applied to this new rotation are not propagated
 * to the original rotation
 * @param {Rotation} rotation the rotation to copy
 * @returns a new rotation that is the deep copy of that passed as parameter
 */
Rotation.copyOf = function (rotation) {
  return rotation.copy();
};

/**
 * Returns a rotation that is the difference between the two passed as parameter
 * (target - start). In the geometrical sense, the returned rotation is the "vector" to
 * sum to the start rotation to go to the target
 * @param {Position} target the target rotation
 * @param {Position} start the start rotation
 * @returns a rotation that is the difference between the two passed as parameter
 */
Rotation.difference = function (target, start) {
  return Rotation.newRotation(
    target.theta - start.theta,
    target.phi - start.phi
  );
};

/**
 * Represents a scale of a 3-D object
 * @param {number} sx the x component of the scale
 * @param {number} sy the y component of the scale
 * @param {number} sz the z component of the scale
 */
function Scale(sx, sy, sz) {
  /* ****************************************** */
  this.sx = sx;
  this.sy = sy;
  this.sz = sz;

  /**
   * Appies a scale on the x component of this scale.
   * This function simply multiply the x component of this scale
   * with the deltaSX passed as parameter
   * @param {number} deltaSX the scale to be applied to the x component
   * @returns this scale
   */
  this.scaleX = function (deltaSX) {
    this.sx *= deltaSX;
    return this;
  };

  /**
   * Appies a scale on the y component of this scale.
   * This function simply multiply the y component of this scale
   * with the deltaSY passed as parameter
   * @param {number} deltaSY the scale to be applied to the y component
   * @returns this scale
   */
  this.scaleY = function (deltaSY) {
    this.sy *= deltaSY;
    return this;
  };

  /**
   * Appies a scale on the z component of this scale.
   * This function simply multiply the z component of this scale
   * with the deltaSZ passed as parameter
   * @param {number} deltaSY the scale to be applied to the z component
   * @returns this scale
   */
  this.scaleZ = function (deltaSZ) {
    this.sz *= deltaSZ;
    return this;
  };

  /**
   * Applies a scale on the components of this scale.
   * This function simply multiply each component of this scale
   * with the corresponded delta passed as parameter
   * @param {*} deltaSX the scale to be applied to the x component
   * @param {*} deltaSY the scale to be applied to the y component
   * @param {*} deltaSZ the scale to be applied to the z component
   * @returns this scale
   */
  this.scale = function (deltaSX, deltaSY = deltaSX, deltaSZ = deltaSZ) {
    this.scaleX(deltaSX);
    this.scaleY(deltaSY);
    this.scaleZ(deltaSZ);
    return this;
  };

  /**
   * Creates and returns a copy of this scale.
   *  All the changes applied to this new scale are not propagated
   * to the original scale
   * @returns a copy of this scale
   */
   this.copy = function () {
    return new Scale(this.sx, this.sy, this.sz);
  };
}

/**
 * Returns a scale that represents an "unscaled" object.
 * So, all the components of the returning scale are set to one (1, 1, 1)
 * @returns a scale that represents an "unscaled" object
 */
Scale.identityScale = function () {
  return new Scale(1, 1, 1);
};

/**
 * Creates and returns a new scale checking if the passed parameters
 * are numbers. This function throws an error if one parameter is not a number.
 * It is better to use this function instead the normal creation with the 'new' operator.
 * @param {number} sx the x component of the new scale
 * @param {number} sy the y component of the new scale
 * @param {number} sz the z component of the new scale
 * @returns the new rotation
 */
Scale.newScale = function (sx, sy, sz) {
  if (!(typeof sx == "number")) {
    throw new Error("sx value '" + x + "' is not a number");
  }
  if (!(typeof sy == "number")) {
    throw new Error("sy value '" + x + "' is not a number");
  }
  if (!(typeof sz == "number")) {
    throw new Error("sz value '" + x + "' is not a number");
  }

  return new Scale(sx, sy, sz);
};

/**
 * Returns a scale that is the "difference" (that is the division in the scale sense) between the two passed as parameter
 * (target ./ start). In the geometrical sense, the returned scale is the "vector" to
 * multiply to the start scale to go to the target
 * @param {Scale} target the target scale
 * @param {Scale} start the start scale
 * @returns the division between the target and the start scale
 */
Scale.difference = function(target, start) {
  return new Scale(
    target.x / start.x,
    target.y / start.y,
    target.z / start.z
  );
}

/* ----------- Position Limit Control ------------------------------------------------------ */
/**
 * Represents the "limits" of the movement of one object inside a reference system.
 * An object of this prototype can be used to calculate if a position is inside limits and
 * so if its legal
 * @param {object} data a set of data used by the limit function
 * @param {string} type the type of the limit
 * @param {function} isInLimitFunction a lambda that uses the 'data' parameter to calculate if a point
 * is inside limits. This lambda must accept two parameter: a position and a data object
 */
function Limits(
  data,
  type = "undefined",
  isInLimitFunction = (position, data) => false
) {
  this.data = data;
  this.type = type;
  this.isInLimitFunction = isInLimitFunction;

  /**
   * Returns 'true' if the given position is inside limits (so, it is legal)
   * @param {Position} position 
   * @returns 'true' if the given position is inside limits, 'false' otherwise
   */
  this.isInLimits = function (position) {
    return isInLimitFunction(position, this.data);
  };

  /**
   * Returns 'false' if the given position is outside limits (so, it is NOT legal)
   * @param {Position} position 
   * @returns 'true' if the given position is outside limits, 'false' otherwise
   */
  this.isOutOfLimits = function (position) {
    return !isInLimitFunction(position, this.data);
  };
}

/**
 * Returns a Limits object that "limitates" the position inside a parallelepiped.
 * The 'isInLimits' function returns 'true' if the position to valide is inside 
 * the parallelepiped defined by the xMin/xMax, yMin/yMax, zMin/zMax parameters.
 * The type parameter of this Limits is 'linear'
 * @param {number} xMin the minimum value of the x coordinate a position can have
 * @param {number} xMax the maximum value of the x coordinate a position can have
 * @param {number} yMin the minimum value of the y coordinate a position can have
 * @param {number} yMax the maximum value of the y coordinate a position can have
 * @param {number} zMin the minimum value of the z coordinate a position can have
 * @param {number} zMax the maximum value of the z coordinate a position can have
 * @returns a Limits object that "limitates" the position inside a parallelepiped
 */
Limits.linear = function (xMin, xMax, yMin, yMax, zMin, zMax) {
  let limData = {
    xLimits: Pair.of(xMin, xMax),
    yLimits: Pair.of(yMin, yMax),
    zLimits: Pair.of(zMin, zMax),
  };

  let isInLimitFunction = (position, data) => {
    if (
      position.x < data.xLimits.first ||
      position.x > data.xLimits.second ||
      position.y < data.yLimits.first ||
      position.y > data.yLimits.second ||
      position.z < data.zLimits.firs ||
      position.z > data.zLimits.second
    ) {
      return false;
    }

    return true;
  };

  return new Limits(limData, "linear", isInLimitFunction);
};

/**
 * Returns a Limits object that returns alway 'true' when calling its 'isInLimits'.
 * So, this represents "limits that are unlimited", means that all positions are allowed.
 * The type variable of this limit is 'unlimited'
 * @returns a Limits object that returns alway 'true' when calling its 'isInLimits'
 */
Limits.unlimited = function () {
  return new Limits(
    {
      xLimits: Pair.of(-Infinity, Infinity),
      yLimits: Pair.of(-Infinity, Infinity),
      zLimits: Pair.of(-Infinity, Infinity),
    },
    "unlimited",
    (position, data) => true
  );
};

/* ----------- Mesh Object ---------------------------------------------------- */
/**
 * Represents a mesh object mainaining its "mesh" data (vertices, indices, texcoord, buffers, ...)
 * and some other positioning and geometrical datas.
 * @param {string} name a name that identify this mesh object
 * @param {object} data the data of this mesh object
 */
function MeshObject(name, data) {
  /**
   * The name that idenfies this mesh object
   */
  this.name = name;

  /**
   * The "mesh" data of this object.
   * It can be obtained, for example, loading ad '.obj' file using the 'loadMesh' function
   * provided by 'load_mesh.js'.
   * This object must have this interface:
   * 
   * data = {
   * 
        *  mesh: ...,
        * 
        *  attributes: ...,
        * 
        *  numOfVertices: ...,
        * 
        *  uniforms: ...
   * 
   * }
   */
  this.data = data;

  /**
   * The position of this object considering the absolute reference system.
   * By default, it is set to the origin [position = (0, 0, 0)]
   */
  this.position = Position.zeroPosition();

  /**
   * The rotation of this object considering the absolute reference system.
   * By default, the object is unrotated [rotation = (0, 0)]
   */
  this.rotation = Rotation.zeroRotation();

  /**
   * The scale of this object considering the absolute reference system.
   * By default, the object is unscaled [scale = (1, 1, 1)]
   */
  this.scale = Scale.identityScale();

  /**
   * The speed of this object considering the absolute reference system.
   * By default, this object is fixed [speed = (0, 0, 0)]
   */
  this.speed = Speed.zeroSpeed();

  /**
   * The limits that constraint the movement of this object.
   * By default, the object has no limit [limits.type = "unlimited"]
   */
  this.limits = Limits.unlimited();

  /**
   * The bufferInfo of this mesh object.
   * 'null' by default
   */
  this.bufferInfo = null;

  /**
   * An array of callback that will be invoked when the object is translated.
   * All callbacks of this array must have five parameters: 
   *    - a startPosition (it will be passed as a copy)
   *    - the three delta for the translation
   *    - a endPosition (it will be passed as a copy)
   * 
   * It is recommended to add or remove a callback to this array using 'addOnTraslation'
   * or 'removeOnTranslation' functions.
   */
  var onTranslation = [];

  /**
   * An array of callback that will be invoked when the object is rotated.
   * All callbacks of this array must have four parameters: 
   *    - a startRotation (it will be passed as a copy)
   *    - the two delta for the angles
   *    - a endRotation (it will be passed as a copy)
   * 
   * It is recommended to add or remove a callback to this array using 'addOnRotation'
   * or 'removeOnRotation' functions.
   */
  var onRotation = [];

  /**
   * An array of callback that will be invoked when the object is scaled.
   * All callbacks of this array must have five parameters: 
   *    - a startScale (it will be passed as a copy)
   *    - the three delta for the scale
   *    - a endScale (it will be passed as a copy)
   * 
   * It is recommended to add or remove a callback to this array using 'addOnScaled'
   * or 'removeOnScaled functions.
   */
  var onScaled = [];

  /**
   * Adds a callback that will be invoked when the object is translated.
   * The callback must accept five parameters:
   *    - a startPosition, that represents the position before the translation (it will be passed as a copy)
   *    - the three delta used for the translation (deltaX, deltaY and deltaZ)
   *    - a endPosition, that represents the position after the translation (it will be passed as a copy)
   * @param {function} func a callback that will be invoked when the object is translated
   */
  this.addOnTranslation = (func) => {
    if (typeof func != "function") {
      log("func is not a function");
    } else {
      onTranslation.push(func);
    }
  };

  /**
   * Adds a callback that will be invoked when the object is rotated.
   * The callback must accept four parameters:
   *    - a startRotation, that represents the angles before the rotation (it will be passed as a copy)
   *    - the two delta used for the rotation (deltaTheta, deltaPhi)
   *    - a endRotation, that represents the angles after the rotation (it will be passed as a copy)
   * @param {function} func a callback that will be invoked when the object is rotated
   */
  this.addOnRotation = (func) => {
    if (typeof func != "function") {
      log("func is not a function");
    } else {
      onRotation.push(func);
    }
  };

  /**
   * Adds a callback that will be invoked when the object is scaled.
   * The callback must accept five parameters:
   *    - a startScale, that represents the previous scale before the transformation (it will be passed as a copy)
   *    - the three delta used for the scale (scaleX, scaleY and scaleZ)
   *    - a endScale, that represents end scale after the transformation (it will be passed as a copy)
   * @param {function} func a callback that will be invoked when the object is scaled
   */
  this.addOnScaled = (func) => {
    if (typeof func != "function") {
      log("func is not a function");
    } else {
      onScaled.push(func);
    }
  };

  /**
   * Removes a callback function from the onTranslation array
   * @param {function} func the callback to be removed
   */
  this.removeOnTranslation = (func) => {
    onTranslation = onTranslation.filter((el) => el !== func);
  };

  /**
   * Removes a callback function from the onRotation array
   * @param {function} func the callback to be removed
   */
  this.removeOnRotation = (func) => {
    onRotation = onRotation.filter((el) => el !== func);
  };

  /**
   * Removes a callback function from the onScaled array
   * @param {function} func the callback to be removed
   */
  this.removeOnScaled = (func) => {
    onScaled = onScaled.filter((el) => el !== func);
  };

  /**
   * Inits this object creating the bufferInfo and its 'u_world' matrix
   * @param {WebGLRenderingContext} gl the WebGL context 
   */
  this.init = function (gl) {
    this.bufferInfo = webglUtils.createBufferInfoFromArrays(
      gl,
      this.data.attributes
    );
    this.data.uniforms.u_world = m4.identity();
  };

  /**
   * Applies a translation to this object
   * @param {number} deltaX the x translation
   * @param {number} deltaY the y translation
   * @param {number} deltaZ the z translation
   * @returns this object
   */
  this.translate = function (
    deltaX,
    deltaY,
    deltaZ
  ) {
    let startPos = this.position.copy();
    this.position.translate(
      deltaX /**this.scale.sx*/,
      deltaY /**this.scale.sy*/,
      deltaZ /**this.scale.sz*/
    );
    let endPos = this.position.copy();
    this.updateUMatrix();
    onTranslation.forEach((func) => func(startPos, deltaX, deltaY, deltaZ, endPos));

    return this;
  };

  /**
   * Transform the given translation deltas from the relative reference system of the object (the one that has this
   * object as the origin) to the absolute reference system 
   * @param {number} deltaX the relative delta for the x coordinate
   * @param {number} deltaY the relative delta for the y coordinate
   * @param {number} deltaZ the relative delta for the z coordinate
   * @returns an array containing the absolute deltas [deltaXA, deltaYA, deltaZA]
   */
  this.relToAbs = (deltaX, deltaY, deltaZ) => {
    let theta = this.rotation.theta,
      phi = this.rotation.phi;
    let cosTh = Math.cos(theta),
      cosPh = Math.cos(phi),
      sinTh = Math.sin(theta),
      sinPh = Math.sin(phi);
    
    /*
      Calculates the absolute coordinates from the relative
      (theta is the angle between Y and Z, phi is the angle between X and -Z
    */
    let dxR = deltaX * cosPh + deltaY * sinTh * sinPh + deltaZ * sinPh;
    let dyR = deltaX * sinTh * sinPh + deltaY * cosTh + deltaZ * -sinTh;
    let dzR = deltaX * -sinPh + deltaY * sinTh + deltaZ * cosPh * cosTh;

    return [dxR, dyR, dzR];
  };

  /**
   * Applies a translation by using the relative reference system of the object (the one that has
   * this object as the origin)
   * @param {number} deltaX the relative delta for the x translation
   * @param {number} deltaY the relative delta for the y translation
   * @param {number} deltaZ the relative delta for the z translation
   * @returns this object
   */
  this.translateRelative = function (deltaX, deltaY, deltaZ) {
    [dxA, dyA, dzA] = this.relToAbs(deltaX, deltaY, deltaZ)
    return this.translate(dxA, dyA, dzA);
  };

  /**
   * Apply a translation if allowed by limits.
   * At this moment the only supported translation type are:
   *    - unlimited
   *    - linear
   * Notice that the translation will not be applied if does not respect
   * the constraints imposed by the limits
   * @param {number} deltaX the relative delta for the x translation
   * @param {number} deltaY the relative delta for the y translation
   * @param {number} deltaZ the relative delta for the z translation
   * @param {boolean} relative 'true' if the deltas are relative and then the applied translation is relative
   * @returns this object
   */
  this.translateL = function (
    deltaX,
    deltaY,
    deltaZ,
    relative = true
  ) {
    switch (this.limits.type) {
      case "unlimited":
        return this.translate(deltaX, deltaY, deltaZ);
      case "linear": {
        if (relative) {
          [deltaX, deltaY, deltaZ] = this.relToAbs(deltaX, deltaY, deltaZ);
        }
        //let deltaTrasl = (relative) ? this.transformRelative(deltaX, deltaY, deltaZ) : [deltaX, deltaY, deltaZ];

        if (
          this.limits.isInLimits(this.position.plus(deltaX, deltaY, deltaZ))
        ) {
          return this.translate(deltaX, deltaY, deltaZ);
        } else {
          return this;
        }
      }
    }
  };

  /**
   * Sets the absolute position of this object
   * @param {number} x the new x coordinate of the position of this object
   * @param {number} y the new y coordinate of the position of this object
   * @param {number} z the new z coordinate of the position of this object
   */
  this.setPosition = function (x, y, z) {
    let startPos = this.position.copy();
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    let endPos = this.position.copy();
    let diff = Position.difference(endPos, startPos);
    this.updateUMatrix();

    onTranslation.forEach((c) => { c(startPos, diff.x, diff.y, diff.z, endPos) });
  };


  /**
   * Sets the absolute rotation of this object
   * @param {number} theta the new theta angle of the rotation of this object
   * @param {number} phi the new phi angle of the rotation of this object
   */
  this.setRotation = function (theta, phi) {
    let startRotation = this.rotation.copy();
    this.rotation.theta = theta;
    this.rotation.phi = phi;

    let endRotation = this.rotation.copy();
    let diff = Rotation.difference(endRotation, startRotation);
    this.updateUMatrix();

    onRotation.forEach((c) => { c(startRotation, diff.theta, diff.phi, endRotation) });
  };

  /**
   * Sets the absolute scale of this object
   * @param {number} sx the new x scale of this object
   * @param {number} sy the new y scale of this object
   * @param {number} sz the new z scale of this object
   */
  this.setScale = function (sx, sy, sz) {
    let oldScale = this.scale.copy();
    this.scale.sx = sx;
    this.scale.sy = sy;
    this.scale.sz = sz;
    let newScale = this.scale.copy();
    let diff = Scale.difference(newScale, oldScale);
    this.updateUMatrix();

    onScaled.forEach((c) => { c(oldScale, diff.sx, diff.sy, diff.sz, newScale) });
  };

  /**
   * Applies a rotation on this object
   * @param {number} deltaTheta the delta for the theta angle
   * @param {number} deltaPhi the delta for the phi angle
   * @param {Float32Array} u_world the starting u_world matrix
   * (m4.identity() by default)
   */
  this.rotate = function (
    deltaTheta,
    deltaPhi
  ) {
    let startRot = this.rotation.copy();
    this.rotation.rotate(deltaTheta, deltaPhi);
    let endRot = this.rotation.copy();
    this.updateUMatrix();
    
    onRotation.forEach((c) => { c(startRot, deltaTheta, deltaPhi, endRot) });
  };

  /**
   * Applies a rotation only of theta on this object
   * @param {number} deltaTheta the delta for the theta angle
   */
  this.rotateTheta = function (
    deltaTheta
  ) {
    this.rotate(deltaTheta, 0);
  };

  /**
   * Applies a rotation only of phi on this object
   * @param {number} deltaPhi the delta for the phi angle
   * @param {Float32Array} u_world the starting u_world matrix
   * (m4.identity() by default)
   */
  this.rotatePhi = function (deltaPhi) {
    this.rotate(0, deltaPhi);
  };

  /**
   * Applies a scale on this object
   * @param {number} deltaSX the scale of the x axis
   * @param {number} deltaSY the scale of the y axis
   * @param {number} deltaSZ the scale of the z axis
   */
  this.scalate = function (
    deltaSX,
    deltaSY,
    deltaSZ
  ) {
    let oldScale = this.scale.copy();
    this.scale.scale(deltaSX, deltaSY, deltaSZ);
    let newScale = this.scale.copy();
    this.updateUMatrix();

    onScaled.forEach((c) => { c(oldScale, deltaSX, deltaSY, deltaSZ, newScale) });
  };

  /**
   * Sets the 'u_world' matrix of this object
   * @param {Float32Array} u_world the matrix to be set
   */
  this.setUMatrix = function (u_world) {
    this.data.uniforms.u_world = u_world;
  }

  /**
   * Updates the 'u_world' matrix of this object using its position,
   * its rotation and its scale
   * @param {Float32Array} u_world the starting 'u_world' matrix (m4.identity() by default)
   * @param {boolean} translation indicates if the matrix must be updated considering the position
   * of this object ('true' by defaulr)
   * @param {boolean} rotation indicates if the matrix must be updated considering the rotation
   * of this object ('true' by defaulr)
   * @param {boolean} scale indicates if the matrix must be updated considering the scale
   * of this object ('true' by defaulr)
   */
  this.updateUMatrix = function (
    u_world = m4.identity(),
    translation = true,
    rotation = true,
    scale = true
  ) {
    if (translation)
      u_world = m4.translate(
        u_world,
        this.position.x,
        this.position.y,
        this.position.z
      );
    if (rotation) {
      u_world = m4.xRotate(u_world, this.rotation.theta);
      u_world = m4.yRotate(u_world, this.rotation.phi);
    }
    if (scale)
      u_world = m4.scale(u_world, this.scale.sx, this.scale.sy, this.scale.sz);
    this.setUMatrix(u_world);
  };

  /**
   * Draws this object using the given WebGL context
   * @param {WebGLRenderingContext} gl the WebGL context
   * @param {object} programInfo the program info generated by 'webgl-utils'
   * @param {boolean} clear enable or disable the cleaning of the scene ('true' by default)
   */
  this.draw = function (gl, programInfo, clear = false) {
    if (clear) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    webglUtils.setBuffersAndAttributes(gl, programInfo, this.bufferInfo);
    webglUtils.setUniforms(programInfo, this.data.uniforms);
    gl.drawArrays(gl.TRIANGLES, 0, this.bufferInfo.numElements);
  };
}

/* ----------- Manager -------------------------------------------------------- */
/**
 * A manager for the mesh object able to load them maintaining their data.
 * When an object is loaded using this manager, its MeshObject is saved into
 * an internal map and can be retrieved as nedeed simply calling the 'get' function
 * @param {WebGLRenderingContex} gl the WebGL context
 * @param {object} programInfo the program info generated by 'webgl-utils'
 */
function MeshManager(gl, programInfo) {
  this.gl = gl;
  this.programInfo = programInfo;
  this.program = programInfo.program;
  this.objects = new Map();


  /**
   * Loads an '.obj' file using the 'load_mesh.js' and stores its data
   * into a MeshObject, saving it into the internal map of this manager.
   * The name is associated to the created object and can be used to retrieve
   * it when calling the 'get' function
   * @param {string} name the name associated to the object
   * @param {string} path the path of the '.obj' file
   * @returns the new MeshObject that is also stored into the manager
   */
  this.loadFromObj = function (name, path) {
    let meshObj = new MeshObject(name, LoadMesh(this.gl, path));
    this.objects.set(name, meshObj);
    meshObj.init(this.gl);
    return meshObj;
  };

  /**
   * Loads a mesh object using the raw data passed as parameter and stores its
   * data into a MeshObject, saving it into the internal map of this manager.
   * The name is associated to the created object and can be used to retrieve
   * it when calling the 'get' function
   * @param {string} name the name associated to the object
   * @param {object} position the data about the position of the vertex
   * @param {object} texcoord the data about the texcoords
   * @param {object} normal the data about the normals
   * @param {object} indices the data about the indices
   * @returns the new MeshObject that is also stored into the manager
   */
  this.loadFromRawData = function (name, position, texcoord, normal, indices) {
    let attributes = {
      position: { data: position },
    };
    if (texcoord != null) {
      attributes.texcoord = { data: texcoord };
    }
    if (normal != null) {
      attributes.normal = { data: normal };
    }
    if (indices != null) {
      attributes.indices = { data: indices };
    }
    let data = {
      mesh: null,
      attributes: attributes,
      numVertices: undefined,
      uniforms: new Object(),
    };
    let meshObj = new MeshObject(name, data);
    this.objects.set(name, meshObj);
    meshObj.init(this.gl);
    return meshObj;
  };

  /**
   * Returns the MeshObject associated with the given name or 'undefined' if
   * no object is associated to it
   * @param {string} name the name associated to the object
   * @returns the MeshObject associated with the given name or 'undefined' if
   * no object is associated to it
   */
  this.get = function (name) {
    return this.objects.get(name);
  };

  /**
   * Returns all of the objects saved into this manager
   * @returns all of the objects saved into this manager
   */
  this.getAll = function () {
    return this.objects.values();
  };

  /**
   * Removes the object associated with the given name returning 'true'.
   * If no object has this name, then 'false' is returned and nothing is removed
   * @param {string} name the name associated to the object
   * @returns 'true' if the object is removed, 'false' is no object is associated
   * to the given name
   */
  this.remove = function (name) {
    return this.objects.delete(name);
  };
}

/* ----------- Camera Manager ------------------------------------------------- */
function CameraManager() {


  /* POSITION ******************************************************* */

  var _cameraPosition = new Position(1, 1, 1);
  /**
   * Returns the camera position. All the changes over the returning value are
   * NOT propagated to the internal camera position. To change the camera position
   * use the 'setCameraPosition' method
   * @returns the camera position
   */
  this.cameraPosition = () => {
    return _cameraPosition.copy();
  }

  var onCameraPositionChange = [];
  /**
   * Adds a callback that will be invoked every time the camera position changes.
   * The callback passed a param MUST BE A FUNCTION that accept five parameter:
   * - the old position of the camera (a Position)
   * - the three deltas (deltaX, deltaY, deltaZ) that represents the difference of the two position
   * - the current position of the camera (a Position)
   * 
   * So, the signature of a callback must be: 'function(oldPos, deltaX, deltaY, deltaZ, currPos)'
   * @param {function} callback the function to be invoked when camera position changes
   * @returns A successful result if the callback has been registered or a failure otherwise (for example is
   * callback is not a function)
   */
  this.addOnCameraPositionChange = (callback) => {
    if(typeof(callback) !== 'function') {
      return Result.failureStr("addOnCameraPositionChange() | callback is not a function");
    }
    
    onCameraPositionChange.push(callback);
    return Result.success(true);
  }

  /**
   * Deregister the given callback for the camera position changes
   * @param {function} callback the callback to be de-registered
   */
  this.removeOnCameraPositionChange = (callback) => {
    onCameraPositionChange = onCameraPositionChange.filter((c) => c !== callback);
  }

  var notifyCameraPositionChange = (oldPos, deltaX, deltaY, deltaZ, currentPos) => {
    onCameraPositionChange.forEach((c) => c(oldPos, deltaX, deltaY, deltaZ, currentPos));
  }

  /**
   * Sets the camera position
   * @param {number} x the x coordinate of the position of the camera
   * @param {number} y the y coordinate of the position of the camera
   * @param {number} z the z coordinate of the position of the camera
   */
  this.setCameraPosition = (x, y, z) => {
    let oldPos = this.cameraPosition();
    _cameraPosition.x = x;
    _cameraPosition.y = y;
    _cameraPosition.z = z;
    let currPos = this.cameraPosition();
    let diff = Position.difference(currPos, oldPos);

    notifyCameraPositionChange(oldPos, diff.x, diff.y, diff.z, currPos);
  }

  /**
   * Translates the current position of the camera
   * @param {number} deltaX the x translation
   * @param {number} deltaY the y translation
   * @param {number} deltaZ the z translation
   * @returns the current position od the camera
   */
  this.translateCameraPosition = (deltaX, deltaY, deltaZ) => {
    let oldPos = this.cameraPosition();
    _cameraPosition.translate(deltaX, deltaY, deltaZ);
    let currPos = this.cameraPosition();

    notifyCameraPositionChange(oldPos, deltaX, deltaY, deltaZ, currPos);
    return currPos;
  }

  /* UP ************************************************************* */

  var _up = Triple.of(0, 1, 0);
  /**
   * Returns the up setting of the camera. All the changes over the returning value are
   * NOT propagated to the internal up. To change the up
   * use the 'setUp' method
   * @returns the up setting of the camera
   */
  this.up = () => {
    return _up.copy();
  }

  var onUpChange = [];
  /**
   * Adds a callback that will be invoked every time the up setting changes.
   * The callback passed a param MUST BE A FUNCTION that accept five parameter:
   * - the old up of the camera (a Triple)
   * - the three deltas (deltaX, deltaY, deltaZ) that represents the difference of the two up
   * - the current up of the camera (a Triple)
   * 
   * So, the signature of a callback must be: 'function(oldUp, deltaX, deltaY, deltaZ, currUp)'
   * @param {function} callback the function to be invoked when up setting changes
   * @returns A successful result if the callback has been registered or a failure otherwise (for example is
   * callback is not a function)
   */
  this.addOnUpChange = (callback) => {
    if(typeof(callback) !== 'function') {
      return Result.failureStr("addOnUpChange() | callback is not a function");
    }
    
    onUpChange.push(callback);
    return Result.success(true);
  }

  /**
   * Deregister the given callback for the up setting changes
   * @param {function} callback the callback to be de-registered
   */
  this.removeOnUpChange = (callback) => {
    onUpChange = onUpChange.filter((c) => c !== callback);
  }

  var notifyUpChange = (oldUp, deltaX, deltaY, deltaZ, currentUp) => {
    onUpChange.forEach((c) => c(oldUp, deltaX, deltaY, deltaZ, currentUp));
  }


  /* TARGET ********************************************************* */

  var _target = new Position(0, 0, 0);
  /**
   * Returns the target position of the camera. All the changes over the returning value are
   * NOT propagated to the internal target. To change the coordinates of the target
   * use the 'setTarget' method
   * @returns the target position of the camera
   */
  this.target = () => {
    return _target.copy();
  }

  var onTargetChange = [];
  /**
   * Adds a callback that will be invoked every time the target position changes.
   * The callback passed a param MUST BE A FUNCTION that accept five parameter:
   * - the old position of the target (a Position)
   * - the three deltas (deltaX, deltaY, deltaZ) that represents the difference from the two position
   * - the current position of the target (a Position)
   * 
   * So, the signature of a callback must be: 'function(oldPos, deltaX, deltaY, deltaZ, currPos)'
   * @param {function} callback the function to be invoked when target position changes
   * @returns A successful result if the callback has been registered or a failure otherwise (for example is
   * callback is not a function)
   */
  this.addTargetChange = (callback) => {
    if(!typeof(callback) === 'function') {
      return Result.failureStr("addOnTargetChange() | callback is not a function");
    }
    
    onTargetChange.push(callback);
    return Result.success(true);
  }

  /**
   * Deregister the given callback for the target position changes
   * @param {function} callback the callback to be de-registered
   */
  this.removeOnTargetChange = (callback) => {
    onTargetChange = onTargetChange.filter((c) => c !== callback);
  }

  var notifyTargetChange = (oldPos, deltaX, deltaY, deltaZ, currentPos) => {
    onTargetChange.forEach((c) => c(oldPos, deltaX, deltaY, deltaZ, currentPos));
  }



  /* FOV ************************************************************ */

  var _fov = degToRad(60);
  /**
   * Returns the fov of the camera. All the changes over the returning value are
   * NOT propagated to the internal fov. To change the coordinates of the target
   * use the 'setFov' method
   * @returns the fov of the camera
   */
  this.fov = () => {
    return _fov;
  }

  var onFovChange = [];
  /**
   * Adds a callback that will be invoked every time the fov changes.
   * The callback passed a param MUST BE A FUNCTION that accept three parameter:
   * - the old fov of the camera (in radiants)
   * - the difference of the two fov
   * - the current position of the camera (in radiants)
   * 
   * So, the signature of a callback must be: 'function(oldFov, diff, currFov)'
   * @param {function} callback the function to be invoked when fov changes
   * @returns A successful result if the callback has been registered or a failure otherwise (for example is
   * callback is not a function)
   */
  this.addOnFovChange = (callback) => {
    if(!typeof(callback) === 'function') {
      return Result.failureStr("addOnFovChange() | callback is not a function");
    }
    
    onFovChange.push(callback);
    return Result.success(true);
  }

  /**
   * Deregister the given callback for the fov changes
   * @param {function} callback the callback to be de-registered
   */
  this.removeOnFovChange = (callback) => {
    onFovChange = onFovChange.filter((c) => c !== callback);
  }

  var notifyFovChange = (oldFov, diff, currFov) => {
    onFovChange.forEach((c) => c(oldFov, diff, currFov));
  }


  /* TARGET OBJECT ************************************************** */

  var _targetObject = undefined;
  this.followTargetObject = false;
   var onTranslationCallback = (sp, deltaX, deltaY, deltaZ, ep) => {
    if(this.followTargetObject) {
      this.translateCameraPosition(deltaX, deltaY, deltaZ);
    }
  };

  /**
   * Returns the target object of the camera or 'undefined' if no target object
   * is set
   * @returns the target object of the camera or 'undefined' if no target object
   * is set
   */
  this.targetObject = () => {
    return _targetObject;
  }

  this.setTargetObject = (meshObject, followTargetObject = true) => {
    _targetObject?.removeOnTranslation(onTranslationCallback);

    _targetObject = meshObject;
    _targetObject.addOnTranslation(onTranslationCallback);
    this.followTargetObject = followTargetObject
  }

  /* CALLBACK ******************************************************* */


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
    let startPos = _cameraPosition.copy();
    _cameraPosition.translate(deltaX, deltaY, deltaZ);
    let endPos = _cameraPosition.copy();

    onCameraPositionChange.forEach((f) => f(startPos, endPos));
  }



}

/* ----------- Drawer --------------------------------------------------------- */
function GlDrawer(meshMgr) {
  this.gl = meshMgr.gl;
  this.meshMgr = meshMgr;
  this.programInfo = meshMgr.programInfo,
  this.fov = degToRad(60);
  this.zNear = 0.1;
  this.zFar = 200;
  this.cameraPosition = new Position(1, 1, 1);
  this.target = [0, 0, 0];
  this.up = [0, 0, 1];
  this.sharedUniforms = {
    u_ambientLight : [0.2,0.2,0.2],
    u_colorLight : [1.0,1.0,1.0],
    u_view : m4.identity(),
    u_projection : m4.identity()
  }

  this.updateViewMatrix = function() {
    var cameraMatrix = m4.lookAt(this.cameraPosition.toArray(), this.target, this.up);
    this.sharedUniforms.u_view = m4.inverse(cameraMatrix);
  }

  this.updateProjectionMatrix = function() {
    this.sharedUniforms.u_projection = m4.perspective(this.fov, gl.canvas.clientWidth / gl.canvas.clientHeight, this.zNear, this.zFar);
  }

  this.startDrawing = function() {
    //webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    //this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.updateProjectionMatrix();
    this.updateViewMatrix();

    this.gl.useProgram(this.programInfo.program);
    webglUtils.setUniforms(this.programInfo, this.sharedUniforms);
  }

  this.drawScene = function() {
    this.startDrawing();
    var objs = this.meshMgr.getAll();
    for(const obj of objs) {
      obj.draw(this.gl, this.programInfo, false);
    }
  }
}

/* ----------- Singleton ------------------------------------------------------ */
var MESH_MANAGER;
var GL_DRAWER;

function createMeshManager(gl, programInfo) {
  return new MeshManager(gl, programInfo);
}

function createGlDrawer(meshMgr) {
  return new GlDrawer(meshMgr);
}

/*
this.limitPositions = function(bool){
  this.limitEnabled = bool
}

this.setLimits = function(LimX, LimY, LimZ){
  this.XLim = LimX;
  this.YLim = LimY;
  this.ZLim = LimZ;
}

this.isInLimit = function(deltaTrasl, limit){
  if(Math.abs(deltaTrasl) > Math.abs(limit))
    return false;
  return true;
}

this.translateWithLimits = function(xTranslation, yTranslation, zTranslation) {
  if(isInLimit(X+xTranslation, XLim))
    this.translateX(xTranslation);
  if(isInLimit(this.y+yTranslation, XLim))
    this.translateX(yTranslation);
  if(isInLimit(this.z+zTranslation, XLim))
    this.translateX(zTranslation);
  return this;
}

this.translate = function(xTranslation, yTranslation, zTranslation) {
  if(limitPositions == true)
    this.translateWithLimits(xTranslation, yTranslation, zTranslation);
  else
    this.translateLimitless(xTranslation, yTranslation, zTranslation);
}*/
