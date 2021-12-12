import Operator, { InputOperatorSymbol } from "./Operator";
export default class Division extends Operator {
    symbol: "/";
    merge(operator: InputOperatorSymbol): false | this;
    get presendence(): number;
}
//# sourceMappingURL=Division.d.ts.map