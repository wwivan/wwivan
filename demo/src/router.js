import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
// import Home from "./views/Home.vue";
import Home from "./views/Home1.vue";
import Article from "./views/Article.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        {
          path: "/",
          name: "home",
          component: Home
        },
        {
          path: "articles/:id",
          name: "article",
          component: Article,
          props: true
        }
      ]
    }
  ]
});
