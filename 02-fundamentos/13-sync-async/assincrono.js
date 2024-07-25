const fs = require('fs')

console.log('Começou...')

fs.writeFile('exemple.txt', 'Hello World assíncrono', () => {
  console.log('Criado com sucessp!')
})

console.log('Terminou...')