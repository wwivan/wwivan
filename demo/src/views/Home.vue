<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/115508ceaf06034694207114258ac83c.jpeg"
          alt=""
        />
      </swiper-slide>
      <swiper-slide
        ><img
          class="w-100"
          src="../assets/images/57d44539c1cf5ab41c6a0290dedba253.jpeg"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          class="w-100"
          src="../assets/images/fd2d3e636e22ff8adf769060d15fcd21.jpeg"
          alt=""
      /></swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      }
    };
  }
};
</script>

<style lang="scss">
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: #fff !important;
    &.swiper-pagination-bullet-active {
      background: #4b67af !important;
    }
  }
}
</style>
