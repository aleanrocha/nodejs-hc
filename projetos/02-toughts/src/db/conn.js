const { Sequelize } = require('sequelize')

const conn = new Sequelize('toughts', 'root', 'nodemysql', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  conn.authenticate()
  console.log('Successfully conected.')
} catch (err) {
  console.log(err)
}

module.exports = conn