const { Sequelize } = require('sequelize')

const conn = new Sequelize('nodemvc', 'root', 'nodemysql', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
})

try {
  conn.authenticate()
  console.log('Successfully conected.')
} catch (err) {
  console.log(err)
}

module.exports = conn
