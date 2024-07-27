const http = require('http')
const fs = require('fs')

const port = 3001

const server = http.createServer((req, res) => {
  //res.statusCode = 200
  //res.setHeader('Content-Type', 'text/html')

  fs.readFile('./index.html', (err, data) => {
    if (err) {
      console.log('Ops, deu ruim!', err)
      return res.end()
    }
    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(data)
    return res.end()
  })

})

server.listen(port, () => console.log('Server started on port %s', port))