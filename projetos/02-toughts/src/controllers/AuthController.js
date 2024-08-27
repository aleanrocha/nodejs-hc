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
    // data validation
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword === ''
    ) {
      req.flash('error_message', 'Por favor, preencha todos os campos!')
      return res.render('auth/register')
    }
    if (confirmPassword !== password) {
      req.flash('error_message', 'As senhas são diferentes')
      return res.render('auth/register')
    }
    // verify if user exists
    const checkIfUserExists = await User.findOne({ where: { email: email } })
    if (checkIfUserExists) {
      req.flash('error_message', 'O email já está em uso')
      return res.render('auth/register')
    }
    // create password
    const salt = bcript.genSaltSync(10)
    const hashedPassword = bcript.hashSync(password, salt)
    const userData = {
      name,
      email,
      password: hashedPassword
    }
    try {
      const createdUser = await User.create(userData)
      req.flash('success_message', `Usuário ${createdUser.name}, criado com sucesso!`)
      // initialize session
      req.session.userId = createdUser.id
      req.session.save(() => {
        return res.redirect('/')
      })
    } catch (err) {
      console.log(err)
    }
  }
  static async logout(req, res) {
    req.session.destroy()
    return res.redirect('/login')
  }
}
