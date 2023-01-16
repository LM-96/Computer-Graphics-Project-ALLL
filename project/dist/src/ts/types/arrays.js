"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrays = void 0;
const illegal_argument_exception_1 = require("./exceptions/illegal-argument-exception");
class Arrays {
    /**
     * Copies the `src` array into `dst`.
     * This method will consider all different cases about the lenghts of the arrays:
     *
     * - if `src.length == dst.length` the source array will be entirely copied into the destination
     * with no problems so, at the end, `dst` will be an exact clone of `src`
     *
     * - if `src.length > dst.length` then `dst` will be a *truncated* copy of `src` (the copy will be stopped
     * when `dst` has no more index available)
     *
     * - if `src.length < dst.length` then `src` will be entirely copied to `dst` and the exceeded indexes will
     * be not touched by this method
     * @param {Array<T>} src the source array
     * @param {Array<T>} dst the destination array
     */
    static copy(src, dst) {
        for (let i = 0; i < Math.min(src.length, dst.length); i++) {
            dst[i] = src[i];
        }
    }
    /**
     * Copies the `src` array of array to `dst` (2-dimensional array)
     * The copy will follow the mechanism explained in the `Arrays.copy()` method that copy
     * *until is possible*
     * @param {Array<Array<T>>} src the source array
     * @param {Array<Array<T>>} dst the destination array
     */
    static copy2(src, dst) {
        let srci;
        let dsti;
        for (let i = 0; i < Math.min(src.length, dst.length); i++) {
            srci = src[i];
            dsti = dst[i];
            for (let j = 0; j < Math.min(srci.length, dsti.length); j++) {
                dsti[j] = srci[j];
            }
        }
    }
    static clone(original, newLength) {
        if (newLength == undefined) {
            newLength = original.length;
        }
        else {
            if (newLength < 0) {
                throw new illegal_argument_exception_1.IllegalArgumentException("newLength can not be negative");
            }
        }
        let res = new Array(newLength);
        for (let i = 0; i < newLength; i++) {
            res[i] = original[i];
        }
        return res;
    }
    static clone2(original, newHigh, newLength) {
        let res;
        let originali;
        let resi;
        if (newHigh == undefined && newLength == undefined) {
            res = new Array(original.length);
            for (let i = 0; i < original.length; i++) {
                originali = original[i];
                resi = new Array(originali.length);
                for (let j = 0; j < resi.length; j++) {
                    resi[j] = originali[j];
                }
                res[i] = resi;
            }
        }
        else if (newHigh != undefined && newLength == undefined) {
            if (newHigh < 0) {
                throw new illegal_argument_exception_1.IllegalArgumentException("newHigh can not be negative");
            }
            res = new Array(newHigh);
            for (let i = 0; i < Math.min(newHigh, original.length); i++) {
                originali = original[i];
                resi = new Array();
                for (let j = 0; j < originali.length; j++) {
                    resi[j] = originali[j];
                }
                res[i] = resi;
            }
        }
        else if (newHigh == undefined && newLength != undefined) {
            if (newLength < 0) {
                throw new illegal_argument_exception_1.IllegalArgumentException("newLength can not be negative");
            }
            res = new Array(original.length);
            for (let i = 0; i < original.length; i++) {
                originali = original[i];
                resi = new Array();
                for (let j = 0; j < Math.min(originali.length, newLength); j++) {
                    resi[j] = originali[j];
                }
                res[i] = resi;
            }
        }
        else if (newHigh != undefined && newLength != undefined) {
            if (newHigh < 0) {
                throw new illegal_argument_exception_1.IllegalArgumentException("newHigh can not be negative");
            }
            if (newLength < 0) {
                throw new illegal_argument_exception_1.IllegalArgumentException("newLength can not be negative");
            }
            res = new Array(newHigh);
            for (let i = 0; i < Math.min(original.length, newHigh); i++) {
                originali = original[i];
                resi = new Array();
                for (let j = 0; j < Math.min(originali.length, newLength); j++) {
                    resi[j] = originali[j];
                }
                res[i] = resi;
            }
        }
        return res;
    }
    /**
     * Reshape an array.
     * The behaviour of this method depends on the `newLength` parameter:
     * - if the size of the array is equals to `newLength`, this method will perform nothing
     * - if the `newLength` of the array is greater than the current size, then the array will be padded with `null`
     * element until the desired length is reached (or with the element specified using the `fill` parameter)
     * - if the `newLength` of the array is less than the current size, then the array will be truncated to reach
     * the desired length
     * @param {Array<T>} array the array to be reshaped
     * @param {number} newLength the new length of the array
     * @param {T|null} fill the element to use to pad the array (`null` as default)
     * @return {Array<T>} An array containing the deleted elements.
     * If only one element is removed, an array of one element is returned.
     * If no elements are removed, an empty array is returned.
     */
    static reshape(array, newLength, fill = null) {
        if (newLength != array.length) {
            if (newLength < array.length) {
                return array.splice(newLength - 1, array.length);
            }
            else {
                array.push(fill);
                return new Array();
            }
        }
    }
    static reshape2(array, newHigh, newWeight) {
        let res;
        if (newHigh != array.length) {
            if (newHigh < array.length) {
                res = array.splice(newHigh - 1, array.length);
            }
            else {
                array.push(new Array(0));
                res = new Array(0);
            }
        }
        if (newWeight != undefined) {
            for (let r = 0; r < newHigh; r++) {
                res.splice(0, 0, this.reshape(array[r], newWeight));
            }
        }
        return res;
    }
    /**
     * Searches for the given element into the given array and removes it
     * @param {Array<T>} array the array
     * @param {T} obj the object to remove
     * @return {T|null} the removed object or `null` if the object is not present into the array
     */
    static removeFrom(array, obj) {
        let idx = array.indexOf(obj);
        if (idx == -1)
            return null;
        return array.splice(idx, 1)[0];
    }
}
exports.Arrays = Arrays;
//# sourceMappingURL=arrays.js.map