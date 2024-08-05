const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const port = 3001

app.get('/', (req, res) => {
  const user = {
    name: 'Zezinho',
    surname: 'Mangueira'
  }
  const message = 'Passando dados do back para o front...'


  const auth = false // simula um usuário autenticado


  res.render('home', { user: user, message, auth })
})



app.get('/dashbord', (req, res) => {
  res.render('dashbord')
})

app.listen(port, () => console.log('Server started on port %s', port))