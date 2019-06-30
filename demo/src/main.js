import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import Card from "./components/Card.vue";
import ListCard from "./components/ListCard.vue";
Vue.use(VueAwesomeSwiper);
Vue.component("m-card", Card);
Vue.component("m-list-card", ListCard);
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

import axios from "axios";
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/web/api"
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
