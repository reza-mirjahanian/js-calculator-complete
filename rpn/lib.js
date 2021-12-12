/**
 * Given a string, returns a number if you can. Else return what was given.
 * @param {*} s
 * @returns {number|*}
 */
const maybeNumber = s => {
    if (s === null) {
        return s;
    }
    const p = 1 * s;
    return Number.isNaN(p) ? s : p;
};

const NEG = '_';

const OPS = new Map()
    .set(NEG, [5, 'L', 1, a => -a]) // A unary negative symbol
    .set('^', [4, 'R', 2, (b, a) => Math.pow(a, b)])
    .set('*', [3, 'L', 2, (b, a) => a * b])
    .set('/', [3, 'L', 2, (b, a) => a / b])
    .set('%', [3, 'L', 2, (b, a) => a % b])
    .set('+', [2, 'L', 2, (b, a) => a + b])
    .set('-', [2, 'L', 2, (b, a) => a - b]);

const ops = ['(', ')', '^', '*', '/', '%', NEG, ',', '='];

const unary = ['-', '+'];

const brackets = ['(', ')'];

const isOpp = e => ops.includes(e);

const isUnary = e => unary.includes(e);

const isNegate = e => e === unary[0];

const isBrackets = e => brackets.includes(e);

const isLeftBracket = e => e === brackets[0];

const noEmptyStrings = e => e !== '';

const noCommas = e => e !== ',';

const isUnarySymbol = (lc, i) =>
    lc === undefined || i === 0 || isOperator(lc) || isLeftBracket(lc);

const letterMatch = /[a-z]/i;
const digitMatch = /[0-9]/;

const isLetter = e => !!e.match(letterMatch);

const isDigit = e => !!e.match(digitMatch);

const isDecimalPoint = e => e === '.';

const isNumString = e => isLetter(e) || isDigit(e) || isDecimalPoint(e);

const isNumber = n => typeof n === 'number' && !Number.isNaN(n);

const isOperator = e => OPS.has(e);

const isLeftAss = e => OPS.get(e)[1] === 'L';

const isFunction = (e, ne) => typeof(e) === 'string' && typeof(ne) === 'string' && isLetter(e) && isLeftBracket(ne);

const peek = a => a[a.length - 1];

const hasEls = a => a.length > 0;

const opPres = e => isOperator(e) ? OPS.get(e)[0] : 0;

const t1 = (o1, o2) => isLeftAss(o1) && opPres(o1) <= opPres(o2);

const t2 = (o1, o2) => opPres(o1) < opPres(o2);

const tokenize = infixString => infixString
    .split('')
    .reduce(
        ([p, n], e, i) => {
            n = isNumString(e)
                ? n.push(e) && n
                : (hasEls(n)
                    ? p.push(n.join('')) && []
                    : n);

            p = isOpp(e)
                ? p.push(e) && p
                : (isUnary(e)
                    ? (isUnarySymbol(peek(p), i)
                        ? isNegate(e) ? p.push(NEG) && p : p
                        : p.push(e) && p)
                    : p);

            return [p, n];
        }, [[], []])
    .reduce((p, c, i) => i ? [...p, c.join('')] : c, [])
    .filter(noEmptyStrings)
    .filter(noCommas)
    .map(maybeNumber);


const toRPN = infixString => tokenize(infixString)
    .reduce(([rS, oS, fnArgs], c, i, t) => {
        if (isFunction(c, t[i+1])) {
            oS.push(c + "()");
            fnArgs.push(0);
        }
        else if (isBrackets(c)) {
            if (isLeftBracket(c)) {
                oS.push(c);
            }
            else {
                let nextOpp = oS.pop();
                while (nextOpp !== '(') {
                    rS.push(nextOpp);
                    if (fnArgs.length > 0) fnArgs[fnArgs.length-1]++;
                    nextOpp = oS.pop();
                }
                if (fnArgs.length > 0 && oS[oS.length-1].endsWith('()')) {
                    oS[oS.length-1] = oS[oS.length-1].replace("()",`(${fnArgs[fnArgs.length-1]})`);
                    fnArgs.pop();
                }
            }
        } else if (!isOperator(c)) {
            rS.push(c);
            if (fnArgs.length > 0) fnArgs[fnArgs.length-1]++;
        } else {
            const o1 = c;
            let o2 = peek(oS);
            let c1 = t1(o1, o2);
            let c2 = t2(o1, o2);

            while (o2 && (c1 || c2)) {
                rS.push(oS.pop());
                o2 = peek(oS);
                c1 = t1(o1, o2);
                c2 = t2(o1, o2);
            }
            oS.push(o1);
        }
        return [rS, oS, fnArgs];
    }, [[], [], []])
    .reduce((p, c, i) => i === 1 ? [...p, ...c.reverse()] : i === 0 ? c : p, []);

const lookupVar = (v, lookup) => {
    if (typeof(v) !== 'string') return v;
    if (lookup[v] !== undefined) return lookup[v];
    return v;
}

const calcRPN = (rpn, lookup) => rpn.reduce((p, c) => {
    if (isNumber(c)) {
        p.push(c);
        return p;
    }
    let isFn = c.match(/(.*)\((\d+)\)/);
    if (!isFn && isLetter(c)) {
        p.push(lookupVar(c, lookup));
        return p;
    }
    let arity = 0, opp = null;
    if (isFn) {
        arity = parseInt(isFn[2], 10);
        opp = lookupVar(isFn[1], lookup);
    }
    else {
        arity = OPS.get(c)[2];
        opp = OPS.get(c)[3];
    }
    const args = [];
    if (arity > 1) {
        for (let i=0; i<arity; i++) {
            args.push(lookupVar(p.pop(), lookup));
        }
    }
    p.push(arity === 1
        ? opp(lookupVar(p.pop(), lookup))
        : opp(...args));
    return p;
}, [])[0];

const calcInfix = (s, lookup) => calcRPN(toRPN(s), lookup);

module.exports = {
    tokenize,
    toRPN,
    calcRPN,
    calcInfix
};
