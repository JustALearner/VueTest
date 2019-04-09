import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import login from "./views/Login.vue";
import layout from "./views/layout/Layout.vue";
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
          name: "userinfo",
          component: resolve => require(["./views/UserInfos.vue"], resolve),
          meta: {
            title: "userinfo"
          }
        },
        {
          path: "charts",
          name: "chart",
          component: resolve => require(["./views/Dashboard.vue"], resolve),
          meta: {
            title: "chart"
          }
        },
        {
          path: "editor",
          name: "editor",
          component: resolve => require(["./views/MyTinymce.vue"], resolve),
          meta: {
            title: "editor"
          }
        }
      ]
    }
  ]
});
