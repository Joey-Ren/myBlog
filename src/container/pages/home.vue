<template>
  <div>
    <el-button type="primary" @click="debounce">防抖功能</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    // 跳转防抖界面
    debounce () {
      this.$router.replace('/debounce')
    }
  }
}
</script>

<style scoped>

</style>
