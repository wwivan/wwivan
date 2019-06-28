<template>
  <div class="card p-3 bg-white mt-3 ">
    <div v-if="title === '英雄列表'" class="card-header ">
      <div class="d-flex ai-center pb-3">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2">{{ title }}</div>
        <i class="iconfont icon-menu1"></i>
      </div>
      <div class="w-100 mb-2">
        <img src="../assets/images/1538459038600.jpg" class="w-100" alt="" />
      </div>
    </div>
    <div v-else class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{ title }}</div>
      <i class="iconfont icon-menu1"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }
  }
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>
