export class IllegalSignalNameException extends Error{

    readonly nameAttempted: string
    readonly cause: string

    constructor(nameAttempted: string, cause: string) {
        super("signal name \"" + nameAttempted + "\" is not valid: " + cause)
        this.nameAttempted = nameAttempted
        this.cause = cause
        Object.setPrototypeOf(this, IllegalSignalNameException.prototype)
    }

}