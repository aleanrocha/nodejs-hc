const fs = require('fs')

const filename = 'arquivo.txt'

fs.stat(filename, (err, stats) => {
  if(err) {
    console.log(err)
    return
  }
  console.log(stats)
  console.log(stats.isFile())
  console.log(stats.isDirectory())
  console.log(stats.isSymbolicLink())
  console.log(stats.size)
  console.log(stats.ctime)
  console.log(stats.atime)


})