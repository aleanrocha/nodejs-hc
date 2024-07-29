const express = require('express')
const path = require('path')

const router = express.Router()

const basePath = path.join(__dirname, '../templates')

router.get('/sobre', (req, res) => {
  res.status(200).sendFile(`${basePath}/sobre.html`)
})

router.get('/sobre/autor', (req, res) => {
  res.status(200).sendFile(`${basePath}/autor.html`)
})


module.exports = router