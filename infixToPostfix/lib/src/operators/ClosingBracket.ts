import Operator, { InputOperatorSymbol } from "./Operator";

export default class ClosingBracket extends Operator {
    symbol: ")" = ")";

    merge(operator: InputOperatorSymbol): false {
        return false;
    }

    get presendence(): number {
        return 6;
    }
}