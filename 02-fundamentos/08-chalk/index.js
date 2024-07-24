import chalk from 'chalk'

const args = process.argv.slice(2)

if (
  args.length === 0 ||
  (args.length > 0 && args[0].split('=')[0] !== 'nota') ||
  !args[0].split('=')[1]
) {
  console.log(chalk.red.bold('Por favor, passe a nota na linha de comando!'))
} else {
  const nota = args[0].split('=')[1]
  if (nota && nota >= 7) {
    console.log(
      chalk.green.bold('Parabens, você foi aprovado com nota %s!'),
      nota
    )
  }
  if (nota && nota < 7) {
    console.log(
      chalk.bgRed.bold(
        'Que pena, infelismente você foi reprovado com nota %s!'
      ),
      nota
    )
  }
}
