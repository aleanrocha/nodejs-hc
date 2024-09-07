const express = require('express')
const router = express.Router()

const toughtsController = require('../controllers/ToughtController')

router.get('/', toughtsController.showToughts)
router.get('/dashbord', toughtsController.showDashbord)

module.exports = router