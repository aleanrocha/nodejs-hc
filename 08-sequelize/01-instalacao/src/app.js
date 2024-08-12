const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

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

app.listen(port, () => console.log('Server started on port %s', port))