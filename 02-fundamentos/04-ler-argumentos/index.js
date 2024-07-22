// pegar nome é idade

console.log(process.argv)

const args = process.argv.slice(2)

const name = args[0].split('=')[1]
const age = process.argv.slice(3)[0].split('=')[1]

console.log(name)
console.log(age)

console.log(`O nome é ${name} e a idade é ${age}.`)
