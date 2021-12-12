/// <reference types="node" />
import { inspect } from "util";
export default class Stack<T extends any> {
    private readonly array;
    get length(): number;
    constructor(array?: T[]);
    push(item: T): void;
    pop(): T | undefined;
    getLast(): T | undefined;
    hasItem(): boolean;
    [inspect.custom](depth?: any, options?: any): string;
    toString(): string;
    toArray(): T[];
}
//# sourceMappingURL=Stack.d.ts.map