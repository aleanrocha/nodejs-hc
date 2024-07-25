// Throw New Error - dispara um erro no sistema e para a execução do código

const x = 100

if (!Number.isInteger(x)) {
  throw new Error('Erro: x não é um número inteiro')
}

console.log('Continuando...')