const User = require('../models/User')
const Tought = require('../models/Tought')

module.exports = class ToughtsController {
  static async showToughts(req, res) {
    return res.render('toughts/home')
  }
  static async showDashbord(req, res) {
    return res.render('toughts/dashbord')
  }
}
