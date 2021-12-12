import { InputOperatorSymbol } from "./Operator";
import ClosePlus from "./ClosePlus";
import Negation from "./Negation";
export default class CloseNegation extends Negation {
    symbol: "−";
    merge(operator: InputOperatorSymbol): false | ClosePlus | this;
    get presendence(): number;
}
//# sourceMappingURL=CloseNegation.d.ts.map