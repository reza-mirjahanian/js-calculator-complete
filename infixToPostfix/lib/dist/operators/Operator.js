"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
class Operator {
    [util_1.inspect.custom](depth, options) {
        return options.stylize(`${this.symbol}`, "special");
    }
    toString() {
        return this.symbol;
    }
}
exports.default = Operator;
//# sourceMappingURL=Operator.js.map