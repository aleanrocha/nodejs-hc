// Try Catch - Try tenta executar o código, caso ocorra algum erro, ele
// cai automaticamente no catch e executa o que estiver nele

// mesmo caindo no catch ele ainda continua o fluxo do código

const x = 90

try {
  x = 334 // erro - não posso atribuir diretamente um valor a uma constante
} catch (error) {
  console.log('Deu ruim!', error)
}

console.log('Continuando...')