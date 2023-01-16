import {LimitsChecker} from "./limits-checker";
import {Point3D} from "../point/point-3d";

/**
 * A `LimitChecker` that returns always 'true' when calling its 'isInLimits'.
 * So, this represents "limits that are unlimited", means that all positions are allowed
 */
export class UnlimitedLimitChecker extends LimitsChecker {

    isInLimits(position: Point3D): boolean {
        return true;
    }

    isOutOfLimits(position: Point3D): boolean {
        return false;
    }
}