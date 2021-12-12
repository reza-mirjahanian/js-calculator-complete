/// <reference types="node" />
import { inspect } from "util";
export declare enum OperandType {
    Number = 0,
    Symbol = 1
}
export default class Operand {
    value: string;
    type: OperandType;
    private dotCount;
    constructor(value: string);
    append(append: string): boolean;
    isEmpty(): boolean;
    static parseOperandType(value: string): OperandType;
    [inspect.custom](depth?: any, options?: any): string;
    toString(): string;
}
//# sourceMappingURL=Operand.d.ts.map