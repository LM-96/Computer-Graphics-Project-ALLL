import {NumberTrio} from "../numbers/number-trio";

export class PerformedNumberTrioChange {
    readonly oldValue: NumberTrio;
    readonly newValue: NumberTrio;
    readonly difference: NumberTrio;

    constructor(oldValue: NumberTrio, newValue: NumberTrio) {
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.difference = oldValue.sub(newValue.getFirst(),
            newValue.getSecond(), newValue.getThird());
    }
}

export class PerformedNumberTrioChangeBuilder {
    oldValue: NumberTrio;
    newValue: NumberTrio;

    constructor(oldValue: NumberTrio|null = null, newValue: NumberTrio|null = null) {
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    /**
     * Builds a PerformedNumberTrioChange object throwing an error if one of the required fields is missing
     * @returns {PerformedNumberTrioChange} the built PerformedNumberTrioChange object
     * @throws {Error} if one of the required fields is missing
     */
    build(): PerformedNumberTrioChange {
        if (this.oldValue == null) {
            throw new Error("Old value not set");
        }
        if (this.newValue == null) {
            throw new Error("New value not set");
        }
        return new PerformedNumberTrioChange(this.oldValue, this.newValue);
    }

    /**
     * Clears the builder by setting all fields to null
     */
    clear(): void {
        this.oldValue = null;
        this.newValue = null;
    }
}