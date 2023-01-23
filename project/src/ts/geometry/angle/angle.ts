/**
 * Indicates a measurement unit for angles
 */
import {Cloneable} from "../../types/cloneable";
import {Equatable} from "../../types/equatable";

export enum AngleUnit {
    RAD = "rad", DEG = "deg"
}

export class Angle implements Cloneable<Angle>, Equatable {
    #value: number
    #unit: AngleUnit

    constructor(value: number, unit: AngleUnit) {
        this.#value = value
        this.#unit = unit
    }

    /**
     * Returns the value of this angle
     * @return {number} the value of this angle
     */
    getValue(): number {
        return this.#value
    }

    /**
     * Returns the value of this angle in the desired unit
     * @param {AngleUnit} unit the desired unit of the value of this angle
     * @return {number} the value of this angle
     */
    getValueIn(unit: AngleUnit): number {
        if(this.#unit == unit) return this.#value
        return this.cloneAndConvert(unit).getValue()
    }

    /**
     * Sets the value of this angle preserving the unit
     * @param {number} value the value of the angle
     */
    setValue(value: number) {
        this.#value = value
    }

    /**
     * Gets the unit of this angle
     * @return the unit of this angle
     */
    getUnit(): AngleUnit {
        return this.#unit
    }

    /**
     * Converts this angle to the desired unit.
     * **The conversion is internal** so this object will be updated
     * with the desired unit and the value will be automatically converted.
     *
     * If it's needed a copy of this angle with the modified unit, please consider
     * using `copyAndConvert()` instead.
     * This method returns this angle
     * @param {AngleUnit} unit the desired target unit
     * @return {Angle} this angle
     */
    convert(unit: AngleUnit): Angle {
        if(this.#unit != unit) {
            if(this.#unit == AngleUnit.RAD && unit == AngleUnit.DEG) {
                this.#value = rad2Deg(this.#value)
            }
            else if(this.#unit == AngleUnit.DEG && unit == AngleUnit.RAD) {
                this.#value = deg2Rad(this.#value)
            }

            this.#unit = unit
        }

        return this
    }

    clone(): Angle {
        return new Angle(this.#value, this.#unit)
    }

    /**
     * Clones this angle and convert it to the desired unit
     * @param {AngleUnit} unit the desired unit of the angle
     * @return {Angle} the clone converted to the desired unit
     */
    cloneAndConvert(unit: AngleUnit): Angle {
        return this.clone().convert(unit)
    }

    /**
     * Aligns this angle to unit of measurement of the other angle.
     * This method basically converts this angle to unit of measure of the given one and
     * returns this angle after the conversion
     * @param {Angle} other the other angle
     * @return {Angle} this angle after the alignment
     */
    alignWith(other: Angle): Angle {
        return this.convert(other.getUnit())
    }

    /**
     * Checks if the `other` object is an `Angle` *equals* to this.
     * The equality is checked considering also the `unit, so
     * @param other
     */
    equals(other: any): boolean {
        if(other != undefined) {
            if(other instanceof Angle) {
                if(this.#unit !== other.#unit) {
                    other = other.cloneAndConvert(this.#unit)
                    return other.#unit == this.#unit && other.#value == this.#value
                }
            }
        }

        return false
    }

    toString(): string {
        return this.#value + " " + this.#unit
    }

    /**
     * Adds the given angle to this.
     * **This method modify the internal value of this angle** by adding the value of the
     * angle given as parameter, automatically converted into the same unit of this.
     * This method returns this angle
     * @param {Angle} angle the angle to be added
     * @return {Angle} **this** angle after the addition
     */
    add(angle: Angle): Angle
    /**
     * Adds the given value to this angle considering it in the same unit of measurements
     * of this angle.<br> **This method modify the internal value of this angle**, putting the result
     * of the operation into the `value` of this angle.
     * This method returns this angle
     * @param {number} value the value to add to this angle intended of the same unit of this angle
     * @return {Angle} **this** angle after the addition
     */
    add(value: number): Angle
    /**
     * Adds the given value to this angle considering it in the given unit of measurements.
     * If the unit is different from the one in this angle, the given `value` will automatically
     * be converted before adding it to this angle.<br>
     * **This method modify the internal value of this angle**, putting the result
     * of the operation into the `value` of this angle.
     * @param {number} value the value to be added to this angle
     * @param {AngleUnit} unit the unit of measurement of the value
     * @return {Angle} **this** angle after the addition
     */
    add(value: number, unit: AngleUnit): Angle
    add(value: Angle|number, unit?:AngleUnit): Angle {
        if(typeof value == "number") {
            if (unit == undefined) {
                unit = this.#unit
            }
            value = new Angle(value, unit).convert(this.#unit)
        } else {
            value = value.cloneAndConvert(this.#unit)
        }

        this.#value += value.#value
        return this
    }

    /**
     * Subtracts the given angle to this.
     * **This method modify the internal value of this angle** by subtracting the value of the
     * angle given as parameter, automatically converted into the same unit of this.
     * This method returns this angle
     * @param {Angle} angle the angle to be subtracted
     * @return {Angle} **this** angle after the subtraction
     */
    subtract(angle: Angle): Angle
    /**
     * Subtracts the given value to this angle considering it in the same unit of measurements
     * of this angle.<br>
     * **This method modify the internal value of this angle**, putting the result
     * of the operation into the `value` of this angle.
     * This method returns this angle
     * @param {number} value the value to subtract from this angle intended of the same unit of this angle
     * @return {Angle} **this** angle after the subtraction
     */
    subtract(value: number): Angle
    /**
     * Subtracts the given value to this angle considering it in the given unit of measurements.
     * If the unit is different from the one in this angle, the given `value` will automatically
     * be converted before adding it to this angle.<br>
     * **This method modify the internal value of this angle**, putting the result
     * of the operation into the `value` of this angle.
     * @param {number} value the value to be subtracted to this angle
     * @param {AngleUnit} unit the unit of measurement of the value
     * @return {Angle} **this** angle after the subtraction
     */
    subtract(value: number, unit: AngleUnit): Angle
    subtract(value: Angle|number, unit?:AngleUnit): Angle {
        if(typeof value == "number") {
            if (unit == undefined) {
                unit = this.#unit
            }
            value = new Angle(value, unit).convert(this.#unit)
        } else {
            value = value.cloneAndConvert(this.#unit)
        }

        this.#value -= value.#value
        return this
    }

    /**
     * Multiply the internal value of this angle by the given `factor`.<br>
     * **This method modify the internal value of this angle**, putting the result
     * of the operation into the `value` of this angle.
     * @param {number} factor the factor to be used for the multiplication
     * @return {Angle} this angle after the multiplication
     */
    multiply(factor: number): Angle {
        this.#value *= factor
        return this
    }

    /**
     * Divide the internal value of this angle by the given `factor`.<br>
     * **This method modify the internal value of this angle**, putting the result
     * of the operation into the `value` of this angle.
     * @param {number} factor the factor to be used for the division
     * @return {Angle} this angle after the division
     */
    divide(factor: number): Angle {
        this.#value *= factor
        return this
    }
}

/**
 * Creates and return a new angle given a value and a unit.
 * The default unit is *radians*
 * @param {number} value the value of the angle
 * @param {AngleUnit} unit the unit of measurement of the angle (*radians* ad default)
 * @return {Angle} the new angle
 */
export function angle(value: number, unit: AngleUnit = AngleUnit.RAD): Angle {
    return new Angle(value, unit)
}

/**
 * Converts an angle in radians to degree
 * @param {number} angle the value of the angle in radians
 * @return {number} the value of the angle in degree
 */
export function rad2Deg(angle: number): number {
    return (180*angle)/Math.PI
}

/**
 * Converts an angle in degree to radians
 * @param {number} angle the value of the angle in degree
 * @return {number} the value of the angle in radians
 */
export function deg2Rad(angle: number): number {
    return (Math.PI*angle)/180
}

/**
 * Creates and returns a new angle in *radians* with the given value
 * @param {number} value the value of the angle in *radians*
 * @return {Angle} the new angle in radians
 */
export function radians(value: number): Angle {
    return angle(value, AngleUnit.RAD)
}

/**
 * Creates and returns a new angle in *degree* with the given value
 * @param {number} value the value of the angle in *degree*
 * @return {Angle} the new angle in radians
 */
export function degree(value: number): Angle {
    return angle(value, AngleUnit.DEG)
}