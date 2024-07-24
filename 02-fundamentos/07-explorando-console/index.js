const n1 = 56
const n2 = 5438
const a = 'Matheus'
const b = ['maça', 'banana']

// imprimindo mais de um valor

console.log(n1, n2, a, b)

// contagem de impressões

console.count(`O valor de n1 é ${n1}, contagem:`)
console.count(`O valor de n1 é ${n1}, contagem:`)
console.count(`O valor de n1 é ${n1}, contagem:`)
console.count(`O valor de n1 é ${n1}, contagem:`)

// variável entre strings

console.log('O nome é %s e ele é programador', a)
console.log('A soma de %s + %s = %s.', n1, n2, n1+n2)

// limpar o console

setTimeout(() => {
  console.clear()
}, 5000)
