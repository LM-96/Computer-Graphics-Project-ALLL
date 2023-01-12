/**
 * An exception that is thrown when it is tried to access an invalid index/position
 * in somewhere
 */
export class IndexOutOfBoundException extends Error {

    readonly triedIndex: number|string

    constructor(triedIndex: number|string) {
        super("invalid index " + triedIndex);
        this.triedIndex = triedIndex
        Object.setPrototypeOf(this, IndexOutOfBoundException.prototype)
    }

}