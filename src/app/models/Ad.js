const mongoose = require("mongoose");

const Ad = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true,
    default: ""
  },

  description: {
    type: String,
    required: false,
    trim: true,
    default: ""
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
    default: ""
  },

  price: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0.0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ad", Ad);
