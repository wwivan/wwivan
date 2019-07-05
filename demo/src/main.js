import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import Card from "./components/Card.vue";
import ListCard from "./components/ListCard.vue";
import Drag from "./components/Drag.vue";

import VueDND from "awe-dnd";

Vue.use(VueDND);

Vue.use(VueAwesomeSwiper);
Vue.component("m-card", Card);
Vue.component("m-list-card", ListCard);
Vue.component("m-drag", Drag);
Vue.config.productionTip = false;
import "./assets/iconfont/iconfont.css";
import "./assets/scss/style.scss";
window.addEventListener(
  "popstate",
  function() {
    router.isBack = true;
  },
  false
);

import VueLazyload from "vue-lazyload";

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "./assets/images/logo.png",
  loading: "./assets/images/5-121204193934-51.gif",
  attempt: 1
});

import axios from "axios";
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/web/api"
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
