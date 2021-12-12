/// <reference types="node" />
import { inspect } from "util";
export declare type OperatorSymbol = "+" | "-" | "−" | "*" | "/" | "^" | ")" | "(";
export declare type InputOperatorSymbol = "+" | "-" | "*" | "/" | "^" | ")" | "(";
export default abstract class Operator {
    abstract symbol: OperatorSymbol;
    abstract merge(operator: InputOperatorSymbol): Operator | false;
    abstract get presendence(): number;
    [inspect.custom](depth?: any, options?: any): string;
    toString(): string;
}
//# sourceMappingURL=Operator.d.ts.map