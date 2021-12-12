import Operator, { InputOperatorSymbol } from "./Operator";
import Subtraction from "./Subtraction";
export default class Addition extends Operator {
    symbol: "+";
    merge(operator: InputOperatorSymbol): false | Subtraction | this;
    get presendence(): number;
}
//# sourceMappingURL=Addition.d.ts.map