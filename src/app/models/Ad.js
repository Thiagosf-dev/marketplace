const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Ad = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },

  description: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },

  author: {
    type: String,
    ref: 'User',
    required: true
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
})

// vinculando plugins para este schema
Ad.plugin(mongoosePaginate)

module.exports = mongoose.model('Ad', Ad)
