export class PerformedObjectSet<T> {
    readonly oldValue: T
    readonly newValue: T

    constructor(oldValue: T, newValue: T) {
        this.oldValue = oldValue
        this.newValue = newValue
    }
}

export class PerformedObjectSetBuilder<T> {
    oldValue: T
    newValue: T

    constructor() {
        this.oldValue = null
        this.newValue = null
    }

    /**
     * Builds a new PerformedObjectSet instance throwing an error if the oldValue or newValue is null
     * @returns {PerformedObjectSet<T>} the new PerformedObjectSet instance
     * @throws {Error} if the oldValue or newValue is null
     */
    build(): PerformedObjectSet<T> {
        if (this.oldValue == null) {
            throw new Error("oldValue is null")
        }
        if (this.newValue == null) {
            throw new Error("newValue is null")
        }
        return new PerformedObjectSet(this.oldValue, this.newValue)
    }

    /**
     * Clears this builder by setting the oldValue and newValue to `null`
     */
    clear(): void {
        this.oldValue = null
        this.newValue = null
    }
}