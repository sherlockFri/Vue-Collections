<template>
  <div>
    <div class="recommend-title">热销推荐</div>
    <ul>
      <router-link
        tag="li"
        class="item border-bottom"
        v-for="item in recommendList"
        :key="item.id"
        :to="'/detail/' + item.id"
      >
        <img :src="item.imgUrl" alt="" class="item-img">
        <div class="item-info">
          <div class="item-title">{{item.title}}</div>
          <div class="item-desc">{{item.desc}}</div>
          <button class="item-button">查看详情</button>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'HomeRecommend',
  props: {
    'recommendList': [Array]
  },
  data() {
    return {}
  }
}
</script>
<style lang='scss' scoped>
  @import '~styles/mixins.scss';
  .recommend-title{
    margin-top: .2rem;
    line-height: .8rem;
    background: #eee;
    text-indent: .2rem;
  }
  .item{
    overflow: hidden;
    height: 1.9rem;
    display: flex;
    .item-img{
      width: 1.7rem;
      height: 1.7rem;
      padding: .1rem;
    }
    .item-info{
      flex: 1;
      padding: .1rem;
      min-width: 0;
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
      .item-button{
        line-height: .44rem;
        margin-top: .16rem;
        background: #ff9300;
        padding: 0 .2rem;
        border-radius: .06rem;
        color: #fff;
      }
    }
  }
</style>
