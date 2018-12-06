<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格 ：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">评论制作中</van-tab>
      </van-tabs>
    </div>

    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter.js";

export default {
  name: "Goods",
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: { goodsId: this.goodsId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
          } else {
            Toast("服务器错误，数据获取失败");
          }
          // console.log(this.goodsInfo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId 
                  ? this.$route.query.goodsId 
                  : this.$route.params.goodsId
            console.log(this.goodsId)
    // this.goodsId= this.$route.params.goodsId
    this.getInfo();
  }
};
</script>
<style lang="scss" scoped>
.goods-name {
  background-color: #fff;
  text-align: center;
  padding: .2rem 0;
  font-size: .45rem;
}
.goods-price {
  background-color: #fff;
  text-align: center;
  font-size: .4rem;
  padding: .2rem 0;

}
.detail {
  font-size: 0px;
  padding-bottom: 60px;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  z-index: 999;
}

.goods-bottom > div {
  flex: 1;
  padding: 5px;
}

.van-tabs .van-tab__pane{
  width: 100% !important;
}
</style>
