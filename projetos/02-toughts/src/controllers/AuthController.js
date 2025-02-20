const User = require('../models/User')
const bcript = require('bcryptjs')

module.exports = class AuthController {
  static async login(req, res) {
    return res.render('auth/login')
  }
  static async loginPost(req, res) {
    const {email, password} = req.body
    if (email.trim() === '' || password.trim() === '') {
      req.flash('error_message', 'Por favor, Preencha todos o campos!')
      return res.render('auth/login')
    }
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      req.flash('error_message', 'Usuário invalido!')
      return res.render('auth/login')
    }
    const passwordMatch = bcript.compareSync(password, user.password)
    if (!passwordMatch) {
      req.flash('error_message', 'Senha invalida!')
      return res.render('auth/login')
    }
    req.flash('success_message', `Usuário ${user.name}, logado com sucesso!`)
    // initialize session
    req.session.userId = user.id
    req.session.save(() => {
      return res.redirect('/')
    })
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
