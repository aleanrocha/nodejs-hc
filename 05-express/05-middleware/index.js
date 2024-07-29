const express = require('express')
const path = require('path')

const app = express()
const port = 3001

const basePath = path.join(__dirname, 'templates')

const checkUser = (req, res, next) => {
  req.authStatus = false
  if (req.authStatus) {
    console.log('Usuário logado com sucesso!')
    next() // continue vá para próxima etapa
  } else {
    console.log('Usuário não encontrado!')
    next() // continue vá para próxima etapa
  }
} 

app.use(checkUser)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => console.log('Server started on port %s', port))