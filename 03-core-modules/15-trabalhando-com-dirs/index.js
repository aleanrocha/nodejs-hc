const fs = require('fs')
const path = require('path')

const dir = './pasta'

if (!fs.existsSync(dir)) {
  console.log('Não existe, mas vou criar.')
  fs.mkdirSync(dir)
  fs.writeFileSync('./pasta/arquivo.txt', 'Hello, developers!')
} else if (fs.existsSync(dir)) {
  console.log('Diretório encontrado com sucesso!')
}