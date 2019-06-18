const express = require('express')

const app = express()
app.set('SECRET','fjwigbiabagbnfe')
app.use(require('cors')())//应用后可被跨域访问
app.use(express.json())//req.body转成json数据

app.use('/uploads',express.static(__dirname + '/uploads'))//导出静态文件到server下的uploads文件夹
require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})