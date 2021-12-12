import Operator, { InputOperatorSymbol } from "./Operator";
export default class CloseMultiplication extends Operator {
    symbol: "*";
    merge(operator: InputOperatorSymbol): false | this;
    get presendence(): number;
}
//# sourceMappingURL=CloseMultiplication.d.ts.map