module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')


  // 中间件
  const authMiddleware = async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请提供jwt token')
    const {
      id
    } = jwt.verify(token, app.get('SECRET'))
    assert(id, 401, '无效的jwt token')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }

  const resourceMiddleware = async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource) //将关联的resource的字段转换为大写开头的单数el:categories:Category
    req.Model = require(`../../Models/${modelName}`)
    next()
  }

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
    const items = await req.Model.find().setOptions(queryOptions).limit(100) //populate关联
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

  app.use('/admin/api/rest/:resource', authMiddleware, resourceMiddleware, router)
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload', authMiddleware,upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })


  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = await req.body
    //根据用户名找用户
    const user = await AdminUser.findOne({
      username
    }).select('+password') //因为默认不取password所用+password models里password select：false

    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    //校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    //返回token
    const token = jwt.sign({
      id: user._id,
    }, app.get('SECRET'))
    res.send({
      token
    })
  })

  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}