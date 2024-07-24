// import módulo externo
const inquirer = require('inquirer')

inquirer.prompt([
  {
    name: 'p1',
    message: 'Qual foi sua primeira nota? '
  },
  {
    name: 'p2',
    message: 'Qual foi sua segunda nota? '
  }
]).then((answers) => {
  console.log('Sua primeira nota foi %s', answers.p1)
  console.log('Sua segunda nota foi %s', answers.p2)

  const media = (Number(answers.p1) + Number(answers.p2)) / 2

  if (media >= 7) {
    console.log('Sua média foi %s', media)
    console.log('Parabéns, voçê aprovado!',)
  } else {
    console.log('Sua média foi %s', media)
    console.log('Que pena, vocẽ foi reprovado! Estude mais da próxima vez.')
  }

} ).catch((err) => console.log(err))
