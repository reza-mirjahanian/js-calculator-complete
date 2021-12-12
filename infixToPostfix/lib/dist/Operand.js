"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandType = void 0;
const util_1 = require("util");
var OperandType;
(function (OperandType) {
    OperandType[OperandType["Number"] = 0] = "Number";
    OperandType[OperandType["Symbol"] = 1] = "Symbol";
})(OperandType = exports.OperandType || (exports.OperandType = {}));
class Operand {
    constructor(value) {
        this.value = "";
        this.dotCount = 0;
        this.value = value;
        this.type = Operand.parseOperandType(value);
    }
    append(append) {
        if (this.type === OperandType.Number) {
            if (append === ".") {
                this.dotCount++;
                if (this.dotCount > 1)
                    this.type = OperandType.Symbol;
            }
            else if (append.match(/[^0-9]/)) {
                return false;
            }
        }
        this.value += append;
        return true;
    }
    isEmpty() {
        return this.value === "";
    }
    static parseOperandType(value) {
        if (value.match(/[0-9.]/))
            return OperandType.Number;
        else
            return OperandType.Symbol;
    }
    [util_1.inspect.custom](depth, options) {
        return options.stylize(`${this.value}`, "special");
    }
    toString() {
        return this.value.toString();
    }
}
exports.default = Operand;
//# sourceMappingURL=Operand.js.map