vue create admin 创建admin管理后台项目
通过 vue add element使用element-ui组件
vue add router 添加路由
将app.vue文件初始化只保留<router-view></router-view>
在view文件夹下创建Main.vue 使用el组件填充并修改成想要的样式：只留下新建分类、分类列表 container部分原有的内容更改为一个router-view
创建CategoryEdit.vue 双向绑定并post请求


server部分
index.js内容+配置跨域+配置app.use(express.json())+调用db.js暴露出的函数+调用routes/admin/index暴露出的函数

初始化mongoose 并将model与db.js分离

routes/admin/index 配置各种接口 post/get/...且都是通过router

admin部分：categoryedit.vue post请求（在这之前初始化一个全局的http请求方法使用axios并且在main.js里 Vue.prototype.$http = http 暴露出$http）

