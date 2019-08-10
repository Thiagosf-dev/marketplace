const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body // recebe o id do anúncio e uma mensagem digitada pelo interessado

    const purchaseAd = await Ad.findById(ad).populate('author') // verifica se existe esse anúncio e traz os dados do autor
    const user = await User.findById(req.userId) // busca informações do usuário logado

    await Mail.sendMail({
      from: '"Thiago Soares Figueiredo" <thiagosf.dev@gmail.com>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra para o anúncio ${purchaseAd.title}`,
      template: 'purchase',
      context: { user, content, ad: purchaseAd }
    })

    return res.json()
  }
}

module.exports = new PurchaseController()
