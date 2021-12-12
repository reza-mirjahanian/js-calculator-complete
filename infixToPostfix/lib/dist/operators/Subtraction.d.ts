import Addition from "./Addition";
import Operator, { InputOperatorSymbol } from "./Operator";
export default class Subtraction extends Operator {
    symbol: "-";
    merge(operator: InputOperatorSymbol): false | this | Addition;
    get presendence(): number;
}
//# sourceMappingURL=Subtraction.d.ts.map