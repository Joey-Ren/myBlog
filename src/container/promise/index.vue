<template>
  <div>
    <el-button onclick="timeout">
      test Promise
    </el-button>
  </div>
</template>

<script>
export default {
  methods: {
    timeout(ms) {
      // return new Promise(resolve, reject) => {
      //   setTimeout(resolve, ms, 'done')
      // }
    }
  }
}
</script>

<style scoped></style>
