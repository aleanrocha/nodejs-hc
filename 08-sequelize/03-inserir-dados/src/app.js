const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')

const app = express()
const port = 3001

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
  return res.render('home')
})

app.get('/users', (req, res) => {
  return res.render('addUser')
})

// criar novo usuário
app.post('/users/create', async (req, res) => {
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  console.log(req.body)

  await User.create({ name, occupation, newsletter })

  return res.redirect('/users')
})

conn
  .sync()
  .then(() => {
    app.listen(port, () => console.log('Server started on port %s', port))
  })
  .catch((err) => console.log(err))
