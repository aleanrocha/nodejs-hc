// DESAFIO

// 01 - Crie um novo projeto com express
// 02 - Adicione nodemon, com script 'serve', rodando na porta 5000
// 03 - crie duas páginas da sua escolha
// 04 - Adicione CSS, mude a cor de fundo e a fonte +
// 05 - Separe as rotas com o Router


const express = require('express')
const path = require('path')

const sobreRoutes = require('./sobre') 

const app = express()
const port = 5000

app.use(express.static('public'))

const basePath = path.join(__dirname, 'templates')

app.get('/', (req, res) => {
  res.status(200).sendFile(`${basePath}/index.html`)
})

app.use('/', sobreRoutes)

app.listen(port, () => console.log('Server started on port %s', port))
