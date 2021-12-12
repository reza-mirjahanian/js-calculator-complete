class Calculation {
    constructor() {
        this._symbolsTable = {};
        this._createOperator("!", this._factorial, "postfix", 6);
        this._createOperator("^", Math.pow, "infix", 5, true);
        this._createOperator("*", this._multiple, "infix", 4);
        this._createOperator("/", this._divide, "infix", 4);
        this._createOperator("+", this._last, "prefix", 3);
        this._createOperator("-", this._negate, "prefix", 3);
        this._createOperator("+", this._plus, "infix", 2);
        this._createOperator("-", this._minus, "infix", 2);
        this._createOperator(",", Array.of, "infix", 1);
        this._createOperator("(", this._last, "prefix");
        this._createOperator(")", null, "postfix");
        this._createOperator("min", Math.min);
        this._createOperator("sqrt", Math.sqrt);
    }

    // Store operators keyed by their symbol/name. Some symbols may represent,different usages: e.g. "-" can be unary or binary, so they are also ,keyed by their notation (prefix, infix, postfix, func):
    _createOperator(symbol, f, notation = "func", precedence = 0, rightToLeft = false) {
        if (notation === "func") {
            precedence = 0
        }
        this._symbolsTable[symbol] = Object.assign({}, this._symbolsTable[symbol], {
            [notation]: {
                symbol, f, notation, precedence, rightToLeft,
                argCount: 1 + (notation === "infix")
            },
            symbol,
            regSymbol: symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&')
                + (/\w$/.test(symbol) ? "\\b" : "") // add a break if it's a name
        });
    }

    _last(...a) {
        return a[a.length - 1]
    }

    _negate(a) {
        return -a
    }

    _plus(a, b) {
        return a + b
    }

    _minus(a, b) {
        return a - b
    }

    _multiple(a, b) {
        return a * b
    }

    _divide(a, b) {
        return a / b
    }

    _factorial(a) {
        if (a % 1 || !(+a >= 0)) return NaN
        if (a > 170) return Infinity;
        let b = 1;
        while (a > 1) b *= a--;
        return b;
    }

    calculate(expression) {
        let match;
        const values = [],
            operators = [this._symbolsTable["("].prefix],
            exec = _ => {
                let op = operators.pop();
                values.push(op.f(...[].concat(...values.splice(-op.argCount))));
                return op.precedence;
            },
            error = msg => {
                let notation = match ? match.index : expression.length;
                return `${msg} at ${notation}:\n${expression}\n${' '.repeat(notation)}^`;
            },
            pattern = new RegExp(
                // Pattern for numbers
                "\\d+(?:\\.\\d+)?|"
                // ...and patterns for individual operators/function names
                + Object.values(this._symbolsTable)
                    // longer symbols should be listed first
                    .sort((a, b) => b.symbol.length - a.symbol.length)
                    .map(val => val.regSymbol).join('|')
                + "|(\\S)", "g"
            );
        let afterValue = false;
        pattern.lastIndex = 0; // Reset regular expression object
        do {
            match = pattern.exec(expression);
            const [token, bad] = match || [")", undefined],
                notNumber = this._symbolsTable[token],
                notNewValue = notNumber && !notNumber.prefix && !notNumber.func,
                notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix;
            // Check for syntax errors:
            if (bad || (afterValue ? notAfterValue : notNewValue)) return error("Syntax error");
            if (afterValue) {
                // We either have an infix or postfix operator (they should be mutually exclusive)
                const curr = notNumber.postfix || notNumber.infix;
                do {
                    const prev = operators[operators.length - 1];
                    if (((curr.precedence - prev.precedence) || prev.rightToLeft) > 0) break;
                    // Apply previous operator, since it has precedence over current one
                } while (exec()); // Exit loop after executing an opening parenthesis or function
                afterValue = curr.notation === "postfix";
                if (curr.symbol !== ")") {
                    operators.push(curr);
                    // Postfix always has precedence over any operator that follows after it
                    if (afterValue) exec();
                }
            } else if (notNumber) { // prefix operator or function
                operators.push(notNumber.prefix || notNumber.func);
                if (notNumber.func) { // Require an opening parenthesis
                    match = pattern.exec(expression);
                    if (!match || match[0] !== "(") return error("Function needs parentheses")
                }
            } else { // number
                values.push(+token);
                afterValue = true;
            }
        } while (match && operators.length);
        return operators.length ? error("Missing closing parenthesis")
            : match ? error("Too many closing parentheses")
                : values.pop() // All done!
    }
}

const calc = new Calculation();



const testData = [
    {input: '(-2)', answer: -2},
    {input: '-(1)', answer: -1},
    {input: '-(-3) +  -( -4)', answer: 7},
    {input: '6 +  -( -4)', answer: 10},
    {input: '3 - -2', answer: 5},
    {input: '4 -   -3', answer: 7},
    {input: '4 -3 ', answer: 1},
    {input: '(4) -3  ', answer: 1},
    {input: '(4)-3  ', answer: 1},
    {input: '4- -3', answer: 7},
    {input: '7-3 ', answer: 4},
    {input: '6- 1 ', answer: 5},
    {input: '5 - 1', answer: 4},
    {input: '1- -1', answer: 2},
    {input: '1 - -1', answer: 2},
    {input: '6 +  (4) ', answer: 10},
    {input: '6*(4)', answer: 24},
    {input: '8/(4)', answer: 2},
    {input: '( 2 + 3.33 )    ', answer: 5.33},
    {input: '( 1 ) * 4   ', answer: 4},
    {input: '( 1 ) * -4   ', answer: -4},
    {input: '6-1', answer: 5},
    {input: '1+2', answer: 3},
    {input: '1+2*3', answer: 7},
    {input: '1+2*3^2', answer: 19},
    {input: '1+2*2^3^2', answer: 1025},
    {input: '-3!', answer: -6},
    {input: '12---11+1-3', answer: -1},
    {input: 'min(2,1,3)', answer: 1},
    {input: '(2,1,3)', answer: 3},
    {input: '4-min(sqrt(2+2*7),9,5)', answer: 0},
    {input: '2,3,10', answer: 10},
    {input: '-2', answer: -2},
    {input: '6 + ( -4)', answer: 2},
    {input: '6 + (0 + -4)', answer: 2},
];

for (const {input, answer} of testData) {
    const output = calc.calculate(input);
    console.assert(output === answer, `${input} should be ${answer}, but is ${output}`);
}
