<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="selectedMenu"
        >
          <template v-for="(menu, index) in menus">
            <el-submenu :index="index + ''" :key="index" v-if="menu.childMenu">
              <template slot="title">
                <i :class="menu.icon"></i>
                <span>{{ generateTitle(menu.title) }}</span>
              </template>
              <el-menu-item-group
                :key="index"
                v-for="(item, index) in menu.childMenu"
              >
                <router-link :to="item.path">
                  <el-menu-item
                    :index="item.path"
                    :key="item.path"
                    :disabled="item.flag"
                    >{{ generateTitle(item.title) }}</el-menu-item
                  >
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <!-- <router-link :key="index" :to="menu.path" v-else>
              <el-menu-item :index="menu.path">
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.title }}</span>
              </el-menu-item>
            </router-link>-->
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ajaxHelper from "../api/ajax-helper.js";
export default {
  data() {
    return { menus: [] };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    selectedMenu(key, keyPath) {
      // console.log(key);
      // console.log(this);
    },
    getMenuData() {
      // axios.get(config.dynamicDomain+url, {
      ajaxHelper.get("api/menus").then(
        res => {
          // console.log(res);
          this.menus = res;
        },
        err => {
          console.log(err);
        }
      );
    },
    generateTitle(title) {
      const hasKey = this.$te("route." + title);

      if (hasKey) {
        // $t :this method from vue-i18n, inject in @/lang/index.js
        const translatedTitle = this.$t("route." + title);

        return translatedTitle;
      }
      return title;
    }
  },
  created() {
    this.getMenuData();
  }
};
</script>
<style scoped>
.el-menu {
  background-color: transparent;
}
</style>
