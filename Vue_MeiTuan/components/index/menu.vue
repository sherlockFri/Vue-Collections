<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item,idx) in menu"
        :key="idx"
        @mouseenter="enter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="sover"
      @mouseleave="sout">
      <template
        v-for="(item,idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      kind:'',
      menu:[]
    }
  },
  computed:{
    curdetail:function(){
      return this.menu.filter(item => item.type===this.kind)[0]
    }
  },
  mounted() {
    this.menu = this.$store.state.home.menu
  },
  methods: {
    mouseleave() {
      this._timer = setTimeout(() => {
        this.kind=''
      },150)
    },
    enter(e){
      this.kind=e.target.querySelector('i').className
    },
    sover() {
      clearTimeout(this._timer)
    },
    sout() {
      this.kind=''
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
