import {Point3D, PointFactory} from "./geometry-3d";

let t_origin: Point3D = PointFactory.newMutablePoint3D(0, 0, 0)
let t_origin2: Point3D = PointFactory.newFrozenPoint3D(0, 0, 0)
t_origin2.setCoordinate()
console.log(t_origin.equals(t_origin2))