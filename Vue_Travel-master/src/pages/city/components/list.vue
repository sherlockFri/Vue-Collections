<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{this.currentCity}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper"
            v-for="item in hot"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div
        class="area"
        v-for="(item, key) in cities"
        :key="key"
        :ref="key"
      >
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list"
          v-for="city in item"
          :key="city.id"
          @click="handleCityClick(city.name)"
        >
          <div class="item border-bottom">{{city.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Bscroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CityList',
  props: {
    cities: Object,
    hot: Array,
    letter: String
  },
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
  methods: {
    handleCityClick(city) {
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper)
  },
  watch: {
    letter() {
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .border-topbottom{
    &:before{
      border-color: #ccc;
    }
    &:after{
      border-color: #ccc;
    }
  }
  .border-bottom{
    &:before{
      border-color: #ccc;
    }
  }
  .list{
    overflow: hidden;
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;
    .area{
      .title{
        line-height: .54rem;
        padding-left: .2rem;
        background: #eee;
        color: #666;
        font-size: .26rem;
      }
      .button-list{
        overflow: hidden;
        padding: .1rem .6rem .1rem .1rem;
        .button-wrapper{
          float: left;
          width: 33.33%;
          .button{
            margin: .1rem;
            padding: .1rem 0;
            text-align: center;
            border: .02rem solid #ccc;
            border-radius: .06rem;
          }
        }
      }
      .item-list{
        .item{
          line-height: .76rem;
          padding-left: .2rem;
        }
      }
    }
  }
</style>
