"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNotNullCoordinates = exports.samePoints = exports.isPoint = void 0;
/**
 * Returns `true` if the given `object` is a **point**
 * @param {any} object
 * @return {boolean} `true` if the given `object` is a **point**, `false` otherwise
 */
function isPoint(object) {
    return 'getX' in object && 'getY' in object && 'getZ' in object;
}
exports.isPoint = isPoint;
/**
 * Returns `true` if the two objects are the same point.
 * Notice that **this function return `false` if one or both of the arguments
 * are `null` or `undefined`**
 * @param {any} point1 the first object
 * @param {any} point2 the second object
 * @return {boolean} `true` if the two objects are the same point, `false` otherwise
 */
function samePoints(point1, point2) {
    if (point1 != null && point2 != null) {
        if (isPoint(point1) && isPoint(point2)) {
            return point1.getX() === point2.getX() &&
                point1.getY() === point2.getY() &&
                point1.getZ() === point2.getZ();
        }
    }
    return false;
}
exports.samePoints = samePoints;
/**
 * Checks if all the given coordinates are not `null`.
 * If `throwError` is enabled, this function will immediately throw an error
 * when it will find a `null` value for a coordinate
 * @param {number} x the `x` coordinate
 * @param {number} y the `y` coordinate
 * @param {number} z the `z` coordinate
 * @param throwError the `flag` that if enabled will make this function able to throw an exception
 * @return {boolean} `true` if all the coordinates are not null, `false` otherwise
 * @throws {Error} if `throwError` is `true` and a coordinate is `null`
 */
function checkNotNullCoordinates(x, y, z, throwError = false) {
    if (x == null) {
        if (throwError) {
            throw Error("x coordinate can not be null");
        }
        return false;
    }
    if (y == null) {
        if (throwError) {
            throw Error("y coordinate can not be null");
        }
        return false;
    }
    if (z == null) {
        if (throwError) {
            throw Error("z coordinate can not be null");
        }
        return false;
    }
    return true;
}
exports.checkNotNullCoordinates = checkNotNullCoordinates;
//# sourceMappingURL=point-3d.js.map