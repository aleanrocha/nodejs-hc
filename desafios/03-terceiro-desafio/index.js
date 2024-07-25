// 1 - Crie um projeto que aceite pacotes externos
// 2 - Instale o inquirer e o chalk
// 3 - Utilize o inquirer para receber o NOME e a IDADE do usuário
// 4 - Apresente a resposta com uma cor de fundo amarela e texto preto
// 5 - Insira um tratamento para um possível erro do inquirer com o catch

import inquirer from 'inquirer'
import chalk from 'chalk'

inquirer
  .prompt([
    {
      name: 'name',
      message: 'Qual é o seu nome?',
    },
    {
      name: 'age',
      message: 'Qual é a sua idade?',
    },
  ])
  .then((answers) => {
    if (!answers.name || !answers.age) {
      console.log(chalk.red('Por favor, responda todas as respostas!'))
      return
    }
    console.log(
      chalk.bgYellow.black('Seu nome é %s e vocẽ tem %s anos.'),
      answers.name,
      answers.age
    )
  })
  .catch((err) => console.log('Deu ruim!'. err))
