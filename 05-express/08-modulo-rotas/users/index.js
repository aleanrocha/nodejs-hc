const express = require('express')
const path = require('path')

const router = express.Router()

const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
  res.sendFile(`${basePath}/userForm.html`)
})

router.post('/save', (req, res) => {
  const { name, age } = req.body
  console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`)
  res.sendFile(`${basePath}/success.html`)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log('Buscando pelo usuário %s', id)
  res.sendFile(`${basePath}/user.html`)
})


module.exports = router
