<template>
  <div>
    <div class="search-bar flex ">
      <div class="icon">
        <img :src="locationIcon" alt="">
      </div>
      <div class="search-input border-bottom">
        <input type="text" >
      </div>
      <div class="search-button">
        <button>查找</button>
      </div>
    </div>
    <!-- swiper area -->
    <div class="swiper-wrap">
      <swiper :options="swiperOption1" v-if="bannerPic.length">
        <swiper-slide v-for="img in bannerPic" :key='img.goodsId' >
          <img class="swiper-img swiper-lazy" :data-src="img.image" alt="" >
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination" ></div>
      </swiper>
    </div>
    <!--type bar-->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index" class="type">
        <span class="type-img"><img v-lazy="cate.image" ></span>
        <span class="type-name">{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--adbanner area-->
    <div class="ad">
      <img :src="adBanner" width="100%">
    </div>
     <!--Recommend goods area-->
    <recommend-goods :recommendGoods='recommendGoods'></recommend-goods>
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
    <!--hot-sale area-->
    <hot-sale :hotGoods="hotGoods"></hot-sale>
   
  </div>
</template>

<script type='text/ecmascript-6'>

import axios from 'axios'
import floorComponent from "../../component/floorComponent";
import { toMoney } from "@/filter/moneyFilter.js"
import HotSale from './components/HotSale'
import RecommendGoods from './components/RecommendGoods'
import url from "@/serviceAPI.config.js";

export default {
  name: "ShoppingMall",
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      swiperOption1: {
        lazy: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },

        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },

        loop: true,
      },
    
      
      bannerPic: [],
      category: [],
      adBanner: [],
      recommendGoods: [],
     
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品

    };
  },

  created() {
    axios({
      url: url.getShopingMallInfo,
      methods: 'get'
    })
    .then(res => {
      if (res.status === 200) {
        let data = res.data.data
        // console.log(data)
        this.category = data.category
        this.bannerPic = data.slides
        this.adBanner = data.advertesPicture.PICTURE_ADDRESS
        this.recommendGoods = data.recommend;
        this.floor1 = data.floor1;
        this.floor2 = data.floor2;
        this.floor3 = data.floor3;
        this.floorName = data.floorName;
        this.hotGoods = data.hotGoods;
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  components: {
    floorComponent,
    HotSale,
    RecommendGoods
  }
};
</script>
<style >
  .swiper-pagination-bullet-active{
    background: #e5017d;
   
  }
</style>
<style lang="scss" scoped>
  .search-bar{
     background-color: #e5017d;
     padding: .2rem 0;
    .icon{
      width: 10%;
      text-align: center;
      img{width: 50%;}
    }
    .search-input{
      flex: 1;
      input{
        width: 100%; 
        background: none;
        line-height: .85rem;
        padding-left: .2rem;
        color: #fff;
        font-size: .377rem;
      }
    }
    .search-button{
      width: 15%;
      text-align: center;
      button{
        width: 80%;
        line-height: .8rem;
        font-size: .4rem;
        background: #fff;
        font-weight: bold;
        border-radius: .2rem;
        color: rgb(107, 102, 102);
      }
    }
  }

  .swiper-wrap{
    background: #f0f0f0;
    height: 0;
    overflow: hidden;
    padding-bottom: 44.64%;
  }

  .type-bar{
    display: flex;
    .type{
      width: 20%;
      text-align: center;
      margin: .2rem 0;
      background: #fff;
      padding: .1rem;
      .type-img{
        display: inline-block;
        width: 70%;
        background: #fff;
        height: 0;
        overflow: hidden;
        padding-bottom: 70%;
        
      }
      .type-name{display: block;width: 100%;margin-top: .2rem;}
    }
  }

  .ad{
    
    height: 0;
    overflow: hidden;
    padding-bottom: 8.88%;
  }

  
 
</style>

