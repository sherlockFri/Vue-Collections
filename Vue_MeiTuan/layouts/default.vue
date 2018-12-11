<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="100%">
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script>
  import MyFooter from '@/components/public/footer/footer.vue'
  import MyHeader from '@/components/public/header/header.vue'
  export default {
    components:{
      MyHeader,
      MyFooter
    }
  }
</script>

