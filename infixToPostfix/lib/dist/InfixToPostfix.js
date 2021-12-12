"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = __importDefault(require("./Expression"));
const Operand_1 = __importStar(require("./Operand"));
const CloseMultiplication_1 = __importDefault(require("./operators/CloseMultiplication"));
const CloseNegation_1 = __importDefault(require("./operators/CloseNegation"));
const ClosePlus_1 = __importDefault(require("./operators/ClosePlus"));
const ClosingBracket_1 = __importDefault(require("./operators/ClosingBracket"));
const Exponentiation_1 = __importDefault(require("./operators/Exponentiation"));
const Multiplication_1 = __importDefault(require("./operators/Multiplication"));
const Negation_1 = __importDefault(require("./operators/Negation"));
const OpeningBracket_1 = __importDefault(require("./operators/OpeningBracket"));
const Operator_1 = __importDefault(require("./operators/Operator"));
const OperatorUtils_1 = __importDefault(require("./operators/OperatorUtils"));
const Plus_1 = __importDefault(require("./operators/Plus"));
const Stack_1 = __importDefault(require("./Stack"));
class InfixToPostfix {
    constructor(expression) {
        this.queue = new Stack_1.default();
        this.current = null;
        this.postfixExpression = new Stack_1.default();
        this.expression = new Expression_1.default(expression);
        this.parseToQueue();
        this.parseQueue();
    }
    toString() {
        return this.toObjectArray().join(" ");
    }
    toObjectArray() {
        return this.postfixExpression.toArray();
    }
    toArray() {
        const objectArray = this.toObjectArray();
        const array = [];
        for (const item of objectArray) {
            if (item instanceof Operator_1.default) {
                array.push(item.symbol);
            }
            else {
                if (item.type === Operand_1.OperandType.Number)
                    array.push(Number(item.value));
                else
                    array.push(item.value);
            }
        }
        return array;
    }
    appendCurrent() {
        const last = this.queue.getLast();
        // (a+b)(d-e) => (a+b)*(d-e), a(2) => a*(2)
        if (this.current instanceof OpeningBracket_1.default &&
            (last instanceof Operand_1.default || last instanceof ClosingBracket_1.default)) {
            this.queue.push(new Multiplication_1.default());
        }
        // (3+4)2 = (3+4)*2
        if (last instanceof ClosingBracket_1.default && this.current instanceof Operand_1.default) {
            this.queue.push(new Multiplication_1.default());
        }
        // 2 a => 2*a
        if (this.current instanceof Operand_1.default && last instanceof Operand_1.default) {
            this.queue.push(new Multiplication_1.default());
        }
        // 2^-2/4 => 2^(-2)/4
        if (last instanceof Exponentiation_1.default) {
            if (this.current instanceof Negation_1.default)
                this.current = new CloseNegation_1.default();
            if (this.current instanceof Plus_1.default)
                this.current = new ClosePlus_1.default();
        }
        this.queue.push(this.current);
        this.current = null;
    }
    parseToQueue() {
        while (this.expression.hasNext()) {
            const currentCharacter = this.expression.next();
            if (OperatorUtils_1.default.isInputOperatorSymbol(currentCharacter)) {
                const operatorChar = currentCharacter;
                if (this.current instanceof Operand_1.default) {
                    this.appendCurrent();
                    //this.current = null;
                }
                else if (this.current instanceof Operator_1.default) {
                    const merged = this.current.merge(operatorChar);
                    if (merged) {
                        this.current = merged;
                    }
                    else {
                        this.appendCurrent();
                        //this.current = null;
                    }
                }
                if (this.current === null) {
                    const last = this.queue.getLast();
                    const preferUnary = !last || (last instanceof Operator_1.default && !(last instanceof ClosingBracket_1.default));
                    this.current = OperatorUtils_1.default.parse(operatorChar, preferUnary);
                }
            }
            else if (currentCharacter.match(/[^\s]/)) {
                if (this.current instanceof Operator_1.default) {
                    this.appendCurrent();
                }
                if (this.current === null) {
                    this.current = new Operand_1.default(currentCharacter);
                }
                else {
                    const merged = this.current.append(currentCharacter);
                    if (!merged) {
                        // 2a => 2&a
                        this.appendCurrent();
                        this.queue.push(new CloseMultiplication_1.default());
                        this.current = new Operand_1.default(currentCharacter);
                    }
                }
            }
            else if (currentCharacter.match(/\s/)) {
                if (this.current === null || this.current instanceof Operator_1.default)
                    continue;
                // b a !== ba
                if (this.current instanceof Operand_1.default) {
                    this.appendCurrent();
                }
            }
        }
        if (this.current)
            this.appendCurrent();
    }
    parseQueue() {
        const queueArray = this.queue.toArray();
        const operatorStack = new Stack_1.default();
        for (const item of queueArray) {
            if (item instanceof Operator_1.default) {
                while (operatorStack.hasItem()) {
                    const op = operatorStack.getLast();
                    if (item instanceof ClosingBracket_1.default) {
                        // If the current operator is ')' resolve all operators until a '(' operator is reached
                        if (!(op instanceof OpeningBracket_1.default)) {
                            // Skip plus operators (they can get ignored for mathematical reasons)
                            if (op instanceof Plus_1.default)
                                operatorStack.pop();
                            // Append other operators
                            else
                                this.postfixExpression.push(operatorStack.pop());
                        }
                        else {
                            // Pop '(' but don't append it
                            operatorStack.pop();
                            break;
                        }
                    }
                    else {
                        // If the current operator is a common one resolve all operators
                        // until a '(' is reached or an operator has a smaller presendence
                        if (!(op instanceof OpeningBracket_1.default) && op.presendence >= item.presendence) {
                            // Skip plus operators (they can get ignored for mathematical reasons)
                            if (op instanceof Plus_1.default)
                                operatorStack.pop();
                            // Append other operators
                            else
                                this.postfixExpression.push(operatorStack.pop());
                        }
                        else {
                            // Stop resolving if the operator has a smaller presendence or if it is a '('
                            break;
                        }
                    }
                }
                if (!(item instanceof ClosingBracket_1.default))
                    operatorStack.push(item);
            }
            else {
                this.postfixExpression.push(item);
            }
        }
        // Resolve remained operators from their stack
        while (operatorStack.hasItem()) {
            const op = operatorStack.getLast();
            if (op instanceof Plus_1.default || op instanceof OpeningBracket_1.default || op instanceof ClosingBracket_1.default) {
                operatorStack.pop();
            }
            else {
                this.postfixExpression.push(operatorStack.pop());
            }
        }
    }
}
exports.default = (expression) => {
    return new InfixToPostfix(expression);
};
//# sourceMappingURL=InfixToPostfix.js.map