const express = require('express')
const exhbs = require('express-handlebars')

const conn = require('./db/conn')
const Task = require('./models/Task')

const tasksRoutes = require('./routes/tasksRoutes')

const server = express()
const port = 3001

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use(express.static('public'))

server.engine('handlebars', exhbs.engine())
server.set('view engine', 'handlebars')
server.set('views', './src/views')

server.get('/', (_, res) => res.redirect('/tasks/add'))
server.use('/tasks', tasksRoutes)

conn
  .sync()
  .then(() => {
    server.listen(port, () => console.log('Server started on port %s', port))
  })
  .catch((err) => console.log(err))
