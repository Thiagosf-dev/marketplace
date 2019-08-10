const Joi = require('joi')

module.exports = {
  body: {
    title: Joi.string().required().trim().uppercase().min(5).max(100),
    description: Joi.string().required().min(5).max(150),
    price: Joi.number().required().min(0).positive()
  }
}
