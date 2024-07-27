const fs = require('fs')

const oldName = 'arquivo.txt'
const newName = 'novo.txt'

fs.rename(oldName, newName, (err) => {
  if (err) {
    console.log(`Deu ruim!`, err)
    return
  } 
  console.log(`O arquivo ${oldName} foi renomedado para ${newName}`)
})