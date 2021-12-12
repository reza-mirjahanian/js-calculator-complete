const RPN = require('./lib');

let s = '(52+1+2)*4-3';
let rArr = [52, 1, '+', 2, '+', 4, '*', 3, '-'];

console.log(RPN.calcRPN(rArr));
console.log(RPN.tokenize(s));
console.log(RPN.toRPN(s));
console.log(RPN.calcInfix(s));
//////////////////////////////
s = '-12 - 3';

console.log(RPN.tokenize(s));
console.log(RPN.toRPN(s));
console.log(RPN.calcInfix(s));
//////////////////////////////
s = '1+2*3/4';

console.log(RPN.tokenize(s));
console.log(RPN.toRPN(s));
console.log(RPN.calcInfix(s));
