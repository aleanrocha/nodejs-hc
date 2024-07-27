const http = require('http')
const url = require('url')
const fs = require('fs')

const port = 3001

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true)
  const filename = urlInfo.pathname.substring(1)
  console.log(filename)

  if (filename.includes('html')) {
    if(fs.existsSync(filename)) {
      fs.readFile(filename, (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' } )
        res.write(data)
        return res.end()
      })
    } else {
      fs.readFile('404.html', (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        res.writeHead(404, { 'Content-Type': 'text/html' } )
        res.write(data)
        return res.end()
      })
    }

  }
})

server.listen(port, () => console.log('Server started on port %s', port))