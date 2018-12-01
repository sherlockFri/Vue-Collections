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
      <swiper :options="swiperOption" v-if="bannerPic.length">
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
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods " :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import axios from 'axios'

export default {
  name: "ShoppingMall",
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      swiperOption: {
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
      url: 'https://www.easy-mock.com/mock/5c02242210c9227e21fe7932/phonemall/index',
      methods: 'get'
    })
    .then(res => {
      if (res.status === 200) {
        let data = res.data.data
        console.log(data)
        this.category = data.category
        this.bannerPic = data.slides
        this.adBanner = data.advertesPicture.PICTURE_ADDRESS
        this.recommendGoods = response.data.data.recommend;
        this.floor1 = response.data.data.floor1;
        this.floor2 = response.data.data.floor2;
        this.floor3 = response.data.data.floor3;
        this.floorName = response.data.data.floorName;
        this.hotGoods = response.data.data.hotGoods;
        
      }
    })
    .catch(err => {
      console.log(err)
    })
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

  .recommend-area{}
 
</style>

