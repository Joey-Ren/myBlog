<template>
  <div>
    <el-button type="primary" @click="debounce">防抖功能</el-button>
    <el-button type="primary" @click="postMessage"
      >测试ifream通信机制</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    // 跳转防抖界面
    debounce() {
      this.$router.replace('/debounce')
    },
    // ifream通信机制
    postMessage() {
      this.$router.replace('/postMessage')
    }
  }
}
</script>

<style scoped></style>
