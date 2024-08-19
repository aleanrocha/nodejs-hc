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

// renderizar home
app.get('/', (req, res) => {
  return res.render('home')
})

// renderizar tela de adicionar novo usuário
app.get('/adduser', (req, res) => {
  return res.render('addUser')
})

// criar novo usuário
app.post('/adduser/create', async (req, res) => {
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter
  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }
  await User.create({ name, occupation, newsletter })
  return res.redirect('/users')
})

// obter todos os usuários
app.get('/users', async (req, res) => {
  const users = await User.findAll({ raw: true})
  return res.render('users', { users })
})

// obter usuário pelo id
app.get('/user/:id', async (req, res) => {
  const id = req.params.id
  const user = await User.findOne({ raw: true, where: { id: id } })
  return res.render('userView', { user })
})

//remover usuário por id
app.post('/user/delete', async (req, res) => {
  const id = req.body.id
  console.log(id)
  await User.destroy({ where: { id: id } })
  res.redirect('/users')
})

/*
app.get('/user/delete/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  await User.destroy({ where: { id: id } })
  res.redirect('/users')
})
*/

conn
  .sync()
  .then(() => {
    app.listen(port, () => console.log('Server started on port %s', port))
  })
  .catch((err) => console.log(err))
