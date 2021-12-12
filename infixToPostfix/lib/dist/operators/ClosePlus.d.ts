import CloseNegation from "./CloseNegation";
import { InputOperatorSymbol } from "./Operator";
import Plus from "./Plus";
export default class ClosePlus extends Plus {
    symbol: "+";
    merge(operator: InputOperatorSymbol): false | this | CloseNegation;
    get presendence(): number;
}
//# sourceMappingURL=ClosePlus.d.ts.map