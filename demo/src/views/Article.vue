<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom text-blue">
      <div class="iconfont icon-back mr-1" @click="back"></div>
      <strong class="flex-1">
        {{ model.title }}
      </strong>
      <div class="text-grey">
        2019-06-19
      </div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg text-center"></div>
    <div class="px-3">
      <div class="border-top py-3">
        <i class="iconfont icon-menu"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          class="py-1"
          tag="div"
          v-for="item in model.related"
          :to="`/articles/${item._id}`"
          :key="item._id"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id() {
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
