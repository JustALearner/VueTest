import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import login from "./views/Login.vue";
import layout from "./views/Layout.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/layout",
      name: "layout",
      component: layout,
      children: [
        {
          path: "userInfos",
          name: "用户信息",
          component: resolve => require(["./views/UserInfos.vue"], resolve)
        },
        {
          path: "editor",
          name: "编辑器",
          component: resolve => require(["./views/Editor.vue"], resolve)
        }
      ]
    }
  ]
});
