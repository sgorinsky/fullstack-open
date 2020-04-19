const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  favoriteGenre: {
    type: String,
    required: true
  },
  token: String
})

module.exports = mongoose.model('User', schema)