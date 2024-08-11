const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()
const port = 3001

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  return res.render('home')
})

// salva os dados no banco
app.post('/books/insertbook', (req, res) => {
  const title = req.body.title
  const pageQtn = req.body.pageqty
  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageQtn}')`
  conn.query(query, (err) => {
    if (err) {
      console.log(err)
    }
    return res.redirect('/books')
  })
})

// pegar os dados do banco
app.get('/books', (req, res) => {
  const query = `SELECT * FROM books`
  conn.query(query, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    return res.render('books', { data })
  })
})

const conn = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'nodemysql',
  database: 'booksdb'
})

conn.connect((err) => {
  console.log('Connecting...')
  if (err) {
    console.log('Ops, deu ruim!', err)
    return
  }
  console.log('Successfully conected.')
  app.listen(port, () => console.log('Server started on por %s', port))
})
