<template>
  <div>
    数组的循环方式： forEach map filter
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldArray: [
        {
          val: 111,
          text: '我是1'
        },
        {
          val: 222,
          text: '我是2'
        },
        {
          val: 333,
          text: '我是3'
        },
        {
          val: 444,
          text: '我是4'
        },
        {
          val: 555,
          text: '我是5'
        },
        {
          val: 666,
          text: '我是6'
        },
        {
          val: 777,
          text: '我是7'
        }
      ]
    }
  },
  methods: {
    // forEach 循环遍历数组
    forEachArr() {
      this.oldArray.forEach(item => {
        if (item.val === 777) {
          return item.text
        }
      })
    },
    // map 循环数组
    mapArr() {
      this.oldArray.map(item => {
        if (item.text === '我是4') {
          return item.val
        }
      })
    },
    // filter  过滤数据方法 把Array的某些元素过滤掉，然后返回剩下的元素,返回值为一个新数组
    filterArr() {
      const filterArr = this.oldArray.filter(item => item.val !== 777)
      return filterArr
    },
    // filter参数打印 通常我们仅使用第一个参数，表示Array的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身
    consoleFilterArr() {
      const argumentData = this.oldArray.filter(function(element, index, self) {
        console.log('element', element)
        console.log('index', index)
        console.log('self', self)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
