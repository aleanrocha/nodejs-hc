const express = require('express')
const router = express.Router()

const toughtsController = require('../controllers/ToughtController')

router.get('/', toughtsController.showToughts)

module.exports = router