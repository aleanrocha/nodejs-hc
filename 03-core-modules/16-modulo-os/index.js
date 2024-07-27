// Com o módulo OS podemos extrair informações
// sobre o sistema operacional, que interessante né?

const os = require('os')

console.log(os)

console.log(os.version())
console.log(os.release())
console.log(os.cpus())
console.log(os.arch())
console.log(os.freemem())
console.log(os.homedir())
console.log(os.hostname())
console.log(os.type())
console.log(os.machine())
