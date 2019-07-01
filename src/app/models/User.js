const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: false,
    trim: true
  },

  email: {
    type: String,
    require: false,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    require: false,
    trim: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// utilizando métodos do mongoose
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  console.log("object");
  // bcrypt recebe a senha que quer criptografar
  // e depois o nivel de força da criptografia
  this.password = await bcrypt.hash(this.password, 8);
});

// criando métodos do model
UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};

// criando métodos estáticos
UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, authConfig.secretKey, {
      expiresIn: authConfig.ttl
    });
  }
};

module.exports = mongoose.model("User", UserSchema);
