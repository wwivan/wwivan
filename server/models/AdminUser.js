const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select: false, //添加之后密码查不出来，主要防止二次转化
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  }
})
try {//解决重复定义的问题
  module.exports = mongoose.model('AdminUser', schema)
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    module.exports = mongoose.model('AdminUser')
  }
}