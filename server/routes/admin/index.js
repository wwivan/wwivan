module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  //创建详情
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //更新详情
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //获取详情
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent"
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10) //populate关联
    res.send(items)
  })
  //根据id获取详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  //删除详情
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource) //将关联的resource的字段转换为大写开头的单数el:categories:Category
    req.Model = require(`../../Models/${modelName}`)
    next()
  }, router)
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}