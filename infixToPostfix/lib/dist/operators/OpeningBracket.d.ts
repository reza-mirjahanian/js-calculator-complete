import Operator, { InputOperatorSymbol } from "./Operator";
export default class OpeningBracket extends Operator {
    symbol: "(";
    merge(operator: InputOperatorSymbol): false;
    get presendence(): number;
}
//# sourceMappingURL=OpeningBracket.d.ts.map