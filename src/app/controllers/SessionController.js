const User = require('../models/User')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    const isValidUser = await user.compareHash(password)

    if (!user || !isValidUser) {
      return res.status(400).json({ error: 'Usuário e/ou senha inválido(s)' })
    }

    return res.json({
      user,
      token: User.generateToken(user)
    })
  }
}

module.exports = new SessionController()
