const express = require('express')
const path = require('path')

const app = express()
const port = 3001

const basePath = path.join(__dirname, 'templates')

app.get('/:id', (req, res) => {
  const id = req.params.id
  console.log('Buscando pelo usuário %s', id)
  res.sendFile(`${basePath}/user.html`)
})

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => console.log('Server started on port %s', port))