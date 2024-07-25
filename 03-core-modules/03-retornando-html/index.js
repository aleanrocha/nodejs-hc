const http = require('http') 

const port = 3001

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.end(
    '<h1>Olá, esté é meu primeiro server com HTML</h1><p>Atualizandooo...</p>'
  )
})

server.listen(port, () => console.log('Server started on port %s', port))
