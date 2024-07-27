const path = require('path')

console.log(path)

const custumPath = '/planejamentos/plano1/meuplano.txt'

console.log(path.dirname(custumPath)) // nome do diretório
console.log(path.basename(custumPath)) // nome do arquivo em si
console.log(path.extname(custumPath)) // extensão do arquivo
