// Pega dados do usuário pela linha de comando

const readline = require('readline').createInterface({
  input: process.stdin, // entrada de dados - compo onde o usuário vai digitar
  output: process.stdout // saida de dados - campo para a saida de resposta do sistema
})  // configurações responsáveis pelo recebimento e envio de dados

readline.question('Qual é sua linguagem favorita? ', (language) => {
  if (language.toLocaleUpperCase === 'NODEJS') {
    console.log('Isso nem é linguagem!')
  } else {
    console.log(`MInha linguagem favorita é ${language}!`)
  }
  readline.close()
})

