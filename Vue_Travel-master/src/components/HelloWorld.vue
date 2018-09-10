<template>
  <div>
    <button @click="handleClick">click me</button>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {}
  },
  methods: {
    handleClick() {
      alert('123')
    }
  }
}
</script>
<style scoped>

</style>
