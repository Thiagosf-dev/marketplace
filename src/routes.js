const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const routes = express.Router()

routes.get('/teste', (req, res) => {
  res.send('Bem-vindo')
})

// importando os validadores
const validators = require('./app/validators')

// importação dos controlles
const controllers = require('./app/controllers')
const authMiddleware = require('./app/middlewares/auth')

// rotas não-autenticáveis
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))
routes.post('/users', validate(validators.User), handle(controllers.UserController.store))

// adiciona a validação de token para todas as rotas a partir da qui
routes.use(authMiddleware)

/**
 * ADS
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post('/ads', validate(validators.Ad), handle(controllers.AdController.store))
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * PURCHASE
 */
routes.post('/purchases', validate(validators.Purchase), handle(controllers.PurchaseController.store))

module.exports = routes
