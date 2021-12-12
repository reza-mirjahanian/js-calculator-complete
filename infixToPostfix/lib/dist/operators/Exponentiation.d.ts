import Operator, { InputOperatorSymbol } from "./Operator";
export default class Exponentiation extends Operator {
    symbol: "^";
    merge(operator: InputOperatorSymbol): false;
    get presendence(): number;
}
//# sourceMappingURL=Exponentiation.d.ts.map