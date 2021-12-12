"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IterableString extends String {
    constructor() {
        super(...arguments);
        this.index = -1;
    }
    isAtBeginning() {
        return this.index === 0;
    }
    isAtEnd() {
        return !this.hasNext();
    }
    next() {
        this.index += 1;
        return this[this.index];
    }
    hasNext() {
        return this.index + 1 < this.length;
    }
}
exports.default = IterableString;
//# sourceMappingURL=Expression.js.map