<template>
  <div class="dashboard">
    <!-- <div class="flex-container"> -->
    <div class="item one" @click="clickChart('1')">
      <el-row>
        <el-col :span="24">
          <el-card shadow="hover" :body-style="{ height: '100%' }">
            <my-line></my-line>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="item two" @click="clickChart('2')">
      <el-row>
        <el-col :span="24">
          <el-card shadow="hover" :body-style="{ height: '100%' }">
            <bar></bar>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="item three" @click="clickChart('2')">
      <el-row>
        <el-col :span="24">
          <el-card shadow="hover" :body-style="{ height: '100%' }">
            <pie></pie>
          </el-card>
        </el-col>
      </el-row>
    </div>-->
  </div>
  <!-- </div> -->
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import line from "../components/charts/line";
import bar from "../components/charts/bar";
import pie from "../components/charts/pie";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { myLine: line, bar, pie },
  data() {
    //这里存放数据
    return {
      myChart: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    clickChart(index) {
      console.log(index);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.dashboard {
  position: absolute;
  height: 100%;
  width: 100%;
}
.dashboard .el-row {
  height: 100%;
}

.dashboard .el-col {
  height: 100%;
}
.dashboard .el-card {
  height: 100%;
  border-radius: 20px;
  background: rgb(190, 196, 204, 0.3);
}
.flex-container {
  position: relative;
  height: 90%;
  width: 90%;
  overflow: hidden;
  margin: 0 auto 100px auto;
  box-sizing: content-box;
  background-color: green;
}

.item {
  margin: 0;
  padding: 0;
  position: absolute;
  width: 68%;
  height: 100%;
  text-align: center;
  transition: all 0.8s;
  /* background: rgba(40, 54, 72); */
  border-radius: 20px;
}

.one {
  transform: scale(0.3) translate(-115%, -100%);
}
.two {
  transform: scale(0.3) translate(-115%, 5%);
}

.three {
  transform: scale(0.3) translate(-115%, 110%);
}
</style>
