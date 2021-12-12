"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
class Stack {
    constructor(array = []) {
        this.array = array;
    }
    get length() {
        return this.array.length;
    }
    push(item) {
        this.array.push(item);
    }
    pop() {
        const item = this.array.pop();
        return item;
    }
    getLast() {
        if (this.length === 0)
            return undefined;
        return this.array[this.length - 1];
    }
    hasItem() {
        return this.length > 0;
    }
    [util_1.inspect.custom](depth, options) {
        return options.stylize("Stack ", "special") + util_1.inspect(this.array);
    }
    toString() {
        return this.array.toString();
    }
    toArray() {
        return this.array;
    }
}
exports.default = Stack;
//# sourceMappingURL=Stack.js.map