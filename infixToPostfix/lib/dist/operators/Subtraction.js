"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Addition_1 = __importDefault(require("./Addition"));
const Operator_1 = __importDefault(require("./Operator"));
class Subtraction extends Operator_1.default {
    constructor() {
        super(...arguments);
        this.symbol = "-";
    }
    merge(operator) {
        if (operator === "+")
            return this;
        else if (operator === "-")
            return new Addition_1.default();
        else
            return false;
    }
    get presendence() {
        return 0;
    }
}
exports.default = Subtraction;
//# sourceMappingURL=Subtraction.js.map