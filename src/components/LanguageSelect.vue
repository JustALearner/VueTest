<!--  -->
<template>
  <div>
    <!-- <el-dropdown trigger="click" @command="handleSetLanguage"> -->
    <el-dropdown slot="dropdown" trigger="click" @command="handleSetLanguage">
      <!-- <el-button type="success">
        更多菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>-->
      <div>
        <!-- <svg>
        <use xlink:href="#language"></use>
        </svg>-->
        <svg-icon icon-class="language" class-name="international-icon" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >英文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >简体中文</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import "../icons/svg/language.svg";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);
      this.$message({
        message: "Switch Language Success",
        type: "success"
      });
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
.international-icon {
  width: 45px !important;
  height: 45px !important;
}
</style>
