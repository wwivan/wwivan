module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
    useNewUrlParser: true,
    useCreateIndex: true
  })


require("require-all")(__dirname + "/../models")//引用所有的model

}