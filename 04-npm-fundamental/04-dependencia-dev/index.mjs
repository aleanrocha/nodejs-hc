import _  from 'lodash'
import chalk from 'chalk' // não suporta mais o commonjs

const a = [1, 2, 3, 4, 5]
const b = [3, 3, 7, 6, 1]

const difer = _.difference(a, b)

console.log(chalk.green.bold(difer))