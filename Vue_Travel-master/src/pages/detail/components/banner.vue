<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" :src="bannerImg" alt="">
      <div class="banner-info">
        <div class="banner-title">{{sightName}}</div>
        <div class="banner-number">
          <span class="iconfont banner-icon ">&#xe604;</span>
          {{gallaryImgs.length}}
        </div>
      </div>
    </div>
    <FadeAnimation>
      <common-gallery
        :imgs="gallaryImgs"
        v-show="showGallery"
        @close="close"
      ></common-gallery>
    </FadeAnimation>
  </div>
</template>

<script type='text/ecmascript-6'>
import CommonGallery from '@/common/gallery/gallery'
import FadeAnimation from '@/common/fade/fadeanimation'
export default {
  name: 'DetailBanner',
  props: {
    sightName: String,
    bannerImg: String,
    gallaryImgs: Array
  },
  components: {
    CommonGallery,
    FadeAnimation
  },
  data() {
    return {
      showGallery: false
    }
  },
  methods: {
    handleBannerClick() {
      this.showGallery = true
    },
    close() {
      this.showGallery = false
    }
  }
}
</script>
<style lang='scss' scoped>
  .banner{
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 55%;
    .banner-img{
      width: 100%;
    }
    .banner-info{
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      line-height: .6rem;
      color: #fff;
      background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
      .banner-title{
        flex: 1;
        font-size: .32rem;
        padding: 0 .2rem;
      }
      .banner-number{
        padding: 0 .4rem;
        height: 0.32rem;
        line-height: .32rem;
        margin-top: .14rem;
        border-radius: .2rem;
        background: rgba(0, 0, 0, .8);
        font-size: .24rem;
        .banner-icon{
          font-size: .24rem;
        }
      }
    }
  }
</style>
