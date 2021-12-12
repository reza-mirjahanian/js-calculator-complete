"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClosePlus_1 = __importDefault(require("./ClosePlus"));
const Negation_1 = __importDefault(require("./Negation"));
class CloseNegation extends Negation_1.default {
    constructor() {
        super(...arguments);
        this.symbol = "−";
    }
    merge(operator) {
        if (operator === "+")
            return this;
        else if (operator === "-")
            return new ClosePlus_1.default();
        else
            return false;
    }
    get presendence() {
        return 5;
    }
}
exports.default = CloseNegation;
//# sourceMappingURL=CloseNegation.js.map