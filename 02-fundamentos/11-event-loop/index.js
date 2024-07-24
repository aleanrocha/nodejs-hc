//  Event loop

// O event Loop é um recurso da arquitura do node
// O NodeJS executa uma linha por vez, e de cima para baixo
// Ajuda a evitar problemas de concorrẽncia, garantindo a execução do código
// Precisamos apenas cuidar com bloqueios no fluxo, como loops infinitos

function a() {
  console.log('Function a')
}

function b() {
  console.log('Function b')
}

function c() {
  console.log('Function c')
  a()
  b()
}

//a()
//b()
//c()

//b()
//a()
//c()

c()

