<template>
  <div>
    <detail-banner
      :sightName="sightName"
      :bannerImg="bannerImg"
      :gallaryImgs="gallaryImgs"
    ></detail-banner>
    <detail-header></detail-header>
    <div class="content">
      <detail-list :list="list"></detail-list>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import DetailBanner from './components/banner'
import DetailHeader from './components/header'
import DetailList from './components/list'
import axios from 'axios'
export default {
  name: 'Detail',
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  data() {
    return {
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      list: []
    }
  },
  methods: {
    getDetailInfo() {
      axios.get('/api/detail.json?id=' + this.$route.params.id)
        .then(this.getDetailSucc)
    },
    getDetailSucc(res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.sightName = data.sightName
        this.bannerImg = data.bannerImg
        this.gallaryImgs = data.gallaryImgs
        this.list = data.categoryList
      }
    }
  },
  mounted() {
    this.getDetailInfo()
  }
}
</script>
<style lang='scss' scoped>
  .content{
    height: 50rem;
  }
</style>
