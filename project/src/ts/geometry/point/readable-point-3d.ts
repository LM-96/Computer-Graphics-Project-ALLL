/**
 * A point in a 3D reference system that is only readable
 */
import {Axis} from "../axis";

export interface ReadablePoint3D {

    /**
     * Returns the value of the specified coordinate of the point
     * @param {Axis} axis the axis of the coordinate
     * @return {number} the value of the specified coordinate of the point
     */
    getCoordinate(axis: Axis): number;

    getX(): number;
    getY(): number;
    getZ(): number;

    equals(other: any): boolean;
    toString(): string;
}