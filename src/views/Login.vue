<template>
  <div>
    <header>
      <div class="logo">
        <h1>我是一个logo</h1>
      </div>
    </header>
    <div class="login-container">
      <!-- <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>-->
      <!-- <div style="margin: 20px;"></div> -->
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="用户名">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="passowrd"></el-input>
        </el-form-item>
        <div>
          <el-button
            type="primary"
            size="medium"
            style="width:100%;margin-bottom:30px;"
            @click="login"
            >登录</el-button
          >
        </div>
        <div>
          <el-button
            type="success"
            size="medium"
            style="width:100%;margin-bottom:10px;"
            >注册</el-button
          >
        </div>
      </el-form>
    </div>
    <footer>
      <p>我是一个footer</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "left",
      username: "test",
      passowrd: "123"
    };
  },
  methods: {
    login: function() {
      // console.log(this.$router);
      // console.log(this.$Vue);
      this.$router.push({
        //核心语句
        path: "/layout", //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
          username: this.username
        }
      });
      // this.$http.get("/api/all").then(res => {
      //   console.log(res);
      // });
    }
  },
  mounted() {
    console.log(this.$store.state.visitedViews);
  }
};
</script>
<style scoped>
body {
  background-color: #2d3a4b;
}
footer {
  color: white;
  margin: 0 auto;
  padding: 15px;
  text-align: center;
}

.logo {
  width: 247px;
  margin: 0 auto;
  padding: 15px;
  text-align: center;
}
.login-container {
  overflow: hidden;
  background-color: white;
  width: 600px;
  margin: 0 auto;
  margin-bottom: 50px;
  padding: 10px;
}
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 60px 35px 0;
  margin: 0 auto;

  /* overflow: hidden; */
}
</style>
