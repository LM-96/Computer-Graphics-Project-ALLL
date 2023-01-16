"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlimitedLimitChecker = void 0;
const limits_checker_1 = require("./limits-checker");
/**
 * A `LimitChecker` that returns always 'true' when calling its 'isInLimits'.
 * So, this represents "limits that are unlimited", means that all positions are allowed
 */
class UnlimitedLimitChecker extends limits_checker_1.LimitsChecker {
    isInLimits(position) {
        return true;
    }
    isOutOfLimits(position) {
        return false;
    }
}
exports.UnlimitedLimitChecker = UnlimitedLimitChecker;
//# sourceMappingURL=unlimited-limit-checker.js.map