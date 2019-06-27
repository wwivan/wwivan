const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String},
  parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}//关联
})
schema.virtual('children',{
  localField:"_id",
  foreignField:"parent",
  justOne:false,
  ref:"Category"
})

schema.virtual('newsList',{
  localField:"_id",
  foreignField:"categories",
  justOne:false,
  ref:"Article"
})


try {//解决重复定义的问题
  module.exports = mongoose.model('Category', schema)
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    module.exports = mongoose.model('Category')
  }
}