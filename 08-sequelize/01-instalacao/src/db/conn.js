const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', 'nodemysql', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Successfully conected.')
} catch(err) {
  console.log(err)
}

module.exports = sequelize
