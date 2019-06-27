import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue'
import CategoryEdit from './views/CategoryEidt.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'
import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [{
          path: "/categories/create",
          component: CategoryEdit
        },
        {
          path: "/categories/edit/:id",
          component: CategoryEdit,
          props: true
        },
        {
          path: "/categories/list",
          component: CategoryList
        },

        {
          path: "/items/create",
          component: ItemEdit
        },
        {
          path: "/items/edit/:id",
          component: ItemEdit,
          props: true
        },
        {
          path: "/items/list",
          component: ItemList
        },

        {
          path: "/heroes/create",
          component: HeroEdit
        },
        {
          path: "/heroes/edit/:id",
          component: HeroEdit,
          props: true
        },
        {
          path: "/heroes/list",
          component: HeroList
        },
        {
          path: "/articles/create",
          component: ArticleEdit
        },
        {
          path: "/articles/edit/:id",
          component: ArticleEdit,
          props: true
        },
        {
          path: "/articles/list",
          component: ArticleList
        },
        {
          path: "/admin_users/create",
          component: AdminUserEdit
        },
        {
          path: "/admin_users/edit/:id",
          component: AdminUserEdit,
          props: true
        },
        {
          path: "/admin_users/list",
          component: AdminUserList
        },
        {
          path: "/ads/create",
          component: AdEdit
        },
        {
          path: "/ads/edit/:id",
          component: AdEdit,
          props: true
        },
        {
          path: "/ads/list",
          component: AdList
        },
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {//客户端路由限制
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router