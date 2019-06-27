const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  title: { type: String },
  body: { type: String },
}, {
  timestamps: true//时间戳
})

try {//解决重复定义的问题
  module.exports = mongoose.model('Article', schema)
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    module.exports = mongoose.model('Article')
  }
}