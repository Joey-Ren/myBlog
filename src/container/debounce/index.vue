<template>
  <div>
    <el-button type="primary" @click="submit" round>防抖提交</el-button>
    <el-input v-model="input" placeholder="这里要显示内容了哦，不要眨眼"></el-input>
  </div>
</template>

<script>
import utils from '@/common/js/Utils.js'
export default {
  name: 'debounce',
  data () {
    return {
      index: 0,
      input: ''
    }
  },
  methods: {
    // submit () {
    //   // console.log('utils', utils)
    //   this.index += 1
    //   console.log('在这里我执行了提价操作' + this.index)
    // }
    submit: utils.debounce(function () {
      this.index += 1
      this.input = '在这里我执行了提价操作' + this.index
    }, 1000, {'leading': true, 'trailing': false})
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {}
}
</script>

<style scoped>

</style>
