const path = require('path')

const extension = path.extname('arquivo.js')

if (extension === '.js') {
  console.log(
    `O arquivo é um ${extension}, vocẽ está utilizando a linguagem JavaScript.`
  )
} else if (extension === '.php') {
  console.log(
    `O arquivo é um ${extension}, vocẽ está utilizando a linguagem PHP.`
  )
} else if (extension === '.py') {
  console.log(
    `O arquivo é um ${extension}, vocẽ está utilizando a linguagem Python.`
  )
} else {
  console.log(
    `Essa linguagem é desconhecida!`
  )
}
