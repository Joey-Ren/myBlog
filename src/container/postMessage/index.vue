<template>
  <div>
    <el-button type="primary" @click="registration">发车登记</el-button>
    <el-button type="primary" @click="edit">发车编辑</el-button>
    <!--发车登记/编辑弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      @closed="pDialogClosed"
    >
      <el-select
        v-model="value"
        placeholder="请选择登记方式"
        @change="typeChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!--ifream区域-->
      <iframe
        v-if="dialogVisible"
        ref="iframe"
        width="100%"
        height="600px"
        :src="src"
      ></iframe>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '公司车发车登记'
        },
        {
          value: '2',
          label: '物流车发车登记'
        }
      ],
      value: '1',
      dialogVisible: false,
      src: 'http://10.10.132.166:8080/startCarManage',
      iframeWin: null
    }
  },
  mounted() {
    // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    window.addEventListener('message', event => {
      // 根据上面制定的结构来解析iframe内部发回来的数据
      const data = event.data
      switch (data.cmd) {
        case 'dialogClose':
          // 业务逻辑
          this.dialogVisible = false
          console.log('路由系统执行刷新列表数据操作')
          break
      }
    })
  },
  methods: {
    // 发车登记
    registration() {
      this.dialogVisible = true // 显示当前弹窗
      console.log(1)
      this.$nextTick(() => {
        console.log(2)
        // 异步触发器
        this.iframe = this.$refs.iframe
        console.log('我进来了一次', this.iframe)
        this.iframe.onload = () => {
          console.log('我进来了er次')
          this.iframe.contentWindow.postMessage(
            {
              type: 'add-depart'
            },
            '*'
          )
        }
      })
    },
    // 发车编辑
    edit() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.iframe = this.$refs.iframe
        this.iframe.onload = () => {
          this.iframe.contentWindow.postMessage(
            {
              cmd: 'editRegist',
              row: {
                batchNumber: '4191120500000050'
              }
            },
            '*'
          )
        }
      })
    },
    // 登记方式发生改变
    typeChange(val) {
      this.src =
        val === '1'
          ? 'http://10.10.132.166:8080/#/startCarManage'
          : 'http://localhost:8088/vehicleManagement/startCarManage'
    },
    // 父页面关闭弹窗
    pDialogClosed() {
      this.$nextTick(() => {
        this.iframe = this.$refs.iframe
        this.iframe.contentWindow.postMessage(
          {
            cmd: 'closeRegist'
          },
          '*'
        )
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped></style>
