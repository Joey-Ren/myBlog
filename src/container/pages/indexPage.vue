<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      不折腾的前端，和闲鱼有什么区别
    </div>
    <ul>
      <li>
        前端图书馆
      </li>
    </ul>
    <iframe
      src="../../../static/page.html"
      width="1200"
      height="600"
      frameborder="0"
      scrolling="auto"
    ></iframe>
    <div>
      <el-button type="primary" @click="goLibrary"
        >笔记目录<i class="el-icon-position"></i
      ></el-button>
      <el-button type="primary" @click="goHome"
        >跳转首页<i class="el-icon-lollipop"></i
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexpage',
  data() {
    return {
      msg: 'Welcome to myBlog'
    }
  },
  methods: {
    // 跳转图书列表
    goLibrary() {
      this.$router.replace('/markdown')
    },
    // 跳转首页列表
    goHome() {
      this.$router.replace('/home')
    }
  }
}
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.box {
  width: 1000px;
  height: 600px;
}
</style>
