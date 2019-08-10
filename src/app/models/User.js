const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
    minlength: 5,
    maxlength: 100,
    lowercase: true
  },

  email: {
    type: String,
    required: false,
    trim: true,
    minlength: 5,
    maxlength: 100,
    lowerc3ase: true,
    unique: true
  },

  password: {
    type: String,
    required: false,
    min: 5,
    maxlength: 15
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

// utilizando métodos do mongoose
UserSchema.pre('save', async function (next) {
  // verifica so esse schema, o campo password teve alteracao, senao teve, nao faz nada
  if (!this.isModified('password')) {
    return next()
  }

  // bcrypt recebe a senha que quer criptografar
  // e depois o nivel de força da criptografia
  this.password = await bcrypt.hash(this.password, 8)
})

// criando métodos do model
UserSchema.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

// criando métodos estáticos
UserSchema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, require('../../config/config').secretKey, {
      expiresIn: require('../../config/config').ttl
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
