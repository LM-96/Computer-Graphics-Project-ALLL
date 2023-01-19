"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireAll = void 0;
/**
 * Fires multiple triggers
 * @param {S} source the source that causes the trigger
 * @param {D} data the data associated to the signal
 * @param {Array<SingleSignalTrigger<S, D, R>>} triggers the triggers to be fired
 * @return {Array<SyncFiredSignal<S, D, R>>} the fired signals
 */
function fireAll(source, data, ...triggers) {
    let res = [];
    for (let trigger of triggers) {
        res.push(trigger.fire(source, data));
    }
    return res;
}
exports.fireAll = fireAll;
//# sourceMappingURL=trigger.js.map