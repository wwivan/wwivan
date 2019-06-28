<template>
  <div class="scroll">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
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
      <!-- <div
        class="swiper-button-prev swiper-button-black"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-black"
        slot="button-next"
      ></div> -->
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div
          class="nav-item mb-3"
          v-for="n in isshow === true ? 10 : 4"
          :key="n"
        >
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i v-show="isshow" class="sprite sprite-arrow mr-1"></i>
        <i v-show="!isshow" class="sprite sprite-down-arrow mr-1"></i>
        <span v-show="isshow" @click="isshow = !isshow">收起</span>
        <span v-show="!isshow" @click="isshow = !isshow">展开</span>
      </div>
    </div>
    <!-- end of nav-icons -->
    <m-list-card icon="menu" title="新闻资讯" :categories="newsCates">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-grey">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCates">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <div
            class="p-2 text-center  w-20"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" alt="" />
            <div>{{ hero.name }}</div>
          </div>
        </div>
      </template>
    </m-list-card>
    <m-list-card icon="menu" title="精彩视频" :categories="heroCates">
    </m-list-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  name: "HelloWorld",
  data() {
    return {
      newsCates: [],
      heroCates: [],
      isshow: true,
      swiperOption: {
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        // autoplay: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        // 设置轮播
        effect: "flip",
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        // grabCursor : true,
        //滑动之后回调函数
        // on: {
        //   slideChangeTransitionEnd: function() {
        //     // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
        //   }
        // },
        //左右点击
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // },
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
      // swiperSlides: [1, 2, 3, 4]
    };
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCates = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCates = res.data;
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
  // mounted() {
  //   //可以使用swiper这个对象去使用swiper官网中的那些方法
  //   console.log("this is current swiper instance object", this.swiper);
  //   // this.swiper.slideTo(0, 0, false);
  // }
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";
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

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
