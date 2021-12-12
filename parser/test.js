const {parse, resolve, toString, toArray} = require('./lib/')

console.log(toArray(parse('(a+b)^2*c')))
console.log(toArray(parse('1+2*3/4')))
console.log(toArray(parse('(a+b)^2*c')))
console.log(toArray(parse('-12-3')))
//---------------------
console.log(resolve(parse('-(a+b)-2*c'),{ a: 1, b: 2, c: 3}))
console.log(resolve(parse('1+2*3/4')))
console.log(resolve(parse('(a+b)^2*c'), { a: 1, b: 2, c: 3}))
console.log(resolve(parse('-12-3')))
