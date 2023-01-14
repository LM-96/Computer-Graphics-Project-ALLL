import {Point3D} from "../geometry/point/point-3d";
import {origin} from "../geometry/point/point-factory"

class MeshObj {

    #name: string
    readonly #path: string
    #data: object|null = null
    #position: Point3D = origin(false, false)


}