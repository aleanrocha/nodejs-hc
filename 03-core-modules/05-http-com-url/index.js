const http = require('http')

const port = 3001

const server = http.createServer((req, res) => {
  const urlInfo = require('url').parse(req.url, true)
  const name = urlInfo.query.name
  console.log(name)

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  if (!name) {
    res.end(
      `<h1>Preencha o seu nome:</h1>
      <form method="GET">
        <input type="text" name="name" />
        <input type="submit" value="enviar" />
      </form>`
    )
  } else {
    res.end(`<h1>Seja bem vindo ${name}!</h1>`)
  }
  
})

server.listen(port, () => console.log('Server started on port %s', port))
