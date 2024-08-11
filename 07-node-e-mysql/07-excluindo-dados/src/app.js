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
  // pega o dado da barra de pesquisa
  const search = req.query.search
  let query = `SELECT * FROM books`
  // verifica se o dado existe e caso exista faz a busca individual
  if (search) {
    query = `SELECT * FROM books WHERE title = '${search}'`
  }
  conn.query(query, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    return res.render('books', { data, search })
  })
})

// pegar os dados de forma individual
app.get('/book/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM books WHERE id = '${id}'`
  conn.query(query, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    const book = data[0]
    return res.render('book', { book })
  })
})

// obter livro pra fazer a edição
app.get('/book/edit/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM books WHERE id = '${id}'`
  conn.query(query, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    const book = data[0]
    return res.render('editBook', { book })
  })
})

// fazer a edição do livro
app.post('/book/updatebook', (req, res) => {
  const { id, title, pageqty} = req.body
  const query = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`
  conn.query(query, (err) => {
    if (err) {
      console.log(err)
      return
    }
    return res.redirect(`/book/${id}`)
  })
})

app.post('/book/deletebook', (req, res) => {
  const query = `DELETE FROM books WHERE id = ${req.body.id}`
  conn.query(query, (err) => {
    if (err) {
      console.log(err)
      return
    }
    return res.redirect('/books')
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
