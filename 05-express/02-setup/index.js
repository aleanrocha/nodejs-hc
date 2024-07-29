// importar o express

const express = require('express')

// executar o express em uma variável

const app = express()

// configurar a porta que vai ser disponibilizada para uso do express

const port = 3001

// configurar a primeira rota

app.get('/', (req, res) => {
  res.send('Hello World')
})

// inicializar o servidor

app.listen(port, () => console.log('Server started on port %s', port))