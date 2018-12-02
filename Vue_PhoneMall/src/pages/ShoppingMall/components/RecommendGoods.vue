<template>
  <div class="recommend-area">
    <div class="recommend-title border-bottom">商品推荐</div>
    <div class="recommend-body">
      <swiper :options="swiperOption2" v-if="recommendGoods.length">
        <swiper-slide v-for="(item,index) in recommendGoods " :key="index">
          <div class="recommend-item">
            <div class="item-image">
              <img :src="item.image">
            </div>
            <div class="item-name">{{item.goodsName}}</div>
            <div class="item-price">
              <span class="price-new">￥{{item.price | moneyFilter}}</span>
              <br>
              <del class="price-old">￥{{item.mallPrice | moneyFilter}}</del>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { toMoney } from "@/filter/moneyFilter.js"
export default {
  name: "RecommendGoods",
  props: {
    recommendGoods: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOption2: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false
        // },
      
      },
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
};
</script>
<style lang="scss" scoped>
.recommend-area {
  .recommend-body {
    background: #fff;
  }
  .recommend-title {
    color: #ed6434;
    font-size: 0.5rem;
    margin-top: 0.2rem;
    background: #fff;
    line-height: 2;
    padding-left: 0.2rem;
  }
  .recommend-item {
    text-align: center;
    padding-bottom: 0.2rem;
    .item-image {
      height: 0;
      padding-bottom: 80%;
      img {
        width: 80%;
      }
    }
    .item-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-height: 1.3;
    }
  }
  .item-price {
    margin-top: 0.2rem;
    del {
      font-size: 0.35rem;
      color: #cacaca;
    }
  }
}
</style>
