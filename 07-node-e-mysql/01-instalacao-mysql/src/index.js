const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()
const port = 3001

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use(express.static('public'))

app.get('/', (req, res) => {
  return res.render('home')
}) 

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'nodemysql',
  database: 'persons'
})

connection.connect((err) => {
  console.log('Connecting...')
  if (err) {
    console.log(err)
    return
  }
  console.log('Successfully conected.')
  app.listen(port, () => console.log('Server started on port %s', port))
})
