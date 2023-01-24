import {numberTrio, NumberTrio} from "../types/numbers/number-trio";
import {SharedUniforms} from "../webgl/webgl-wrappers";

export class SlManager {

    #lightDirection: NumberTrio = numberTrio(0, 0, 0)
    #sharedUniforms: SharedUniforms

    constructor(sharedUniforms: SharedUniforms) {
        this.#sharedUniforms = sharedUniforms
    }

    #updateSharedUniforms() {
        this.#sharedUniforms.u_lightDirection = this.#lightDirection.toArray()
    }

    getLightDirection(): NumberTrio {
        return this.#lightDirection.clone()
    }

    setLightDirection(x: number, y: number, z: number): void
    setLightDirection(value: NumberTrio): void
    setLightDirection(x: number|NumberTrio, y?: number, z?: number): void {
        if(typeof x === "number") {
            this.#lightDirection.setAll(x, y, z)
        } else {
            this.#lightDirection.setAll(x.getFirst(), x.getSecond(), x.getThird())
        }
        this.#updateSharedUniforms()
    }


}