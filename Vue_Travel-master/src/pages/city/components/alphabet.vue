<template>
  <div>
    <ul class="list">
      <li
        class="item"
        v-for="item in letters"
        :key="item"
        :ref="item"
        @click="handleLetterClick"
        @touchstart.prevent="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'CityAlpahbet',
  props: {
    cities: Object
  },
  computed: {
    letters() {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  updated() {
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick(e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart() {
      this.touchStatus = true
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchEnd() {
      this.touchStatus = true
    }
  }
}
</script>
<style lang='scss' scoped>
  @import 'styles/varibles.scss';
  .list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1.58rem;
    right: 0;
    bottom: 0;
    width: .4rem;
    .item{
      line-height: .4rem;
      text-align: center;
      color: $bgColor;
    }
  }
</style>
