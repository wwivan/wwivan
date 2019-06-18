import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from "./http"
import http1 from "./http1"



Vue.prototype.$http = http //将导出的http配置成全局的$http
Vue.prototype.$http1 = http1 //将导出的http配置成全局的$http

Vue.mixin({//全局配置请求头里，防止图片等文件无法上传
  computed: {
    uploadUrl(){
      return this.$http1.defaults.baseURL +'/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token||''}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')