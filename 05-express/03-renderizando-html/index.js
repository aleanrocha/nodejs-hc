const express = require('express')
const path = require('path')

const app = express()
const port = 3001

const basePath = path.join(__dirname, 'templates')

console.log(basePath)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => console.log('Server started on port %s', port))