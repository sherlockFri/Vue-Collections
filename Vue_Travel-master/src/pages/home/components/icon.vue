<template>
  <div class="icons">
     <swiper :options="swiperOption" >
      <swiper-slide v-for="(page, index) in pages" :key="index">
        <div class="icon"  v-for="item in page" :key="item.id">
          <img class="icon-img" :src="item.imgUrl" alt="">
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination" ></div>
    </swiper>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'HomeIcon',
  props: {
    'iconList': [Array]
  },
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination'
      }
    }
  },
  computed: {
    pages() {
      let pages = []
      this.iconList.map((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>
<style>
  .icons .swiper-pagination-bullet-active{
    background: rgba(0,175,190,.8);
  }
</style>
<style lang='scss' scoped>
  @import '~styles/varibles.scss';
  @import '~styles/mixins.scss';
  .icons {
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 50%;
    margin-top: .1rem;
    .icon {
      float: left;
      height: 0;
      width: 25%;
      padding-bottom: 25%;
      text-align: center;
      .icon-img{
        width: 80%;
      }
      .icon-desc{
        color: $darkTextColor;
        @include ellipsis;
      }
    }
  }
</style>
