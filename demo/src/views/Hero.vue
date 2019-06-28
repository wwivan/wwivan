<template>
  <div v-if="model">
    <div class="header w-100 bg-dark" style="height:15.3846rem;overflow:hidden">
      <div class="cover w-100 bg-dark">
        <div class="content px-3 text-white fs-sm">
          <h3>{{ model.title }}</h3>
          <h2>{{ model.name }}</h2>
          <span v-for="(item, i) in categories" :key="i">
            {{ item.name }}
            <span v-show="i !== categories.length - 1">|</span>
          </span>
        </div>
      </div>
      <div class="image" style="transform:translateY(-180px);">
        <img class="w-100" :src="model.skins[2].skin" alt="" />
      </div>
    </div>
    <div class="d-flex jc-around ai-center pl-3 pt-3 big-box">
      <div v-for="(item, i) in items1" :key="i" class="box w-20 ">
        <img class="w-100" :src="item.icon" alt="" />
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
      model: null,
      categories: [],
      items1: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
      let _id;
      for (_id of this.model.categories) {
        const res1 = await this.$http.get(`categories/${_id}`);
        this.categories.push(res1.data);
      }
      let item;
      for (item of this.model.items1) {
        const res1 = await this.$http.get(`items1/${item}`);
        this.items1.push(res1.data);
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.header {
  position: relative;
  .cover {
    position: absolute;
    z-index: 2;
    height: 15.3846rem;
    background: linear-gradient(rgba(116, 115, 115, 0), rgba(0, 0, 0, 0.6));
    .content {
      position: absolute;
      bottom: 50px;
    }
  }
  .image {
    position: absolute;
    z-index: 1;
  }
}
.big-box {
  .box {
    border-radius: 50%;
    overflow: hidden;
    display: table-cell;
  }
}
</style>
