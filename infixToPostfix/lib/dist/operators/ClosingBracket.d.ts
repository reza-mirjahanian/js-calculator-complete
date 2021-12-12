import Operator, { InputOperatorSymbol } from "./Operator";
export default class ClosingBracket extends Operator {
    symbol: ")";
    merge(operator: InputOperatorSymbol): false;
    get presendence(): number;
}
//# sourceMappingURL=ClosingBracket.d.ts.map