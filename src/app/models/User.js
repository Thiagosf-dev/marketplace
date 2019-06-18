const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: false,
    trim: true,
  },

  email: {
    type: String,
    require: false,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    require; false,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
