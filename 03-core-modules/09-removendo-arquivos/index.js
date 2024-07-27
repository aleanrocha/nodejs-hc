const fs = require('fs')

fs.unlink('./arquivo.txt', (err) => {
  if (err) return console.log('Ops, deu ruim!', err)
  console.log('Arquivo removido com sucesso!')
})