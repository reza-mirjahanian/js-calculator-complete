"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Operator_1 = __importDefault(require("./Operator"));
class Exponentiation extends Operator_1.default {
    constructor() {
        super(...arguments);
        this.symbol = "^";
    }
    merge(operator) {
        return false;
    }
    get presendence() {
        return 4;
    }
}
exports.default = Exponentiation;
//# sourceMappingURL=Exponentiation.js.map