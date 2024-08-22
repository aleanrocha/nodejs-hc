const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')
const Address = require('./models/Address')

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
  try {
    const id = req.params.id
    const user = await User.findOne({ include: Address, where: { id: id } })
    console.log(user.get( { plain: true } ))
    return res.render('userView', { user: user.get( { plain: true } ) })
  } catch (error) {
    console.log(error)
  }
})

//remover usuário por id
app.post('/user/delete', async (req, res) => {
  const id = req.body.id
  console.log(id)
  await User.destroy({ where: { id: id } })
  return res.redirect('/users')
})

/*
app.get('/user/delete/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  await User.destroy({ where: { id: id } })
  res.redirect('/users')
})
*/

// edição de dados

// 1 etapa - pegar os dados do usuário e preencher o form
app.get('/user/edit/:id', async (req, res) => {
  const userId = req.params.id
  const user = await User.findOne({ raw: true, where: { id: userId }})
  return res.render('editUser', { user })
})

// 2 etapa - fazer a edição
app.post('/user/update', async (req, res) => {
  const { id, name, occupation } = req.body
  let newsletter = req.body.newsletter
  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }
  const userData = {
    id,
    name,
    occupation,
    newsletter
  }
  await User.update(userData, { where: { id: id }})
  return res.redirect('/users')
})

// relacionamento 
app.post('/address/create', async (req, res) => {
  const { UserId, street, number, city } = req.body
  const addressData = {
    UserId,
    street, 
    number,
    city
  }
  await Address.create(addressData)
  return res.redirect('/users')
})

conn
  .sync()
  //.sync({ force: true}) // recriação do banco - força a reconstrução das tabelas
  .then(() => {
    app.listen(port, () => console.log('Server started on port %s', port))
  })
  .catch((err) => console.log(err))
