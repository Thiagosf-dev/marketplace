const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não gerado' })
  }

  // exclui a palavra BEARER que vem no header da request, ficando apenas com o número do token
  const [, token] = authHeader.split(' ')

  try {
    // retorna uma promisse usando método utilitário no nodejs (casting para a função jwt.verify)
    const decoded = await promisify(jwt.verify)(token, require('../../config/config').secretKey)

    req.userId = decoded.id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
