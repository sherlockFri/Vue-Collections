<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="img in swiperList" :key='img.id' >
        <img class="swiper-img" :src="img.imgUrl" alt="" >
      </swiper-slide>
      <div class="swiper-pagination my"  slot="pagination" ></div>
    </swiper>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'homeSwiper',
  props: {
    'swiperList': [Array]
  },
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  computed: {
    showSwiper() {
      return this.swiperList.length
    }
  }
}
</script>
<style>
  .wrapper .swiper-pagination-bullet-active{
    background: #fff;
  }
</style>

<style lang='scss' scoped>
  .wrapper{
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 31.25%;
    background: #eee;
    .swiper-img{
      width: 100%;
    }
  }
</style>
