const User = require('../models/User')
const bcript = require('bcryptjs')

module.exports = class AuthController {
  static async login(req, res) {
    return res.render('auth/login')
  }
  static async register(req, res) {
    return res.render('auth/register')
  }
  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword === ''
    ) {
      req.flash('message', 'Por favor, preencha todos os campos!')
      return res.render('auth/register')
    }
    if (confirmPassword !== password) {
      req.flash('message', 'As senhas são diferentes')
      return res.render('auth/register')
    }

  }
}
