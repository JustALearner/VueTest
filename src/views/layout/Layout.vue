<template>
  <div>
    <el-container>
      <my-header></my-header>
      <el-container>
        <el-aside width="200px">
          <my-aside></my-aside>
        </el-aside>
        <el-main>
          <!-- <my-tabs></my-tabs> -->
          <tag-view></tag-view>
          <main-content></main-content>
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
import myAside from "../../components/Aside";
import myHeader from "../../components/Navbar.vue";
import tagView from "./TagsView";
import mainContent from "./MainContent";
// import myTabs from "../../components/Tabs.vue";
import { Loading, Message, Notification } from "element-ui";
export default {
  data() {
    return {
      username: "",
      isShowAbout: true
    };
  },
  created() {
    // let loadingInstance = Loading.service({
    //   text: "我是一个loading,我正在正在加载",
    //   lock: true,
    //   target: ".loadingTarget",
    //   spinner: "el-icon-loading",
    //   fullscreen: false
    // });
    // setTimeout(() => {
    //   loadingInstance.close();
    // }, 2000);
    this.username = this.$route.query.username;
    // console.log(this.username);
  },
  components: { myAside, myHeader, tagView, mainContent },
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
  padding: 10px;
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0px;
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
