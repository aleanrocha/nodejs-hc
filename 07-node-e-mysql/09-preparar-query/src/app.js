const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn.js')

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
  const pageQty = req.body.pageqty

  // preparar a query - evitar SQL injection

  const query = `INSERT INTO books (??, ??) VALUES (?, ?)`
  const data = ['title', 'pageqty', title, pageQty]

  pool.query(query, data, (err) => {
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
  let data = null
  // verifica se o dado existe e caso exista faz a busca individual
  if (search) {
    // preparar a query - evitar SQL injection
    query = `SELECT * FROM books WHERE ?? = ?`
    data = ['title', search]
  }
  pool.query(query, data, (err, data) => {
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
  // preparar a query - evitar SQL injection
  const query = `SELECT * FROM books WHERE ?? = ? `
  const data = ['id', id]
  pool.query(query, data, (err, data) => {
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
  // preparar a query - evitar SQL injection
  const query = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]
  pool.query(query, data, (err, data) => {
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
  // preparar a query - evitar SQL injection
  const query = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
  const data = ['title', title, 'pageqty', pageqty, 'id', id]
  pool.query(query, data, (err) => {
    if (err) {
      console.log(err)
      return
    }
    return res.redirect(`/book/${id}`)
  })
})

app.post('/book/deletebook', (req, res) => {
  // preparar a query - evitar SQL injection
  const query = `DELETE FROM books WHERE ?? = ?`
  const data = ['id', req.body.id]
  pool.query(query, data, (err) => {
    if (err) {
      console.log(err)
      return
    }
    return res.redirect('/books')
  })
})

app.listen(port, () => console.log('Server started on por %s', port))
