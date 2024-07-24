// modulo externo
const minimist = require('minimist')
// modulo interno
const sumModule = require('./sum-module')

const args = minimist(process.argv.slice(2))

const sum = sumModule.sum

const name = args['name']
const isTrue = args['isTrue']

const n1 = parseInt(args['n1'])
const n2 = parseInt(args['n2'])

console.log(name)

function printName(name) {
  console.log(`Olá, ${name}! Tudo bem?`)
}

if (isTrue === 'true') printName(name)

if (n1 && n2) sum(n1, n2)
