const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String},
  icon:{type:String},
  body:{}
})

module.exports = mongoose.model('Item',schema)