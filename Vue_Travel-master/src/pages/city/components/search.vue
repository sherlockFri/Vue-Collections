<template>
  <div>
    <div class="search">
      <input
        class="search-input"
        type="text"
        placeholder="输入城市或拼音"
        v-model="keyword"
      >
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li class="search-item border-bottom"
          v-for="item in list"
          :key="item.id"
          @click="handleCityClick(item.name)"
        >{{item.name}}</li>
        <li class="search-item border-bottom" v-show="hasNoData">没有匹配数据</li>
      </ul>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'citysearch',
  props: {
    cities: Object
  },
  data() {
    return {
      keyword: '',
      timer: null,
      list: []
    }
  },
  methods: {
    handleCityClick(city) {
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  computed: {
    hasNoData() {
      return !this.length
    }
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const result = []
        if (this.keyword) {
          for (let i in this.cities) {
            this.cities[i].forEach((value) => {
              if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
                result.push(value)
              }
            })
          }
        }
        this.list = result
      }, 100)
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.search)
  }
}
</script>
<style lang='scss' scoped>
   @import 'styles/varibles.scss';
  .search{
    height: .72rem;
    background: $bgColor;
    padding: 0 .1rem;
    .search-input{
      box-sizing: border-box;
      width: 100%;
      height: .62rem;
      line-height: .62rem;
      text-align: center;
      border-radius: .06rem;
      color: #666;
      padding: 0 .1rem;
    }
  }
  .search-content{
    z-index: 1;
    overflow: hidden;
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #eee;
    .search-item{
      line-height: .62rem;
      padding-left: .2rem;
      color: #666;
      background: #fff;
    }
  }
</style>
