import {numberTrio, NumberTrio} from "../types/numbers/number-trio";
import {SharedUniforms} from "../webgl/webgl-wrappers";
import {Point3D} from "../geometry/point/point-3d";
import {mutablePoint3D, point3D} from "../geometry/point/point-factory";
import {Angle, AngleUnit, radians} from "../geometry/angle/angle";

export class SlManager {

    #lightDirection: NumberTrio = numberTrio(0, 0, 0)
    #sharedUniforms: SharedUniforms
    #lightPosition: Point3D = mutablePoint3D(0, 0, 100)
    #lightTarget: Point3D = mutablePoint3D(0, 0, 0)
    #lightUp: NumberTrio = numberTrio(0, 1, 0)
    #lightFov: Angle = radians(0)
    #spotlight: boolean = false
    #projWidth: number = 10
    #projHeight: number = 10
    #shadows: boolean = false

    constructor(sharedUniforms: SharedUniforms) {
        this.#sharedUniforms = sharedUniforms
    }

    #updateSharedUniforms() {
        this.#sharedUniforms.u_lightDirection = this.#lightDirection.toArray()
    }

    calculateLightWorldMatrix(): number[] {
        return M4.lookAt(
            [this.#lightPosition.getX(), this.#lightPosition.getY(), this.#lightPosition.getZ()],
            [this.#lightTarget.getX(), this.#lightTarget.getY(), this.#lightTarget.getZ()],
            [this.#lightUp.getFirst(), this.#lightUp.getSecond(), this.#lightUp.getThird()],
        );
    }

    calculateLightProjectionMatrix(): number[] {
        if(this.#spotlight) {
            return M4.perspective(this.#lightFov.getValueIn(AngleUnit.RAD),
                this.#projWidth / this.#projHeight, 1, 15)
        } else {
            return M4.orthographic(-this.#projWidth / 2, this.#projWidth / 2,
                -this.#projHeight / 2, this.#projHeight / 2, 1, 15)
        }
    }

    getLightDirection(): NumberTrio {
        return this.#lightDirection.clone()
    }

    getLightPosition(): Point3D {
        return this.#lightPosition.clone()
    }

    getLightTarget(): Point3D {
        return this.#lightTarget.clone()
    }

    getLightUp(): NumberTrio {
        return this.#lightUp.clone()
    }

    getFov(): Angle {
        return this.#lightFov.clone()
    }

    isSpotlight(): boolean {
        return this.#spotlight
    }

    getProjWidth(): number {
        return this.#projWidth
    }

    getProjHeight(): number {
        return this.#projHeight
    }

    setLightDirection(x: number, y: number, z: number): void
    setLightDirection(value: NumberTrio): void
    setLightDirection(x: number|NumberTrio, y?: number, z?: number): void {
        if(typeof x === "number") {
            this.#lightDirection.setAll(x, y, z)
        } else {
            this.#lightDirection.setAll(x.getFirst(), x.getSecond(), x.getThird())
        }
    }

    setLightPosition(x: number, y: number, z: number): void
    setLightPosition(value: Point3D): void
    setLightPosition(x: number|Point3D, y?: number, z?: number): void {
        if(typeof x === "number") {
            this.#lightPosition.set(x, y, z)
        } else {
            this.#lightPosition.set(x.getX(), x.getY(), x.getZ())
        }
        this.#updateSharedUniforms()
    }

    setLightTarget(x: number, y: number, z: number): void
    setLightTarget(value: Point3D): void
    setLightTarget(x: number|Point3D, y?: number, z?: number): void {
        if(typeof x === "number") {
            this.#lightTarget.set(x, y, z)
        } else {
            this.#lightTarget.set(x.getX(), x.getY(), x.getZ())
        }
    }

    setLightUp(x: number, y: number, z: number): void
    setLightUp(value: NumberTrio): void
    setLightUp(x: number|NumberTrio, y?: number, z?: number): void {
        if(typeof x === "number") {
            this.#lightUp.setAll(x, y, z)
        } else {
            this.#lightUp.setAll(x.getFirst(), x.getSecond(), x.getThird())
        }
    }

    setFov(value: Angle): void {
        this.#lightFov = value
    }

    setSpotlight(value: boolean): void {
        this.#spotlight = value
    }

    setProjWidth(value: number): void {
        this.#projWidth = value
    }

    setProjHeight(value: number): void {
        this.#projHeight = value
    }

    setShadows(value: boolean): void {
        this.#shadows = value
    }

    getShadows(): boolean {
        return this.#shadows
    }


}