const sum = require('./sum_module')
//const { mutiply, mutiply2 } = require('./mutiply_module')
const mutiply = require('./mutiply_module')

console.log(sum.sum(4, 6))

const m1 = mutiply.mutiply
const m2 = mutiply.mutiply2

console.log(m1(10, 5))
console.log(m2(10, 5))