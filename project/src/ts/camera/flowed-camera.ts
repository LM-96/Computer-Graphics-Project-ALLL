import {NumberTrio} from "../types/numbers/number-trio";
import {Point3D} from "../geometry/point/point-3d";
import {Angle} from "../geometry/angle/angle";
import {mutablePoint3D} from "../geometry/point/point-factory";
import {SingleSignalFlow} from "../signals/flow";
import {Camera} from "./camera";
import PerformedTranslation from "../geometry/data/performed-translation";
import {PerformedNumberTrioChange} from "../types/data/performed-number-trio-change";
import {PerformedObjectSet} from "../types/data/performed-object-set";
import {MeshObject} from "../obj/mesh-object";

export default class FlowedCamera {
    #position: Point3D = mutablePoint3D(0, 0, 0);
    #up: NumberTrio;
    #target: Point3D
    #fov: Angle
    #distanceFromTarget: NumberTrio
    #lookingAtObject: boolean
    #followObjectTranslation: boolean
    #targetObject: MeshObject|null

    #positionFlow: SingleSignalFlow<Camera, PerformedTranslation, void>
    #upFlow: SingleSignalFlow<Camera, PerformedNumberTrioChange, void>
    #targetFlow: SingleSignalFlow<Camera, PerformedObjectSet<Point3D>, void>
    #fovFlow: SingleSignalFlow<Camera, PerformedObjectSet<Angle>, void>
    #distanceFromTargetFlow: SingleSignalFlow<Camera, PerformedNumberTrioChange, void>
    #lookingAtObjectFlow: SingleSignalFlow<Camera, PerformedObjectSet<boolean>, void>
    #followObjectTranslationFlow: SingleSignalFlow<Camera, PerformedObjectSet<boolean>, void>
    #targetObjectFlow: SingleSignalFlow<Camera, PerformedObjectSet<MeshObject|null>, void>
}