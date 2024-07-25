const fs = require('fs')

console.log('começou...')

fs.writeFileSync('text.txt', 'Hello World')

console.log('Terminou...')