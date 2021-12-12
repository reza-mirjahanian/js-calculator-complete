declare class InfixToPostfix {
    private expression;
    private queue;
    private current;
    private postfixExpression;
    toString(): string;
    private toObjectArray;
    toArray(): (string | number)[];
    constructor(expression: string);
    private appendCurrent;
    private parseToQueue;
    private parseQueue;
}
declare const _default: (expression: string) => InfixToPostfix;
export default _default;
//# sourceMappingURL=InfixToPostfix.d.ts.map