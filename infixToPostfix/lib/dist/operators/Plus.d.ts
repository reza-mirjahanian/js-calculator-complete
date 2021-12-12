import Negation from "./Negation";
import Operator, { InputOperatorSymbol } from "./Operator";
export default class Plus extends Operator {
    symbol: "+";
    merge(operator: InputOperatorSymbol): false | Negation | this;
    get presendence(): number;
}
//# sourceMappingURL=Plus.d.ts.map