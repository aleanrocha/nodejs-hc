// Core Module - não é necessário instalar

const fs = require('fs') // file system

fs.readFile('./arquivo.txt', 'utf-8', (error, data) => {
  if (error) {
    console.log('Deu ruim!', error)
  }
  console.log(data)
})
