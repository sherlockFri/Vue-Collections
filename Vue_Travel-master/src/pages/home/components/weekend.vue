<template>
  <div>
    <div class="recommend-title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom"
          v-for="item in weekendList"
          :key="item.id"
      >
        <div class="item-img-wrapper">
          <img :src="item.imgUrl" alt="" class="item-img">
        </div>
        <div class="item-info">
          <div class="item-title">{{item.title}}</div>
          <div class="item-desc">{{item.desc}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'HomeRecommend',
  props: {
    'weekendList': [Array]
  },
  data() {
    return {}
  }
}
</script>
<style lang='scss' scoped>
  @import '~styles/mixins.scss';
  .recommend-title{
    line-height: .8rem;
    background: #eee;
    text-indent: .2rem;
  }
  .item-img-wrapper{
    height: 0;
    overflow: hidden;
    padding-bottom: 37.09%;
    .item-img{
      width: 100%;
    }
  }
  .item-info{
    padding: .1rem;
    .item-title{
      line-height: .54rem;
      font-size: .32rem;
      @include ellipsis;
    }
    .item-desc{
      line-height: .4rem;
      color: #ccc;
      @include ellipsis;
    }
  }
</style>
