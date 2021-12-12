"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Operator_1 = __importDefault(require("./Operator"));
const Subtraction_1 = __importDefault(require("./Subtraction"));
class Addition extends Operator_1.default {
    constructor() {
        super(...arguments);
        this.symbol = "+";
    }
    merge(operator) {
        if (operator === "+")
            return this;
        else if (operator === "-")
            return new Subtraction_1.default();
        else
            return false;
    }
    get presendence() {
        return 0;
    }
}
exports.default = Addition;
//# sourceMappingURL=Addition.js.map