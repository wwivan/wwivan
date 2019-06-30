<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="Router" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view class="Router" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  mounted() {},
  watch: {
    $route(to, from) {
      // 切换动画
      let isBack = this.$router.isBack; // 监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-right";
        from.meta.keepAlive = false;
        to.meta.keepAlive = true;
        // console.log('退后不缓存from' + JSON.stringify(from.path))
        // console.log('退后缓存to' + JSON.stringify(to.path))
      } else {
        from.meta.keepAlive = true;
        to.meta.keepAlive = false;
        // console.log('前进缓存from' + JSON.stringify(from.path))
        // console.log('前进不缓存to' + JSON.stringify(to.path))
        if (this.$route.path.split("/").length < 3) {
          this.transitionName = "slide-fade";
        } else {
          this.transitionName = "slide-left";
        }
      }
      this.$router.isBack = false;
    }
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
}

a.active {
  text-decoration: none;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
  height: 100%;
  //渐变动效
  .Router {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.377s ease;
    box-sizing: border-box;
    overflow: auto;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
}
</style>
