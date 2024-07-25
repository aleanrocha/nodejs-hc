// Podemos criar um servidor HTTP com esse módulo
// Ou seja, receber uma requisição e enviar código HTML como resposta
// Vamos utilizar métodos como createServer para criação do servidor
// Além do listen para determinar a porta

const http = require('http')

const port = 3001

const server = http.createServer((req, res) => {
  res.write('Hello World!')
  res.end()
})

server.listen(port, () => console.log('Server started on port %s', port))