"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Addition_1 = __importDefault(require("./Addition"));
const ClosingBracket_1 = __importDefault(require("./ClosingBracket"));
const Division_1 = __importDefault(require("./Division"));
const Exponentiation_1 = __importDefault(require("./Exponentiation"));
const Multiplication_1 = __importDefault(require("./Multiplication"));
const Negation_1 = __importDefault(require("./Negation"));
const OpeningBracket_1 = __importDefault(require("./OpeningBracket"));
const Plus_1 = __importDefault(require("./Plus"));
const Subtraction_1 = __importDefault(require("./Subtraction"));
class OperatorUtils {
    static isInputOperatorSymbol(value) {
        return value === "+" || value === "-" || value === "*" || value === "/" || value === "^" || value === "(" || value === ")";
    }
    static parse(operatorChar, preferUnary = false) {
        switch (operatorChar) {
            case "(":
                return new OpeningBracket_1.default();
            case ")":
                return new ClosingBracket_1.default();
            case "*":
                return new Multiplication_1.default();
            case "/":
                return new Division_1.default();
            case "^":
                return new Exponentiation_1.default();
            case "+":
                if (preferUnary)
                    return new Plus_1.default();
                return new Addition_1.default();
            case "-":
                if (preferUnary)
                    return new Negation_1.default();
                return new Subtraction_1.default();
        }
    }
}
exports.default = OperatorUtils;
//# sourceMappingURL=OperatorUtils.js.map