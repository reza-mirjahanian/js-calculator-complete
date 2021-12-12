"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CloseNegation_1 = __importDefault(require("./CloseNegation"));
const Plus_1 = __importDefault(require("./Plus"));
class ClosePlus extends Plus_1.default {
    constructor() {
        super(...arguments);
        this.symbol = "+";
    }
    merge(operator) {
        if (operator === "+")
            return this;
        else if (operator === "-")
            return new CloseNegation_1.default();
        else
            return false;
    }
    get presendence() {
        return 5;
    }
}
exports.default = ClosePlus;
//# sourceMappingURL=ClosePlus.js.map