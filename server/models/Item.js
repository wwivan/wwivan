const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  },
  body: {}
})

try { //解决重复定义的问题
  module.exports = mongoose.model('Item', schema)
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    module.exports = mongoose.model('Item')
  }
}