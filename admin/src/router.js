import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEidt.vue'
import CategoryList from './views/CategoryList.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'main',
    component: Main,
    children: [{
        path: "/categories/create",
        component: CategoryEdit
      },
      {
        path: "/categories/list",
        component: CategoryList
      }
    ]
  }, ]
})