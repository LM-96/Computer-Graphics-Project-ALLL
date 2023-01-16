import {Point3D} from "../geometry/point/point-3d";
import {origin} from "../geometry/point/point-factory"
import {numberCouple, NumberCouple} from "../types/numbers/number-couple";
import {numberTrio, NumberTrio} from "../types/numbers/number-trio";
import {LimitsChecker} from "../geometry/limits/limits-checker";
import {LimitsCheckers} from "../geometry/limits/limits-checkers";
import {NotifiableMeshObjCallbackContainer} from "./mesh-obj-callbacks";
import {ArrayMeshObjectCallbackContainer} from "./array-mesh-object-callback";

class MeshObj {

    /**
     * The name that identifies this mesh object
     */
    #name: string

    /**
     * The "mesh" data of this object.
     * It can be obtained, for example, loading ad '.obj' file using the 'loadMesh' function
     * provided by 'load_mesh.js'.
     * This object must have this interface:
     * ```
     * data = {
     *  mesh: ...,
     *  attributes: ...,
     *  numOfVertices: ...,
     *  uniforms: ...
     * }
     * ```
     */
    #data: object|null = null

    /**
     * The position of this object considering the absolute reference system.
     * By default, it is set to the origin [position = (0, 0, 0)]
     */
    #position: Point3D = origin(false, false)

    /**
     * The rotation of this object considering the absolute reference system.
     * By default, the object is unrotated [rotation = (0, 0)]
     */
    #rotation: NumberCouple = numberCouple(0, 0)

    /**
     * The scale of this object considering the absolute reference system.
     * By default, the object is unscaled [scale = (1, 1, 1)]
     */
    #scale: NumberTrio = numberTrio(1, 1, 1)

    /**
     * The limits that constraint the movement of this object.
     * By default, the object has no limit [limits.type = "unlimited"]
     */
    #limitChecker: LimitsChecker = LimitsCheckers.unlimited()

    /**
     * A container for all the callbacks of this object about translation, rotation and scale
     */
    #callbacks: NotifiableMeshObjCallbackContainer = new ArrayMeshObjectCallbackContainer()


}