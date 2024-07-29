const express = require('express')
const path = require('path')

const app = express()
const port = 3001

// configurar o express para ler od dados

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

const basePath = path.join(__dirname, 'templates')


app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  console.log('Buscando pelo usuário %s', id)
  res.sendFile(`${basePath}/user.html`)
})

// Post de dados

app.get('/users/add', (req, res) => {
  res.sendFile(`${basePath}/userForm.html`)
})

app.post('/users/save', (req, res) => {
  const { name, age } = req.body
  console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`)
  res.sendFile(`${basePath}/success.html`)
})

app.listen(port, () => console.log('Server started on port %s', port))