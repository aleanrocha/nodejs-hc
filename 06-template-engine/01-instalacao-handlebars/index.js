const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const port = 3001

app.get('/', (req, res) => {
  res.render('home', { layout: false })
})

app.listen(port, () => console.log('Server started on port %s', port))