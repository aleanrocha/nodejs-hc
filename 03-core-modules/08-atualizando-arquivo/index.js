const http = require('http')
const fs = require('fs')

const port = 3001

const server = http.createServer((req, res) => {
  const urlINfo = require('url').parse(req.url, true)
  const name = urlINfo.query.name
  if (!name) {
    fs.readFile('./index.html', (err, data) => {
      if(err) {
        console.log('Ops, deu ruim!', err)
        return res.end()
      }
      res.writeHead(200, { 'Content-Type': 'text/html' } )
      res.write(data)
      return res.end()
    })
  } else {
    fs.appendFile('./myName.txt', `Meu nome é ${name} \n\r`, (err, data) => {
      res.writeHead(302, {
        location: '/'
      })
      return res.end()
    })
  }
})

server.listen(port, () => console.log('Server started on port %s', port))