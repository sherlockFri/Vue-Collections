<template>
  <div class="container" @click="handleGalleryClick">
    <div class="wrapper">
      <swiper :options="swiperOptions" class="gallery-swiper-container">
        <swiper-slide v-for="(item, index) in imgs" :key="index">
          <img
            class="gallery-img"
            :src="item" alt="" >
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination" ></div>
      </swiper>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'CommonGallery',
  props: {
    imgs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        observeParents: true,
        observer: true
      }
    }
  },
  methods: {
    handleGalleryClick() {
      this.$emit('close')
    }
  }
}
</script>
<style>
  .gallery-swiper-container{
    overflow: inherit;
  }
</style>
<style lang='scss' scoped>
  .container{
    display: flex;
    z-index: 99;
    position: fixed;
    flex-direction: column;
    justify-content: center;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #000;
    .wrapper{
      height: 0;
      width: 100%;
      padding-bottom: 100%;
      .gallery-img{
        width: 100%;
      }
      .swiper-pagination{
        color: #fff;
        bottom: -1rem;
      }
    }
  }
</style>
