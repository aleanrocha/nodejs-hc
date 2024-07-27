const _ = require('lodash')

const a = [1, 2, 3, 4, 5]
const b = [3, 3, 7, 6, 1]

const difer = _.difference(a, b)

console.log(difer)