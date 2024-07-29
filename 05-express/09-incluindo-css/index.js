const express = require('express')
const path = require('path')

const app = express()
const port = 3001

const users = require('./users')

// arquivos státicos

app.use(express.static('public'))

// configurar o express para ler od dados

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.use('/users', users)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => console.log('Server started on port %s', port))