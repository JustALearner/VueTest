<template>
  <div>
    <el-container>
      <!-- <el-header height="80px"> -->
      <my-header></my-header>
      <!-- </el-header> -->
      <el-container>
        <el-aside width="200px">
          <my-aside></my-aside>
        </el-aside>
        <el-main>
          <el-main>
            <keep-alive>
              <!-- <router-view></router-view> -->
              <my-tabs></my-tabs>
            </keep-alive>
          </el-main>
        </el-main>
      </el-container>

      <el-footer>
        <button @click="isShowAbout = !isShowAbout">123</button>
        <p v-show="isShowAbout" class="slotText">{{ username }}</p>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import myAside from "./Aside";
import myHeader from "./Navbar.vue";
import myTabs from "./Tabs.vue";
import { Loading, Message, Notification } from "element-ui";
export default {
  data() {
    return {
      username: "",
      isShowAbout: true
    };
  },
  created() {
    let loadingInstance = Loading.service({
      text: "我是一个loading,我正在正在加载",
      lock: true,
      target: ".loadingTarget",
      spinner: "el-icon-loading",
      fullscreen: false
    });
    setTimeout(() => {
      loadingInstance.close();
    }, 2000);
    this.username = this.$route.query.username;
    // console.log(this.username);
  },
  components: { myAside, myHeader, myTabs },
  methods: {},
  watch: {
    isShowAbout: function() {
      Notification.info("我是一个通知");
    }
  }
};
</script>

<style scoped>
.el-aside {
  position: absolute;
  left: 0;
  top: 80px;
  bottom: 0;
  background-color: #d3dce6;
  color: #333;
  text-align: left;
}

.el-main {
  position: absolute;
  left: 200px;
  top: 80px;
  bottom: 0;
  right: 0;
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  overflow-x: hidden;
  overflow-y: auto;
}

body > .el-container {
  min-width: 1000px;
  overflow-x: auto;
  overflow-y: auto;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
}
</style>
