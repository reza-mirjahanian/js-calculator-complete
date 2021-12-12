"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Operator_1 = __importDefault(require("./Operator"));
const Plus_1 = __importDefault(require("./Plus"));
class Negation extends Operator_1.default {
    constructor() {
        super(...arguments);
        this.symbol = "−";
    }
    merge(operator) {
        if (operator === "+")
            return this;
        else if (operator === "-")
            return new Plus_1.default();
        else
            return false;
    }
    get presendence() {
        return 3;
    }
}
exports.default = Negation;
//# sourceMappingURL=Negation.js.map