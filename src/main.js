import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Cookies from "js-cookie";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/styles/index.css";
import "./assets/styles/reset.css";
Vue.config.productionTip = false;
// const HOST = process.env.HOST;
// const PORT = process.env.PORT && Number(process.env.PORT);
import "echarts/theme/roma";
import "echarts/theme/macarons";
import "animate.css";
import i18n from "./lang";
import "./icons";
console.log(process.env.NODE_ENV, "baseUrl", process.env.VUE_APP_BASEURL);
Vue.use(ElementUI, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});


// const path = require("path");

// function resolve(dir) {
//   return path.join(__dirname, dir);
// }
// console.log(resolve("src/icon"));

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
