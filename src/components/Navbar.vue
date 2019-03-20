<template>
  <el-header height="80px">
    <a href class="logo">
      <img src="../assets/images/1.png" alt />
      管理员系统
    </a>
    <div class="nav">
      <div class="userMenu">
        <span class="author">
          <img src="../assets/images/2.png" alt />
        </span>
        <el-dropdown>
          <span class="el-dropdown-link">
            设置
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>切换账号</el-dropdown-item>
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>
<script>
export default {
  data() {
    return {
      message: "我是一个头部菜单"
    };
  }
};
</script>
<style scoped>
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  background-color: #409eff;
  color: #333;
}

.el-header .logo {
  display: flex;
  align-items: center;
  color: white;
}
.el-header .logo img {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.nav {
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.cms-a {
}

.el-dropdown {
  margin-left: 10px;
  color: white;
}

.nav .userMenu {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  margin-left: 100px;
}
.nav .userMenu .author {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #c0c0c0;
}
.nav .userMenu .author img {
  width: 100%;
  height: 100%;
}
</style>
