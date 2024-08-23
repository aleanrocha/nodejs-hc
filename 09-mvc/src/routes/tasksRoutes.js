const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')

router.get('/', TaskController.showTasks)

router.get('/add', TaskController.createTask)
router.post('/save', TaskController.saveTask)


module.exports = router