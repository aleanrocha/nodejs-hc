// módulos externos

import chalk from 'chalk'
import inquirer from 'inquirer'

// módulos internos

import fs from 'fs'

// Principais operações do sistema

const operation = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que vocẽ deseja fazer?',
        choices: [
          'criar conta',
          'depositar',
          'sacar',
          'consultar saldo',
          'sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action']
      if (action === 'criar conta') {
        createAccount()
      } else if (action === 'depositar') {
        deposit()
      } else if (action === 'consultar saldo') {
        getAccountBalance()
      } else if (action === 'sacar') {
        withDraw()
      } else if (action === 'sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
      }
    })
    .catch((err) => console.log(err))
}

// invocar função

operation()

// criação da conta

const createAccount = () => {
  console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
  console.log(chalk.green('Defina as opções de seua conta a seguir:'))
  buildAccount()
}

const buildAccount = () => {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      // verifica se o usuário preencheu o campo
      if (accountName.trim() === '') {
        console.log(chalk.bgRed.black('Por favor, preencha o nome da conta!'))
        buildAccount()
        return
      }

      // verifica se o diretório accounts existe
      // se não existir vai criar
      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('./accounts')
      }

      // verifica se o nome existe
      // se existir vai retornar para criar outro
      if (fs.existsSync(`./accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black('Esta conta já existe, escolha outro nome!')
        )
        buildAccount()
        return
      }

      // cria o arquivo json com o nome da conta
      fs.writeFileSync(
        `./accounts/${accountName}.json`,
        '{"balance": 0}',
        (err) => console.log(err)
      )

      console.log(chalk.green('Parabéns, conta criada com sucesso!'))

      operation()
    })
    .catch((err) => console.log(err))
}

// Depositar a grana

const deposit = () => [
  inquirer
    .prompt([
      {
        name: 'acountName',
        message: 'Qual é o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['acountName']

      // verificar se a conta existe
      if (!checkAccount(accountName)) {
        return deposit()
      }

      // fazer o depósito
      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount']
          addAmount(accountName, amount)
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err)),
]

// verificar se a conta existe

const checkAccount = (accountName) => {
  if (!fs.existsSync(`./accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, tente outro nome!'))
    return false
  }
  return true
}

// adicionar novo saldo

const addAmount = (accountName, amount) => {
  const accountData = getAccount(accountName)
  if (amount.trim() === '' || !Number(amount)) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
    )
    return deposit()
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

  fs.writeFileSync(
    `./accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => console.log(err)
  )

  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta.`)
  )

  operation()
}

// obter conta para realizar o depósito

const getAccount = (accountName) => {
  const accountJSON = fs.readFileSync(`./accounts/${accountName}.json`, {
    encoding: 'utf-8',
    flag: 'r',
  })

  return JSON.parse(accountJSON)
}

// ver saldo disponível na conta

const getAccountBalance = () => {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']
      if (!checkAccount(accountName)) {
        return getAccountBalance()
      }
      const accountData = getAccount(accountName)
      console.log(
        chalk.bgBlue.black(
          `O valor disponível em sua conta é de R$${accountData.balance}.`
        )
      )
      operation()
    })
    .catch((err) => console.log(err))
}

// sacar dinheiro

const withDraw = () => {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']
      if (!checkAccount(accountName)) {
        return withDraw()
      }
      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Digite quanto você deseja sacar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount']
          removeAmount(accountName, amount)
        })
    })
    .catch((err) => console.log(err))
}

// remover saldo

const removeAmount = (accountName, amount) => {
  const accountData = getAccount(accountName)

  // verifica se o usuário não digitou um valor 
  if (amount.trim() === '' || !Number(amount)) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
    )
    return withDraw()
  }

  // verifica se o valor que eu quero sacar e maior que o valor disponível
  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('Valor indisponível!'))
    return withDraw()
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `./accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => console.log(err)
  )

  console.log(chalk.green(`Você acabou de fazer um saque de R$${amount}`))
  operation()
}
