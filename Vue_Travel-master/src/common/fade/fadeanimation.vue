<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'FadeAnimation',
  data() {
    return {}
  }
}
</script>
<style lang='scss' scoped>
  .v-enter, .v-leave-to{
    opacity: 0;
    transform: translateX( 100% );
  }
  .v-enter-active, .v-leave-active{
    transition: all 1s;
  }
</style>
