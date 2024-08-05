const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
  partialDir: ['views/partials']
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

const port = 3001

app.get('/', (req, res) => {
  const user = {
    name: 'Zezinho',
    surname: 'Mangueira'
  }
  const message = 'Passando dados do back para o front...'
  const auth = true // simula um usuário autenticado
  res.render('home', { user: user, message, auth })
})

app.get('/dashbord', (req, res) => {
  const items = ['Item-a', 'item-b', 'item-c']
  res.render('dashbord', { items })
})

app.get('/blog', (req, res) => {
  const post = {
    title: 'Javascript',
    category: 'Tecnology',
    body: 'Javascript é uma linguagem de programação de alto nível...',
    comments: ['Muito bom', 'Show de bola', 'Incrivel']
  }
  res.render('blog', { post })
})

app.get('/blogPost', (req, res) => {
  const posts = [
    {
      title: 'Javascript',
      description: 'Lorem Ipsum JavaScript',
      category: 'Tecnology'
    },
    {
      title: 'PHP',
      description: 'Lorem Ipsum PHP',
      category: 'Tecnology'
    },
    {
      title: 'Python',
      description: 'Lorem Ipsum Python',
      category: 'Tecnology'
    },
    {
      title: 'Java',
      description: 'Lorem Ipsum Java',
      category: 'Tecnology'
    }
  ]
  return res.render('blogPost', { posts })
})

app.listen(port, () => console.log('Server started on port %s', port))