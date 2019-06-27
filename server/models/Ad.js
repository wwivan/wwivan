const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String },
  }]
})

try {//解决重复定义的问题
  module.exports = mongoose.model('Ad', schema)
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    module.exports = mongoose.model('Ad')
  }
}