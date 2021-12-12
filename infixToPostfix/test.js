// import infixToPostfix from "./lib/dist/";
const infixToPostfix = require('./lib/dist/InfixToPostfix').default;

console.log(infixToPostfix("(a+2b)^-2").toString());

console.log(infixToPostfix("(a+2b)^-2").toArray());

console.log(infixToPostfix("-12 - 3").toString());// 12 − 3 - |The difference between - and − is, that − (negation) is an unary operator
