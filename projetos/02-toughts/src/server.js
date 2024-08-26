const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const fileStore = require('session-file-store')(session)
const exhbs = require('express-handlebars')
const conn = require('./db/conn')

const server = express()
const port = 3001

server.get('/', (req, res) => {
  res.send('Hello World')
})

conn
  .sync()
  .then(() => {
    server.listen(port, () => console.log('Server running...'))
  })
  .catch((err) => console.log(err))
