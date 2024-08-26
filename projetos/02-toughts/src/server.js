const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const fileStore = require('session-file-store')(session)
const exhbs = require('express-handlebars')

const conn = require('./db/conn')
const toughtsRoutes = require('./routes/toughtsRoutes')

const server = express()
const port = 3001

// create table 
require('./models/Tought')
require('./models/User')

// template engine
server.engine('handlebars', exhbs.engine())
server.set('view engine', 'handlebars')
server.set('views', './src/views')

// recieve response form de body
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

// public path
server.use(express.static('public'))

// session middleware
server.use(session({
  name: 'session',
  secret: 'my_secret',
  resave: false,
  saveUninitialized: false,
  store: new fileStore({
    logFn: () => {},
    path: require('path').join(require('os').tmpdir(), 'sessions')
  }),
  cookie: {
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true
  }
}))

// flash messages
server.use(flash())

// set session to res
server.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session
  }
  next()
})

// routes
server.get('/', (_req, res) => {return res.redirect('/toughts')})
server.use('/toughts', toughtsRoutes)

conn
  .sync()
  .then(() => {
    server.listen(port, () => console.log('Server running...'))
  })
  .catch((err) => console.log(err))
