module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Categroy = require('../../models/Category')
  //创建详情
  router.post('/categories', async (req, res) => {
    const model = await Categroy.create(req.body)
    res.send(model)
  })
  //更新详情
  router.put('/categories/:id', async (req, res) => {
    const model = await Categroy.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //获取详情
  router.get('/categories', async (req, res) => {
    const items = await Categroy.find().limit(10)
    res.send(items)
  })
  //根据id获取详情
  router.get('/categories/:id', async (req, res) => {
    const model = await Categroy.findById(req.params.id)
    res.send(model)
  })
  //删除详情
  router.delete('/categories/:id', async (req, res) => {
    await Categroy.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  app.use('/admin/api', router)
}