const mysql = require('mysql2')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'nodemysql',
  database: 'booksdb'
})

module.exports = pool