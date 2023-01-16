import {IllegalArgumentException} from "./exceptions/illegal-argument-exception";

export class Arrays {

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
    static copy<T>(src: Array<T>, dst: Array<T>) {
        for(let i = 0; i < Math.min(src.length, dst.length); i++) {
            dst[i] = src[i]
        }
    }

    /**
     * Copies the `src` array of array to `dst` (2-dimensional array)
     * The copy will follow the mechanism explained in the `Arrays.copy()` method that copy
     * *until is possible*
     * @param {Array<Array<T>>} src the source array
     * @param {Array<Array<T>>} dst the destination array
     */
    static copy2<T>(src: Array<Array<T>>, dst: Array<Array<T>>) {
        let srci: Array<T>
        let dsti: Array<T>
        for(let i = 0; i < Math.min(src.length, dst.length); i++) {
            srci = src[i]
            dsti = dst[i]
            for(let j = 0; j < Math.min(srci.length, dsti.length); j++) {
                dsti[j] = srci[j]
            }
        }
    }

    /**
     * Returns a clone of the original array
     * @param {Array<T>} original the array to be copied
     * @return the copy of the array
     */
    static clone<T>(original: Array<T>): Array<T>
    /**
     * Clones the specified array, truncating or padding with nulls (if necessary) so the copy has the specified
     * length. For all indices that are valid in both the original array and the copy, the two arrays will contain
     * identical values.
     * For any indices that are valid in the copy but not the original,
     * the copy will contain `null`. Such indices will exist if and only if the specified length is greater than
     * that of the original array. The resulting array is of exactly the same class as the original array.
     * @param {Array<T>} original the array to be copied
     * @param {number} newLength  the length of the copy to be returned
     * @return the copy of the original array
     */
    static clone<T>(original: Array<T>, newLength: number): Array<T>
    static clone<T>(original: Array<T>, newLength?: number): Array<T> {
        if(newLength == undefined) {
            newLength = original.length
        } else {
            if(newLength < 0) {
                throw new IllegalArgumentException("newLength can not be negative")
            }
        }
        let res: Array<T> = new Array<T>(newLength)
        for(let i = 0; i < newLength; i++) {
            res[i] = original[i]
        }

        return res
    }

    /**
     * Returns a clone of a 2-dimensional array
     * @param {Array<Array<T>>} original the source array
     * @return {Array<Array<T>>} a clone of the source array
     */
    static clone2<T>(original: Array<Array<T>>): Array<Array<T>>
    /**
     * Clones the specified bi-dimensional array, truncating or padding with null (if necessary)
     * so the copy has the specified high.
     * For all indices that are valid in both the original array and the copy, the two arrays will contain
     * identical values.
     * For any indices that are valid in the copy but not the original,
     * the copy will contain `null`. Such indices will exist if and only if the specified length is greater than
     * that of the original array. The resulting array is of exactly the same class as the original array.
     * @param {Array<T>} original the array to be copied
     * @param {number} newHigh the new high of the array
     * @return the copy of the original array
     */
    static clone2<T>(original: Array<Array<T>>, newHigh: number): Array<Array<T>>
    /**
     * Clones the specified bi-dimensional array, truncating or padding with null (if necessary)
     * so the copy has the specified high and length.
     * For all indices that are valid in both the original array and the copy, the two arrays will contain
     * identical values.
     * For any indices that are valid in the copy but not the original,
     * the copy will contain `null`. Such indices will exist if and only if the specified length is greater than
     * that of the original array. The resulting array is of exactly the same class as the original array.
     * @param {Array<T>} original the array to be copied
     * @param {number} newHigh the new high of the array
     * @param {number} newLength the new length of the array
     * @return the copy of the original array
     */
    static clone2<T>(original: Array<Array<T>>, newHigh: number, newLength: number): Array<Array<T>>
    static clone2<T>(original: Array<Array<T>>, newHigh?: number, newLength?: number): Array<Array<T>> {
        let res: Array<Array<T>>
        let originali: Array<T>
        let resi: Array<T>

        if(newHigh == undefined && newLength == undefined) {
            res = new Array<Array<T>>(original.length)
            for(let i = 0; i < original.length; i++) {
                originali = original[i]
                resi = new Array<T>(originali.length)
                for(let j = 0; j < resi.length; j++) {
                    resi[j] = originali[j]
                }
                res[i] = resi
            }
        }
        else if (newHigh != undefined && newLength == undefined) {
            if(newHigh < 0) {
                throw new IllegalArgumentException("newHigh can not be negative")
            }
            res = new Array<Array<T>>(newHigh)
            for(let i = 0; i < Math.min(newHigh, original.length); i++) {
                originali = original[i]
                resi = new Array<T>()
                for(let j = 0; j < originali.length; j++) {
                    resi[j] = originali[j]
                }
                res[i] = resi
            }
        }

        else if (newHigh == undefined && newLength != undefined) {
            if(newLength < 0) {
                throw new IllegalArgumentException("newLength can not be negative")
            }
            res = new Array<Array<T>>(original.length)
            for(let i = 0; i < original.length; i++) {
                originali = original[i]
                resi = new Array<T>()
                for(let j = 0; j < Math.min(originali.length, newLength); j++) {
                    resi[j] = originali[j]
                }
                res[i] = resi
            }
        }

        else if (newHigh != undefined && newLength != undefined) {
            if(newHigh < 0) {
                throw new IllegalArgumentException("newHigh can not be negative")
            }
            if(newLength < 0) {
                throw new IllegalArgumentException("newLength can not be negative")
            }
            res = new Array<Array<T>>(newHigh)

            for(let i = 0; i < Math.min(original.length, newHigh); i++) {
                originali = original[i]
                resi = new Array<T>()
                for(let j = 0; j < Math.min(originali.length, newLength); j++) {
                    resi[j] = originali[j]
                }
                res[i] = resi
            }
        }

        return res
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
    static reshape<T>(array: Array<T>, newLength: number, fill: T|null = null): Array<T> {
        if(newLength != array.length) {
            if(newLength < array.length) {
                return array.splice(newLength - 1, array.length)
            } else {
                array.push(fill)
                return new Array<T>()
            }
        }
    }

    /**
     * Vertically reshape a bi-dimensional array following the same behaviour of `reshape()` for one dimensional array.
     * The weight of each *vertical* array will be not touched and the new arrays that will be vertically
     * added will have a length of 0
     * @param {Array<Array<T>>} array the bi-dimensional array to be reshaped in high
     * @param {number} newHigh the new high of the array
     */
    static reshape2<T>(array: Array<Array<T>>, newHigh: number): Array<Array<T>>
    /**
     * Reshape a bi-dimensional array following the same behaviour of `reshape()` for one dimensional array.
     * This method will reshape the array both vertically and horizontally.
     * The weight of each *vertical* array will be truncated or padded wil `null` elements and if some arrays are
     * vertically added, they will be filled with `null` elements to reach the desired weight
     * @param {Array<Array<T>>} array the bi-dimensional array to be reshaped
     * @param {number} newHigh the new high of the array
     * @param {number} newWeight the new weight of the array
     */
    static reshape2<T>(array: Array<Array<T>>, newHigh: number, newWeight: number): Array<Array<T>>
    static reshape2<T>(array: Array<Array<T>>, newHigh: number, newWeight?: number): Array<Array<T>> {
        let res: Array<Array<T>>
        if(newHigh != array.length) {
            if(newHigh < array.length) {
                res = array.splice(newHigh - 1, array.length)
            } else {
                array.push(new Array<T>(0))
                res = new Array<Array<T>>(0)
            }
        }
        if(newWeight != undefined) {
            for(let r = 0; r < newHigh; r++) {
                res.splice(0, 0, this.reshape(array[r], newWeight))
            }
        }
        return res
    }

    /**
     * Searches for the given element into the given array and removes it
     * @param {Array<T>} array the array
     * @param {T} obj the object to remove
     * @return {T|null} the removed object or `null` if the object is not present into the array
     */
    static removeFrom<T>(array: Array<T>, obj: T): T|null {
        let idx: number = array.indexOf(obj)
        if(idx == -1)
            return null

        return array.splice(idx, 1)[0]
    }

}