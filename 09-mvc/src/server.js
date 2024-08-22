const express = require('express')
const exhbs = require('express-handlebars')

const conn = require('./db/conn')
const Task = require('./models/Task')

const server = express()
const port = 3001

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.set(express.static('public'))

server.set('handlebars', exhbs.engine())
server.set('views engine', 'handlebars')
server.set('views', './src/views')

server.get('/', (req, res) => {
  return res.send('Hello World')
})

conn
  .sync()
  .then(() => {
    server.listen(port, () => console.log('Server started on port %s', port))
  })
  .catch((err) => console.log(err))
