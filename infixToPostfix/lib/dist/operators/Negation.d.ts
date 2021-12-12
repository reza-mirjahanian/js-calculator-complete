import Operator, { InputOperatorSymbol } from "./Operator";
import Plus from "./Plus";
export default class Negation extends Operator {
    symbol: "−";
    merge(operator: InputOperatorSymbol): false | this | Plus;
    get presendence(): number;
}
//# sourceMappingURL=Negation.d.ts.map