import Operator, { InputOperatorSymbol } from "./Operator";
export default class Multiplication extends Operator {
    symbol: "*";
    merge(operator: InputOperatorSymbol): false | this;
    get presendence(): number;
}
//# sourceMappingURL=Multiplication.d.ts.map