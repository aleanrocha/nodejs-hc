module.exports = class AuthController {
  static async login(req, res) {
    return res.render('auth/login')
  }
  static async register(req, res) {
    return res.render('auth/register')
  }
}
