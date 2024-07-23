const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

const name = args['name']
const age = args['age']

console.log(name)
console.log(age)

console.log(`NOME: ${name} IDADE: ${age}.`)
