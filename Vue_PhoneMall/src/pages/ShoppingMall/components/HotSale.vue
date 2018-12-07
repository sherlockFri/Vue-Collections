<template>
  <div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
      <div class="goods-item" 
          v-for="(item,index) in hotGoods"
          :key="item.goodsId"
          :class="{'border-rightbottom': index % 2 === 0, 'border-bottom': index % 2 === 1}"
          @click="detailPage(item.goodsId)"
      >
        <img v-lazy="item.image" alt="">
        <p class="goods-name">{{item.name}}</p>
        <span class="goods-price">￥{{item.price | moneyFilter}}</span>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { toMoney } from "@/filter/moneyFilter.js"
export default {
  name: "HotSale",
  props:{
    hotGoods: {
      type: Array,
      required: true
    } 
  },
  data() {
    return {};
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    detailPage(ID) {
      // this.$router.push({path: '/goods', query: {goodsId: ID}})
      this.$router.push({name: 'Goods', params: {goodsId: ID}})
    }
  }
};
</script>
<style lang="scss" scoped>
.hot-title {
  text-align: center;
  line-height: 3;
  font-size: .6rem;
  color: #ED6434;
  font-weight: bold;
}
.hot-goods{
  background: #fff;
  display: flex;
  flex-wrap: wrap;
}
.goods-item{
  width: 50%;
  text-align: center;
  padding: 0 2%;
  padding-bottom: .2rem;
  img{width: 70%;}
  .goods-name{
    white-space:nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: .2rem 0;
  }
}
</style>
