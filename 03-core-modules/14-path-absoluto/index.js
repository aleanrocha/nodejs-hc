const path = require('path')

const file = './pasta/exemple.txt'

console.log(path.resolve(file)) // caminho completo

// formar path

const fidFolder = 'relatorios'
const filename = 'arquivo.txt'

const finalPath = path.join('arquivos', fidFolder, filename)

console.log(finalPath)