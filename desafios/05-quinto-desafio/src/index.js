// 1 - Crie um projeto com Express, Handlebars e Nodemon.
// 2 - Rota para Home, que exiba produtos de um array de objetos.
// 3 - Utilize o recurso de Layout para a estrutura base do HTML.
// 4 - Adicione CSS e estilos da sua escolha.
// 5 - Os produtos precisam ter um link que exiba as páginas 
// individuais de cada produto


const express = require('express')
const exphbs = require('express-handlebars')

const server = express()
const port = 3001

server.use(express.static('public'))

server.engine('handlebars', exphbs.engine())
server.set('view engine', 'handlebars')
server.set('views', './src/views')

server.get('/', (req, res) => {
  // base de dados
  const products = [
    {
      id: 1,
      name: 'Camisa',
      category: 'Roupas',
      price: 55
    },
    {
      id: 2,
      name: 'Calça',
      category: 'Roupas',
      price: 159.60
    },
    {
      id: 3,  
      name: 'Bermuda',
      category: 'Roupas',
      price: 95.99
    },
    {
      id: 4,
      name: 'Saiote',
      category: 'Roupas',
      price: 22
    }
  ]
  res.render('home', { products })
})

server.get('/produto/:id', (req, res) => {
  // base de dados
  const products = [
    {
      id: 1,
      name: 'Camisa',
      category: 'Roupas',
      price: 55
    },
    {
      id: 2,
      name: 'Calça',
      category: 'Roupas',
      price: 159.60
    },
    {
      id: 3,  
      name: 'Bermuda',
      category: 'Roupas',
      price: 95.99
    },
    {
      id: 4,
      name: 'Saiote',
      category: 'Roupas',
      price: 22
    }
  ]
  const id = req.params.id
  const product = products.find((product) => product.id == id)
  res.render('product', { product })
})

server.listen(port, () => console.log('Server started on port %s', port))
