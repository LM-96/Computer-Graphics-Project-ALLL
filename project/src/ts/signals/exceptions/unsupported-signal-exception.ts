import {SignalName} from "../signal";
import {getTypeName} from "../../types/types";

export class UnsupportedSignalException extends Error {
    readonly unsupportedSignalName: SignalName

    constructor(signalName: SignalName, obj: any|undefined = undefined) {
        super(signalName.name + " is not supported for " + getTypeName(obj));
        this.unsupportedSignalName = signalName

        Object.setPrototypeOf(this, UnsupportedSignalException.prototype)
    }
}