import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import login from "./components/Login.vue";
import layout from "./components/Layout.vue";
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
          path: "userList",
          name: "",
          component: resolve => require(["./components/userList.vue"], resolve)
        }
      ]
    }
  ]
});
