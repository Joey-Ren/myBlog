<template>
  <div>
    <el-button type="primary" round @click="submit">防抖提交</el-button>
    <el-button
      type="primary"
      :disabled="submitDisabled"
      round
      @click="submitOne"
      >禁用式防抖</el-button
    >
    <el-input
      v-model="input"
      placeholder="这里要显示内容了哦，不要眨眼"
    ></el-input>
    <!--参考博客文档-->
    <!--https://segmentfault.com/a/1190000017227559-->

    <!--
      函数防抖（debounce）和节流是一对常常被放在一起的场景。
      防抖的原理是在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。也就是说事件来了，
      先setTimeout定个时，n秒后再去触发回调函数。它和节流的不同在于如果某段时间内事件以间隔小于n秒的频率执行，
      那么这段时间回调只会触发一次。节流则是按照200ms或者300ms定时触发，而不仅仅是一次。
    -->
  </div>
</template>

<script>
import utils from '@/common/js/Utils.js'
export default {
  name: 'debounce',
  data() {
    return {
      index: 0,
      input: '',
      submitDisabled: false // 默然查询按钮可点击
    }
  },
  methods: {
    // 正常提交按钮功能演示
    // submit () {
    //   // console.log('utils', utils)
    //   this.index += 1
    //   console.log('在这里我执行了提价操作' + this.index)
    // }
    // 方案一：增加防抖功能按钮效果
    submit: utils.debounce(
      function() {
        this.index += 1
        this.input = '在这里我执行了提价操作' + this.index
      },
      1000,
      { leading: true, trailing: false }
    ),

    // 方案二：等待数据结果返回值后，按钮在启用
    submitOne() {
      this.submitDisabled = true
      //  console.log('我再等数据返回！！！')
      // 模拟数据返回值后，按钮启用
      setTimeout(() => {
        // console.log('好了，数据返回了')
        this.submitDisabled = false
      }, 3000)
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {}
}
</script>

<style scoped></style>
